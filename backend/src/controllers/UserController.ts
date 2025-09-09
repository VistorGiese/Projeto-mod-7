import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import { error } from "console";
import {
    validateUserData,
    hashPassword,
    updateUserData,
  } from "../services/userValidationServices";
import bcrypt from "bcrypt";
import { AuthRequest } from "../middleware/authmiddleware";
import { Op } from "sequelize";
import BandModel from '../models/BandModel';
import EstablishmentModel from '../models/EstablishmentModel';
import UserBandModel from '../models/UserBandModel';
import UserEstablishmentModel from '../models/UserEstablishmentModel';

export const getAll = async (req: Request, res: Response) => {
    const users = await UserModel.findAll();
    res.send(users);
  };
  
  export const listUsers = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1; // pagina atual
      const limit = parseInt(req.query.limit as string) || 5; // total pag
      const offset = (page - 1) * limit;
  
      const { count, rows } = await UserModel.findAndCountAll({
        limit,
        offset,
        order: [["name", "ASC"]], // ordena
      });
  
      return res.status(200).json({
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        data: rows,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: "Erro ao listar usuários", details: error.message });
    }
  };
  
  export const getUserById = async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    const user = await UserModel.findByPk(req.params.id);
    return res.json(user);
  };
  
  export const CreateUser = async (req: Request, res: Response) => {
    try {
      const { nome, email, senha,  telefone, tipo_usuario } = req.body;
  
      // Verifica se o email ou CPF já existem
      const existingUser = await UserModel.findOne({
        where: {
          [Op.or]: [{ email }],
        },
      });
  
      if (existingUser) {
        const field = existingUser.email === email ? "Email" : "CPF";
        return res.status(400).json({ error: `${field} já cadastrado.` });
      }
  
      const hashedPassword = await hashPassword(senha);
  
      const user = await UserModel.create({
        nome,
        email,
        senha: hashedPassword,
        telefone,
        tipo_usuario
      });
  
      return res.status(201).json({
        id: user.id,
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        tipo: user.tipo_usuario,
      });
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      return res
        .status(500)
        .json({ error: "Erro interno no servidor", details: error.message });
    }
  };
  
  export const updaterUser = async (req: AuthRequest, res: Response) => {
    try {
      const { nome, password, address } = req.body;

      if (!req.user) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const userIdFromToken = req.user.id_user;
      const userIdFromParams = parseInt(req.params.id);

      if (userIdFromToken !== userIdFromParams) {
        return res.status(403).json({
          error: "Você não tem permissão para alterar os dados de outro usuário.",
        });
      }

      const user = await UserModel.findByPk(userIdFromToken);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      if (nome !== undefined) {
        if (typeof nome !== "string" || nome.trim().length === 0) {
          return res.status(400).json({ error: "Escreva um nome válido" });
        }
        user.nome = nome;
      }

      if (password !== undefined) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.senha = hashedPassword;
      }

      await user.save();

      return res.status(200).json(user);
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: "Erro no servidor", details: error.message });
    }
  };
  
  export const DestroyUserById = async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    try {
      const user = await UserModel.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "Usuario não encontrado" });
      }
  
      await user.destroy();
  
      res.status(204).send();
    } catch (error) {
      res.status(500).json("erro interno do servidor" + error);
    }
  };

  export const switchProfile = async (req: Request, res: Response) => {
    const { userId, tipo, perfilId } = req.body; // tipo: 'comum', 'banda', 'estabelecimento'
    try {
      const user = await UserModel.findByPk(userId);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      if (tipo === 'comum') {
        // Perfil pessoa física
        return res.json({ perfil: 'comum', user });
      }
      if (tipo === 'banda') {
        const vinculo = await UserBandModel.findOne({ where: { userId, bandId: perfilId } });
        if (!vinculo) return res.status(403).json({ error: 'Usuário não é gestor desta banda' });
        const banda = await BandModel.findByPk(perfilId);
        return res.json({ perfil: 'banda', banda });
      }
      if (tipo === 'estabelecimento') {
        const vinculo = await UserEstablishmentModel.findOne({ where: { userId, establishmentId: perfilId } });
        if (!vinculo) return res.status(403).json({ error: 'Usuário não é gestor deste estabelecimento' });
        const estabelecimento = await EstablishmentModel.findByPk(perfilId);
        return res.json({ perfil: 'estabelecimento', estabelecimento });
      }
      return res.status(400).json({ error: 'Tipo de perfil inválido' });
    } catch (error: any) {
      return res.status(500).json({ error: 'Erro ao alternar perfil', details: error.message });
    }
  };

