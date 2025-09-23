import { Request, Response } from "express";

import BandModel from "../models/BandModel";

export const createBand = async (req: Request, res: Response) => {
  try {
    const { nome_banda, descricao, imagem, data_criacao } = req.body;
    const band = await BandModel.create({ nome_banda, descricao, imagem, data_criacao });
    res.status(201).json(band);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar banda", details: error });
  }
};

export const getBands = async (_req: Request, res: Response) => {
  try {
    const bands = await BandModel.findAll();
    res.json(bands);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar bandas", details: error });
  }
};

export const getBandById = async (req: Request, res: Response) => {
  try {
    const band = await BandModel.findByPk(req.params.id);
    if (!band) return res.status(404).json({ error: "Banda não encontrada" });
    res.json(band);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar banda", details: error });
  }
};

export const updateBand = async (req: Request, res: Response) => {
  try {
    const band = await BandModel.findByPk(req.params.id);
    if (!band) return res.status(404).json({ error: "Banda não encontrada" });
    await band.update(req.body);
    res.json(band);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar banda", details: error });
  }
};

export const deleteBand = async (req: Request, res: Response) => {
  try {
    const band = await BandModel.findByPk(req.params.id);
    if (!band) return res.status(404).json({ error: "Banda não encontrada" });
    await band.destroy();
    res.json({ message: "Banda removida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover banda", details: error });
  }
};
