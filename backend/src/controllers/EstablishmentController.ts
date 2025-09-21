import { Request, Response } from "express";
import EstablishmentModel from "../models/EstablishmentModel";
import UserEstablishmentModel from '../models/UserEstablishmentModel';

export const createEstablishment = async (req: Request, res: Response) => {
  try {
    const { usuario_id, nome_dono, ...rest } = req.body;
    // Valida se o usuário existe
    const UserModel = require('../models/UserModel').default;
    const usuario = await UserModel.findByPk(usuario_id);
    if (!usuario) {
      return res.status(400).json({ error: "Usuário não existe. Crie o usuário antes de criar o estabelecimento." });
    }
    // Usa o nome do usuário como nome do dono do estabelecimento
    const establishment = await EstablishmentModel.create({
      usuario_id,
      nome_dono: usuario.nome,
      ...rest
    });
    res.status(201).json(establishment);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao criar estabelecimento", details: error });
  }
};

export const getEstablishments = async (_req: Request, res: Response) => {
  try {
    const establishments = await EstablishmentModel.findAll();
    res.json(establishments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar estabelecimentos", details: error });
  }
};

export const getEstablishmentById = async (req: Request, res: Response) => {
  try {
    const establishment = await EstablishmentModel.findByPk(req.params.id);
    if (!establishment)
      return res.status(404).json({ error: "Estabelecimento não encontrado" });
    if (establishment.aceita_agendamentos === false) {
      return res.status(403).json({ error: "Estabelecimento não aceita agendamentos" });
    }
    // Busca o endereço completo
    const AddressModel = require('../models/AddressModel').default;
    const endereco = await AddressModel.findByPk(establishment.endereco_id);
    res.json({ ...establishment.toJSON(), endereco });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar estabelecimento", details: error });
  }
};

export const updateEstablishment = async (req: Request, res: Response) => {
  try {
    const establishment = await EstablishmentModel.findByPk(req.params.id);
    if (!establishment)
      return res.status(404).json({ error: "Estabelecimento não encontrado" });
    await establishment.update(req.body);
    res.json(establishment);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar estabelecimento", details: error });
  }
};

export const deleteEstablishment = async (req: Request, res: Response) => {
  try {
    const establishment = await EstablishmentModel.findByPk(req.params.id);
    if (!establishment)
      return res.status(404).json({ error: "Estabelecimento não encontrado" });
    await establishment.destroy();
    res.json({ message: "Estabelecimento removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover estabelecimento", details: error });
  }
};

export const addEstablishmentManager = async (req: Request, res: Response) => {
  const { usuario_id, estabelecimento_id } = req.body;
  try {
    // Verifica se já existe vínculo
    const exists = await UserEstablishmentModel.findOne({ where: { usuario_id, estabelecimento_id } });
    if (exists) return res.status(400).json({ error: 'Usuário já é gestor deste estabelecimento' });
    await UserEstablishmentModel.create({ usuario_id, estabelecimento_id });
    return res.status(201).json({ message: 'Usuário adicionado como gestor do estabelecimento' });
  } catch (error: any) {
    return res.status(500).json({ error: 'Erro ao adicionar gestor', details: error.message });
  }
};
