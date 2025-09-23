import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import EstablishmentModel from '../models/EstablishmentModel';
import { generateToken } from '../utils/jwt';

export const loginEstablishment = async (req: Request, res: Response) => {
  try {
    const { email_responsavel, senha } = req.body;
    if (!email_responsavel || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
    const establishment = await EstablishmentModel.findOne({ where: { email_responsavel } });
    if (!establishment) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
    const senhaValida = await bcrypt.compare(senha, establishment.senha);
    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
    const token = generateToken({ id: establishment.id, email: establishment.email_responsavel });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
};
