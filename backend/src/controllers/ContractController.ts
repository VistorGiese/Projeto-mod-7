import { Request, Response } from "express";
import ContractModel from "../models/ContractModel";

export const createContract = async (req: Request, res: Response) => {
  try {
    const contract = await ContractModel.create(req.body);
    res.status(201).json(contract);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar contrato", details: error });
  }
};

export const getContracts = async (_req: Request, res: Response) => {
  try {
    const contracts = await ContractModel.findAll();
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar contratos", details: error });
  }
};

export const getContractById = async (req: Request, res: Response) => {
  try {
    const contract = await ContractModel.findByPk(req.params.id);
    if (!contract)
      return res.status(404).json({ error: "Contrato não encontrado" });
    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar contrato", details: error });
  }
};

export const updateContract = async (req: Request, res: Response) => {
  try {
    const contract = await ContractModel.findByPk(req.params.id);
    if (!contract)
      return res.status(404).json({ error: "Contrato não encontrado" });
    await contract.update(req.body);
    res.json(contract);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar contrato", details: error });
  }
};

export const deleteContract = async (req: Request, res: Response) => {
  try {
    const contract = await ContractModel.findByPk(req.params.id);
    if (!contract)
      return res.status(404).json({ error: "Contrato não encontrado" });
    await contract.destroy();
    res.json({ message: "Contrato removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover contrato", details: error });
  }
};
