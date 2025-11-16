import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Building2, Plus, Search, Eye, Edit, Trash2, MapPin, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function ClinicsPage() {
  const clinics = [
    {
      id: 1,
      name: 'Clínica Estética Premium',
      email: 'contato@esteticapremium.com.br',
      phone: '(11) 98765-4321',
      city: 'São Paulo',
      state: 'SP',
      status: 'Ativa',
      paymentStatus: 'Pago',
      expiresAt: '2025-01-15',
      logo: '/clinic-logo.jpg',
      primaryColor: '#10b981',
      professionals: 12,
      patients: 450,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Centro de Saúde Integral',
      email: 'contato@saudeintegral.com.br',
      phone: '(21) 97654-3210',
      city: 'Rio de Janeiro',
      state: 'RJ',
      status: 'Ativa',
      paymentStatus: 'Teste Grátis',
      expiresAt: '2024-04-10',
      logo: '/modern-health-center.png',
      primaryColor: '#3b82f6',
      professionals: 8,
      patients: 320,
      createdAt: '2024-02-10'
    },
    {
      id: 3,
      name: 'Clínica Bem Estar',
      email: 'contato@bemestar.com.br',
      phone: '(31) 96543-2109',
      city: 'Belo Horizonte',
      state: 'MG',
      status: 'Em Configuração',
      paymentStatus: 'Pendente',
      expiresAt: '2024-04-05',
      logo: '/wellness-clinic.png',
      primaryColor: '#8b5cf6',
      professionals: 5,
      patients: 120,
      createdAt: '2024-03-05'
    },
    {
      id: 4,
      name: 'Instituto de Dermatologia',
      email: 'contato@dermatologia.com.br',
      phone: '(41) 95432-1098',
      city: 'Curitiba',
      state: 'PR',
      status: 'Ativa',
      paymentStatus: 'Pago',
      expiresAt: '2025-12-20',
      logo: '/dermatology-institute.jpg',
      primaryColor: '#f59e0b',
      professionals: 15,
      patients: 680,
      createdAt: '2024-01-20'
    },
  ]

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Pago':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'Pendente':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'Teste Grátis':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      default:
        return ''
    }
  }

  const getExpirationStatus = (expiresAt: string) => {
    const today = new Date()
    const expiration = new Date(expiresAt)
    const daysUntilExpiration = Math.ceil((expiration.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysUntilExpiration < 0) return { text: 'Expirado', color: 'text-red-600' }
    if (daysUntilExpiration <= 7) return { text: `${daysUntilExpiration}d restantes`, color: 'text-orange-600' }
    if (daysUntilExpiration <= 30) return { text: `${daysUntilExpiration}d restantes`, color: 'text-yellow-600' }
    return { text: expiration.toLocaleDateString('pt-BR'), color: 'text-muted-foreground' }
  }

  return (
    <DashboardLayout allowedRoles={['MASTER_ADMIN']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clínicas</h1>
            <p className="text-muted-foreground">Gerencie todas as clínicas do sistema</p>
          </div>
          <Link href="/master/clinics/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Clínica
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtrar Clínicas</CardTitle>
            <CardDescription>Busque por nome, cidade ou status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nome ou cidade..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Filtrar</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {clinics.map((clinic) => {
            const expirationStatus = getExpirationStatus(clinic.expiresAt)
            return (
              <Card key={clinic.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="relative">
                        <img 
                          src={clinic.logo || "/placeholder.svg"} 
                          alt={clinic.name}
                          className="h-12 w-12 rounded-lg object-cover border-2"
                          style={{ borderColor: clinic.primaryColor }}
                        />
                        <div 
                          className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background"
                          style={{ backgroundColor: clinic.primaryColor }}
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-lg">{clinic.name}</h3>
                          <Badge variant={clinic.status === 'Ativa' ? 'default' : 'secondary'}>
                            {clinic.status}
                          </Badge>
                          <Badge variant="outline" className={getPaymentStatusColor(clinic.paymentStatus)}>
                            {clinic.paymentStatus}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {clinic.city}, {clinic.state}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {clinic.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {clinic.phone}
                          </div>
                        </div>
                        <div className="flex gap-4 text-sm pt-2">
                          <span className="font-medium">{clinic.professionals} Profissionais</span>
                          <span className="font-medium">{clinic.patients} Pacientes</span>
                          <span className={expirationStatus.color}>
                            Validade: {expirationStatus.text}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
