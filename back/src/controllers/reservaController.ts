import { Request, Response } from 'express';
import { Reserva } from '../models/Reserva';

// Criar reserva
export const criarReserva = async (req: Request, res: Response) => {
  try {
    const novaReserva = await Reserva.create(req.body);
    res.status(201).json(novaReserva);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar reserva' });
  }
};

// Listar reservas
export const listarReservas = async (req: Request, res: Response) => {
  const { cliente, mesa } = req.query;
  try {
    const filtro: any = {};
    if (cliente) filtro.nomeCliente = cliente;
    if (mesa) filtro.numeroMesa = mesa;
    const reservas = await Reserva.find(filtro);
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar reservas' });
  }
};

// Atualizar reserva
export const atualizarReserva = async (req: Request, res: Response) => {
  try {
    const reservaAtualizada = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(reservaAtualizada);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar reserva' });
  }
};

// Excluir reserva
export const excluirReserva = async (req: Request, res: Response) => {
  try {
    await Reserva.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Reserva excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir reserva' });
  }
};
