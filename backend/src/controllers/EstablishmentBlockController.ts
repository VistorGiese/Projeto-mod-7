import { Request, Response } from "express";
import { EstablishmentBlockModel } from "../models/BlockModels";

export const createBlock = async (req: Request, res: Response) => {
  try {
    // Verifica se já existe bloqueio sobreposto
    const overlaps = await EstablishmentBlockModel.findOne({
      where: {
        estabelecimento_id: req.body.estabelecimento_id,
        data_inicio: req.body.data_inicio,
        data_fim: req.body.data_fim,
      },
    });
    if (overlaps) {
      return res.status(409).json({ error: "Já existe bloqueio para este período" });
    }
    const block = await EstablishmentBlockModel.create(req.body);
    res.status(201).json(block);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar bloqueio", details: error });
  }
};

export const getBlocks = async (_req: Request, res: Response) => {
  try {
    const blocks = await EstablishmentBlockModel.findAll();
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar bloqueios", details: error });
  }
};

export const getBlockById = async (req: Request, res: Response) => {
  try {
    const block = await EstablishmentBlockModel.findByPk(req.params.id);
    if (!block)
      return res.status(404).json({ error: "Bloqueio não encontrado" });
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar bloqueio", details: error });
  }
};

export const updateBlock = async (req: Request, res: Response) => {
  try {
    const block = await EstablishmentBlockModel.findByPk(req.params.id);
    if (!block)
      return res.status(404).json({ error: "Bloqueio não encontrado" });
    await block.update(req.body);
    res.json(block);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar bloqueio", details: error });
  }
};

export const deleteBlock = async (req: Request, res: Response) => {
  try {
    const block = await EstablishmentBlockModel.findByPk(req.params.id);
    if (!block)
      return res.status(404).json({ error: "Bloqueio não encontrado" });
    await block.destroy();
    res.json({ message: "Bloqueio removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover bloqueio", details: error });
  }
};
