import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Reminder = sequelize.define('Reminder', {
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
  remindAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'remind_at',
  },
  isSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_sent',
  },
}, {
  tableName: 'reminders',
  timestamps: true,
  indexes: [
    { fields: ['todo_id'] },
    { fields: ['remind_at'] },
    { fields: ['is_sent'] },
  ],
});

export default Reminder;
