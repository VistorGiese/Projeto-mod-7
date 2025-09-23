
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BandModel extends Model {
  id!: number;
  nome_banda!: string;
  descricao?: string;
  imagem?: string;
  data_criacao!: Date;
}

BandModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_banda: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imagem: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Band',
    tableName: 'bandas',
    timestamps: false,
  }
);

export default BandModel;