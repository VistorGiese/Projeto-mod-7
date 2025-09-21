import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';


class BandAvailabilityModel extends Model {
  id!: number;
  banda_id!: number;
  data_inicio!: Date;
  data_fim!: Date;
  horario_inicio?: string;
  horario_fim?: string;
  disponivel!: boolean;
  motivo_indisponibilidade?: string;
  data_criacao!: Date;
}

BandAvailabilityModel.init(
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
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    data_fim: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isAfterStartDate(value: Date) {
          if (value < (this.data_inicio as Date)) {
            throw new Error('Data fim deve ser após data início');
          }
        },
      },
    },
    horario_inicio: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    horario_fim: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    disponivel: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    motivo_indisponibilidade: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'BandAvailability',
    tableName: 'bandas_disponibilidade',
    timestamps: false,
  }
);

export default BandAvailabilityModel;