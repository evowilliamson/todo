import User from './User.js';
import Todo from './Todo.js';
import Category from './Category.js';
import Tag from './Tag.js';
import TodoTag from './TodoTag.js';
import Subtask from './Subtask.js';
import Reminder from './Reminder.js';
import Notification from './Notification.js';
import PasswordReset from './PasswordReset.js';

// Define associations
User.hasMany(Todo, { foreignKey: 'userId', as: 'todos' });
Todo.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Category, { foreignKey: 'userId', as: 'categories' });
Category.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Tag, { foreignKey: 'userId', as: 'tags' });
Tag.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Category.hasMany(Todo, { foreignKey: 'categoryId', as: 'todos' });
Todo.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

Todo.belongsToMany(Tag, { through: TodoTag, foreignKey: 'todoId', as: 'tags' });
Tag.belongsToMany(Todo, { through: TodoTag, foreignKey: 'tagId', as: 'todos' });

Todo.hasMany(Subtask, { foreignKey: 'todoId', as: 'subtasks' });
Subtask.belongsTo(Todo, { foreignKey: 'todoId', as: 'todo' });

Todo.hasMany(Reminder, { foreignKey: 'todoId', as: 'reminders' });
Reminder.belongsTo(Todo, { foreignKey: 'todoId', as: 'todo' });

User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(PasswordReset, { foreignKey: 'userId', as: 'passwordResets' });
PasswordReset.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export {
  User,
  Todo,
  Category,
  Tag,
  TodoTag,
  Subtask,
  Reminder,
  Notification,
  PasswordReset,
};
