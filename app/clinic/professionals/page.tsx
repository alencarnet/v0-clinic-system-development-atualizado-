import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, UserCog, Calendar, Activity, MoreVertical, Edit, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

const mockProfessionals = [
  {
    id: 1,
    name: 'Dr. Pedro Lima',
    document: '123.456.789-00',
    specialty: 'Dermatologista',
    email: 'pedro.lima@clinica.com',
    phone: '(11) 98765-4321',
    status: 'active',
    appointmentsToday: 8,
    nextAppointment: '10:30',
    workingHours: 'Seg-Sex: 08:00-18:00',
  },
  {
    id: 2,
    name: 'Dra. Carla Mendes',
    document: '987.654.321-00',
    specialty: 'Fisioterapeuta',
    email: 'carla.mendes@clinica.com',
    phone: '(11) 98765-1234',
    status: 'active',
    appointmentsToday: 6,
    nextAppointment: '11:00',
    workingHours: 'Seg-Sex: 09:00-17:00',
  },
  {
    id: 3,
    name: 'Ana Paula Silva',
    document: '456.789.123-00',
    specialty: 'Massoterapeuta',
    email: 'ana.silva@clinica.com',
    phone: '(11) 98765-5678',
    status: 'inactive',
    appointmentsToday: 0,
    nextAppointment: '-',
    workingHours: 'Seg-Qua: 14:00-20:00',
  },
]

export default function ProfessionalsPage() {
  return (
    <DashboardLayout allowedRoles={['CLINIC_ADMIN']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profissionais</h1>
            <p className="text-muted-foreground">Gerencie a equipe da clínica</p>
          </div>
          <Link href="/clinic/professionals/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Profissional
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Profissionais</CardTitle>
              <UserCog className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 ativos, 1 inativo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atendimentos Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <p className="text-xs text-muted-foreground">Total da equipe</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">Média da equipe</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, CPF ou especialidade..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filtros</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProfessionals.map((professional) => (
                <div
                  key={professional.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserCog className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{professional.name}</h3>
                        <Badge variant={professional.status === 'active' ? 'default' : 'secondary'}>
                          {professional.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{professional.specialty}</p>
                      <div className="grid md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">CPF: </span>
                          {professional.document}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email: </span>
                          {professional.email}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Telefone: </span>
                          {professional.phone}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Horário: </span>
                          {professional.workingHours}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 ml-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">Hoje</p>
                      <p className="text-2xl font-bold">{professional.appointmentsToday}</p>
                      <p className="text-xs text-muted-foreground">
                        Próximo: {professional.nextAppointment}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Calendar className="h-4 w-4" />
                          Ver Agenda
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          Desativar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
