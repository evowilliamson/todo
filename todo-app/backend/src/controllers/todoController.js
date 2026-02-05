import { Op } from 'sequelize';
import { Todo, Category, Tag, Subtask, Reminder } from '../models/index.js';

export const getTodos = async (req, res, next) => {
  try {
    const {
      status, priority, categoryId, tagId, search,
      sortBy = 'createdAt', sortOrder = 'DESC',
      page = 1, limit = 50, includeDeleted = false
    } = req.query;

    const where = { userId: req.userId };
    
    if (!includeDeleted) {
      where.isDeleted = false;
    }
    
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (categoryId) where.categoryId = categoryId;
    
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows: todos } = await Todo.findAndCountAll({
      where,
      include: [
        { model: Category, as: 'category' },
        { model: Tag, as: 'tags' },
        { model: Subtask, as: 'subtasks' },
        { model: Reminder, as: 'reminders' }
      ],
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset,
    });

    res.json({
      todos,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({
      where: { id, userId: req.userId },
      include: [
        { model: Category, as: 'category' },
        { model: Tag, as: 'tags' },
        { model: Subtask, as: 'subtasks', order: [['position', 'ASC']] },
        { model: Reminder, as: 'reminders' }
      ],
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ todo });
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req, res, next) => {
  try {
    const todoData = { ...req.body, userId: req.userId };
    const todo = await Todo.create(todoData);

    if (req.body.tags && req.body.tags.length > 0) {
      await todo.setTags(req.body.tags);
    }

    const fullTodo = await Todo.findByPk(todo.id, {
      include: [
        { model: Category, as: 'category' },
        { model: Tag, as: 'tags' },
        { model: Subtask, as: 'subtasks' }
      ],
    });

    res.status(201).json({
      message: 'Todo created successfully',
      todo: fullTodo,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({
      where: { id, userId: req.userId },
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await todo.update(req.body);

    if (req.body.tags !== undefined) {
      await todo.setTags(req.body.tags);
    }

    const updatedTodo = await Todo.findByPk(todo.id, {
      include: [
        { model: Category, as: 'category' },
        { model: Tag, as: 'tags' },
        { model: Subtask, as: 'subtasks' }
      ],
    });

    res.json({
      message: 'Todo updated successfully',
      todo: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodoStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const todo = await Todo.findOne({
      where: { id, userId: req.userId },
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.status = status;
    if (status === 'completed') {
      todo.completedAt = new Date();
    } else {
      todo.completedAt = null;
    }
    await todo.save();

    res.json({
      message: 'Todo status updated successfully',
      todo,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({
      where: { id, userId: req.userId },
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    todo.isDeleted = true;
    todo.deletedAt = new Date();
    await todo.save();

    res.json({ message: 'Todo moved to trash' });
  } catch (error) {
    next(error);
  }
};

export const restoreTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({
      where: { id, userId: req.userId, isDeleted: true },
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found in trash' });
    }

    todo.isDeleted = false;
    todo.deletedAt = null;
    await todo.save();

    res.json({
      message: 'Todo restored successfully',
      todo,
    });
  } catch (error) {
    next(error);
  }
};

export const permanentlyDeleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({
      where: { id, userId: req.userId },
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await todo.destroy();

    res.json({ message: 'Todo permanently deleted' });
  } catch (error) {
    next(error);
  }
};

export const bulkOperation = async (req, res, next) => {
  try {
    const { todoIds, operation, value } = req.body;

    const todos = await Todo.findAll({
      where: {
        id: todoIds,
        userId: req.userId,
      },
    });

    if (todos.length === 0) {
      return res.status(404).json({ error: 'No todos found' });
    }

    switch (operation) {
      case 'delete':
        await Todo.update(
          { isDeleted: true, deletedAt: new Date() },
          { where: { id: todoIds, userId: req.userId } }
        );
        break;
      case 'complete':
        await Todo.update(
          { status: 'completed', completedAt: new Date() },
          { where: { id: todoIds, userId: req.userId } }
        );
        break;
      case 'uncomplete':
        await Todo.update(
          { status: 'to_do', completedAt: null },
          { where: { id: todoIds, userId: req.userId } }
        );
        break;
      case 'setPriority':
        await Todo.update(
          { priority: value },
          { where: { id: todoIds, userId: req.userId } }
        );
        break;
      case 'setCategory':
        await Todo.update(
          { categoryId: value },
          { where: { id: todoIds, userId: req.userId } }
        );
        break;
    }

    res.json({ message: `Bulk ${operation} completed successfully` });
  } catch (error) {
    next(error);
  }
};

export const getTrash = async (req, res, next) => {
  try {
    const todos = await Todo.findAll({
      where: {
        userId: req.userId,
        isDeleted: true,
      },
      include: [
        { model: Category, as: 'category' },
        { model: Tag, as: 'tags' }
      ],
      order: [['deletedAt', 'DESC']],
    });

    res.json({ todos });
  } catch (error) {
    next(error);
  }
};
