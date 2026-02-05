import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PasswordReset = sequelize.define('PasswordReset', {
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
  token: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'expires_at',
  },
  usedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'used_at',
  },
}, {
  tableName: 'password_resets',
  timestamps: true,
  indexes: [
    { fields: ['user_id'] },
    { fields: ['token'] },
  ],
});

export default PasswordReset;
