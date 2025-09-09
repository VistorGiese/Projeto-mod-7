import { Request, Response } from "express";
import InstrumentModel from "../models/InstrumentModel";

export const createInstrument = async (req: Request, res: Response) => {
  try {
    const instrument = await InstrumentModel.create(req.body);
    res.status(201).json(instrument);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao criar instrumento", details: error });
  }
};

export const getInstruments = async (_req: Request, res: Response) => {
  try {
    const instruments = await InstrumentModel.findAll();
    res.json(instruments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar instrumentos", details: error });
  }
};

export const getInstrumentById = async (req: Request, res: Response) => {
  try {
    const instrument = await InstrumentModel.findByPk(req.params.id);
    if (!instrument)
      return res.status(404).json({ error: "Instrumento não encontrado" });
    res.json(instrument);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar instrumento", details: error });
  }
};

export const updateInstrument = async (req: Request, res: Response) => {
  try {
    const instrument = await InstrumentModel.findByPk(req.params.id);
    if (!instrument)
      return res.status(404).json({ error: "Instrumento não encontrado" });
    await instrument.update(req.body);
    res.json(instrument);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar instrumento", details: error });
  }
};

export const deleteInstrument = async (req: Request, res: Response) => {
  try {
    const instrument = await InstrumentModel.findByPk(req.params.id);
    if (!instrument)
      return res.status(404).json({ error: "Instrumento não encontrado" });
    await instrument.destroy();
    res.json({ message: "Instrumento removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover instrumento", details: error });
  }
};
