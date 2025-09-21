import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { PaymentMethod } from './BookingModel';

export enum PaymentType {
  ANTECIPADO = 'antecipado',
  FINAL = 'final',
  MULTA = 'multa',
  BONIFICACAO = 'bonificacao'
}

export enum PaymentStatus {
  PENDENTE = 'pendente',
  PAGO = 'pago',
  ATRASADO = 'atrasado',
  CANCELADO = 'cancelado'
}

class PaymentModel extends Model {
  id!: number;
  contrato_id!: number;
  tipo_pagamento!: PaymentType;
  valor!: number;
  forma_pagamento!: PaymentMethod;
  status_pagamento!: PaymentStatus;
  data_vencimento!: Date;
  data_pagamento?: Date;
  comprovante?: string;
  observacoes?: string;
}

PaymentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contrato_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'contratos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    tipo_pagamento: {
      type: DataTypes.ENUM(...Object.values(PaymentType)),
      allowNull: false,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    forma_pagamento: {
      type: DataTypes.ENUM(...Object.values(PaymentMethod)),
      allowNull: false,
    },
    status_pagamento: {
      type: DataTypes.ENUM(...Object.values(PaymentStatus)),
      defaultValue: PaymentStatus.PENDENTE,
    },
    data_vencimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    data_pagamento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    comprovante: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
    tableName: 'pagamentos',
    timestamps: false,
  }
);

export default PaymentModel;