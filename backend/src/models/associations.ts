import UserModel from './UserModel';
import AddressModel from './AddressModel';
import GenreModel from './GenreModel';
import InstrumentModel from './InstrumentModel';
import EstablishmentModel from './EstablishmentModel';
import BandModel from './BandModel';
import CommonUserModel from './CommonUserModel';
import EstablishmentScheduleModel from './EstablishmentScheduleModel';
import BandAvailabilityModel from './BandAvailabilityModel';
import { BandBlockModel, EstablishmentBlockModel } from './BlockModels';
import BookingModel from './BookingModel';
import ContractModel from './ContractModel';
import PaymentModel from './PaymentModel';
import BandMemberModel from './BandMemberModel';
import RatingModel from './RatingModel';
import CommentModel from './CommentModel';
import FavoriteModel from './FavoriteModel';
import {
  BandGenreModel,
  EstablishmentGenreModel,
  BandInstrumentModel,
  EstablishmentInstrumentModel,
} from './JunctionModels';
import {
  CompletedShowModel,
  TicketModel,
  BookingHistoryModel,
  CounterProposalModel,
} from './ComplementaryModels';

export function setupAssociations() {
  //  RELACIONAMENTOS PRINCIPAIS 
  

  UserModel.hasOne(BandModel, {
    foreignKey: 'usuario_id',
    as: 'banda',
  });
  BandModel.belongsTo(UserModel, {
    foreignKey: 'usuario_id',
    as: 'usuario',
  });

  UserModel.hasOne(EstablishmentModel, {
    foreignKey: 'usuario_id',
    as: 'estabelecimento',
  });
  EstablishmentModel.belongsTo(UserModel, {
    foreignKey: 'usuario_id',
    as: 'usuario',
  });

  UserModel.hasOne(CommonUserModel, {
    foreignKey: 'usuario_id',
    as: 'usuarioComum',
  });
  CommonUserModel.belongsTo(UserModel, {
    foreignKey: 'usuario_id',
    as: 'usuario',
  });

  EstablishmentModel.belongsTo(AddressModel, {
    foreignKey: 'endereco_id',
    as: 'endereco',
  });
  AddressModel.hasMany(EstablishmentModel, {
    foreignKey: 'endereco_id',
    as: 'estabelecimentos',
  });

  CommonUserModel.belongsTo(AddressModel, {
    foreignKey: 'endereco_id',
    as: 'endereco',
  });
  AddressModel.hasMany(CommonUserModel, {
    foreignKey: 'endereco_id',
    as: 'usuariosComuns',
  });

  //  RELACIONAMENTOS DE AGENDAMENTO 
  
  BookingModel.belongsTo(BandModel, {
    foreignKey: 'banda_id',
    as: 'banda',
  });
  BandModel.hasMany(BookingModel, {
    foreignKey: 'banda_id',
    as: 'agendamentos'
  });

  BookingModel.belongsTo(EstablishmentModel, {
    foreignKey: 'estabelecimento_id',
    as: 'estabelecimento',
  });
  EstablishmentModel.hasMany(BookingModel, {
    foreignKey: 'estabelecimento_id',
    as: 'agendamentos',
  });

  BookingModel.belongsTo(UserModel, {
    foreignKey: 'usuario_solicitante_id',
    as: 'solicitante',
  });
  UserModel.hasMany(BookingModel, {
    foreignKey: 'usuario_solicitante_id',
    as: 'solicitacoes',
  });

  //  RELACIONAMENTOS DE CONTRATO E PAGAMENTO 
  
  BookingModel.hasOne(ContractModel, {
    foreignKey: 'agendamento_id',
    as: 'contrato',
  });
  ContractModel.belongsTo(BookingModel, {
    foreignKey: 'agendamento_id',
    as: 'agendamento',
  });

  PaymentModel.belongsTo(ContractModel, {
    foreignKey: 'contrato_id',
    as: 'contrato',
  });
  ContractModel.hasMany(PaymentModel, {
    foreignKey: 'contrato_id',
    as: 'pagamentos',
  });

  //  RELACIONAMENTOS DE DISPONIBILIDADE 
  

  BandAvailabilityModel.belongsTo(BandModel, {
    foreignKey: 'banda_id',
    as: 'banda',
  });
  BandModel.hasMany(BandAvailabilityModel, {
    foreignKey: 'banda_id',
    as: 'disponibilidades',
  });

  BandBlockModel.belongsTo(BandModel, {
    foreignKey: 'banda_id',
    as: 'banda',
  });
  BandModel.hasMany(BandBlockModel, {
    foreignKey: 'banda_id',
    as: 'bloqueios',
  });

  EstablishmentBlockModel.belongsTo(EstablishmentModel, {
    foreignKey: 'estabelecimento_id',
    as: 'estabelecimento',
  });
  EstablishmentModel.hasMany(EstablishmentBlockModel, {
    foreignKey: 'estabelecimento_id',
    as: 'bloqueios',
  });

  EstablishmentScheduleModel.belongsTo(EstablishmentModel, {
    foreignKey: 'estabelecimento_id',
    as: 'estabelecimento',
  });
  EstablishmentModel.hasMany(EstablishmentScheduleModel, {
    foreignKey: 'estabelecimento_id',
    as: 'horarios',
  });

  //  RELACIONAMENTOS MUITOS-PARA-MUITOS 
  
  BandModel.belongsToMany(GenreModel, {
    through: BandGenreModel,
    foreignKey: 'banda_id',
    otherKey: 'genero_id',
    as: 'generos',
  });
  GenreModel.belongsToMany(BandModel, {
    through: BandGenreModel,
    foreignKey: 'genero_id',
    otherKey: 'banda_id',
    as: 'bandas',
  });

  EstablishmentModel.belongsToMany(GenreModel, {
    through: EstablishmentGenreModel,
    foreignKey: 'estabelecimento_id',
    otherKey: 'genero_id',
    as: 'generos',
  });
  GenreModel.belongsToMany(EstablishmentModel, {
    through: EstablishmentGenreModel,
    foreignKey: 'genero_id',
    otherKey: 'estabelecimento_id',
    as: 'estabelecimentos',
  });

  BandModel.belongsToMany(InstrumentModel, {
    through: BandInstrumentModel,
    foreignKey: 'banda_id',
    otherKey: 'instrumento_id',
    as: 'instrumentos',
  });
  InstrumentModel.belongsToMany(BandModel, {
    through: BandInstrumentModel,
    foreignKey: 'instrumento_id',
    otherKey: 'banda_id',
    as: 'bandas',
  });

  EstablishmentModel.belongsToMany(InstrumentModel, {
    through: EstablishmentInstrumentModel,
    foreignKey: 'estabelecimento_id',
    otherKey: 'instrumento_id',
    as: 'instrumentos',
  });
  InstrumentModel.belongsToMany(EstablishmentModel, {
    through: EstablishmentInstrumentModel,
    foreignKey: 'instrumento_id',
    otherKey: 'estabelecimento_id',
    as: 'estabelecimentos',
  });

  //  RELACIONAMENTOS DE MEMBROS 
  
  BandMemberModel.belongsTo(BandModel, {
    foreignKey: 'banda_id',
    as: 'banda',
  });
  BandModel.hasMany(BandMemberModel, {
    foreignKey: 'banda_id',
    as: 'integrantes',
  });

  //  RELACIONAMENTOS DE AVALIAÇÃO E COMENTÁRIOS 
  
  RatingModel.belongsTo(UserModel, {
    foreignKey: 'usuario_id',
    as: 'usuario',
  });
  UserModel.hasMany(RatingModel, {
    foreignKey: 'usuario_id',
    as: 'avaliacoes',
  });


  RatingModel.belongsTo(BookingModel, {
    foreignKey: 'agendamento_id',
    as: 'agendamento',
  });
  BookingModel.hasMany(RatingModel, {
    foreignKey: 'agendamento_id',
    as: 'avaliacoes',
  });

  CommentModel.belongsTo(UserModel, {
    foreignKey: 'usuario_id',
    as: 'usuario',
  });
  UserModel.hasMany(CommentModel, {
    foreignKey: 'usuario_id',
    as: 'comentarios',
  });

  CommentModel.belongsTo(BookingModel, {
    foreignKey: 'agendamento_id',
    as: 'agendamento',
  });
  BookingModel.hasMany(CommentModel, {
    foreignKey: 'agendamento_id',
    as: 'comentarios',
  });

  //  RELACIONAMENTOS DE FAVORITOS 
  

  FavoriteModel.belongsTo(UserModel, {
    foreignKey: 'usuario_id',
    as: 'usuario',
  });
  UserModel.hasMany(FavoriteModel, {
    foreignKey: 'usuario_id',
    as: 'favoritos',
  });

  //  RELACIONAMENTOS COMPLEMENTARES 

  BookingModel.hasOne(CompletedShowModel, {
    foreignKey: 'agendamento_id',
    as: 'showRealizado',
  });
  CompletedShowModel.belongsTo(BookingModel, {
    foreignKey: 'agendamento_id',
    as: 'agendamento',
  });


  TicketModel.belongsTo(BookingModel, {
    foreignKey: 'agendamento_id',
    as: 'agendamento',
  });
  BookingModel.hasMany(TicketModel, {
    foreignKey: 'agendamento_id',
    as: 'ingressos',
  });

  TicketModel.belongsTo(UserModel, {
    foreignKey: 'usuario_id',
    as: 'usuario',
  });
  UserModel.hasMany(TicketModel, {
    foreignKey: 'usuario_id',
    as: 'ingressos',
  });

  BookingHistoryModel.belongsTo(BookingModel, {
    foreignKey: 'agendamento_id',
    as: 'agendamento',
  });
  BookingModel.hasMany(BookingHistoryModel, {
    foreignKey: 'agendamento_id',
    as: 'historico',
  });

  BookingHistoryModel.belongsTo(UserModel, {
    foreignKey: 'usuario_id',
    as: 'usuario',
  });
  UserModel.hasMany(BookingHistoryModel, {
    foreignKey: 'usuario_id',
    as: 'alteracoesAgendamentos',
  });

  CounterProposalModel.belongsTo(BookingModel, {
    foreignKey: 'agendamento_id',
    as: 'agendamento',
  });
  BookingModel.hasMany(CounterProposalModel, {
    foreignKey: 'agendamento_id',
    as: 'contrapropostas',
  });

  CounterProposalModel.belongsTo(UserModel, {
    foreignKey: 'usuario_id',
    as: 'usuario',
  });
  UserModel.hasMany(CounterProposalModel, {
    foreignKey: 'usuario_id',
    as: 'contrapropostas',
  });
}