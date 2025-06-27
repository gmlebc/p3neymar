import { useEffect, useState } from 'react';
import axios from 'axios';

interface Reserva {
  _id: string;
  nomeCliente: string;
  numeroMesa: number;
  dataHora: string;
  status: string;
  contatoCliente: string;
}

export function ReservaList() {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/reservas')
      .then(res => setReservas(res.data));
  }, []);

  return (
    <ul>
      {reservas.map(r => (
        <li key={r._id}>
          Mesa {r.numeroMesa} - {r.nomeCliente} ({r.status})
        </li>
      ))}
    </ul>
  );
}
