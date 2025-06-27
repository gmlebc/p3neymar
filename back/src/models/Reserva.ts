import mongoose from 'mongoose';

const ReservaSchema = new mongoose.Schema({
  nomeCliente: { type: String, required: true },
  numeroMesa: { type: Number, required: true },
  dataHora: { type: Date, required: true },
  status: { type: String, enum: ['reservado', 'ocupado', 'disponível'], default: 'reservado' },
  contatoCliente: { type: String, required: true },
});

export const Reserva = mongoose.model('Reserva', ReservaSchema);
