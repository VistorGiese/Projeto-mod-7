import { Request, Response } from "express";
import GenreModel from "../models/GenreModel";

export const createGenre = async (req: Request, res: Response) => {
  try {
    const genre = await GenreModel.create(req.body);
    res.status(201).json(genre);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar gênero", details: error });
  }
};

export const getGenres = async (_req: Request, res: Response) => {
  try {
    const genres = await GenreModel.findAll();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar gêneros", details: error });
  }
};

export const getGenreById = async (req: Request, res: Response) => {
  try {
    const genre = await GenreModel.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ error: "Gênero não encontrado" });
    res.json(genre);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar gênero", details: error });
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const genre = await GenreModel.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ error: "Gênero não encontrado" });
    await genre.update(req.body);
    res.json(genre);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar gênero", details: error });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const genre = await GenreModel.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ error: "Gênero não encontrado" });
    await genre.destroy();
    res.json({ message: "Gênero removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover gênero", details: error });
  }
};
