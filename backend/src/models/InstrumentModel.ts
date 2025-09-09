import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export enum InstrumentCategory {
  CORDAS = 'cordas',
  SOPRO = 'sopro',
  PERCUSSAO = 'percussao',
  TECLAS = 'teclas',
  AUDIO = 'audio'
}

class InstrumentModel extends Model {
  id!: number;
  nome!: string;
  categoria?: InstrumentCategory;
}

InstrumentModel.init(
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
    categoria: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        isIn: [Object.values(InstrumentCategory)],
      },
    },
  },
  {
    sequelize,
    modelName: 'Instrument',
    tableName: 'instrumentos',
    timestamps: false,
  }
);

export default InstrumentModel;