'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Plus, X, Package, LinkIcon, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default function NewPackagePage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [sessions, setSessions] = useState(1)
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState(0)
  const [packageName, setPackageName] = useState('')
  const [slug, setSlug] = useState('')
  const [copied, setCopied] = useState(false)

  const availableServices = [
    { id: '1', name: 'Botox Frontal', price: 80000 },
    { id: '2', name: 'Preenchimento Labial', price: 120000 },
    { id: '3', name: 'Criolipólise', price: 50000 },
    { id: '4', name: 'Limpeza de Pele', price: 15000 },
    { id: '5', name: 'Drenagem Linfática', price: 12000 },
    { id: '6', name: 'Peeling Químico', price: 25000 }
  ]

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (value: string) => {
    setPackageName(value)
    if (!slug) {
      setSlug(generateSlug(value))
    }
  }

  const copyUrl = () => {
    const url = `${window.location.origin}/book/bella-estetica/package/${slug}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const normalPrice = selectedServices.reduce((acc, serviceId) => {
    const service = availableServices.find(s => s.id === serviceId)
    return acc + (service?.price || 0) * sessions
  }, 0)

  const discountedPrice = normalPrice * (1 - discount / 100)
  const savings = normalPrice - discountedPrice

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link href="/clinic/packages">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Criar Pacote</h2>
          <p className="text-muted-foreground">
            Configure um novo pacote de serviços
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Dados principais do pacote</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Pacote *</Label>
                <Input 
                  id="name" 
                  placeholder="Ex: Pacote Harmonização Completa"
                  value={packageName}
                  onChange={(e) => handleNameChange(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL de Agendamento *</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="slug" 
                      placeholder="pacote-harmonizacao"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  {slug && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={copyUrl}
                    >
                      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
                {slug && (
                  <p className="text-xs text-muted-foreground">
                    Link: <code className="bg-gray-100 px-1 py-0.5 rounded">
                      {`/book/bella-estetica/package/${slug}`}
                    </code>
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o que inclui neste pacote..."
                  rows={3}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sessions">Número de Sessões *</Label>
                  <Input
                    id="sessions"
                    type="number"
                    min="1"
                    value={sessions}
                    onChange={(e) => setSessions(parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validity">Validade (dias) *</Label>
                  <Input
                    id="validity"
                    type="number"
                    min="1"
                    defaultValue="90"
                    placeholder="90"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Serviços Incluídos</CardTitle>
              <CardDescription>Selecione os serviços que fazem parte deste pacote</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {availableServices.map((service) => (
                  <div
                    key={service.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedServices.includes(service.id)
                        ? 'border-[#0FA958] bg-[#0FA958]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.price / 100)}
                        </p>
                      </div>
                      {selectedServices.includes(service.id) && (
                        <div className="h-5 w-5 rounded-full bg-[#0FA958] flex items-center justify-center">
                          <Plus className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedServices.length > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Serviços selecionados:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedServices.map((serviceId) => {
                      const service = availableServices.find(s => s.id === serviceId)
                      return (
                        <Badge key={serviceId} variant="secondary">
                          {service?.name}
                          <button
                            className="ml-1 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleService(serviceId)
                            }}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Precificação</CardTitle>
              <CardDescription>Configure o preço e desconto do pacote</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="discount">Desconto (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">
                  Desconto aplicado sobre o valor total dos serviços
                </p>
              </div>

              <div className="flex items-center justify-between py-2">
                <Label htmlFor="active">Pacote ativo</Label>
                <Switch id="active" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-[#0FA958]" />
                Resumo do Pacote
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sessões:</span>
                  <span className="font-medium">{sessions}x</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Serviços:</span>
                  <span className="font-medium">{selectedServices.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Desconto:</span>
                  <span className="font-medium">{discount}%</span>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Valor normal:</span>
                  <span className="line-through">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(normalPrice / 100)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Valor do pacote:</span>
                  <span className="text-2xl font-bold text-[#0FA958]">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(discountedPrice / 100)}
                  </span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Economia:</span>
                    <span className="text-[#0FA958] font-medium">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(savings / 100)}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4 space-y-2">
                <Button className="w-full bg-[#0FA958] hover:bg-[#0d8f4a]">
                  Criar Pacote
                </Button>
                <Link href="/clinic/packages" className="block">
                  <Button variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
