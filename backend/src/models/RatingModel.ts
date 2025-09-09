import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export enum RatingTargetType {
  BANDA = 'banda',
  ESTABELECIMENTO = 'estabelecimento'
}

interface RatingAspects {
  pontualidade?: number;
  qualidade_som?: number;
  repertorio?: number;
  ambiente?: number;
  atendimento?: number;
  limpeza?: number;
  organizacao?: number;
}

class RatingModel extends Model {
  id!: number;
  usuario_id!: number;
  tipo_destinatario!: RatingTargetType;
  destinatario_id!: number;
  agendamento_id?: number;
  nota!: number;
  aspectos_avaliados?: RatingAspects;
  comentario_avaliacao?: string;
  data_avaliacao!: Date;
}

RatingModel.init(
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
    },
    tipo_destinatario: {
      type: DataTypes.ENUM(...Object.values(RatingTargetType)),
      allowNull: false,
    },
    destinatario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agendamento_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'agendamentos',
        key: 'id',
      },
    },
    nota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    aspectos_avaliados: {
      type: DataTypes.JSON,
      allowNull: true,
      validate: {
        isValidAspects(value: RatingAspects) {
          if (value) {
            Object.values(value).forEach((nota) => {
              if (typeof nota === 'number' && (nota < 1 || nota > 5)) {
                throw new Error('Cada aspecto deve ter nota entre 1 e 5');
              }
            });
          }
        },
      },
    },
    comentario_avaliacao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data_avaliacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Rating',
    tableName: 'avaliacoes',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['usuario_id', 'tipo_destinatario', 'destinatario_id', 'agendamento_id'],
        name: 'rating_unique'
      },
    ],
  }
);

export default RatingModel;