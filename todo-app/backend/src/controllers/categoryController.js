import { Category, Todo } from '../models/index.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      where: { userId: req.userId },
      order: [['name', 'ASC']],
    });

    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name, color } = req.body;
    const category = await Category.create({
      name,
      color,
      userId: req.userId,
    });

    res.status(201).json({
      message: 'Category created successfully',
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { id, userId: req.userId },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await category.update(req.body);

    res.json({
      message: 'Category updated successfully',
      category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { id, userId: req.userId },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    await Todo.update(
      { categoryId: null },
      { where: { categoryId: id } }
    );

    await category.destroy();

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getCategoryTodos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { id, userId: req.userId },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const todos = await Todo.findAll({
      where: {
        categoryId: id,
        userId: req.userId,
        isDeleted: false,
      },
      order: [['createdAt', 'DESC']],
    });

    res.json({ category, todos });
  } catch (error) {
    next(error);
  }
};
