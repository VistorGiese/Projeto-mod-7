import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class AddressModel extends Model {
  id!: number;
  cep!: string;
  logradouro!: string;
  numero?: string;
  complemento?: string;
  bairro!: string;
  cidade!: string;
  estado!: string;
  latitude?: number;
  longitude?: number;
}

AddressModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cep: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        is: /^\d{5}-?\d{3}$/,
      },
    },
    logradouro: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    complemento: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    bairro: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        len: [2, 2],
        isUppercase: true,
      },
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
      validate: {
        min: -90,
        max: 90,
      },
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
      validate: {
        min: -180,
        max: 180,
      },
    },
  },
  {
    sequelize,
    modelName: 'Address',
    tableName: 'enderecos',
    timestamps: false,
  }
);

export default AddressModel;