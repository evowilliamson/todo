import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
}, {
  tableName: 'tags',
  timestamps: true,
  indexes: [
    { fields: ['user_id'] },
  ],
});

export default Tag;
