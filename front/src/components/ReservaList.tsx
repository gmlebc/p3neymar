import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/reservas');
        setReservas(res.data);
      } catch (error) {
        toast.error("Erro ao carregar reservas", {
          description: "Ocorreu um erro ao tentar carregar as reservas. Por favor, tente novamente.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservas();
  }, []);

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('pt-BR');
  };

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'reservado':
        return 'default';
      case 'cancelado':
        return 'destructive';
      case 'concluído':
        return 'success';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservas Ativas</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableCaption>Lista de reservas ativas no sistema.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Mesa</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservas.map((reserva) => (
                <TableRow key={reserva._id}>
                  <TableCell className="font-medium">{reserva.numeroMesa}</TableCell>
                  <TableCell>{reserva.nomeCliente}</TableCell>
                  <TableCell>{formatDateTime(reserva.dataHora)}</TableCell>
                  <TableCell>{reserva.contatoCliente}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(reserva.status)}>
                      {reserva.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}