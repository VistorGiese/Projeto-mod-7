import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';


class BandMemberModel extends Model {
  id!: number;
  banda_id!: number;
  usuario_id!: number;
  nome!: string;
  funcao?: string;
  ativo!: boolean;
  data_entrada?: Date;
  data_saida?: Date;
}

BandMemberModel.init(
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
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    funcao: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'vocalista, guitarrista, baterista, baixista, tecladista, etc.',
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    data_entrada: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    data_saida: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isAfterEntryDate(value: Date) {
          if (value && this.data_entrada && value < this.data_entrada) {
            throw new Error('Data de saída deve ser após data de entrada');
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'BandMember',
    tableName: 'integrantes_banda',
    timestamps: false,
  }
);

export default BandMemberModel;