'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

const mockAppointments = [
  { id: 1, time: '08:00', patient: 'Maria Silva', service: 'Limpeza de Pele', professional: 'Dra. Carla Mendes', status: 'confirmed', duration: 60 },
  { id: 2, time: '09:00', patient: 'João Santos', service: 'Massagem Relaxante', professional: 'Ana Paula Silva', status: 'confirmed', duration: 90 },
  { id: 3, time: '10:30', patient: 'Ana Costa', service: 'Drenagem Linfática', professional: 'Ana Paula Silva', status: 'pending', duration: 60 },
  { id: 4, time: '11:30', patient: 'Pedro Oliveira', service: 'Peeling Químico', professional: 'Dr. Pedro Lima', status: 'confirmed', duration: 45 },
  { id: 5, time: '14:00', patient: 'Carla Rodrigues', service: 'Limpeza de Pele', professional: 'Dra. Carla Mendes', status: 'pending', duration: 60 },
  { id: 6, time: '15:00', patient: 'Roberto Alves', service: 'Massagem Relaxante', professional: 'Ana Paula Silva', status: 'completed', duration: 90 },
  { id: 7, time: '16:30', patient: 'Juliana Ferreira', service: 'Drenagem Linfática', professional: 'Ana Paula Silva', status: 'cancelled', duration: 60 },
]

const timeSlots = Array.from({ length: 11 }, (_, i) => `${String(8 + i).padStart(2, '0')}:00`)

export default function AppointmentsPage() {
  const [view, setView] = useState<'day' | 'week'>('day')
  const [selectedProfessional, setSelectedProfessional] = useState('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400'
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400'
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado'
      case 'pending': return 'Pendente'
      case 'completed': return 'Concluído'
      case 'cancelled': return 'Cancelado'
      default: return status
    }
  }

  return (
    <DashboardLayout allowedRoles={['CLINIC_ADMIN']}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
            <p className="text-muted-foreground">Gerencie os agendamentos da clínica</p>
          </div>
          <Link href="/clinic/appointments/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Agendamento
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">agendamentos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">3</div>
              <p className="text-xs text-muted-foreground">prontos para atendimento</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">2</div>
              <p className="text-xs text-muted-foreground">aguardando confirmação</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ocupação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">da agenda do dia</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Controls */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">16 de Novembro, 2025</h2>
                </div>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline">Hoje</Button>
              </div>

              <div className="flex items-center gap-2">
                <Select value={selectedProfessional} onValueChange={setSelectedProfessional}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Profissionais</SelectItem>
                    <SelectItem value="pedro">Dr. Pedro Lima</SelectItem>
                    <SelectItem value="carla">Dra. Carla Mendes</SelectItem>
                    <SelectItem value="ana">Ana Paula Silva</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant={view === 'day' ? 'default' : 'outline'}
                  onClick={() => setView('day')}
                >
                  Dia
                </Button>
                <Button 
                  variant={view === 'week' ? 'default' : 'outline'}
                  onClick={() => setView('week')}
                >
                  Semana
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Timeline View */}
            <div className="space-y-2">
              {timeSlots.map((time) => {
                const appointment = mockAppointments.find(a => a.time === time)
                
                return (
                  <div key={time} className="flex items-start gap-4 min-h-[60px]">
                    <div className="w-16 text-sm font-medium text-muted-foreground pt-2">
                      {time}
                    </div>
                    <div className="flex-1 border-l-2 border-border pl-4">
                      {appointment ? (
                        <div className={`p-3 border rounded-lg ${getStatusColor(appointment.status)} cursor-pointer hover:opacity-80 transition-opacity`}>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold">{appointment.patient}</p>
                                <Badge variant="outline" className="text-xs">
                                  {getStatusLabel(appointment.status)}
                                </Badge>
                              </div>
                              <p className="text-sm">{appointment.service}</p>
                              <p className="text-xs mt-1">{appointment.professional}</p>
                            </div>
                            <div className="text-xs text-right">
                              <p>{appointment.duration} min</p>
                              <p className="text-muted-foreground">
                                {appointment.time} - {String(parseInt(appointment.time.split(':')[0]) + Math.floor(appointment.duration / 60)).padStart(2, '0')}:{String(appointment.duration % 60).padStart(2, '0')}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-[60px] flex items-center text-sm text-muted-foreground hover:bg-accent/30 rounded cursor-pointer transition-colors">
                          <span className="pl-2">Horário disponível</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
