// Busca todos os membros de uma banda específica
export const getMembersByBandId = async (req: Request, res: Response) => {
  try {
    const bandaId = req.params.banda_id;
    const members = await BandMemberModel.findAll({ where: { banda_id: bandaId } });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar membros da banda", details: error });
  }
};
import { Request, Response } from "express";
import BandMemberModel from "../models/BandMemberModel";

export const createMember = async (req: Request, res: Response) => {
  try {
    const { usuario_id, banda_id, funcao, ativo, data_entrada } = req.body;
    // Valida se o usuário existe
    const UserModel = require('../models/UserModel').default;
    const usuario = await UserModel.findByPk(usuario_id);
    if (!usuario) {
      return res.status(400).json({ error: "Usuário não existe. Crie o usuário antes de adicionar como membro de banda." });
    }
    // Usa o nome do usuário como nome do membro
    const member = await BandMemberModel.create({
      usuario_id,
      banda_id,
      nome: usuario.nome,
      funcao,
      ativo,
      data_entrada
    });
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar membro", details: error });
  }
};

export const getMembers = async (_req: Request, res: Response) => {
  try {
  const members = await BandMemberModel.findAll();
  const activeMembers = members.filter((m: any) => m.ativo);
  res.json({ all: members, ativos: activeMembers });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar membros", details: error });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const member = await BandMemberModel.findByPk(req.params.id);
    if (!member)
      return res.status(404).json({ error: "Membro não encontrado" });
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar membro", details: error });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const member = await BandMemberModel.findByPk(req.params.id);
    if (!member)
      return res.status(404).json({ error: "Membro não encontrado" });
    await member.update(req.body);
    res.json(member);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar membro", details: error });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const member = await BandMemberModel.findByPk(req.params.id);
    if (!member)
      return res.status(404).json({ error: "Membro não encontrado" });
    await member.destroy();
    res.json({ message: "Membro removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover membro", details: error });
  }
};
