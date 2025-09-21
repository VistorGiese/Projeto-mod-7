import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { RatingTargetType } from './RatingModel';

class CommentModel extends Model {
  id!: number;
  usuario_id!: number;
  tipo_destinatario!: RatingTargetType;
  destinatario_id!: number;
  agendamento_id?: number;
  comentario!: string;
  data_comentario!: Date;
  ativo!: boolean;
}

CommentModel.init(
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
    comentario: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 5000],
      },
    },
    data_comentario: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comentarios',
    timestamps: false,
  }
);

export default CommentModel;