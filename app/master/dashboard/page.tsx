import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building2, Users, Activity, TrendingUp, DollarSign, AlertCircle, CheckCircle, Clock, ArrowUpRight, Calendar, CreditCard, Zap, TrendingDown } from 'lucide-react'

// Mock data - substituir com dados reais da API
const clinicsData = [
  {
    id: 1,
    name: 'Clínica Estética Premium',
    city: 'São Paulo',
    plan: 'Enterprise',
    status: 'paid',
    monthlyRevenue: 2500,
    annualRevenue: 30000,
    paymentDue: null,
    users: 45,
    patients: 850,
    appointments: 320,
    growth: 23,
    logo: '/clinic-logo.jpg'
  },
  {
    id: 2,
    name: 'Centro de Saúde Integral',
    city: 'Rio de Janeiro',
    plan: 'Professional',
    status: 'paid',
    monthlyRevenue: 1500,
    annualRevenue: 18000,
    paymentDue: null,
    users: 28,
    patients: 450,
    appointments: 180,
    growth: 15,
    logo: '/modern-health-center.png'
  },
  {
    id: 3,
    name: 'Clínica Bem Estar',
    city: 'Belo Horizonte',
    plan: 'Free Trial',
    status: 'trial',
    monthlyRevenue: 0,
    annualRevenue: 0,
    paymentDue: '2025-01-30',
    users: 5,
    patients: 45,
    appointments: 23,
    growth: 0,
    logo: '/wellness-clinic.png'
  },
  {
    id: 4,
    name: 'Dermatologia Excellence',
    city: 'Curitiba',
    plan: 'Professional',
    status: 'overdue',
    monthlyRevenue: 1500,
    annualRevenue: 18000,
    paymentDue: '2025-01-10',
    users: 22,
    patients: 380,
    appointments: 145,
    growth: -8,
    logo: '/dermatology-institute.jpg'
  },
  {
    id: 5,
    name: 'Beauty & Health',
    city: 'Porto Alegre',
    plan: 'Basic',
    status: 'paid',
    monthlyRevenue: 799,
    annualRevenue: 9588,
    paymentDue: null,
    users: 12,
    patients: 200,
    appointments: 95,
    growth: 18,
    logo: '/clinic-logo.jpg'
  },
]

const revenueByMonth = [
  { month: 'Jul', revenue: 32000 },
  { month: 'Ago', revenue: 38000 },
  { month: 'Set', revenue: 42000 },
  { month: 'Out', revenue: 45000 },
  { month: 'Nov', revenue: 51000 },
  { month: 'Dez', revenue: 55588 },
]

