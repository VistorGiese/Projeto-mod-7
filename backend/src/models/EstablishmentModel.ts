import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';


class EstablishmentModel extends Model {
  id!: number;
  usuario_id!: number;
  nome_dono!: string;
  cnpj?: string;
  endereco_id!: number;
  descricao?: string;
  capacidade?: number;
  tem_som_proprio!: boolean;
  tem_iluminacao!: boolean;
  aceita_agendamentos!: boolean;
  tempo_antecedencia_minimo!: number;
  horario_funcionamento_inicio!: string;
  horario_funcionamento_fim!: string;
  taxa_agenciamento!: number;
  data_criacao!: Date;
}

EstablishmentModel.init(
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
    nome_dono: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cnpj: {
      type: DataTypes.STRING(18),
      allowNull: true,
      unique: true,
      validate: {
        is: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
      },
    },
    endereco_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'enderecos',
        key: 'id',
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    capacidade: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
      },
    },
    tem_som_proprio: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tem_iluminacao: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    aceita_agendamentos: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    tempo_antecedencia_minimo: {
      type: DataTypes.INTEGER,
      defaultValue: 7, // dias
      validate: {
        min: 0,
      },
    },
    horario_funcionamento_inicio: {
      type: DataTypes.TIME,
      defaultValue: '18:00:00',
    },
    horario_funcionamento_fim: {
      type: DataTypes.TIME,
      defaultValue: '02:00:00',
    },
    taxa_agenciamento: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0.00,
      validate: {
        min: 0,
        max: 100,
      },
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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