import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DollarSign, TrendingUp, TrendingDown, Calendar, CreditCard, Wallet } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function FinancialPage() {
  return (
    <DashboardLayout allowedRoles={['CLINIC_ADMIN']}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-muted-foreground">Gerencie receitas, despesas e comissões</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita do Mês</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">R$ 48.200</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +15% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesas do Mês</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">R$ 12.450</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                -5% vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 35.750</div>
              <p className="text-xs text-muted-foreground">Margem: 74%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">A Receber</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">R$ 8.900</div>
              <p className="text-xs text-muted-foreground">24 pendências</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="commissions">Comissões</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Últimas Transações</CardTitle>
                  <Button variant="outline">Adicionar Transação</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: '16/11/2025', description: 'Limpeza de Pele - Maria Silva', value: 150, type: 'income', method: 'Cartão', status: 'paid' },
                    { date: '16/11/2025', description: 'Massagem - João Santos', value: 200, type: 'income', method: 'Pix', status: 'paid' },
                    { date: '15/11/2025', description: 'Compra de Produtos', value: -450, type: 'expense', method: 'Boleto', status: 'paid' },
                    { date: '15/11/2025', description: 'Drenagem - Ana Costa', value: 180, type: 'income', method: 'Dinheiro', status: 'paid' },
                    { date: '14/11/2025', description: 'Aluguel', value: -2500, type: 'expense', method: 'Transferência', status: 'paid' },
                  ].map((transaction, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <DollarSign className={`h-5 w-5 ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{transaction.date}</span>
                            <span>•</span>
                            <span>{transaction.method}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold text-lg ${
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          R$ {Math.abs(transaction.value).toFixed(2)}
                        </p>
                        <Badge variant="outline">Pago</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Comissões dos Profissionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Dr. Pedro Lima', appointments: 18, revenue: 4500, commission: 2250, percentage: 50 },
                    { name: 'Dra. Carla Mendes', appointments: 24, revenue: 6750, commission: 3375, percentage: 50 },
                    { name: 'Ana Paula Silva', appointments: 20, revenue: 6400, commission: 3200, percentage: 50 },
                  ].map((prof, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{prof.name}</h3>
                          <p className="text-sm text-muted-foreground">{prof.appointments} atendimentos este mês</p>
                        </div>
                        <Badge>{prof.percentage}% comissão</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Faturamento Gerado</p>
                          <p className="text-xl font-bold">R$ {prof.revenue.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Comissão a Pagar</p>
                          <p className="text-xl font-bold text-green-600">R$ {prof.commission.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Financeiros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <DollarSign className="h-8 w-8" />
                    <span>Relatório de Receitas</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Wallet className="h-8 w-8" />
                    <span>Relatório de Despesas</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <CreditCard className="h-8 w-8" />
                    <span>Métodos de Pagamento</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <TrendingUp className="h-8 w-8" />
                    <span>Análise de Crescimento</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
