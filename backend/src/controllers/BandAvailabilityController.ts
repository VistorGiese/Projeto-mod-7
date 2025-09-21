import { Request, Response } from "express";
import BandAvailabilityModel from "../models/BandAvailabilityModel";

export const createAvailability = async (req: Request, res: Response) => {
  try {
    // Verifica se já existe disponibilidade sobreposta
    const overlaps = await BandAvailabilityModel.findOne({
      where: {
        banda_id: req.body.banda_id,
        data_inicio: req.body.data_inicio,
        data_fim: req.body.data_fim,
      },
    });
    if (overlaps) {
      return res.status(409).json({ error: "Já existe disponibilidade para este período" });
    }
    const availability = await BandAvailabilityModel.create(req.body);
    res.status(201).json(availability);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao criar disponibilidade", details: error });
  }
};

export const getAvailabilities = async (_req: Request, res: Response) => {
  try {
    const availabilities = await BandAvailabilityModel.findAll();
    res.json(availabilities);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar disponibilidades", details: error });
  }
};

export const getAvailabilityById = async (req: Request, res: Response) => {
  try {
    const availability = await BandAvailabilityModel.findByPk(req.params.id);
    if (!availability)
      return res.status(404).json({ error: "Disponibilidade não encontrada" });
    res.json(availability);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar disponibilidade", details: error });
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const availability = await BandAvailabilityModel.findByPk(req.params.id);
    if (!availability)
      return res.status(404).json({ error: "Disponibilidade não encontrada" });
    await availability.update(req.body);
    res.json(availability);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar disponibilidade", details: error });
  }
};

export const deleteAvailability = async (req: Request, res: Response) => {
  try {
    const availability = await BandAvailabilityModel.findByPk(req.params.id);
    if (!availability)
      return res.status(404).json({ error: "Disponibilidade não encontrada" });
    await availability.destroy();
    res.json({ message: "Disponibilidade removida com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover disponibilidade", details: error });
  }
};
