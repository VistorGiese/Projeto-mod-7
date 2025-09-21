import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class UserEstablishmentModel extends Model {
  usuario_id!: number;
  estabelecimento_id!: number;
}

UserEstablishmentModel.init({
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'usuarios', key: 'id' },
    onDelete: 'CASCADE',
    primaryKey: true,
  },
  estabelecimento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'estabelecimentos', key: 'id' },
    onDelete: 'CASCADE',
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'user_establishment',
  tableName: 'estabelecimentos_usuarios',
  timestamps: false,
});

export default UserEstablishmentModel;
