import { Request, Response } from "express";
import FavoriteModel from "../models/FavoriteModel";

export const createFavorite = async (req: Request, res: Response) => {
  try {
    const favorite = await FavoriteModel.create(req.body);
    res.status(201).json(favorite);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar favorito", details: error });
  }
};

export const getFavorites = async (_req: Request, res: Response) => {
  try {
    const favorites = await FavoriteModel.findAll();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar favoritos", details: error });
  }
};

export const getFavoriteById = async (req: Request, res: Response) => {
  try {
    const favorite = await FavoriteModel.findByPk(req.params.id);
    if (!favorite)
      return res.status(404).json({ error: "Favorito não encontrado" });
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar favorito", details: error });
  }
};

export const updateFavorite = async (req: Request, res: Response) => {
  try {
    const favorite = await FavoriteModel.findByPk(req.params.id);
    if (!favorite)
      return res.status(404).json({ error: "Favorito não encontrado" });
    await favorite.update(req.body);
    res.json(favorite);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar favorito", details: error });
  }
};

export const deleteFavorite = async (req: Request, res: Response) => {
  try {
    const favorite = await FavoriteModel.findByPk(req.params.id);
    if (!favorite)
      return res.status(404).json({ error: "Favorito não encontrado" });
    await favorite.destroy();
    res.json({ message: "Favorito removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover favorito", details: error });
  }
};
