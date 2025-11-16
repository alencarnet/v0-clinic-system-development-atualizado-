import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Users, Calendar, FileText, MoreVertical, Edit, Eye, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

const mockPatients = [
  {
    id: 1,
    name: 'Maria Silva Santos',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
    email: 'maria.silva@email.com',
    birthdate: '15/03/1985',
    age: 40,
    lastVisit: '10/11/2025',
    totalAppointments: 24,
    status: 'active',
    nextAppointment: '18/11/2025'
  },
  {
    id: 2,
    name: 'João Pedro Santos',
    cpf: '987.654.321-00',
    phone: '(11) 98765-1234',
    email: 'joao.santos@email.com',
    birthdate: '22/07/1990',
    age: 35,
    lastVisit: '12/11/2025',
    totalAppointments: 18,
    status: 'active',
    nextAppointment: '20/11/2025'
  },
  {
    id: 3,
    name: 'Ana Costa Oliveira',
    cpf: '456.789.123-00',
    phone: '(11) 98765-5678',
    email: 'ana.costa@email.com',
    birthdate: '05/12/1982',
    age: 42,
    lastVisit: '08/10/2025',
    totalAppointments: 32,
    status: 'inactive',
    nextAppointment: '-'
  },
]

export default function PatientsPage() {
  return (
    <DashboardLayout allowedRoles={['CLINIC_ADMIN']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Pacientes</h1>
            <p className="text-muted-foreground">Gerencie o cadastro de pacientes</p>
          </div>
          <Link href="/clinic/patients/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Paciente
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">308 ativos, 34 inativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novos Este Mês</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">18</div>
              <p className="text-xs text-muted-foreground">+25% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agendados Hoje</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">8 confirmados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Retorno</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">Pacientes recorrentes</p>
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
                  placeholder="Buscar por nome, CPF, telefone ou e-mail..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filtrar por Status</Button>
              <Button variant="outline">Exportar</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{patient.name}</h3>
                        <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                          {patient.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-x-6 gap-y-1 text-sm mb-2">
                        <div>
                          <span className="text-muted-foreground">CPF: </span>
                          {patient.cpf}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Telefone: </span>
                          {patient.phone}
                        </div>
                        <div>
                          <span className="text-muted-foreground">E-mail: </span>
                          {patient.email}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Nascimento: </span>
                          {patient.birthdate} ({patient.age} anos)
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Última visita: </span>
                          <span className="font-medium">{patient.lastVisit}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total de atendimentos: </span>
                          <span className="font-medium">{patient.totalAppointments}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Próximo: </span>
                          <span className="font-medium">{patient.nextAppointment}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Edit className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Novo Agendamento
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <FileText className="h-4 w-4" />
                        Ver Prontuário
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Desativar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
