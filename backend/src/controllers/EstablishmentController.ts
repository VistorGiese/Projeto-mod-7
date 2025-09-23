import { Request, Response } from "express";

import EstablishmentModel from "../models/EstablishmentModel";
import AddressModel from '../models/AddressModel';
import { validateEmailFormat, validatePhoneFormat, validatePasswordFormat } from "../services/userValidationServices";

export const createEstablishment = async (req: Request, res: Response) => {
  try {
    const {
      nome_estabelecimento,
      nome_dono,
      email_responsavel,
      celular_responsavel,
      generos_musicais,
      horario_funcionamento_inicio,
      horario_funcionamento_fim,
      endereco_id,
      senha
    } = req.body;

    if (!nome_estabelecimento || !nome_dono || !email_responsavel || !celular_responsavel || !generos_musicais || !horario_funcionamento_inicio || !horario_funcionamento_fim || !endereco_id || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos obrigatórios, incluindo o endereco_id e senha." });
    }

    // Validação de formato de email
    const emailError = validateEmailFormat(email_responsavel);
    if (emailError) {
      return res.status(400).json({ error: emailError });
    }

    // Validação de formato de celular
    const phoneError = validatePhoneFormat(celular_responsavel);
    if (phoneError) {
      return res.status(400).json({ error: phoneError });
    }

    const senhaError = validatePasswordFormat(senha);
    if (senhaError) {
      return res.status(400).json({ error: senhaError });
    }

    const endereco = await AddressModel.findByPk(endereco_id);
    if (!endereco) {
      return res.status(400).json({ error: "Endereço não encontrado." });
    }


    const existingEstablishment = await EstablishmentModel.findOne({ where: { endereco_id } });
    if (existingEstablishment) {
      return res.status(400).json({ error: "Já existe um estabelecimento cadastrado com este endereço." });
    }

    const existingByCelular = await EstablishmentModel.findOne({ where: { celular_responsavel } });
    if (existingByCelular) {
      return res.status(400).json({ error: "Já existe um estabelecimento cadastrado com este celular." });
    }

    const existingByEmail = await EstablishmentModel.findOne({ where: { email_responsavel } });
    if (existingByEmail) {
      return res.status(400).json({ error: "Já existe um estabelecimento cadastrado com este e-mail." });
    }

    const bcrypt = require('bcryptjs');
    const senhaHash = await bcrypt.hash(senha, 10);
    const establishment = await EstablishmentModel.create({
      nome_estabelecimento,
      nome_dono,
      email_responsavel,
      celular_responsavel,
      generos_musicais,
      horario_funcionamento_inicio,
      horario_funcionamento_fim,
      endereco_id,
      senha: senhaHash
    });
    res.status(201).json({
      nome_estabelecimento,
      nome_dono,
      email_responsavel,
      celular_responsavel,
      generos_musicais,
      horario_funcionamento_inicio,
      horario_funcionamento_fim,
      endereco_id
    });
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar estabelecimento", details: error });
  }
};

export const getEstablishments = async (_req: Request, res: Response) => {
  try {
    const establishments = await EstablishmentModel.findAll({
      attributes: [
        "id",
        "nome_estabelecimento",
        "nome_dono",
        "email_responsavel",
        "celular_responsavel",
        "generos_musicais",
        "horario_funcionamento_inicio",
        "horario_funcionamento_fim",
        "endereco_id"
      ]
    });
    res.json(establishments);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar estabelecimentos", details: error });
  }
};


export const getEstablishmentById = async (req: Request, res: Response) => {
  try {
    const establishment = await EstablishmentModel.findByPk(req.params.id);
    if (!establishment)
      return res.status(404).json({ error: "Estabelecimento não encontrado" });
    const endereco = await AddressModel.findByPk(establishment.endereco_id);
    res.json({ ...establishment.toJSON(), endereco });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar estabelecimento", details: error });
  }
};

export const updateEstablishment = async (req: Request, res: Response) => {
  try {
    const establishment = await EstablishmentModel.findByPk(req.params.id);
    if (!establishment)
      return res.status(404).json({ error: "Estabelecimento não encontrado" });

    const {
      email_responsavel,
      celular_responsavel,
      senha
    } = req.body;

    // Validação de email se enviado
    if (email_responsavel) {
      const emailError = validateEmailFormat(email_responsavel);
      if (emailError) {
        return res.status(400).json({ error: emailError });
      }
    }

    // Validação de celular se enviado
    if (celular_responsavel) {
      const phoneError = validatePhoneFormat(celular_responsavel);
      if (phoneError) {
        return res.status(400).json({ error: phoneError });
      }
    }

    if (senha) {
      const senhaError = validatePasswordFormat(senha);
      if (senhaError) {
        return res.status(400).json({ error: senhaError });
      }
      const bcrypt = require('bcryptjs');
      req.body.senha = await bcrypt.hash(senha, 10);
    }

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
