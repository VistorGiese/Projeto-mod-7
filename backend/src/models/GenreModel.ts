import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class GenreModel extends Model {
  id!: number;
  nome!: string;
  descricao?: string;
}

GenreModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Genre',
    tableName: 'generos',
    timestamps: false,
  }
);

export default GenreModel;