import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, Clock, DollarSign, MoreVertical, Edit, Trash2, Users } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

const mockServices = [
  {
    id: 1,
    name: 'Limpeza de Pele Profunda',
    duration: 60,
    price: 150,
    professional: 'Dra. Carla Mendes',
    category: 'Estética Facial',
    status: 'active',
    appointmentsMonth: 45,
    revenue: 6750,
  },
  {
    id: 2,
    name: 'Massagem Relaxante',
    duration: 90,
    price: 200,
    professional: 'Ana Paula Silva',
    category: 'Massoterapia',
    status: 'active',
    appointmentsMonth: 32,
    revenue: 6400,
  },
  {
    id: 3,
    name: 'Drenagem Linfática',
    duration: 60,
    price: 180,
    professional: 'Ana Paula Silva',
    category: 'Estética Corporal',
    status: 'active',
    appointmentsMonth: 28,
    revenue: 5040,
  },
  {
    id: 4,
    name: 'Peeling Químico',
    duration: 45,
    price: 250,
    professional: 'Dr. Pedro Lima',
    category: 'Dermatologia',
    status: 'active',
    appointmentsMonth: 18,
    revenue: 4500,
  },
  {
    id: 5,
    name: 'Tratamento Capilar',
    duration: 120,
    price: 300,
    professional: 'Dra. Carla Mendes',
    category: 'Tricologia',
    status: 'inactive',
    appointmentsMonth: 0,
    revenue: 0,
  },
]

export default function ServicesPage() {
  const totalRevenue = mockServices.reduce((acc, s) => acc + s.revenue, 0)
  const activeServices = mockServices.filter(s => s.status === 'active').length

  return (
    <DashboardLayout allowedRoles={['CLINIC_ADMIN']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Serviços</h1>
            <p className="text-muted-foreground">Gerencie os serviços oferecidos pela clínica</p>
          </div>
          <Link href="/clinic/services/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Serviço
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Serviços</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockServices.length}</div>
              <p className="text-xs text-muted-foreground">{activeServices} ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atendimentos/Mês</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">123</div>
              <p className="text-xs text-muted-foreground">Total este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita do Mês</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {(totalRevenue / 1000).toFixed(1)}K
              </div>
              <p className="text-xs text-muted-foreground">Apenas serviços ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 186</div>
              <p className="text-xs text-muted-foreground">Por atendimento</p>
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
                  placeholder="Buscar serviços..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filtrar por Categoria</Button>
              <Button variant="outline">Filtrar por Profissional</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{service.name}</h3>
                      <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                        {service.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                      <Badge variant="outline">{service.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Profissional: {service.professional}
                    </p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{service.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>R$ {service.price.toFixed(2)}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {service.appointmentsMonth} agendamentos este mês
                      </div>
                      <div className="font-medium text-green-600">
                        R$ {service.revenue.toFixed(2)} faturado
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
                        <Edit className="h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Users className="h-4 w-4" />
                        Ver Agendamentos
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="h-4 w-4" />
                        {service.status === 'active' ? 'Desativar' : 'Excluir'}
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
