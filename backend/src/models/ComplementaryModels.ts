import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';


// Shows Realizados
class CompletedShowModel extends Model {
  id!: number;
  agendamento_id!: number;
  publico_estimado?: number;
  receita_total?: number;
  observacoes_pos_show?: string;
  data_realizacao?: Date;
}

CompletedShowModel.init(
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
    },
    publico_estimado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    receita_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    observacoes_pos_show: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data_realizacao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'CompletedShow',
    tableName: 'shows_realizados',
    timestamps: false,
  }
);

// Ingressos
export enum TicketType {
  INTEIRA = 'inteira',
  MEIA = 'meia',
  PROMOCIONAL = 'promocional'
}

export enum TicketStatus {
  ATIVO = 'ativo',
  UTILIZADO = 'utilizado',
  CANCELADO = 'cancelado'
}

class TicketModel extends Model {
  id!: number;
  agendamento_id!: number;
  usuario_id!: number;
  tipo_ingresso!: TicketType;
  preco_pago!: number;
  codigo_ingresso!: string;
  status!: TicketStatus;
  data_compra!: Date;
}

TicketModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    agendamento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'agendamentos',
        key: 'id',
      },
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id',
      },
    },
    tipo_ingresso: {
      type: DataTypes.ENUM(...Object.values(TicketType)),
      defaultValue: TicketType.INTEIRA,
    },
    preco_pago: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    codigo_ingresso: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TicketStatus)),
      defaultValue: TicketStatus.ATIVO,
    },
    data_compra: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Ticket',
    tableName: 'ingressos',
    timestamps: false,
  }
);

// Histórico de Agendamentos
class BookingHistoryModel extends Model {
  id!: number;
  agendamento_id!: number;
  usuario_id!: number;
  campo_alterado!: string;
  valor_anterior?: string;
  valor_novo?: string;
  observacao?: string;
  data_alteracao!: Date;
}

BookingHistoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    agendamento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'agendamentos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id',
      },
    },
    campo_alterado: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    valor_anterior: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    valor_novo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    observacao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data_alteracao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'BookingHistory',
    tableName: 'agendamentos_historico',
    timestamps: false,
  }
);

// Contrapropostas
export enum CounterProposalStatus {
  PENDENTE = 'pendente',
  ACEITA = 'aceita',
  REJEITADA = 'rejeitada'
}

class CounterProposalModel extends Model {
  id!: number;
  agendamento_id!: number;
  usuario_id!: number;
  nova_data_show?: Date;
  novo_valor?: number;
  nova_duracao?: number;
  nova_observacao?: string;
  status!: CounterProposalStatus;
  data_contraproposta!: Date;
  data_resposta?: Date;
}

CounterProposalModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    agendamento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'agendamentos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id',
      },
    },
    nova_data_show: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    novo_valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        min: 0,
      },
    },
    nova_duracao: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 30,
        max: 480,
      },
    },
    nova_observacao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(CounterProposalStatus)),
      defaultValue: CounterProposalStatus.PENDENTE,
    },
    data_contraproposta: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    data_resposta: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'CounterProposal',
    tableName: 'contrapropostas',
    timestamps: false,
  }
);

export {
  CompletedShowModel,
  TicketModel,
  BookingHistoryModel,
  CounterProposalModel,
};