import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, Palette, Building2, Clock, Bell, MessageSquare, DollarSign, LinkIcon, Badge } from 'lucide-react'

export default function ClinicSettingsPage() {
  return (
    <DashboardLayout allowedRoles={['CLINIC_ADMIN']}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações da Clínica</h1>
          <p className="text-muted-foreground">Gerencie a identidade visual e configurações operacionais</p>
        </div>

        <Tabs defaultValue="branding" className="space-y-4">
          <TabsList>
            <TabsTrigger value="branding" className="gap-2">
              <Palette className="h-4 w-4" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="homepage" className="gap-2">
              <Building2 className="h-4 w-4" />
              Página Inicial
            </TabsTrigger>
            <TabsTrigger value="general" className="gap-2">
              <Building2 className="h-4 w-4" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Clock className="h-4 w-4" />
              Horários
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="policies" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Políticas
            </TabsTrigger>
          </TabsList>

          {/* Branding Tab */}
          <TabsContent value="branding" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Identidade Visual (White Label)</CardTitle>
                <CardDescription>
                  Customize a aparência do sistema para refletir a identidade da sua clínica
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label>Logo da Clínica</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input type="file" accept="image/*" />
                      <p className="text-xs text-muted-foreground">
                        Tamanho recomendado: 200x200px. Formatos: JPG, PNG, SVG
                      </p>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="space-y-2">
                  <Label>Preview ao Vivo</Label>
                  <div className="border rounded-lg p-4 bg-background">
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-card">
                      <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">Clínica Exemplo</p>
                        <p className="text-xs text-muted-foreground">Sua logo aparecerá aqui</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Cor Primária</Label>
                    <div className="flex gap-2">
                      <Input type="color" defaultValue="#10b981" className="w-16 h-10" />
                      <Input defaultValue="#10b981" placeholder="#10b981" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Cor principal do sistema (menus, botões)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Cor Secundária</Label>
                    <div className="flex gap-2">
                      <Input type="color" defaultValue="#059669" className="w-16 h-10" />
                      <Input defaultValue="#059669" placeholder="#059669" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Acentos e elementos secundários
                    </p>
                  </div>
                </div>

                {/* Domain */}
                <Card className="border-2 border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <LinkIcon className="h-5 w-5 text-primary" />
                      Configuração de Domínio
                    </CardTitle>
                    <CardDescription>
                      Escolha entre usar um domínio personalizado ou a URL padrão fornecida
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 p-3 border rounded-lg bg-background">
                        <input type="radio" name="domain-type" id="default-domain" defaultChecked className="h-4 w-4" />
                        <div className="flex-1">
                          <Label htmlFor="default-domain" className="font-semibold cursor-pointer">
                            URL Padrão do Sistema (Grátis)
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Usaremos uma URL pública gerada automaticamente
                          </p>
                          <div className="mt-2 p-2 bg-muted rounded font-mono text-sm">
                            https://agendamentos.sistemaclinicas.com/bella-estetica
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 border rounded-lg bg-background">
                        <input type="radio" name="domain-type" id="custom-domain" className="h-4 w-4" />
                        <div className="flex-1">
                          <Label htmlFor="custom-domain" className="font-semibold cursor-pointer flex items-center gap-2">
                            Domínio Personalizado
                            <Badge variant="secondary">Premium</Badge>
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            Use seu próprio domínio (ex: clinicaviviane.com)
                          </p>
                          <div className="mt-3 space-y-3">
                            <div className="space-y-2">
                              <Label className="text-xs">Digite seu domínio:</Label>
                              <Input 
                                placeholder="clinicaviviane.com" 
                                className="font-mono"
                              />
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg text-sm">
                              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                📋 Instruções de Configuração:
                              </p>
                              <ol className="list-decimal ml-4 space-y-1 text-blue-800 dark:text-blue-200">
                                <li>Acesse o painel do seu provedor de domínio</li>
                                <li>Adicione um registro CNAME apontando para: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">agendamentos.sistemaclinicas.com</code></li>
                                <li>Aguarde até 48h para propagação</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Slug do Sistema</p>
                          <p className="text-sm text-muted-foreground">
                            Identificador único usado nas URLs
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            defaultValue="bella-estetica" 
                            className="w-48 font-mono text-sm"
                          />
                          <Button variant="outline" size="sm">Alterar</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full md:w-auto">
                  Salvar Alterações de Branding
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Home Page Builder Tab */}
          <TabsContent value="homepage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personalize sua Página Inicial</CardTitle>
                <CardDescription>
                  Configure o que seus pacientes verão ao acessar seu aplicativo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Banner Configuration */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Banner Principal</h3>
                  
                  <div className="space-y-2">
                    <Label>Imagem do Banner</Label>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                      <Input type="file" accept="image/*" />
                      <p className="text-xs text-muted-foreground mt-2">
                        Tamanho recomendado: 1200x400px
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Título do Banner</Label>
                      <Input defaultValue="Bem-vindo à Clínica Saúde & Estética" />
                    </div>
                    <div className="space-y-2">
                      <Label>Subtítulo</Label>
                      <Input defaultValue="Agende online 24h por dia de qualquer dispositivo" />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <h3 className="font-semibold">Seções da Página</h3>
                  <p className="text-sm text-muted-foreground">
                    Escolha quais seções aparecerão na página inicial
                  </p>

                  {[
                    { id: 'services', label: 'Mostrar Serviços em Destaque', desc: 'Exibe cards dos principais serviços' },
                    { id: 'packages', label: 'Mostrar Pacotes Especiais', desc: 'Exibe pacotes promocionais' },
                    { id: 'promotions', label: 'Mostrar Promoções Ativas', desc: 'Destaca ofertas e descontos' },
                    { id: 'testimonials', label: 'Mostrar Depoimentos', desc: 'Avaliações de clientes' },
                    { id: 'about', label: 'Seção Sobre Nós', desc: 'História e diferenciais da clínica' },
                  ].map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{section.label}</p>
                        <p className="text-sm text-muted-foreground">{section.desc}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6 space-y-4">
                  <h3 className="font-semibold">Texto Institucional</h3>
                  
                  <div className="space-y-2">
                    <Label>Sobre a Clínica</Label>
                    <Textarea 
                      rows={4}
                      defaultValue="Nossa clínica é especializada em tratamentos estéticos e dermatológicos com mais de 10 anos de experiência no mercado. Contamos com profissionais altamente qualificados e tecnologia de ponta para proporcionar os melhores resultados."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Diferenciais</Label>
                    <Textarea 
                      rows={3}
                      placeholder="Liste os principais diferenciais da sua clínica..."
                      defaultValue="- Profissionais especializados&#10;- Equipamentos de última geração&#10;- Atendimento personalizado&#10;- Ambiente acolhedor"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      🔗 Link da Sua Página Inicial
                    </p>
                    <div className="flex gap-2 items-center">
                      <Input 
                        readOnly
                        value="https://sistemaclinicas.com/p/bella-estetica"
                        className="font-mono text-sm"
                      />
                      <Button variant="outline">Copiar</Button>
                      <Button variant="outline">Abrir</Button>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
                      Compartilhe este link para que seus pacientes acessem o aplicativo da clínica
                    </p>
                  </div>
                </div>

                <Button className="w-full md:w-auto">
                  Salvar Configurações da Página
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Gerais</CardTitle>
                <CardDescription>Dados básicos da clínica</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome da Clínica</Label>
                    <Input defaultValue="Clínica Saúde & Estética" />
                  </div>
                  <div className="space-y-2">
                    <Label>CNPJ</Label>
                    <Input defaultValue="12.345.678/0001-90" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input defaultValue="(11) 98765-4321" />
                  </div>
                  <div className="space-y-2">
                    <Label>E-mail</Label>
                    <Input defaultValue="contato@clinica.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Endereço Completo</Label>
                  <Input defaultValue="Rua das Flores, 123 - Centro - São Paulo/SP" />
                </div>

                <div className="space-y-2">
                  <Label>Descrição da Clínica</Label>
                  <Textarea 
                    rows={4}
                    defaultValue="Especializada em tratamentos estéticos e dermatológicos com mais de 10 anos de experiência."
                  />
                </div>

                <Button>Salvar Informações Gerais</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Horários de Funcionamento</CardTitle>
                <CardDescription>Configure os horários de atendimento da clínica</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day) => (
                  <div key={day} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="flex items-center gap-2 w-32">
                      <Switch defaultChecked={day !== 'Domingo'} />
                      <Label className="font-medium">{day}</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input type="time" defaultValue="08:00" className="w-32" />
                      <span className="text-muted-foreground">até</span>
                      <Input type="time" defaultValue="18:00" className="w-32" />
                    </div>
                  </div>
                ))}

                <div className="space-y-2 pt-4">
                  <Label>Duração Padrão das Consultas</Label>
                  <Select defaultValue="60">
                    <SelectTrigger className="w-full md:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="45">45 minutos</SelectItem>
                      <SelectItem value="60">60 minutos</SelectItem>
                      <SelectItem value="90">90 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Intervalo Entre Consultas</Label>
                  <Select defaultValue="0">
                    <SelectTrigger className="w-full md:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Sem intervalo</SelectItem>
                      <SelectItem value="5">5 minutos</SelectItem>
                      <SelectItem value="10">10 minutos</SelectItem>
                      <SelectItem value="15">15 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>Salvar Horários</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Notificações</CardTitle>
                <CardDescription>Escolha como e quando notificar pacientes e equipe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Notificações para Pacientes</h3>
                  
                  {[
                    { label: 'Confirmação de Agendamento', desc: 'Enviar ao criar novo agendamento' },
                    { label: 'Lembrete 24h Antes', desc: 'Lembrar paciente 1 dia antes da consulta' },
                    { label: 'Lembrete 2h Antes', desc: 'Lembrar paciente 2 horas antes' },
                    { label: 'Agradecimento Pós-Consulta', desc: 'Enviar após atendimento' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">WhatsApp</Button>
                        <Button variant="ghost" size="sm">E-mail</Button>
                        <Button variant="ghost" size="sm">SMS</Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Notificações para Equipe</h3>
                  
                  {[
                    { label: 'Novo Agendamento', desc: 'Notificar profissional ao criar consulta' },
                    { label: 'Cancelamento', desc: 'Avisar equipe sobre cancelamentos' },
                    { label: 'Reagendamento', desc: 'Notificar sobre mudanças na agenda' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>

                <Button>Salvar Configurações de Notificações</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policies Tab */}
          <TabsContent value="policies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Políticas e Termos</CardTitle>
                <CardDescription>Configure regras de cancelamento e políticas da clínica</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Política de Cancelamento</Label>
                  <Select defaultValue="24h">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="livre">Cancelamento livre</SelectItem>
                      <SelectItem value="2h">Até 2 horas antes</SelectItem>
                      <SelectItem value="12h">Até 12 horas antes</SelectItem>
                      <SelectItem value="24h">Até 24 horas antes</SelectItem>
                      <SelectItem value="48h">Até 48 horas antes</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Tempo mínimo necessário para cancelar sem multa
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Cobrança por Não Comparecimento</Label>
                    <Switch />
                  </div>
                  <Input type="number" placeholder="Valor da multa (R$)" />
                </div>

                <div className="space-y-2">
                  <Label>Termos de Uso</Label>
                  <Textarea 
                    rows={6}
                    placeholder="Digite os termos de uso e políticas da clínica..."
                    defaultValue="Ao utilizar nossos serviços, você concorda com as seguintes condições..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Termo de Consentimento Padrão</Label>
                  <Textarea 
                    rows={6}
                    placeholder="Digite o termo de consentimento padrão..."
                    defaultValue="Eu, paciente, declaro estar ciente dos procedimentos..."
                  />
                </div>

                <Button>Salvar Políticas</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
