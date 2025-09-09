import { Request, Response } from "express";
import PaymentModel from "../models/PaymentModel";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const payment = await PaymentModel.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar pagamento", details: error });
  }
};

export const getPayments = async (_req: Request, res: Response) => {
  try {
    const payments = await PaymentModel.findAll();
    res.json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar pagamentos", details: error });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await PaymentModel.findByPk(req.params.id);
    if (!payment)
      return res.status(404).json({ error: "Pagamento não encontrado" });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pagamento", details: error });
  }
};

export const updatePayment = async (req: Request, res: Response) => {
  try {
    const payment = await PaymentModel.findByPk(req.params.id);
    if (!payment)
      return res.status(404).json({ error: "Pagamento não encontrado" });
    await payment.update(req.body);
    res.json(payment);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar pagamento", details: error });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const payment = await PaymentModel.findByPk(req.params.id);
    if (!payment)
      return res.status(404).json({ error: "Pagamento não encontrado" });
    await payment.destroy();
    res.json({ message: "Pagamento removido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao remover pagamento", details: error });
  }
};
