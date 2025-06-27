import express from 'express';
import {
  criarReserva,
  listarReservas,
  atualizarReserva,
  excluirReserva
} from '../controllers/reservaController';

const router = express.Router();

router.post('/reservas', criarReserva);
router.get('/reservas', listarReservas);
router.put('/reservas/:id', atualizarReserva);
router.delete('/reservas/:id', excluirReserva);

export default router;
