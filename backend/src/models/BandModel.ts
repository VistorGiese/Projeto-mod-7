import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BandModel extends Model {
  id!: number;
  usuario_id!: number;
  ano_formacao?: number;
  descricao?: string;
  tem_instrumentos_proprios!: boolean;
  aceita_agendamentos!: boolean;
  preco_base?: number;
  tempo_apresentacao_padrao!: number;
  raio_atuacao!: number;
  tempo_antecedencia_minimo!: number;
  data_criacao!: Date;
}

BandModel.init(
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
    ano_formacao: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1900,
        max: new Date().getFullYear(),
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tem_instrumentos_proprios: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    aceita_agendamentos: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    preco_base: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    tempo_apresentacao_padrao: {
      type: DataTypes.INTEGER,
      defaultValue: 120, //  minutos
      validate: {
        min: 30,
        max: 480,
      },
    },
    raio_atuacao: {
      type: DataTypes.INTEGER,
      defaultValue: 50, // em km
      validate: {
        min: 1,
      },
    },
    tempo_antecedencia_minimo: {
      type: DataTypes.INTEGER,
      defaultValue: 3, // dias
      validate: {
        min: 0,
      },
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