'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bell, Send, Clock, CheckCircle2, XCircle, MessageSquare, Mail, Phone, Plus, Edit, Trash2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

export default function NotificationsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  // Mock data - replace with real API
  const notifications = [
    {
      id: '1',
      type: 'whatsapp',
      status: 'sent',
      recipient: 'Maria Silva',
      phone: '(11) 98765-4321',
      message: 'Olá Maria! Lembramos que você tem consulta amanhã às 14h com Dra. Carla.',
      sentAt: '2025-11-16T10:30:00',
      template: 'Lembrete 24h'
    },
    {
      id: '2',
      type: 'email',
      status: 'sent',
      recipient: 'João Santos',
      email: 'joao@email.com',
      subject: 'Confirmação de Agendamento',
      message: 'Seu agendamento foi confirmado para 18/11/2025 às 10h.',
      sentAt: '2025-11-16T09:15:00',
      template: 'Confirmação'
    },
    {
      id: '3',
      type: 'sms',
      status: 'delivered',
      recipient: 'Ana Costa',
      phone: '(11) 91234-5678',
      message: 'Seu horário está confirmado! 17/11 às 15h.',
      sentAt: '2025-11-15T16:45:00',
      template: 'Lembrete 2h'
    },
    {
      id: '4',
      type: 'whatsapp',
      status: 'failed',
      recipient: 'Carlos Oliveira',
      phone: '(11) 99876-5432',
      message: 'Lembramos que você tem consulta hoje às 11h.',
      sentAt: '2025-11-16T08:00:00',
      template: 'Lembrete 2h',
      error: 'Número inválido'
    }
  ]

  const templates = [
    {
      id: '1',
      name: 'Confirmação de Agendamento',
      type: 'whatsapp',
      active: true,
      message: 'Olá {nome}! Seu agendamento foi confirmado para {data} às {hora} com {profissional}. Local: {clinica}. Em caso de dúvidas, ligue: {telefone}',
      variables: ['nome', 'data', 'hora', 'profissional', 'clinica', 'telefone']
    },
    {
      id: '2',
      name: 'Lembrete 24h Antes',
      type: 'whatsapp',
      active: true,
      message: 'Olá {nome}! Lembramos que você tem consulta amanhã às {hora} com {profissional}. Nos vemos em breve!',
      variables: ['nome', 'hora', 'profissional']
    },
    {
      id: '3',
      name: 'Lembrete 2h Antes',
      type: 'sms',
      active: true,
      message: 'Lembrete: Sua consulta é hoje às {hora}. {clinica} - {endereco}',
      variables: ['hora', 'clinica', 'endereco']
    },
    {
      id: '4',
      name: 'Agradecimento Pós-Consulta',
      type: 'email',
      active: false,
      subject: 'Obrigado pela sua visita!',
      message: 'Olá {nome}, obrigado por nos visitar! Esperamos que tenha tido uma ótima experiência. Avalie seu atendimento: {link_avaliacao}',
      variables: ['nome', 'link_avaliacao']
    }
  ]

  const stats = {
    sent: 1245,
    delivered: 1198,
    failed: 47,
    pending: 12
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
      case 'delivered':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      sent: { label: 'Enviado', className: 'bg-blue-100 text-blue-800' },
      delivered: { label: 'Entregue', className: 'bg-green-100 text-green-800' },
      failed: { label: 'Falhou', className: 'bg-red-100 text-red-800' },
      pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' }
    }
    const variant = variants[status] || variants.sent
    return <Badge className={variant.className}>{variant.label}</Badge>
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4 text-green-600" />
      case 'email':
        return <Mail className="h-4 w-4 text-blue-600" />
      case 'sms':
        return <Phone className="h-4 w-4 text-purple-600" />
      default:
        return null
    }
  }

  const formatDateTime = (dateStr: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateStr))
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Notificações</h2>
          <p className="text-muted-foreground">
            Gerencie notificações e templates de mensagens
          </p>
        </div>
        <Button className="bg-[#0FA958] hover:bg-[#0d8f4a]">
          <Send className="mr-2 h-4 w-4" />
          Enviar Notificação
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enviadas</CardTitle>
            <Send className="h-4 w-4 text-[#0FA958]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sent}</div>
            <p className="text-xs text-muted-foreground">Último mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entregues</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.delivered}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.delivered / stats.sent) * 100).toFixed(1)}% taxa de entrega
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Falhas</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.failed}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.failed / stats.sent) * 100).toFixed(1)}% taxa de falha
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Na fila de envio</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="send">Enviar Nova</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Histórico de Notificações</CardTitle>
                  <CardDescription>Últimas notificações enviadas</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">E-mail</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos status</SelectItem>
                      <SelectItem value="sent">Enviados</SelectItem>
                      <SelectItem value="delivered">Entregues</SelectItem>
                      <SelectItem value="failed">Falhos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{notification.recipient}</p>
                        {getStatusBadge(notification.status)}
                        <Badge variant="outline" className="text-xs">
                          {notification.template}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {notification.type === 'email' && notification.subject && (
                          <span className="font-medium">Assunto: {notification.subject}<br /></span>
                        )}
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{formatDateTime(notification.sentAt)}</span>
                        <span>•</span>
                        <span>{notification.phone || notification.email}</span>
                        {notification.error && (
                          <>
                            <span>•</span>
                            <span className="text-red-600">{notification.error}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(notification.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Templates de Mensagens</CardTitle>
                  <CardDescription>Crie e edite templates reutilizáveis</CardDescription>
                </div>
                <Button className="bg-[#0FA958] hover:bg-[#0d8f4a]">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(template.type)}
                        <div>
                          <h3 className="font-semibold">{template.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {template.type.toUpperCase()}
                            </Badge>
                            <Switch checked={template.active} />
                            <span className="text-xs text-muted-foreground">
                              {template.active ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                    
                    {template.subject && (
                      <div className="mb-2">
                        <p className="text-xs text-muted-foreground">Assunto:</p>
                        <p className="text-sm font-medium">{template.subject}</p>
                      </div>
                    )}
                    
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Mensagem:</p>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{template.message}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Variáveis disponíveis:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.variables.map((variable) => (
                          <code key={variable} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {'{'}{variable}{'}'}
                          </code>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enviar Nova Notificação</CardTitle>
              <CardDescription>Envie uma notificação manual para pacientes</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notification-type">Tipo de Notificação *</Label>
                  <Select>
                    <SelectTrigger id="notification-type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">E-mail</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">Template (opcional)</Label>
                  <Select>
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Usar um template existente" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipients">Destinatários *</Label>
                  <Textarea
                    id="recipients"
                    placeholder="Digite os números/emails separados por vírgula ou selecione pacientes..."
                    rows={3}
                  />
                  <Button type="button" variant="outline" size="sm">
                    Selecionar Pacientes
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto (para e-mail)</Label>
                  <Input id="subject" placeholder="Assunto da mensagem" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    placeholder="Digite sua mensagem..."
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    Você pode usar variáveis como: nome, data, hora, profissional
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="schedule" />
                  <Label htmlFor="schedule">Agendar envio</Label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="bg-[#0FA958] hover:bg-[#0d8f4a]">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Agora
                  </Button>
                  <Button variant="outline">
                    Testar Envio
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
