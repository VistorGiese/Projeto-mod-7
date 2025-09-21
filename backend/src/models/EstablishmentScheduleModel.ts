import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';


export enum WeekDay {
  SEGUNDA = 'segunda',
  TERCA = 'terca',
  QUARTA = 'quarta',
  QUINTA = 'quinta',
  SEXTA = 'sexta',
  SABADO = 'sabado',
  DOMINGO = 'domingo'
}

class EstablishmentScheduleModel extends Model {
  id!: number;
  estabelecimento_id!: number;
  dia_semana!: WeekDay;
  horario_abertura!: string;
  horario_fechamento!: string;
  aceita_shows!: boolean;
}

EstablishmentScheduleModel.init(
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
    dia_semana: {
      type: DataTypes.ENUM(...Object.values(WeekDay)),
      allowNull: false,
    },
    horario_abertura: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horario_fechamento: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    aceita_shows: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'EstablishmentSchedule',
    tableName: 'estabelecimentos_horarios',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['estabelecimento_id', 'dia_semana'],
      },
    ],
  }
);

export default EstablishmentScheduleModel;