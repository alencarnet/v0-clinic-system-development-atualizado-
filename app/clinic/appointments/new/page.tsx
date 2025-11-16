'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Search, Repeat, CalendarIcon, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function NewAppointmentPage() {
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurrenceType, setRecurrenceType] = useState('weekly')
  const [recurrenceCount, setRecurrenceCount] = useState(4)
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([])
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('2025-11-16')
  const [selectedTime, setSelectedTime] = useState('')
  const [hasConflict, setHasConflict] = useState(false)

  const weekdays = [
    { value: 1, label: 'Seg' },
    { value: 2, label: 'Ter' },
    { value: 3, label: 'Qua' },
    { value: 4, label: 'Qui' },
    { value: 5, label: 'Sex' },
    { value: 6, label: 'Sáb' },
    { value: 0, label: 'Dom' }
  ]

  const toggleWeekday = (day: number) => {
    setSelectedWeekdays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const checkConflict = () => {
    // Simulate conflict check
    setHasConflict(selectedTime === '10:00')
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link href="/clinic/appointments">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Novo Agendamento</h1>
          <p className="text-muted-foreground">Agende um novo atendimento</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selecionar Paciente</CardTitle>
              <CardDescription>Busque ou cadastre um novo paciente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient-search">Buscar Paciente</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="patient-search" 
                    placeholder="Digite nome, CPF ou telefone..."
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">OU</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <Button variant="outline" className="w-full">
                Cadastrar Novo Paciente
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Agendamento</CardTitle>
              <CardDescription>Configure data, horário e serviço</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Data *</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Horário *</Label>
                  <Select value={selectedTime} onValueChange={(val) => { setSelectedTime(val); checkConflict(); }}>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00">08:00</SelectItem>
                      <SelectItem value="09:00">09:00</SelectItem>
                      <SelectItem value="10:00">10:00 (Conflito!)</SelectItem>
                      <SelectItem value="11:00">11:00</SelectItem>
                      <SelectItem value="14:00">14:00</SelectItem>
                      <SelectItem value="15:00">15:00</SelectItem>
                      <SelectItem value="16:00">16:00</SelectItem>
                      <SelectItem value="17:00">17:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {hasConflict && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Conflito detectado: Já existe um agendamento para este horário com o mesmo profissional.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="service">Serviço *</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Selecione o serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="limpeza">Limpeza de Pele Profunda (60 min - R$ 150)</SelectItem>
                    <SelectItem value="massagem">Massagem Relaxante (90 min - R$ 200)</SelectItem>
                    <SelectItem value="drenagem">Drenagem Linfática (60 min - R$ 180)</SelectItem>
                    <SelectItem value="peeling">Peeling Químico (45 min - R$ 250)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="professional">Profissional *</Label>
                <Select>
                  <SelectTrigger id="professional">
                    <SelectValue placeholder="Selecione o profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pedro">Dr. Pedro Lima</SelectItem>
                    <SelectItem value="carla">Dra. Carla Mendes</SelectItem>
                    <SelectItem value="ana">Ana Paula Silva</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea 
                  id="notes"
                  rows={3}
                  placeholder="Adicione observações sobre o agendamento..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Repeat className="h-5 w-5 text-[#0FA958]" />
                    Agendamento Recorrente
                  </CardTitle>
                  <CardDescription>Configure agendamentos que se repetem</CardDescription>
                </div>
                <Switch checked={isRecurring} onCheckedChange={setIsRecurring} />
              </div>
            </CardHeader>
            
            {isRecurring && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tipo de Recorrência</Label>
                  <RadioGroup value={recurrenceType} onValueChange={setRecurrenceType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly" className="font-normal cursor-pointer">
                        Semanal
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="biweekly" id="biweekly" />
                      <Label htmlFor="biweekly" className="font-normal cursor-pointer">
                        Quinzenal
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly" className="font-normal cursor-pointer">
                        Mensal
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {recurrenceType === 'weekly' && (
                  <div className="space-y-2">
                    <Label>Dias da Semana</Label>
                    <div className="flex gap-2">
                      {weekdays.map((day) => (
                        <button
                          key={day.value}
                          onClick={() => toggleWeekday(day.value)}
                          className={`h-10 w-10 rounded-full border-2 text-sm font-medium transition-colors ${
                            selectedWeekdays.includes(day.value)
                              ? 'bg-[#0FA958] text-white border-[#0FA958]'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-[#0FA958]'
                          }`}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="recurrence-count">Número de Repetições</Label>
                  <Input
                    id="recurrence-count"
                    type="number"
                    min="1"
                    max="52"
                    value={recurrenceCount}
                    onChange={(e) => setRecurrenceCount(parseInt(e.target.value) || 1)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Serão criados {recurrenceCount} agendamentos
                  </p>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex gap-2">
                    <CalendarIcon className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-medium mb-1">Preview da Recorrência:</p>
                      <p className="text-xs">
                        {recurrenceType === 'weekly' && 'Toda semana'}
                        {recurrenceType === 'biweekly' && 'A cada 2 semanas'}
                        {recurrenceType === 'monthly' && 'Todo mês'}
                        {selectedWeekdays.length > 0 && ` nas ${selectedWeekdays.map(d => weekdays.find(w => w.value === d)?.label).join(', ')}`}
                        , até {recurrenceCount} sessões
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Configure lembretes para o paciente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label>Enviar confirmação por WhatsApp</Label>
                  <p className="text-xs text-muted-foreground">Imediatamente após agendar</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label>Lembrete 24h antes</Label>
                  <p className="text-xs text-muted-foreground">WhatsApp + E-mail</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label>Lembrete 2h antes</Label>
                  <p className="text-xs text-muted-foreground">Apenas WhatsApp</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 pb-4 border-b">
                <p className="text-sm text-muted-foreground">Paciente</p>
                <p className="font-medium">Nenhum selecionado</p>
              </div>

              <div className="space-y-2 pb-4 border-b">
                <p className="text-sm text-muted-foreground">Serviço</p>
                <p className="font-medium">{selectedService || '-'}</p>
                <p className="text-sm">Duração: {selectedService ? '60 min' : '-'}</p>
              </div>

              <div className="space-y-2 pb-4 border-b">
                <p className="text-sm text-muted-foreground">Profissional</p>
                <p className="font-medium">-</p>
              </div>

              <div className="space-y-2 pb-4 border-b">
                <p className="text-sm text-muted-foreground">Data e Horário</p>
                <p className="font-medium">{selectedDate && selectedTime ? `${selectedDate} às ${selectedTime}` : '-'}</p>
                {isRecurring && (
                  <Badge variant="secondary" className="mt-1">
                    <Repeat className="h-3 w-3 mr-1" />
                    Recorrente ({recurrenceCount}x)
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold">
                  {selectedService ? (isRecurring ? `R$ ${(150 * recurrenceCount).toFixed(2)}` : 'R$ 150,00') : 'R$ 0,00'}
                </p>
                {isRecurring && selectedService && (
                  <p className="text-xs text-muted-foreground">
                    R$ 150,00 × {recurrenceCount} sessões
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status do Agendamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status Inicial</Label>
                <Select defaultValue="pending">
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="confirmed">Confirmado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment">Status do Pagamento</Label>
                <Select defaultValue="pending">
                  <SelectTrigger id="payment">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="paid">Pago</SelectItem>
                    <SelectItem value="partial">Parcial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button className="w-full bg-[#0FA958] hover:bg-[#0d8f4a]" disabled={hasConflict}>
              {isRecurring ? `Criar ${recurrenceCount} Agendamentos` : 'Criar Agendamento'}
            </Button>
            <Link href="/clinic/appointments">
              <Button variant="outline" className="w-full">Cancelar</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
