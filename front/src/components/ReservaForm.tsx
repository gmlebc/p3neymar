import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner"; // Importação corrigida

export function ReservaForm() {
  const [form, setForm] = useState({
    nomeCliente: '',
    numeroMesa: '',
    dataHora: '',
    contatoCliente: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Remova a linha: const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await axios.post('http://localhost:3000/api/reservas', {
        ...form,
        numeroMesa: Number(form.numeroMesa),
        status: 'reservado'
      });
      
      // Toast atualizado para a nova API
      toast.success("Reserva criada com sucesso!", {
        description: `Mesa ${form.numeroMesa} reservada para ${form.nomeCliente}`,
      });
      
      // Limpar o formulário após o sucesso
      setForm({
        nomeCliente: '',
        numeroMesa: '',
        dataHora: '',
        contatoCliente: ''
      });
    } catch (error) {
      // Toast de erro atualizado
      toast.error("Erro ao criar reserva", {
        description: "Ocorreu um erro ao tentar criar a reserva. Por favor, tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Nova Reserva</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nomeCliente">Nome do Cliente</Label>
            <Input
              id="nomeCliente"
              placeholder="Nome completo"
              value={form.nomeCliente}
              onChange={e => setForm({ ...form, nomeCliente: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numeroMesa">Número da Mesa</Label>
            <Input
              id="numeroMesa"
              placeholder="Número da mesa"
              type="number"
              min="1"
              value={form.numeroMesa}
              onChange={e => setForm({ ...form, numeroMesa: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataHora">Data e Hora</Label>
            <Input
              id="dataHora"
              type="datetime-local"
              value={form.dataHora}
              onChange={e => setForm({ ...form, dataHora: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contatoCliente">Contato</Label>
            <Input
              id="contatoCliente"
              placeholder="Telefone ou e-mail"
              value={form.contatoCliente}
              onChange={e => setForm({ ...form, contatoCliente: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Reservando..." : "Confirmar Reserva"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}