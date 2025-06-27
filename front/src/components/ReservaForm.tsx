import { useState } from 'react';
import axios from 'axios';

export function ReservaForm() {
  const [form, setForm] = useState({
    nomeCliente: '',
    numeroMesa: '',
    dataHora: '',
    contatoCliente: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/reservas', {
      ...form,
      numeroMesa: Number(form.numeroMesa),
      status: 'reservado'
    });
    alert('Reserva criada!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Nome" onChange={e => setForm({ ...form, nomeCliente: e.target.value })} />
      <input placeholder="Mesa" onChange={e => setForm({ ...form, numeroMesa: e.target.value })} />
      <input type="datetime-local" onChange={e => setForm({ ...form, dataHora: e.target.value })} />
      <input placeholder="Contato" onChange={e => setForm({ ...form, contatoCliente: e.target.value })} />
      <button type="submit">Reservar</button>
    </form>
  );
}
