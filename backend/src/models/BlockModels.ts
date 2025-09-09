import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

// Bloqueios de Bandas
class BandBlockModel extends Model {
  id!: number;
  banda_id!: number;
  data_inicio!: Date;
  data_fim!: Date;
  motivo?: string;
  ativo!: boolean;
  data_criacao!: Date;
}

BandBlockModel.init(
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
      onDelete: 'CASCADE',
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_fim: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterStartDate(value: Date) {
          if (value < (this.data_inicio as Date)) {
            throw new Error('Data fim deve ser após data início');
          }
        },
      },
    },
    motivo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'BandBlock',
    tableName: 'bandas_bloqueios',
    timestamps: false,
  }
);

// Bloqueios de Estabelecimentos
class EstablishmentBlockModel extends Model {
  id!: number;
  estabelecimento_id!: number;
  data_inicio!: Date;
  data_fim!: Date;
  motivo?: string;
  ativo!: boolean;
  data_criacao!: Date;
}

EstablishmentBlockModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    estabelecimento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estabelecimentos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_fim: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterStartDate(value: Date) {
          if (value < (this.data_inicio as Date)) {
            throw new Error('Data fim deve ser após data início');
          }
        },
      },
    },
    motivo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'EstablishmentBlock',
    tableName: 'estabelecimentos_bloqueios',
    timestamps: false,
  }
);

export { BandBlockModel, EstablishmentBlockModel };