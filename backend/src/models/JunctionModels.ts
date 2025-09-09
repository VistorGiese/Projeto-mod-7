import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';


// Gêneros das Bandas
class BandGenreModel extends Model {
  id!: number;
  banda_id!: number;
  genero_id!: number;
}

BandGenreModel.init(
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
    genero_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'generos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'BandGenre',
    tableName: 'bandas_generos',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['banda_id', 'genero_id'],
        name: 'banda_genero_unique'
      }
    ],
  }
);

// Gêneros dos Estabelecimentos
class EstablishmentGenreModel extends Model {
  id!: number;
  estabelecimento_id!: number;
  genero_id!: number;
}

EstablishmentGenreModel.init(
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
    genero_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'generos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'EstablishmentGenre',
    tableName: 'estabelecimentos_generos',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['estabelecimento_id', 'genero_id'],
        name: 'estab_genero_unique'
      }
    ],
  }
);

// Instrumentos das Bandas
class BandInstrumentModel extends Model {
  id!: number;
  banda_id!: number;
  instrumento_id!: number;
  quantidade!: number;
}

BandInstrumentModel.init(
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
    instrumento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'instrumentos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    quantidade: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
  },
  {
    sequelize,
    modelName: 'BandInstrument',
    tableName: 'bandas_inst',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['banda_id', 'instrumento_id'],
        name: 'banda_instr_unique'
      }
    ],
  }
);

// Instrumentos dos Estabelecimentos
export enum InstrumentCondition {
  NOVO = 'novo',
  BOM = 'bom',
  REGULAR = 'regular',
  RUIM = 'ruim'
}

class EstablishmentInstrumentModel extends Model {
  id!: number;
  estabelecimento_id!: number;
  instrumento_id!: number;
  quantidade!: number;
  estado_conservacao!: InstrumentCondition;
}

EstablishmentInstrumentModel.init(
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
    instrumento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'instrumentos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    quantidade: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
    estado_conservacao: {
      type: DataTypes.ENUM(...Object.values(InstrumentCondition)),
      defaultValue: InstrumentCondition.BOM,
    },
  },
  {
    sequelize,
    modelName: 'EstablishmentInstrument',
    tableName: 'estab_instrumentos',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['estabelecimento_id', 'instrumento_id'],
        name: 'estab_instr_unique'
      }
    ],
  }
);

export {
  BandGenreModel,
  EstablishmentGenreModel,
  BandInstrumentModel,
  EstablishmentInstrumentModel,
};