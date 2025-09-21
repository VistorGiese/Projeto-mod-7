import { Request, Response } from "express";
import CommentModel from "../models/CommentModel";

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = await CommentModel.create(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar comentário", details: error });
  }
};

export const getComments = async (_req: Request, res: Response) => {
  try {
    const comments = await CommentModel.findAll();
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar comentários", details: error });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const comment = await CommentModel.findByPk(req.params.id);
    if (!comment)
      return res.status(404).json({ error: "Comentário não encontrado" });
    res.json(comment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar comentário", details: error });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const comment = await CommentModel.findByPk(req.params.id);
    if (!comment)
      return res.status(404).json({ error: "Comentário não encontrado" });
    await comment.update(req.body);
    res.json(comment);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar comentário", details: error });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await CommentModel.findByPk(req.params.id);
    if (!comment)
      return res.status(404).json({ error: "Comentário não encontrado" });
    await comment.destroy();
    res.json({ message: "Comentário removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover comentário", details: error });
  }
};
