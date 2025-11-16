import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, FileText, Activity, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PatientDashboardPage() {
  return (
    <DashboardLayout allowedRoles={['PATIENT']}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minha Área</h1>
          <p className="text-muted-foreground">Gerencie seus agendamentos e histórico</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próxima Consulta</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Amanhã</div>
              <p className="text-xs text-muted-foreground">10:00 - Dra. Carla</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atendimentos</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Total realizados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documentos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Prontuários e exames</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Último Atendimento</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 dias</div>
              <p className="text-xs text-muted-foreground">Atrás</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Agendamentos</CardTitle>
              <CardDescription>Suas consultas confirmadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: 'Amanhã, 10:00', professional: 'Dra. Carla Mendes', service: 'Fisioterapia' },
                  { date: '15/01, 14:30', professional: 'Dr. Pedro Lima', service: 'Consulta Dermatológica' },
                ].map((appointment, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{appointment.professional}</p>
                      <p className="text-sm text-muted-foreground">{appointment.service}</p>
                      <p className="text-xs text-muted-foreground mt-1">{appointment.date}</p>
                    </div>
                    <Button variant="outline" size="sm">Detalhes</Button>
                  </div>
                ))}
                <Button className="w-full" variant="default">
                  Novo Agendamento
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimos Atendimentos</CardTitle>
              <CardDescription>Histórico recente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: '28/12/2024', professional: 'Dra. Carla Mendes', service: 'Fisioterapia' },
                  { date: '15/12/2024', professional: 'Terapeuta Ana Paula', service: 'Massoterapia' },
                  { date: '01/12/2024', professional: 'Dr. Pedro Lima', service: 'Consulta' },
                ].map((record, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{record.professional}</p>
                      <p className="text-sm text-muted-foreground">{record.service}</p>
                      <p className="text-xs text-muted-foreground mt-1">{record.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">Ver</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
