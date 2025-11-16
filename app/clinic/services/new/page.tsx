'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, LinkIcon, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function NewServicePage() {
  const [serviceName, setServiceName] = useState('')
  const [slug, setSlug] = useState('')
  const [copied, setCopied] = useState(false)

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (value: string) => {
    setServiceName(value)
    if (!slug) {
      setSlug(generateSlug(value))
    }
  }

  const copyUrl = () => {
    const url = `${window.location.origin}/book/bella-estetica/service/${slug}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DashboardLayout allowedRoles={['CLINIC_ADMIN']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/clinic/services">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Novo Serviço</h1>
            <p className="text-muted-foreground">Cadastre um novo serviço oferecido pela clínica</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Dados principais do serviço</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Serviço *</Label>
                  <Input 
                    id="name" 
                    placeholder="Ex: Limpeza de Pele Profunda"
                    value={serviceName}
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
                        placeholder="limpeza-de-pele"
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
                        {`/book/bella-estetica/service/${slug}`}
                      </code>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facial">Estética Facial</SelectItem>
                      <SelectItem value="body">Estética Corporal</SelectItem>
                      <SelectItem value="massage">Massoterapia</SelectItem>
                      <SelectItem value="dermatology">Dermatologia</SelectItem>
                      <SelectItem value="hair">Tricologia</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea 
                    id="description"
                    rows={4}
                    placeholder="Descreva o serviço, benefícios e o que inclui..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Duração e Disponibilidade</CardTitle>
                <CardDescription>Configure tempo e horários do serviço</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração *</Label>
                    <Select defaultValue="60">
                      <SelectTrigger id="duration">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="60">60 minutos</SelectItem>
                        <SelectItem value="90">90 minutos</SelectItem>
                        <SelectItem value="120">120 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interval">Intervalo Após Atendimento</Label>
                    <Select defaultValue="0">
                      <SelectTrigger id="interval">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Sem intervalo</SelectItem>
                        <SelectItem value="5">5 minutos</SelectItem>
                        <SelectItem value="10">10 minutos</SelectItem>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Dias Disponíveis</Label>
                  {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day) => (
                    <div key={day} className="flex items-center gap-2 p-2">
                      <Switch defaultChecked={day !== 'Domingo'} id={day} />
                      <Label htmlFor={day} className="cursor-pointer">{day}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profissionais Responsáveis</CardTitle>
                <CardDescription>Quem pode realizar este serviço</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Selecione os Profissionais *</Label>
                  <div className="space-y-2">
                    {[
                      { name: 'Dr. Pedro Lima', specialty: 'Dermatologista' },
                      { name: 'Dra. Carla Mendes', specialty: 'Fisioterapeuta' },
                      { name: 'Ana Paula Silva', specialty: 'Massoterapeuta' },
                    ].map((prof) => (
                      <div key={prof.name} className="flex items-center gap-3 p-3 border rounded-lg">
                        <Switch />
                        <div>
                          <p className="font-medium">{prof.name}</p>
                          <p className="text-sm text-muted-foreground">{prof.specialty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Valores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      R$
                    </span>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="0,00"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost">Custo (opcional)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      R$
                    </span>
                    <Input 
                      id="cost" 
                      type="number" 
                      placeholder="0,00"
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Custo de produtos/materiais usados
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commission">Comissão (%)</Label>
                  <Input 
                    id="commission" 
                    type="number" 
                    placeholder="0"
                    max="100"
                  />
                  <p className="text-xs text-muted-foreground">
                    Percentual pago ao profissional
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações Adicionais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label>Disponível Online</Label>
                    <p className="text-xs text-muted-foreground">
                      Permitir agendamento pelo site
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label>Requer Preparo</Label>
                    <p className="text-xs text-muted-foreground">
                      Enviar instruções ao paciente
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label>Status Ativo</Label>
                    <p className="text-xs text-muted-foreground">
                      Serviço disponível para agendamento
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button className="w-full">Salvar Serviço</Button>
              <Link href="/clinic/services">
                <Button variant="outline" className="w-full">Cancelar</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
