import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from "bcrypt";

export enum UserType {
  COMUM = 'comum',
  BANDA = 'banda',
  ESTABELECIMENTO = 'estabelecimento'
}

class UserModel extends Model {
  id!: number;
  email!: string;
  senha!: string;
  nome!: string;
  telefone?: string;
  foto_perfil?: string;
  tipo_usuario!: UserType;
  ativo!: boolean;
  data_criacao!: Date;
  data_atualizacao!: Date;
  // Campos Google Calendar
  google_token_acesso?: string;
  google_token_atualizado?: string;
  google_token_expira_em?: Date;

  public async validatePassword(senha: string): Promise<boolean> {
    const incript = await bcrypt.compare(senha, this.senha);

    return incript;
  }

}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    foto_perfil: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    tipo_usuario: {
      type: DataTypes.ENUM(...Object.values(UserType)),
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    data_atualizacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    // Campos Google Calendar
    google_token_acesso: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Token de acesso do Google Calendar'
    },
    google_token_atualizado: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Token de refresh do Google Calendar'
    },
    google_token_expira_em: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: 'Data de expiração do token Google'
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao',
  }
);

export default UserModel;