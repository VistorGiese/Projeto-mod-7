import { Request, Response } from "express";
import BandModel from "../models/BandModel";
import BandMemberModel from "../models/BandMemberModel";
import UserBandModel from '../models/UserBandModel';
import UserModel from '../models/UserModel';

export const createBand = async (req: Request, res: Response) => {
  try {
    const band = await BandModel.create(req.body);
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
    if (band.aceita_agendamentos === false) {
      return res.status(403).json({ error: "Banda não aceita agendamentos" });
    }
  // Busca os membros da banda
  const members = await BandMemberModel.findAll({ where: { banda_id: band.id } });
  res.json({ ...band.toJSON(), membros: members });
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

export const addBandManager = async (req: Request, res: Response) => {
  const { userId, bandId } = req.body;
  try {
    // Verifica se já existe vínculo
    const exists = await UserBandModel.findOne({ where: { userId, bandId } });
    if (exists) return res.status(400).json({ error: 'Usuário já é gestor desta banda' });
    await UserBandModel.create({ userId, bandId });
    return res.status(201).json({ message: 'Usuário adicionado como gestor da banda' });
  } catch (error: any) {
    return res.status(500).json({ error: 'Erro ao adicionar gestor', details: error.message });
  }
};

export const addBandMember = async (req: Request, res: Response) => {
  const { banda_id, usuario_id, funcao } = req.body;
  try {
    // Verifica se o usuário já é membro da banda
    const exists = await BandMemberModel.findOne({ where: { banda_id, usuario_id } });
    if (exists) return res.status(400).json({ error: 'Usuário já é membro desta banda' });
    // Busca o nome do usuário
    const usuario = await UserModel.findByPk(usuario_id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    // Cria membro usando o nome do usuário
    const membro = await BandMemberModel.create({
      banda_id,
      usuario_id,
      nome: usuario.nome,
      funcao,
      ativo: true,
      data_entrada: new Date()
    });
    return res.status(201).json({ message: 'Membro adicionado à banda', membro });
  } catch (error: any) {
    return res.status(500).json({ error: 'Erro ao adicionar membro', details: error.message });
  }
};
