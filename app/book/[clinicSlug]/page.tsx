'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, Building2, Package, Filter } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function PublicBookingPage({ params }: { params: { clinicSlug: string } }) {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<'all' | 'services' | 'packages'>('all')
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookingComplete, setBookingComplete] = useState(false)

  // Mock data - replace with real API based on clinicSlug
  const clinic = {
    name: 'Clínica Bella Estética',
    logo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/clinic-logo-qScQa.jpg',
    primaryColor: '#0FA958',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123 - São Paulo, SP'
  }

  const services = [
    { id: '1', name: 'Limpeza de Pele', duration: 60, price: 15000, description: 'Limpeza profunda com extração', type: 'service' as const },
    { id: '2', name: 'Massagem Relaxante', duration: 90, price: 20000, description: 'Massagem corporal completa', type: 'service' as const },
    { id: '3', name: 'Drenagem Linfática', duration: 60, price: 18000, description: 'Drenagem para reduzir inchaço', type: 'service' as const },
    { id: '4', name: 'Peeling Químico', duration: 45, price: 25000, description: 'Renovação celular profunda', type: 'service' as const }
  ]

  const packages = [
    { 
      id: 'p1', 
      name: 'Pacote Rejuvenescimento', 
      duration: 180, 
      price: 89000, 
      description: 'Botox + Preenchimento + Bioestimulador (3 sessões)',
      type: 'package' as const,
      sessions: 3,
      services: ['Botox', 'Preenchimento Labial', 'Bioestimulador']
    },
    { 
      id: 'p2', 
      name: 'Pacote Corpo Perfeito', 
      duration: 240, 
      price: 149000, 
      description: 'Criolipólise + Drenagem + Radiofrequência (5 sessões)',
      type: 'package' as const,
      sessions: 5,
      services: ['Criolipólise', 'Drenagem Linfática', 'Radiofrequência']
    }
  ]

  const allItems = [...services, ...packages]
  const filteredItems = allItems.filter(item => {
    if (filterType === 'all') return true
    if (filterType === 'services') return item.type === 'service'
    if (filterType === 'packages') return item.type === 'package'
    return true
  })

  const professionals = [
    { id: '1', name: 'Dra. Carla Mendes', specialty: 'Dermatologista', photo: '' },
    { id: '2', name: 'Ana Paula Silva', specialty: 'Esteticista', photo: '' },
    { id: '3', name: 'Dr. Pedro Lima', specialty: 'Fisioterapeuta', photo: '' }
  ]

  const availableDates = [
    '2025-11-18',
    '2025-11-19',
    '2025-11-20',
    '2025-11-21',
    '2025-11-22',
    '2025-11-25'
  ]

  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }).format(date)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingComplete(true)
  }

  if (bookingComplete) {
    const selectedItem = allItems.find(s => s.id === selectedService)
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Agendamento Confirmado!</h2>
              <p className="text-gray-600">
                Seu agendamento foi realizado com sucesso. Você receberá uma confirmação por WhatsApp e e-mail.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2">
                <p className="text-sm font-medium text-gray-900">Detalhes do Agendamento:</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{selectedItem?.type === 'package' ? 'Pacote' : 'Serviço'}: {selectedItem?.name}</p>
                  <p>Profissional: {professionals.find(p => p.id === selectedProfessional)?.name}</p>
                  <p>Data: {selectedDate && formatDate(selectedDate)} às {selectedTime}</p>
                  <p>Local: {clinic.name}</p>
                </div>
              </div>

              <Button 
                className="w-full"
                style={{ backgroundColor: clinic.primaryColor }}
                onClick={() => window.location.reload()}
              >
                Fazer Novo Agendamento
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {clinic.logo ? (
              <img src={clinic.logo || "/placeholder.svg"} alt={clinic.name} className="h-12 w-12 rounded-lg object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-[#0FA958] flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900">{clinic.name}</h1>
              <p className="text-sm text-gray-600">Agende seu horário online 24h</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{clinic.phone}</span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          {[
            { num: 1, label: 'Serviço' },
            { num: 2, label: 'Profissional' },
            { num: 3, label: 'Data/Hora' },
            { num: 4, label: 'Dados' }
          ].map((s) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s.num
                      ? 'bg-[#0FA958] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s.num}
                </div>
                <span className="text-xs mt-1 text-gray-600 hidden sm:block">{s.label}</span>
              </div>
              {s.num < 4 && (
                <div
                  className={`h-1 flex-1 transition-colors ${
                    step > s.num ? 'bg-[#0FA958]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Select Service or Package */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Escolha o Serviço ou Pacote</CardTitle>
              <CardDescription>Selecione o procedimento que deseja realizar</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="mb-6" onValueChange={(v) => setFilterType(v as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="services">Serviços</TabsTrigger>
                  <TabsTrigger value="packages">Pacotes</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid gap-4 md:grid-cols-2">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedService(item.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedService === item.id
                        ? 'border-[#0FA958] bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {item.type === 'package' && (
                          <Package className="h-4 w-4 text-[#0FA958]" />
                        )}
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                      </div>
                      <Badge variant="secondary" className="ml-2">
                        {item.duration} min
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    
                    {item.type === 'package' && 'sessions' in item && (
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs">
                          {item.sessions} sessões incluídas
                        </Badge>
                      </div>
                    )}
                    
                    <p className="text-xl font-bold text-[#0FA958]">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price / 100)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  disabled={!selectedService}
                  onClick={() => setStep(2)}
                  style={{ backgroundColor: clinic.primaryColor }}
                >
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Professional */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Escolha o Profissional</CardTitle>
              <CardDescription>Selecione quem irá realizar o atendimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {professionals.map((prof) => (
                  <div
                    key={prof.id}
                    onClick={() => setSelectedProfessional(prof.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md flex items-center gap-4 ${
                      selectedProfessional === prof.id
                        ? 'border-[#0FA958] bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={prof.photo || "/placeholder.svg"} />
                      <AvatarFallback className="bg-[#0FA958] text-white text-lg">
                        {prof.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{prof.name}</h3>
                      <p className="text-sm text-gray-600">{prof.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Voltar
                </Button>
                <Button
                  disabled={!selectedProfessional}
                  onClick={() => setStep(3)}
                  style={{ backgroundColor: clinic.primaryColor }}
                >
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Select Date and Time */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Escolha Data e Horário</CardTitle>
              <CardDescription>Selecione o melhor dia e hora para você</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Data Disponível</Label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {availableDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 border-2 rounded-lg text-center transition-all ${
                          selectedDate === date
                            ? 'border-[#0FA958] bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-xs text-gray-600">{formatDate(date)}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <Label className="mb-3 block">Horário Disponível</Label>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 border-2 rounded-lg text-center font-medium transition-all ${
                            selectedTime === time
                              ? 'border-[#0FA958] bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Voltar
                </Button>
                <Button
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setStep(4)}
                  style={{ backgroundColor: clinic.primaryColor }}
                >
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Patient Information */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Seus Dados</CardTitle>
              <CardDescription>Preencha suas informações para confirmar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input id="name" placeholder="Digite seu nome" required />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input id="phone" type="tel" placeholder="(11) 98765-4321" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Alguma informação adicional que devemos saber?"
                    rows={3}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="font-medium text-sm">Resumo do Agendamento:</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{allItems.find(s => s.id === selectedService)?.type === 'package' ? 'Pacote' : 'Serviço'}: {allItems.find(s => s.id === selectedService)?.name}</p>
                    <p>Profissional: {professionals.find(p => p.id === selectedProfessional)?.name}</p>
                    <p>Data: {selectedDate && formatDate(selectedDate)} às {selectedTime}</p>
                    <p className="font-semibold text-gray-900">
                      Valor: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((allItems.find(s => s.id === selectedService)?.price || 0) / 100)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(3)}>
                    Voltar
                  </Button>
                  <Button type="submit" style={{ backgroundColor: clinic.primaryColor }}>
                    Confirmar Agendamento
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