export default function MasterDashboardPage() {
  const totalRevenue = clinicsData.reduce((sum, c) => sum + c.monthlyRevenue, 0)
  const totalAnnualRevenue = clinicsData.reduce((sum, c) => sum + c.annualRevenue, 0)
  const paidClinics = clinicsData.filter(c => c.status === 'paid').length
  const overdueClinics = clinicsData.filter(c => c.status === 'overdue')
  const trialClinics = clinicsData.filter(c => c.status === 'trial')
  const totalUsers = clinicsData.reduce((sum, c) => sum + c.users, 0)
  const totalPatients = clinicsData.reduce((sum, c) => sum + c.patients, 0)
  const totalAppointments = clinicsData.reduce((sum, c) => sum + c.appointments, 0)

  // Oportunidades de upsell
  const upsellOpportunities = clinicsData.filter(c => 
    (c.plan === 'Basic' && c.users > 10) || 
    (c.plan === 'Professional' && c.users > 25) ||
    (c.status === 'trial' && c.appointments > 20)
  )

  return (
    <DashboardLayout allowedRoles={['MASTER_ADMIN']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard White Label</h1>
            <p className="text-muted-foreground">Visão completa do seu negócio SaaS</p>
          </div>
          <Button>
            <Calendar className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>

        {/* Alertas importantes */}
        {(overdueClinics.length > 0 || trialClinics.length > 0) && (
          <div className="grid gap-4 md:grid-cols-2">
            {overdueClinics.length > 0 && (
              <Card className="border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
                    <CardTitle className="text-red-900 dark:text-red-100">Pagamentos Pendentes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                    {overdueClinics.length} clínica(s) com pagamento atrasado
                  </p>
                  {overdueClinics.map(clinic => (
                    <div key={clinic.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg mb-2">
                      <span className="font-medium text-sm">{clinic.name}</span>
                      <Button size="sm" variant="destructive">Cobrar</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {trialClinics.length > 0 && (
              <Card className="border-yellow-200 bg-yellow-50/50 dark:border-yellow-900 dark:bg-yellow-950/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                    <CardTitle className="text-yellow-900 dark:text-yellow-100">Trials Expirando</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                    {trialClinics.length} clínica(s) em período de teste
                  </p>
                  {trialClinics.map(clinic => (
                    <div key={clinic.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg mb-2">
                      <div>
                        <p className="font-medium text-sm">{clinic.name}</p>
                        <p className="text-xs text-muted-foreground">Expira em {clinic.paymentDue}</p>
                      </div>
                      <Button size="sm" variant="outline">Converter</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Métricas principais */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal (MRR)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +18% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Anual (ARR)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalAnnualRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Projeção anual</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clínicas Ativas</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paidClinics}</div>
              <p className="text-xs text-muted-foreground">
                {clinicsData.length} total ({trialClinics.length} em trial)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">Trial para pago</p>
            </CardContent>
          </Card>
        </div>

        {/* Métricas de uso */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">Profissionais ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
              <p className="text-xs text-muted-foreground">Base de pacientes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agendamentos (mês)</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAppointments}</div>
              <p className="text-xs text-muted-foreground">Total este mês</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="clinics" className="space-y-4">
          <TabsList>
            <TabsTrigger value="clinics">Clínicas</TabsTrigger>
            <TabsTrigger value="revenue">Receita</TabsTrigger>
            <TabsTrigger value="upsell">Oportunidades</TabsTrigger>
          </TabsList>

          <TabsContent value="clinics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Desempenho por Clínica</CardTitle>
                <CardDescription>Acompanhamento detalhado de cada cliente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clinicsData.map((clinic) => (
                    <div key={clinic.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
                            <Building2 className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{clinic.name}</p>
                              <Badge variant={
                                clinic.status === 'paid' ? 'default' :
                                clinic.status === 'trial' ? 'secondary' :
                                'destructive'
                              }>
                                {clinic.status === 'paid' ? 'Pago' :
                                 clinic.status === 'trial' ? 'Trial' :
                                 'Atrasado'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{clinic.city} • Plano {clinic.plan}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">R$ {clinic.monthlyRevenue}</p>
                          <p className="text-xs text-muted-foreground">por mês</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 pt-3 border-t">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Usuários</p>
                          <p className="text-xl font-semibold">{clinic.users}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Pacientes</p>
                          <p className="text-xl font-semibold">{clinic.patients}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Agendamentos</p>
                          <p className="text-xl font-semibold">{clinic.appointments}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Crescimento</p>
                          <div className="flex items-center gap-1">
                            {clinic.growth > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : clinic.growth < 0 ? (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            ) : null}
                            <p className={`text-xl font-semibold ${
                              clinic.growth > 0 ? 'text-green-600' :
                              clinic.growth < 0 ? 'text-red-600' :
                              'text-muted-foreground'
                            }`}>
                              {clinic.growth}%
                            </p>
                          </div>
                        </div>
                      </div>

                      {clinic.paymentDue && (
                        <div className="flex items-center justify-between pt-3 border-t">
                          <p className="text-sm text-muted-foreground">
                            {clinic.status === 'trial' ? 'Trial expira em:' : 'Pagamento atrasado desde:'}
                          </p>
                          <p className="text-sm font-medium">{clinic.paymentDue}</p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">Ver Detalhes</Button>
                        <Button size="sm" variant="outline">
                          <CreditCard className="h-4 w-4 mr-1" />
                          Faturamento
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolução de Receita</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {revenueByMonth.map((data, idx) => {
                    const prevRevenue = idx > 0 ? revenueByMonth[idx - 1].revenue : data.revenue
                    const growth = ((data.revenue - prevRevenue) / prevRevenue * 100).toFixed(1)
                    const maxRevenue = Math.max(...revenueByMonth.map(d => d.revenue))
                    const percentage = (data.revenue / maxRevenue) * 100

                    return (
                      <div key={data.month} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{data.month}</span>
                          <div className="flex items-center gap-3">
                            {idx > 0 && (
                              <span className={`text-xs flex items-center gap-1 ${
                                parseFloat(growth) > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {parseFloat(growth) > 0 ? (
                                  <TrendingUp className="h-3 w-3" />
                                ) : (
                                  <TrendingDown className="h-3 w-3" />
                                )}
                                {growth}%
                              </span>
                            )}
                            <span className="text-sm font-bold">R$ {data.revenue.toLocaleString()}</span>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Média Mensal</p>
                    <p className="text-lg font-bold">
                      R$ {Math.round(revenueByMonth.reduce((sum, d) => sum + d.revenue, 0) / revenueByMonth.length).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Maior Mês</p>
                    <p className="text-lg font-bold">
                      R$ {Math.max(...revenueByMonth.map(d => d.revenue)).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Crescimento Total</p>
                    <p className="text-lg font-bold text-green-600">
                      {(((revenueByMonth[revenueByMonth.length - 1].revenue - revenueByMonth[0].revenue) / revenueByMonth[0].revenue) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Plano</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Enterprise (R$ 2.500)</span>
                      <span className="text-sm font-semibold">1 cliente</span>
                    </div>
                    <Progress value={20} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Professional (R$ 1.500)</span>
                      <span className="text-sm font-semibold">2 clientes</span>
                    </div>
                    <Progress value={40} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Basic (R$ 799)</span>
                      <span className="text-sm font-semibold">1 cliente</span>
                    </div>
                    <Progress value={20} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Trial (R$ 0)</span>
                      <span className="text-sm font-semibold">1 cliente</span>
                    </div>
                    <Progress value={20} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Métricas Financeiras</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">LTV Médio</span>
                    <span className="text-lg font-bold">R$ 42.000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">CAC Médio</span>
                    <span className="text-lg font-bold">R$ 3.200</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">Churn Rate</span>
                    <span className="text-lg font-bold text-green-600">2.3%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm">LTV/CAC Ratio</span>
                    <span className="text-lg font-bold text-green-600">13.1x</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upsell" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Oportunidades de Upsell</CardTitle>
                <CardDescription>
                  Clínicas prontas para upgrade baseado em uso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upsellOpportunities.map((clinic) => {
                    let recommendation = ''
                    let potentialRevenue = 0
                    
                    if (clinic.status === 'trial' && clinic.appointments > 20) {
                      recommendation = 'Trial muito ativo - converter para plano pago'
                      potentialRevenue = 799
                    } else if (clinic.plan === 'Basic' && clinic.users > 10) {
                      recommendation = 'Limite de usuários próximo - oferecer Professional'
                      potentialRevenue = 700
                    } else if (clinic.plan === 'Professional' && clinic.users > 25) {
                      recommendation = 'Alto volume - oferecer Enterprise'
                      potentialRevenue = 1000
                    }

                    return (
                      <div key={clinic.id} className="p-4 border rounded-lg border-green-200 bg-green-50/30 dark:border-green-900 dark:bg-green-950/20">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                              <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="font-semibold">{clinic.name}</p>
                              <p className="text-sm text-muted-foreground">Plano atual: {clinic.plan}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700">
                            +R$ {potentialRevenue}/mês
                          </Badge>
                        </div>

                        <p className="text-sm mb-4 text-muted-foreground">{recommendation}</p>

                        <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-background rounded-lg">
                          <div>
                            <p className="text-xs text-muted-foreground">Usuários</p>
                            <p className="text-lg font-semibold">{clinic.users}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Pacientes</p>
                            <p className="text-lg font-semibold">{clinic.patients}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Agendamentos</p>
                            <p className="text-lg font-semibold">{clinic.appointments}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            Oferecer Upgrade
                          </Button>
                          <Button size="sm" variant="outline">Ver Histórico</Button>
                        </div>
                      </div>
                    )
                  })}

                  {upsellOpportunities.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Zap className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Nenhuma oportunidade de upsell no momento</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Potencial de Receita</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Receita Atual (MRR)</p>
                      <p className="text-2xl font-bold">R$ {totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Potencial com Upsells</p>
                      <p className="text-2xl font-bold text-green-600">
                        R$ {(totalRevenue + upsellOpportunities.length * 700).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        +R$ {(upsellOpportunities.length * 700).toLocaleString()} mensais
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ações Recomendadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Contatar trials ativos</p>
                      <p className="text-xs text-muted-foreground">
                        {trialClinics.length} clínica(s) engajada(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Oferecer upgrade por uso</p>
                      <p className="text-xs text-muted-foreground">
                        {clinicsData.filter(c => c.plan === 'Basic' && c.users > 10).length} clínica(s) próxima(s) do limite
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Recuperar clientes em atraso</p>
                      <p className="text-xs text-muted-foreground">
                        {overdueClinics.length} cobrança(s) pendente(s)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
