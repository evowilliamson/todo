import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TodoTag = sequelize.define('TodoTag', {
  todoId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'todo_id',
    primaryKey: true,
  },
  tagId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'tag_id',
    primaryKey: true,
  },
}, {
  tableName: 'todo_tags',
  timestamps: false,
});

export default TodoTag;
