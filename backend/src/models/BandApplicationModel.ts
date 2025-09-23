import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BandApplicationModel extends Model {
  id!: number;
  banda_id!: number;
  evento_id!: number;
  status!: string; 
  data_aplicacao!: Date;
}

BandApplicationModel.init({
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
  evento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'agendamentos',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pendente',
  },
  data_aplicacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'BandApplication',
  tableName: 'aplicacoes_banda_evento',
  timestamps: false,
});

export default BandApplicationModel;
