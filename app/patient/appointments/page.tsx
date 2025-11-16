'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Plus, X } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function PatientAppointmentsPage() {
  const upcomingAppointments = [
    {
      id: 1,
      date: '2025-01-18',
      time: '10:00',
      professional: 'Dra. Carla Mendes',
      service: 'Fisioterapia',
      status: 'confirmed',
      location: 'Sala 3',
      duration: '50 minutos'
    },
    {
      id: 2,
      date: '2025-01-22',
      time: '14:30',
      professional: 'Dr. Pedro Lima',
      service: 'Consulta Dermatológica',
      status: 'pending',
      location: 'Sala 1',
      duration: '30 minutos'
    },
  ]

  const pastAppointments = [
    {
      id: 3,
      date: '2024-12-28',
      time: '10:00',
      professional: 'Dra. Carla Mendes',
      service: 'Fisioterapia',
      status: 'completed',
      location: 'Sala 3'
    },
    {
      id: 4,
      date: '2024-12-15',
      time: '16:00',
      professional: 'Terapeuta Ana Paula',
      service: 'Massoterapia',
      status: 'completed',
      location: 'Sala 2'
    },
  ]

  return (
    <DashboardLayout allowedRoles={['PATIENT']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meus Agendamentos</h1>
            <p className="text-muted-foreground">Gerencie suas consultas e atendimentos</p>
          </div>
          <Link href="/agendamentos/bella-estetica">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Agendamento
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Próximos ({upcomingAppointments.length})</TabsTrigger>
            <TabsTrigger value="past">Histórico ({pastAppointments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                          {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                        </Badge>
                        <h3 className="text-lg font-semibold">{appointment.service}</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(appointment.date).toLocaleDateString('pt-BR', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {appointment.time} - {appointment.duration}
                        </div>
                        <div className="text-muted-foreground">
                          <strong>Profissional:</strong> {appointment.professional}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {appointment.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Reagendar</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">Concluído</Badge>
                        <h3 className="text-lg font-semibold">{appointment.service}</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(appointment.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {appointment.time}
                        </div>
                        <div className="text-muted-foreground">
                          <strong>Profissional:</strong> {appointment.professional}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {appointment.location}
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" size="sm">Ver Detalhes</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
