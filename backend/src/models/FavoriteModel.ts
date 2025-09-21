import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { RatingTargetType } from './RatingModel';

class FavoriteModel extends Model {
  id!: number;
  usuario_id!: number;
  tipo_favorito!: RatingTargetType;
  favorito_id!: number;
  data_favorito!: Date;
}

FavoriteModel.init(
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
    tipo_favorito: {
      type: DataTypes.ENUM(...Object.values(RatingTargetType)),
      allowNull: false,
    },
    favorito_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data_favorito: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favoritos',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['usuario_id', 'tipo_favorito', 'favorito_id'],
        name: 'favorito_unique'
      },
    ],
  }
);

export default FavoriteModel;