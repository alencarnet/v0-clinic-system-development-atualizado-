'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Plus, Package, DollarSign, Users, TrendingUp, Clock, Search, MoreVertical, Edit, Trash2, ShoppingCart } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - replace with real API
  const packages = [
    {
      id: '1',
      name: 'Pacote Botox Completo',
      sessions: 3,
      services: ['Botox Frontal', 'Glabela', 'Pés de Galinha'],
      priceCents: 180000,
      discountPercent: 15,
      normalPrice: 211765,
      sold: 12,
      active: true,
      validityDays: 90
    },
    {
      id: '2',
      name: 'Pacote Harmonização Facial',
      sessions: 4,
      services: ['Preenchimento Labial', 'Bigode Chinês', 'Toxina Botulínica'],
      priceCents: 320000,
      discountPercent: 20,
      normalPrice: 400000,
      sold: 8,
      active: true,
      validityDays: 120
    },
    {
      id: '3',
      name: 'Pacote Emagrecimento',
      sessions: 10,
      services: ['Criolipólise', 'Drenagem Linfática'],
      priceCents: 450000,
      discountPercent: 25,
      normalPrice: 600000,
      sold: 15,
      active: true,
      validityDays: 180
    },
    {
      id: '4',
      name: 'Pacote Skin Care Básico',
      sessions: 6,
      services: ['Limpeza de Pele', 'Peeling', 'Hidratação'],
      priceCents: 90000,
      discountPercent: 10,
      normalPrice: 100000,
      sold: 25,
      active: false,
      validityDays: 60
    }
  ]

  const totalRevenue = packages.reduce((acc, pkg) => acc + (pkg.priceCents * pkg.sold), 0)
  const totalSold = packages.reduce((acc, pkg) => acc + pkg.sold, 0)
  const avgTicket = totalSold > 0 ? totalRevenue / totalSold : 0

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Pacotes</h2>
          <p className="text-muted-foreground">
            Crie e gerencie pacotes de serviços com descontos
          </p>
        </div>
        <Link href="/clinic/packages/new">
          <Button className="bg-[#0FA958] hover:bg-[#0d8f4a]">
            <Plus className="mr-2 h-4 w-4" />
            Novo Pacote
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-[#0FA958]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenue / 100)}
            </div>
            <p className="text-xs text-muted-foreground">De vendas de pacotes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacotes Vendidos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-[#0FA958]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSold}</div>
            <p className="text-xs text-muted-foreground">Total de vendas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-[#0FA958]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(avgTicket / 100)}
            </div>
            <p className="text-xs text-muted-foreground">Por pacote vendido</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pacotes Ativos</CardTitle>
            <Package className="h-4 w-4 text-[#0FA958]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{packages.filter(p => p.active).length}</div>
            <p className="text-xs text-muted-foreground">De {packages.length} cadastrados</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Pacotes</CardTitle>
              <CardDescription>Gerencie seus pacotes de serviços</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pacotes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="h-12 w-12 rounded-lg bg-[#0FA958]/10 flex items-center justify-center">
                    <Package className="h-6 w-6 text-[#0FA958]" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{pkg.name}</h3>
                      <Badge variant={pkg.active ? "default" : "secondary"} className={pkg.active ? "bg-[#0FA958]" : ""}>
                        {pkg.active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {pkg.sessions} sessões
                      </span>
                      <span>•</span>
                      <span>Validade: {pkg.validityDays} dias</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {pkg.sold} vendidos
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Serviços: {pkg.services.join(', ')}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#0FA958]">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pkg.priceCents / 100)}
                    </div>
                    <div className="text-xs text-muted-foreground line-through">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pkg.normalPrice / 100)}
                    </div>
                    <Badge variant="secondary" className="mt-1">
                      {pkg.discountPercent}% OFF
                    </Badge>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Vender Pacote
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
