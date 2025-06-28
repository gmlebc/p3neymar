import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface ReservaFormProps {
  onSuccess?: () => void;
}

export function ReservaForm({ onSuccess }: ReservaFormProps) {
  const [form, setForm] = useState({
    nomeCliente: '',
    numeroMesa: '',
    dataHora: '',
    contatoCliente: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('http://localhost:3000/api/reservas', {
        ...form,
        numeroMesa: Number(form.numeroMesa),
        status: 'reservado'
      });
      
      toast.success("Reserva criada com sucesso!", {
        description: `Mesa ${form.numeroMesa} reservada para ${form.nomeCliente}`,
      });
      
      setForm({
        nomeCliente: '',
        numeroMesa: '',
        dataHora: '',
        contatoCliente: ''
      });

      // Chama a função de sucesso para atualizar a lista
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast.error("Erro ao criar reserva", {
        description: "Ocorreu um erro ao tentar criar a reserva. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
          Nova Reserva
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label 
              htmlFor="nomeCliente" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nome do Cliente
            </Label>
            <Input
              id="nomeCliente"
              placeholder="Nome completo"
              value={form.nomeCliente}
              onChange={e => setForm({ ...form, nomeCliente: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="space-y-3">
            <Label 
              htmlFor="numeroMesa" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Número da Mesa
            </Label>
            <Input
              id="numeroMesa"
              placeholder="Número da mesa"
              type="number"
              min="1"
              value={form.numeroMesa}
              onChange={e => setForm({ ...form, numeroMesa: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="space-y-3">
            <Label 
              htmlFor="dataHora" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Data e Hora
            </Label>
            <Input
              id="dataHora"
              type="datetime-local"
              value={form.dataHora}
              onChange={e => setForm({ ...form, dataHora: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="space-y-3">
            <Label 
              htmlFor="contatoCliente" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Contato
            </Label>
            <Input
              id="contatoCliente"
              placeholder="Telefone ou e-mail"
              value={form.contatoCliente}
              onChange={e => setForm({ ...form, contatoCliente: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md shadow-sm transition-colors duration-200 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </span>
            ) : (
              "Confirmar Reserva"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}