import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';


export enum BookingStatus {
  PENDENTE = 'pendente',
  EM_NEGOCIACAO = 'em_negociacao',
  ACEITO = 'aceito',
  REJEITADO = 'rejeitado',
  CANCELADO = 'cancelado',
  REALIZADO = 'realizado'
}

export enum BookingRequestType {
  BANDA_SOLICITA = 'banda_solicita',
  ESTABELECIMENTO_SOLICITA = 'estabelecimento_solicita'
}

export enum PaymentMethod {
  DINHEIRO = 'dinheiro',
  PIX = 'pix',
  TRANSFERENCIA = 'transferencia',
  CHEQUE = 'cheque'
}

class BookingModel extends Model {
  id!: number;
  banda_id!: number;
  estabelecimento_id!: number;
  usuario_solicitante_id!: number;
  tipo_solicitacao!: BookingRequestType;
  data_show!: Date;
  duracao_estimada!: number;
  titulo_evento?: string;
  descricao_evento?: string;
  valor_proposto?: number;
  valor_final?: number;
  forma_pagamento!: PaymentMethod;
  porcentagem_antecipado!: number;
  precisa_som!: boolean;
  precisa_iluminacao!: boolean;
  instrumentos_necessarios?: string;
  status!: BookingStatus;
  data_solicitacao!: Date;
  data_resposta?: Date;
  data_finalizacao?: Date;
  observacoes_solicitante?: string;
  observacoes_resposta?: string;
  motivo_cancelamento?: string;
  // Campos Google Calendar
  id_evento_google?: string;
  calendario_sincronizado!: boolean;
  ultima_sincronizacao?: Date;
}

BookingModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    banda_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bandas',
        key: 'id',
      },
    },
    estabelecimento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estabelecimentos',
        key: 'id',
      },
    },
    usuario_solicitante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id',
      },
    },
    tipo_solicitacao: {
      type: DataTypes.ENUM(...Object.values(BookingRequestType)),
      allowNull: false,
    },
    data_show: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: new Date().toISOString(),
      },
    },
    duracao_estimada: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 30,
        max: 480,
      },
    },
    titulo_evento: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    descricao_evento: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    valor_proposto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    valor_final: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    forma_pagamento: {
      type: DataTypes.ENUM(...Object.values(PaymentMethod)),
      defaultValue: PaymentMethod.PIX,
    },
    porcentagem_antecipado: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 50.00,
      validate: {
        min: 0,
        max: 100,
      },
    },
    precisa_som: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    precisa_iluminacao: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    instrumentos_necessarios: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(BookingStatus)),
      defaultValue: BookingStatus.PENDENTE,
    },
    data_solicitacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    data_resposta: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    data_finalizacao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    observacoes_solicitante: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    observacoes_resposta: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    motivo_cancelamento: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Campos Google Calendar
    id_evento_google: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: 'ID do evento no Google Calendar'
    },
    calendario_sincronizado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: 'Se o agendamento está sincronizado com Google Calendar'
    },
    ultima_sincronizacao: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Última sincronização com Google Calendar'
    },
  },
  {
    sequelize,
    modelName: 'Booking',
    tableName: 'agendamentos',
    timestamps: false,
  }
);

export default BookingModel;


