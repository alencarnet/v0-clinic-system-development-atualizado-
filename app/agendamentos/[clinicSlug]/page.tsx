'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, Building2, Package, Search, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Clinic {
  id: string
  name: string
  slug: string
  logo: string
  primaryColor: string
  secondaryColor: string
  phone: string
  email: string
  address: string
  description: string
}

interface Service {
  id: string
  name: string
  slug: string
  description: string
  duration: number
  price: number
  category: string
}

interface Package {
  id: string
  name: string
  slug: string
  description: string
  duration: number
  price: number
  sessions: number
  services: string[]
}

interface Professional {
  id: string
  name: string
  specialty: string
  photo: string
}

export default function PublicBookingPage({ params }: { params: { clinicSlug: string } }) {
  const [loading, setLoading] = useState(true)
  const [clinic, setClinic] = useState<Clinic | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [packages, setPackages] = useState<Package[]>([])
  const [professionals, setProfessionals] = useState<Professional[]>([])
  
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<'all' | 'services' | 'packages'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookingComplete, setBookingComplete] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // Load clinic info
        const clinicRes = await fetch(`/api/public/clinic/${params.clinicSlug}`)
        if (!clinicRes.ok) throw new Error('Clinic not found')
        const clinicData = await clinicRes.json()
        setClinic(clinicData)

        // Load services
        const servicesRes = await fetch(`/api/public/services?clinicSlug=${params.clinicSlug}`)
        const servicesData = await servicesRes.json()
        setServices(servicesData)

        // Load packages
        const packagesRes = await fetch(`/api/public/packages?clinicSlug=${params.clinicSlug}`)
        const packagesData = await packagesRes.json()
        setPackages(packagesData)

        // Load professionals
        const professionalsRes = await fetch(`/api/public/professionals?clinicSlug=${params.clinicSlug}`)
        const professionalsData = await professionalsRes.json()
        setProfessionals(professionalsData)

        if (clinicData) {
          document.documentElement.style.setProperty('--clinic-primary', clinicData.primaryColor)
          document.documentElement.style.setProperty('--clinic-secondary', clinicData.secondaryColor)
        }
      } catch (error) {
        console.error('Error loading booking page:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params.clinicSlug])

  const allItems = [...services.map(s => ({ ...s, type: 'service' as const })), ...packages.map(p => ({ ...p, type: 'package' as const }))]
  
  const filteredItems = allItems.filter(item => {
    const matchesType = filterType === 'all' || 
                       (filterType === 'services' && item.type === 'service') ||
                       (filterType === 'packages' && item.type === 'package')
    
    const matchesSearch = searchTerm === '' || 
                         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesType && matchesSearch
  })

  const availableDates = [
    '2025-11-18',
    '2025-11-19',
    '2025-11-20',
    '2025-11-21',
    '2025-11-22',
    '2025-11-25',
    '2025-11-26',
    '2025-11-27'
  ]

  const availableTimes = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00')
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }).format(date)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingComplete(true)
  }

  if (loading || !clinic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[var(--clinic-primary)] mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
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
                Seu agendamento foi realizado com sucesso. Você receberá uma confirmação por WhatsApp e e-mail em breve.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg text-left space-y-2">
                <p className="text-sm font-medium text-gray-900">Detalhes do Agendamento:</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>{selectedItem?.type === 'package' ? 'Pacote' : 'Serviço'}:</strong> {selectedItem?.name}</p>
                  <p><strong>Profissional:</strong> {professionals.find(p => p.id === selectedProfessional)?.name}</p>
                  <p><strong>Data:</strong> {selectedDate && formatDate(selectedDate)} às {selectedTime}</p>
                  <p><strong>Local:</strong> {clinic.name}</p>
                  <p><strong>Endereço:</strong> {clinic.address}</p>
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
      {/* Header with dynamic branding */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: clinic.primaryColor }}>
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{clinic.name}</h1>
              <p className="text-sm text-gray-600">Agende online 24h por dia</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{clinic.phone}</span>
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
                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors"
                  style={{
                    backgroundColor: step >= s.num ? clinic.primaryColor : '#e5e7eb',
                    color: step >= s.num ? 'white' : '#6b7280'
                  }}
                >
                  {s.num}
                </div>
                <span className="text-xs mt-1 text-gray-600 hidden sm:block">{s.label}</span>
              </div>
              {s.num < 4 && (
                <div
                  className="h-1 flex-1 transition-colors"
                  style={{
                    backgroundColor: step > s.num ? clinic.primaryColor : '#e5e7eb'
                  }}
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
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar serviço ou pacote..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setFilterType(v as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">Todos ({allItems.length})</TabsTrigger>
                  <TabsTrigger value="services">Serviços ({services.length})</TabsTrigger>
                  <TabsTrigger value="packages">Pacotes ({packages.length})</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="grid gap-4 md:grid-cols-2">
                {filteredItems.length === 0 ? (
                  <div className="col-span-2 text-center py-8 text-gray-500">
                    Nenhum resultado encontrado
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedService(item.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedService === item.id
                          ? 'bg-green-50'
                          : 'border-gray-200'
                      }`}
                      style={{
                        borderColor: selectedService === item.id ? clinic.primaryColor : undefined
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          {item.type === 'package' && (
                            <Package className="h-4 w-4" style={{ color: clinic.primaryColor }} />
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
                      
                      <p className="text-xl font-bold" style={{ color: clinic.primaryColor }}>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price / 100)}
                      </p>
                    </div>
                  ))
                )}
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
                        ? 'bg-green-50'
                        : 'border-gray-200'
                    }`}
                    style={{
                      borderColor: selectedProfessional === prof.id ? clinic.primaryColor : undefined
                    }}
                  >
                    <Avatar className="h-16 w-16">
                      <AvatarFallback style={{ backgroundColor: clinic.primaryColor, color: 'white' }} className="text-lg">
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
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {availableDates.map((date) => (
                      <button
                        key={date}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 border-2 rounded-lg text-center transition-all ${
                          selectedDate === date
                            ? 'bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{
                          borderColor: selectedDate === date ? clinic.primaryColor : undefined
                        }}
                      >
                        <div className="text-xs font-medium">{formatDate(date)}</div>
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
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 border-2 rounded-lg text-center font-medium transition-all ${
                            selectedTime === time
                              ? 'bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{
                            borderColor: selectedTime === time ? clinic.primaryColor : undefined
                          }}
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
              <CardDescription>Preencha suas informações para confirmar o agendamento</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input id="name" placeholder="Digite seu nome completo" required />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone/WhatsApp *</Label>
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
                    placeholder="Alguma informação adicional que devemos saber? (opcional)"
                    rows={3}
                  />
                </div>

                <div className="border p-4 rounded-lg space-y-2" style={{ borderColor: clinic.primaryColor, backgroundColor: `${clinic.primaryColor}10` }}>
                  <p className="font-semibold text-sm text-gray-900">Resumo do Agendamento:</p>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p><strong>{allItems.find(s => s.id === selectedService)?.type === 'package' ? 'Pacote' : 'Serviço'}:</strong> {allItems.find(s => s.id === selectedService)?.name}</p>
                    <p><strong>Profissional:</strong> {professionals.find(p => p.id === selectedProfessional)?.name}</p>
                    <p><strong>Data:</strong> {selectedDate && formatDate(selectedDate)} às {selectedTime}</p>
                    <p className="font-semibold text-base pt-1" style={{ color: clinic.primaryColor }}>
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
