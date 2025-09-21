import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class CommonUserModel extends Model {
  id!: number;
  usuario_id!: number;
  data_nascimento?: Date;
  endereco_id?: number;
  preferencias_musicais?: string;
  data_criacao!: Date;
}

CommonUserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: true,
        isBefore: new Date().toISOString(),
      },
    },
    endereco_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'enderecos',
        key: 'id',
      },
    },
    preferencias_musicais: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'CommonUser',
    tableName: 'usuarios_comuns',
    timestamps: false,
  }
);

export default CommonUserModel;