import { Request, Response } from "express";
import BookingModel, { BookingStatus } from "../models/BookingModel";
import EstablishmentScheduleModel from "../models/EstablishmentScheduleModel";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { estabelecimento_id, data_show, duracao_estimada } = req.body;
    const dataShow = new Date(data_show);
    const diaSemana = [
      "domingo",
      "segunda",
      "terca",
      "quarta",
      "quinta",
      "sexta",
      "sabado",
    ][dataShow.getDay()];

    // 1. Verifica se existe horário disponível no estabelecimento
    const horario = await EstablishmentScheduleModel.findOne({
      where: {
        estabelecimento_id,
        dia_semana: diaSemana,
        aceita_shows: true,
      },
    });
    if (!horario) {
      return res
        .status(400)
        .json({
          error:
            "Estabelecimento não possui horário disponível para agendamento nesse dia.",
        });
    }

    // 2. Verifica se o horário solicitado está dentro do intervalo permitido
    const horaInicio = dataShow.toTimeString().slice(0, 5);
    const horaFim = new Date(dataShow.getTime() + duracao_estimada * 60000)
      .toTimeString()
      .slice(0, 5);
    if (
      horaInicio < horario.horario_abertura ||
      horaFim > horario.horario_fechamento
    ) {
      return res
        .status(400)
        .json({
          error:
            "Horário solicitado está fora do horário de funcionamento do estabelecimento.",
        });
    }

    // 3. Verifica se já existe agendamento ACEITO para o mesmo horário
    const conflito = await BookingModel.findOne({
      where: {
        estabelecimento_id,
        data_show,
        status: BookingStatus.ACEITO,
      },
    });
    if (conflito) {
      return res
        .status(400)
        .json({ error: "Já existe agendamento ACEITO para este horário." });
    }

    // 4. Cria agendamento como proposta (PENDENTE)
    const booking = await BookingModel.create({
      ...req.body,
      status: BookingStatus.PENDENTE,
    });
    // Buscar nomes relacionados
    const BandModel = require('../models/BandModel').default;
    const EstablishmentModel = require('../models/EstablishmentModel').default;
    const UserModel = require('../models/UserModel').default;
    const banda = await BandModel.findByPk(booking.banda_id);
    const estabelecimento = await EstablishmentModel.findByPk(booking.estabelecimento_id);
    const usuario = await UserModel.findByPk(booking.usuario_solicitante_id);
    res.status(201).json({
      ...booking.toJSON(),
      banda_nome: banda ? banda.nome : null,
      estabelecimento_nome: estabelecimento ? estabelecimento.nome_dono : null,
      usuario_solicitante_nome: usuario ? usuario.nome : null,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao criar agendamento", details: error });
  }
};

export const getBookings = async (_req: Request, res: Response) => {
  try {
    const bookings = await BookingModel.findAll();
    // Buscar nomes relacionados
    const BandModel = require('../models/BandModel').default;
    const EstablishmentModel = require('../models/EstablishmentModel').default;
    const UserModel = require('../models/UserModel').default;
    const bookingsWithNames = await Promise.all(bookings.map(async (booking: any) => {
      const banda = await BandModel.findByPk(booking.banda_id);
      const estabelecimento = await EstablishmentModel.findByPk(booking.estabelecimento_id);
      const usuario = await UserModel.findByPk(booking.usuario_solicitante_id);
      return {
        ...booking.toJSON(),
        banda_nome: banda ? banda.nome : null,
        estabelecimento_nome: estabelecimento ? estabelecimento.nome_dono : null,
        usuario_solicitante_nome: usuario ? usuario.nome : null,
      };
    }));
    res.json(bookingsWithNames);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar agendamentos", details: error });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await BookingModel.findByPk(req.params.id);
    if (!booking)
      return res.status(404).json({ error: "Agendamento não encontrado" });
    // Buscar nomes relacionados
    const BandModel = require('../models/BandModel').default;
    const EstablishmentModel = require('../models/EstablishmentModel').default;
    const UserModel = require('../models/UserModel').default;
    const banda = await BandModel.findByPk(booking.banda_id);
    const estabelecimento = await EstablishmentModel.findByPk(booking.estabelecimento_id);
    const usuario = await UserModel.findByPk(booking.usuario_solicitante_id);
    res.json({
      ...booking.toJSON(),
      banda_nome: banda ? banda.nome : null,
      estabelecimento_nome: estabelecimento ? estabelecimento.nome_dono : null,
      usuario_solicitante_nome: usuario ? usuario.nome : null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar agendamento", details: error });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const booking = await BookingModel.findByPk(req.params.id);
    if (!booking)
      return res.status(404).json({ error: "Agendamento não encontrado" });

    // Se o status está sendo alterado para ACEITO, bloquear horário para outros agendamentos
    if (req.body.status === BookingStatus.ACEITO) {
      // Verifica se já existe outro ACEITO para o mesmo horário
      const conflito = await BookingModel.findOne({
        where: {
          estabelecimento_id: booking.estabelecimento_id,
          data_show: booking.data_show,
          status: BookingStatus.ACEITO,
          id: { $ne: booking.id },
        },
      });
      if (conflito) {
        return res
          .status(400)
          .json({ error: "Já existe agendamento ACEITO para este horário." });
      }
      // Atualiza status e valor_final
      await booking.update({
        ...req.body,
        status: BookingStatus.ACEITO,
        valor_final: req.body.valor_final,
      });
      return res.json(booking);
    }
    // Atualização normal
    await booking.update(req.body);
    res.json(booking);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar agendamento", details: error });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const booking = await BookingModel.findByPk(req.params.id);
    if (!booking)
      return res.status(404).json({ error: "Agendamento não encontrado" });
    await booking.destroy();
    res.json({ message: "Agendamento removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover agendamento", details: error });
  }
};
