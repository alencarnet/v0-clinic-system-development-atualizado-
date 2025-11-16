'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Save, Shield, Bell, Database, Mail, Globe, CreditCard, FileText, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    allowNewRegistrations: true,
    requireEmailVerification: true,
    twoFactorAuth: false,
    sessionTimeout: '30',
    maxLoginAttempts: '5',
    passwordExpiry: '90',
    emailNotifications: true,
    smsNotifications: false,
    backupFrequency: 'daily',
    dataRetention: '365',
    systemName: 'White Label Clinic System',
    systemUrl: 'https://clinic.example.com',
    defaultLanguage: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY',
    currency: 'BRL',
    defaultTrialDays: '30',
    autoExpireAccess: true,
    sendExpirationWarning: true,
    expirationWarningDays: '7',
  })

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  const handleSave = () => {
    setSaveStatus('saving')
    console.log('[v0] Saving settings:', settings)
    
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }, 1000)
  }

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  return (
    <DashboardLayout allowedRoles={['MASTER_ADMIN']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
            <p className="text-muted-foreground">Gerencie as configurações globais do sistema</p>
          </div>
          <Button onClick={handleSave} className="gap-2" disabled={saveStatus === 'saving'}>
            <Save className="h-4 w-4" />
            {saveStatus === 'saving' ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>

        {saveStatus === 'success' && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Configurações salvas com sucesso!
            </AlertDescription>
          </Alert>
        )}

        {saveStatus === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Erro ao salvar configurações. Tente novamente.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="gap-2">
              <Globe className="h-4 w-4" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Segurança
            </TabsTrigger>
            <TabsTrigger value="access" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Acesso
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="database" className="gap-2">
              <Database className="h-4 w-4" />
              Banco
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>Informações básicas do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="systemName">Nome do Sistema</Label>
                    <Input 
                      id="systemName"
                      value={settings.systemName}
                      onChange={(e) => setSettings(prev => ({ ...prev, systemName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="systemUrl">URL do Sistema</Label>
                    <Input 
                      id="systemUrl"
                      value={settings.systemUrl}
                      onChange={(e) => setSettings(prev => ({ ...prev, systemUrl: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Idioma Padrão</Label>
                    <Select 
                      value={settings.defaultLanguage}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, defaultLanguage: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <Select 
                      value={settings.timezone}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                        <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Formato de Data</Label>
                    <Select 
                      value={settings.dateFormat}
                      onValueChange={(value) => setSettings(prev => ({ ...prev, dateFormat: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Moeda Padrão</Label>
                  <Select 
                    value={settings.currency}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real (R$)</SelectItem>
                      <SelectItem value="USD">Dólar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termos e Políticas</CardTitle>
                <CardDescription>Documentos legais do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="termsOfService">Termos de Serviço</Label>
                  <Textarea 
                    id="termsOfService"
                    placeholder="Cole aqui os termos de serviço..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="privacyPolicy">Política de Privacidade</Label>
                  <Textarea 
                    id="privacyPolicy"
                    placeholder="Cole aqui a política de privacidade..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Segurança</CardTitle>
                <CardDescription>Gerencie as políticas de segurança do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Modo de Manutenção</Label>
                    <p className="text-sm text-muted-foreground">Desabilita acesso de todos os usuários exceto admins</p>
                  </div>
                  <Switch 
                    checked={settings.maintenanceMode}
                    onCheckedChange={() => toggleSetting('maintenanceMode')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Permitir Novos Cadastros</Label>
                    <p className="text-sm text-muted-foreground">Permite que novas clínicas se cadastrem</p>
                  </div>
                  <Switch 
                    checked={settings.allowNewRegistrations}
                    onCheckedChange={() => toggleSetting('allowNewRegistrations')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Verificação de Email Obrigatória</Label>
                    <p className="text-sm text-muted-foreground">Usuários devem verificar email antes de acessar</p>
                  </div>
                  <Switch 
                    checked={settings.requireEmailVerification}
                    onCheckedChange={() => toggleSetting('requireEmailVerification')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">Requer 2FA para todos os usuários</p>
                  </div>
                  <Switch 
                    checked={settings.twoFactorAuth}
                    onCheckedChange={() => toggleSetting('twoFactorAuth')}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Timeout de Sessão (minutos)</Label>
                    <Input 
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Máximo de Tentativas de Login</Label>
                    <Input 
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => setSettings(prev => ({ ...prev, maxLoginAttempts: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordExpiry">Expiração de Senha (dias)</Label>
                    <Input 
                      id="passwordExpiry"
                      type="number"
                      value={settings.passwordExpiry}
                      onChange={(e) => setSettings(prev => ({ ...prev, passwordExpiry: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Acesso</CardTitle>
                <CardDescription>Gerencie as regras de acesso e validade das clínicas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultTrialDays">Dias de Teste Grátis Padrão</Label>
                  <Input 
                    id="defaultTrialDays"
                    type="number"
                    value={settings.defaultTrialDays}
                    onChange={(e) => setSettings(prev => ({ ...prev, defaultTrialDays: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Número de dias padrão para período de teste gratuito ao criar nova clínica
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Expirar Acesso Automaticamente</Label>
                    <p className="text-sm text-muted-foreground">Bloqueia acesso automaticamente após data de validade</p>
                  </div>
                  <Switch 
                    checked={settings.autoExpireAccess}
                    onCheckedChange={() => toggleSetting('autoExpireAccess')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Enviar Aviso de Expiração</Label>
                    <p className="text-sm text-muted-foreground">Notifica clínicas antes do acesso expirar</p>
                  </div>
                  <Switch 
                    checked={settings.sendExpirationWarning}
                    onCheckedChange={() => toggleSetting('sendExpirationWarning')}
                  />
                </div>

                {settings.sendExpirationWarning && (
                  <div className="space-y-2 ml-8">
                    <Label htmlFor="expirationWarningDays">Dias de Antecedência para Aviso</Label>
                    <Input 
                      id="expirationWarningDays"
                      type="number"
                      value={settings.expirationWarningDays}
                      onChange={(e) => setSettings(prev => ({ ...prev, expirationWarningDays: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Quantos dias antes enviar o aviso de expiração
                    </p>
                  </div>
                )}

                <div className="rounded-lg border p-4 bg-muted/50">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Regras de Acesso Atuais
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Teste Grátis: {settings.defaultTrialDays} dias</li>
                    <li>• Expiração Automática: {settings.autoExpireAccess ? 'Ativada' : 'Desativada'}</li>
                    <li>• Aviso de Expiração: {settings.sendExpirationWarning ? `${settings.expirationWarningDays} dias antes` : 'Desativado'}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas de Acesso</CardTitle>
                <CardDescription>Visão geral dos acessos no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Clínicas Ativas</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <div className="text-sm text-muted-foreground">Expirando em 7 dias</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <div className="text-sm text-muted-foreground">Acesso Expirado</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
                <CardDescription>Gerencie como o sistema envia notificações</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">Envia notificações importantes por email</p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications}
                    onCheckedChange={() => toggleSetting('emailNotifications')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Notificações por SMS</Label>
                    <p className="text-sm text-muted-foreground">Envia notificações importantes por SMS</p>
                  </div>
                  <Switch 
                    checked={settings.smsNotifications}
                    onCheckedChange={() => toggleSetting('smsNotifications')}
                  />
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Tipos de Notificações</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm">Novo Cadastro de Clínica</Label>
                        <p className="text-xs text-muted-foreground">Notifica quando uma nova clínica se cadastra</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm">Acesso Expirado</Label>
                        <p className="text-xs text-muted-foreground">Notifica quando acesso de uma clínica expira</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm">Pagamento Recebido</Label>
                        <p className="text-xs text-muted-foreground">Notifica quando um pagamento é confirmado</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm">Erros Críticos</Label>
                        <p className="text-xs text-muted-foreground">Notifica sobre erros críticos no sistema</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Banco de Dados</CardTitle>
                <CardDescription>Gerencie backups e retenção de dados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Frequência de Backup</Label>
                  <Select 
                    value={settings.backupFrequency}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, backupFrequency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">A cada hora</SelectItem>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Retenção de Dados (dias)</Label>
                  <Input 
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => setSettings(prev => ({ ...prev, dataRetention: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">Por quanto tempo manter dados de logs e auditorias</p>
                </div>

                <div className="rounded-lg border p-4 bg-muted/50">
                  <h4 className="font-medium mb-2">Status do Último Backup</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Data:</span> 20/03/2024 às 14:10</p>
                    <p><span className="font-medium">Tamanho:</span> 2.4 GB</p>
                    <p><span className="font-medium">Duração:</span> 45 segundos</p>
                    <p className="flex items-center gap-1">
                      <span className="font-medium">Status:</span> 
                      <span className="text-green-600 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Sucesso
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid gap-2 md:grid-cols-2">
                  <Button variant="outline" className="w-full">
                    Executar Backup Manual
                  </Button>
                  <Button variant="outline" className="w-full">
                    Verificar Integridade
                  </Button>
                  <Button variant="outline" className="w-full">
                    Restaurar Backup
                  </Button>
                  <Button variant="outline" className="w-full">
                    Histórico de Backups
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Email</CardTitle>
                <CardDescription>Configure o servidor SMTP para envio de emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">Servidor SMTP</Label>
                    <Input id="smtpHost" placeholder="smtp.gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">Porta</Label>
                    <Input id="smtpPort" placeholder="587" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUser">Usuário</Label>
                    <Input id="smtpUser" placeholder="seu-email@gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">Senha</Label>
                    <Input id="smtpPassword" type="password" placeholder="••••••••" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromEmail">Email Remetente</Label>
                  <Input id="fromEmail" placeholder="noreply@suaempresa.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromName">Nome Remetente</Label>
                  <Input id="fromName" placeholder="Sistema de Clínicas" />
                </div>

                <div className="pt-4 grid gap-2">
                  <Button variant="outline" className="w-full">
                    Testar Configuração de Email
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Um email de teste será enviado para verificar a configuração
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
