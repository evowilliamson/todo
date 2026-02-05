import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Subtask = sequelize.define('Subtask', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  todoId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'todo_id',
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_completed',
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'subtasks',
  timestamps: true,
  indexes: [
    { fields: ['todo_id'] },
  ],
});

export default Subtask;
