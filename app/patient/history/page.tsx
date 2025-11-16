'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Calendar, FileText, Search, Download } from 'lucide-react'

export default function PatientHistoryPage() {
  const medicalRecords = [
    {
      id: 1,
      date: '2024-12-28',
      professional: 'Dra. Carla Mendes',
      service: 'Fisioterapia',
      diagnosis: 'Lesão muscular - região lombar',
      treatment: 'Exercícios de fortalecimento e alongamento',
      observations: 'Paciente apresentou melhora significativa. Continuar tratamento.',
      nextAppointment: '2025-01-18'
    },
    {
      id: 2,
      date: '2024-12-15',
      professional: 'Terapeuta Ana Paula',
      service: 'Massoterapia',
      diagnosis: 'Tensão muscular generalizada',
      treatment: 'Massagem terapêutica profunda',
      observations: 'Recomendado sessões semanais por 4 semanas.',
      nextAppointment: null
    },
    {
      id: 3,
      date: '2024-12-01',
      professional: 'Dr. Pedro Lima',
      service: 'Consulta Dermatológica',
      diagnosis: 'Acne grau moderado',
      treatment: 'Prescrição de medicamentos tópicos',
      observations: 'Retorno em 30 dias para avaliação.',
      nextAppointment: '2025-01-01'
    },
  ]

  return (
    <DashboardLayout allowedRoles={['PATIENT']}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Histórico Médico</h1>
          <p className="text-muted-foreground">Visualize seu histórico de consultas e tratamentos</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por serviço, profissional ou diagnóstico..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {medicalRecords.map((record) => (
              <Card key={record.id} className="border-2">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{record.service}</h3>
                          <Badge variant="outline">{new Date(record.date).toLocaleDateString('pt-BR')}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Profissional:</strong> {record.professional}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Ver Prontuário
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium mb-1">Diagnóstico</p>
                        <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Tratamento</p>
                        <p className="text-sm text-muted-foreground">{record.treatment}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-1">Observações</p>
                      <p className="text-sm text-muted-foreground">{record.observations}</p>
                    </div>

                    {record.nextAppointment && (
                      <div className="flex items-center gap-2 text-sm p-3 bg-primary/10 rounded-lg">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>
                          <strong>Próxima consulta agendada:</strong>{' '}
                          {new Date(record.nextAppointment).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
