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

interface ReservaListProps {
  refreshKey?: number;
}

export function ReservaList({ refreshKey = 0 }: ReservaListProps) {
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
  }, [refreshKey]);

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('pt-BR');
  };

  const getStatusClasses = (status: string) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    switch (status.toLowerCase()) {
      case 'reservado':
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
      case 'cancelado':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'concluído':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'em andamento':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          Reservas Ativas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full bg-gray-200 dark:bg-gray-700" />
            ))}
          </div>
        ) : (
          <Table>
            <TableCaption className="text-gray-500 dark:text-gray-400">
              Lista de reservas ativas no sistema.
            </TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-gray-900 dark:text-white">Mesa</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Cliente</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Data/Hora</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Contato</TableHead>
                <TableHead className="text-gray-900 dark:text-white">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservas.map((reserva) => (
                <TableRow 
                  key={reserva._id} 
                  className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {reserva.numeroMesa}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {reserva.nomeCliente}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {formatDateTime(reserva.dataHora)}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {reserva.contatoCliente}
                  </TableCell>
                  <TableCell>
                    <span className={getStatusClasses(reserva.status)}>
                      {reserva.status}
                    </span>
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