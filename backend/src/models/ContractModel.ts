import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';


export enum ContractStatus {
  ATIVO = 'ativo',
  CUMPRIDO = 'cumprido',
  QUEBRADO = 'quebrado',
  CANCELADO = 'cancelado'
}

class ContractModel extends Model {
  id!: number;
  agendamento_id!: number;
  numero_contrato!: string;
  clausulas_especiais?: string;
  valor_total!: number;
  valor_antecipado?: number;
  valor_restante?: number;
  data_vencimento_antecipado?: Date;
  data_vencimento_final?: Date;
  status_contrato!: ContractStatus;
  data_criacao!: Date;
}

ContractModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    agendamento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'agendamentos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    numero_contrato: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    clausulas_especiais: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    valor_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    valor_antecipado: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    valor_restante: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    data_vencimento_antecipado: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    data_vencimento_final: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status_contrato: {
      type: DataTypes.ENUM(...Object.values(ContractStatus)),
      defaultValue: ContractStatus.ATIVO,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Contract',
    tableName: 'contratos',
    timestamps: false,
  }
);

export default ContractModel;