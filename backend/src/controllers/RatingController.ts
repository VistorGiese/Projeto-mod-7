import { Request, Response } from "express";
import RatingModel from "../models/RatingModel";

export const createRating = async (req: Request, res: Response) => {
  try {
    const rating = await RatingModel.create(req.body);
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar avaliação", details: error });
  }
};

export const getRatings = async (_req: Request, res: Response) => {
  try {
    const ratings = await RatingModel.findAll();
    res.json(ratings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar avaliações", details: error });
  }
};

export const getRatingById = async (req: Request, res: Response) => {
  try {
    const rating = await RatingModel.findByPk(req.params.id);
    if (!rating)
      return res.status(404).json({ error: "Avaliação não encontrada" });
    res.json(rating);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar avaliação", details: error });
  }
};

export const updateRating = async (req: Request, res: Response) => {
  try {
    const rating = await RatingModel.findByPk(req.params.id);
    if (!rating)
      return res.status(404).json({ error: "Avaliação não encontrada" });
    await rating.update(req.body);
    res.json(rating);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar avaliação", details: error });
  }
};

export const deleteRating = async (req: Request, res: Response) => {
  try {
    const rating = await RatingModel.findByPk(req.params.id);
    if (!rating)
      return res.status(404).json({ error: "Avaliação não encontrada" });
    await rating.destroy();
    res.json({ message: "Avaliação removida com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover avaliação", details: error });
  }
};
