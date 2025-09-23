
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class EstablishmentModel extends Model {
  id!: number;
  nome_estabelecimento!: string;
  nome_dono!: string;
  email_responsavel!: string;
  celular_responsavel!: string;
  generos_musicais!: string;
  horario_funcionamento_inicio!: string;
  horario_funcionamento_fim!: string;
  endereco_id!: number;
  senha!: string;
}

EstablishmentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome_estabelecimento: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nome_dono: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email_responsavel: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    celular_responsavel: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    generos_musicais: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    horario_funcionamento_inicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horario_funcionamento_fim: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endereco_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'enderecos',
        key: 'id',
      },
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Establishment',
    tableName: 'estabelecimentos',
    timestamps: false,
  }
);

export default EstablishmentModel;