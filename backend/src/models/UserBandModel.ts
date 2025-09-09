import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class UserBandModel extends Model {
  userId!: number;
  bandId!: number;
}

UserBandModel.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'usuarios', key: 'id' },
    onDelete: 'CASCADE',
  },
  bandId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'bands', key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  sequelize,
  modelName: 'user_band',
  timestamps: false,
});

export default UserBandModel;
