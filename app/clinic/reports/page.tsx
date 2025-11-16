'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Download, TrendingUp, TrendingDown, DollarSign, Users, Clock, Package, FileText, BarChart3 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function ReportsPage() {
  const [period, setPeriod] = useState('month')

  // Mock data - replace with real API
  const financialData = {
    revenue: 125000,
    expenses: 45000,
    profit: 80000,
    growth: 12.5,
    appointments: 156,
    avgTicket: 80128,
    topServices: [
      { name: 'Harmonização Facial', revenue: 45000, count: 32, growth: 15 },
      { name: 'Botox', revenue: 38000, count: 48, growth: 8 },
      { name: 'Preenchimento Labial', revenue: 28000, count: 35, growth: -5 },
      { name: 'Limpeza de Pele', revenue: 14000, count: 41, growth: 22 }
    ],
    monthlyRevenue: [
      { month: 'Jun', value: 98000 },
      { month: 'Jul', value: 105000 },
      { month: 'Ago', value: 112000 },
      { month: 'Set', value: 108000 },
      { month: 'Out', value: 118000 },
      { month: 'Nov', value: 125000 }
    ]
  }

  const professionalData = {
    professionals: [
      {
        id: '1',
        name: 'Dra. Carla Mendes',
        appointments: 68,
        revenue: 54400,
        commission: 10880,
        avgRating: 4.9,
        cancellationRate: 2
      },
      {
        id: '2',
        name: 'Dr. Pedro Lima',
        appointments: 52,
        revenue: 41600,
        commission: 8320,
        avgRating: 4.8,
        cancellationRate: 5
      },
      {
        id: '3',
        name: 'Ana Paula Silva',
        appointments: 36,
        revenue: 28800,
        commission: 5760,
        avgRating: 4.7,
        cancellationRate: 3
      }
    ]
  }

  const patientData = {
    newPatients: 42,
    returningPatients: 114,
    totalPatients: 423,
    retention: 73,
    topPatients: [
      { name: 'Maria Silva', visits: 12, spent: 8400, lastVisit: '2025-11-15' },
      { name: 'João Santos', visits: 10, spent: 7200, lastVisit: '2025-11-14' },
      { name: 'Ana Costa', visits: 9, spent: 6800, lastVisit: '2025-11-12' },
      { name: 'Carlos Oliveira', visits: 8, spent: 5600, lastVisit: '2025-11-10' }
    ],
    patientsByAge: [
      { range: '18-25', count: 78 },
      { range: '26-35', count: 156 },
      { range: '36-45', count: 112 },
      { range: '46-60', count: 65 },
      { range: '60+', count: 12 }
    ]
  }

  const appointmentData = {
    completed: 134,
    cancelled: 12,
    noShow: 10,
    cancelRate: 7.7,
    noShowRate: 6.4,
    avgDuration: 65,
    peakHours: [
      { hour: '09:00', count: 18 },
      { hour: '10:00', count: 24 },
      { hour: '11:00', count: 22 },
      { hour: '14:00', count: 28 },
      { hour: '15:00', count: 26 },
      { hour: '16:00', count: 20 },
      { hour: '17:00', count: 18 }
    ],
    byWeekday: [
      { day: 'Seg', count: 28 },
      { day: 'Ter', count: 32 },
      { day: 'Qua', count: 30 },
      { day: 'Qui', count: 25 },
      { day: 'Sex', count: 22 },
      { day: 'Sáb', count: 19 }
    ]
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100)
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Relatórios</h2>
          <p className="text-muted-foreground">
            Análises detalhadas do desempenho da clínica
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última Semana</SelectItem>
              <SelectItem value="month">Último Mês</SelectItem>
              <SelectItem value="quarter">Último Trimestre</SelectItem>
              <SelectItem value="year">Último Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
          <TabsTrigger value="professionals">Profissionais</TabsTrigger>
          <TabsTrigger value="patients">Pacientes</TabsTrigger>
          <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-[#0FA958]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(financialData.revenue)}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  +{financialData.growth}% vs período anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Despesas</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(financialData.expenses)}</div>
                <p className="text-xs text-muted-foreground">
                  {((financialData.expenses / financialData.revenue) * 100).toFixed(1)}% da receita
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
                <TrendingUp className="h-4 w-4 text-[#0FA958]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0FA958]">{formatCurrency(financialData.profit)}</div>
                <p className="text-xs text-muted-foreground">
                  Margem de {((financialData.profit / financialData.revenue) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                <BarChart3 className="h-4 w-4 text-[#0FA958]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(financialData.avgTicket)}</div>
                <p className="text-xs text-muted-foreground">
                  {financialData.appointments} atendimentos
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evolução de Receita</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {financialData.monthlyRevenue.map((item, idx) => {
                    const maxValue = Math.max(...financialData.monthlyRevenue.map(m => m.value))
                    const percentage = (item.value / maxValue) * 100
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{item.month}</span>
                          <span className="text-sm font-bold">{formatCurrency(item.value)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#0FA958] h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Serviços Mais Lucrativos</CardTitle>
                <CardDescription>Por receita no período</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financialData.topServices.map((service, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{service.name}</span>
                          <Badge variant={service.growth >= 0 ? "default" : "secondary"} className={service.growth >= 0 ? "bg-[#0FA958]" : ""}>
                            {service.growth >= 0 ? '+' : ''}{service.growth}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{service.count} procedimentos</span>
                          <span className="font-semibold text-gray-900">{formatCurrency(service.revenue)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="professionals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho dos Profissionais</CardTitle>
              <CardDescription>Análise detalhada por profissional no período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {professionalData.professionals.map((prof) => (
                  <div key={prof.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{prof.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{prof.appointments} atendimentos</Badge>
                          <Badge variant="outline">⭐ {prof.avgRating}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#0FA958]">{formatCurrency(prof.revenue)}</p>
                        <p className="text-sm text-muted-foreground">Receita gerada</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Comissão</p>
                        <p className="font-semibold">{formatCurrency(prof.commission)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Taxa de Cancelamento</p>
                        <p className="font-semibold">{prof.cancellationRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Receita/Atend.</p>
                        <p className="font-semibold">{formatCurrency(prof.revenue / prof.appointments)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Novos Pacientes</CardTitle>
                <Users className="h-4 w-4 text-[#0FA958]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{patientData.newPatients}</div>
                <p className="text-xs text-muted-foreground">No período</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Retornos</CardTitle>
                <TrendingUp className="h-4 w-4 text-[#0FA958]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{patientData.returningPatients}</div>
                <p className="text-xs text-muted-foreground">Pacientes que retornaram</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Base Total</CardTitle>
                <Users className="h-4 w-4 text-[#0FA958]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{patientData.totalPatients}</div>
                <p className="text-xs text-muted-foreground">Pacientes cadastrados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Retenção</CardTitle>
                <TrendingUp className="h-4 w-4 text-[#0FA958]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{patientData.retention}%</div>
                <p className="text-xs text-muted-foreground">Pacientes recorrentes</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Principais Clientes</CardTitle>
                <CardDescription>Por valor gasto no período</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patientData.topPatients.map((patient, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">{patient.visits} visitas</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#0FA958]">{formatCurrency(patient.spent)}</p>
                        <p className="text-xs text-muted-foreground">{patient.lastVisit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Idade</CardTitle>
                <CardDescription>Perfil demográfico dos pacientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {patientData.patientsByAge.map((age, idx) => {
                    const maxCount = Math.max(...patientData.patientsByAge.map(a => a.count))
                    const percentage = (age.count / maxCount) * 100
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{age.range} anos</span>
                          <span className="text-sm font-bold">{age.count} pacientes</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#0FA958] h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completados</CardTitle>
                <Calendar className="h-4 w-4 text-[#0FA958]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointmentData.completed}</div>
                <p className="text-xs text-muted-foreground">Atendimentos realizados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cancelamentos</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointmentData.cancelled}</div>
                <p className="text-xs text-muted-foreground">
                  Taxa de {appointmentData.cancelRate}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Faltas</CardTitle>
                <TrendingDown className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointmentData.noShow}</div>
                <p className="text-xs text-muted-foreground">
                  Taxa de {appointmentData.noShowRate}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Duração Média</CardTitle>
                <Clock className="h-4 w-4 text-[#0FA958]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointmentData.avgDuration} min</div>
                <p className="text-xs text-muted-foreground">Por atendimento</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Horários de Pico</CardTitle>
                <CardDescription>Distribuição de agendamentos por horário</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointmentData.peakHours.map((hour, idx) => {
                    const maxCount = Math.max(...appointmentData.peakHours.map(h => h.count))
                    const percentage = (hour.count / maxCount) * 100
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{hour.hour}</span>
                          <span className="text-sm font-bold">{hour.count} agendamentos</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#0FA958] h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dias da Semana</CardTitle>
                <CardDescription>Agendamentos por dia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointmentData.byWeekday.map((day, idx) => {
                    const maxCount = Math.max(...appointmentData.byWeekday.map(d => d.count))
                    const percentage = (day.count / maxCount) * 100
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{day.day}</span>
                          <span className="text-sm font-bold">{day.count} agendamentos</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#0FA958] h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
