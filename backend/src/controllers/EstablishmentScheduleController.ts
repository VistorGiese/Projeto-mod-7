import { Request, Response } from "express";
import EstablishmentScheduleModel from "../models/EstablishmentScheduleModel";

export const createSchedule = async (req: Request, res: Response) => {
  try {
    // Verifica se já existe horário para o mesmo estabelecimento e dia
    const exists = await EstablishmentScheduleModel.findOne({
      where: {
        estabelecimento_id: req.body.estabelecimento_id,
        dia_semana: req.body.dia_semana,
      },
    });
    if (exists) {
      return res.status(409).json({ error: "Já existe horário para este dia neste estabelecimento" });
    }
    const schedule = await EstablishmentScheduleModel.create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar horário", details: error });
  }
};

export const getSchedules = async (_req: Request, res: Response) => {
  try {
    const schedules = await EstablishmentScheduleModel.findAll();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar horários", details: error });
  }
};

export const getScheduleById = async (req: Request, res: Response) => {
  try {
    const schedule = await EstablishmentScheduleModel.findByPk(req.params.id);
    if (!schedule)
      return res.status(404).json({ error: "Horário não encontrado" });
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar horário", details: error });
  }
};

export const updateSchedule = async (req: Request, res: Response) => {
  try {
    const schedule = await EstablishmentScheduleModel.findByPk(req.params.id);
    if (!schedule)
      return res.status(404).json({ error: "Horário não encontrado" });
    await schedule.update(req.body);
    res.json(schedule);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar horário", details: error });
  }
};

export const deleteSchedule = async (req: Request, res: Response) => {
  try {
    const schedule = await EstablishmentScheduleModel.findByPk(req.params.id);
    if (!schedule)
      return res.status(404).json({ error: "Horário não encontrado" });
    await schedule.destroy();
    res.json({ message: "Horário removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover horário", details: error });
  }
};

export const getSchedulesByEstablishment = async (req: Request, res: Response) => {
  try {
    const estabelecimento_id = parseInt(req.params.id);
    const schedules = await EstablishmentScheduleModel.findAll({
      where: { estabelecimento_id },
      order: [['dia_semana', 'ASC']]
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar horários do estabelecimento", details: error });
  }
};
