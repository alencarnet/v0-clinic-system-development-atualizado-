import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Upload } from 'lucide-react'
import Link from 'next/link'

export default function NewProfessionalPage() {
  return (
    <DashboardLayout allowedRoles={['CLINIC_ADMIN']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/clinic/professionals">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Novo Profissional</h1>
            <p className="text-muted-foreground">Cadastre um novo membro da equipe</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Dados básicos do profissional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input id="name" placeholder="Dr. João Silva" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="document">CPF *</Label>
                    <Input id="document" placeholder="000.000.000-00" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input id="email" type="email" placeholder="joao@clinica.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input id="phone" placeholder="(11) 98765-4321" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidade *</Label>
                  <Select>
                    <SelectTrigger id="specialty">
                      <SelectValue placeholder="Selecione a especialidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dermatologist">Dermatologista</SelectItem>
                      <SelectItem value="physiotherapist">Fisioterapeuta</SelectItem>
                      <SelectItem value="massage">Massoterapeuta</SelectItem>
                      <SelectItem value="esthetician">Esteticista</SelectItem>
                      <SelectItem value="nutritionist">Nutricionista</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registration">Registro Profissional</Label>
                  <Input id="registration" placeholder="CRM, CREFITO, etc." />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agenda e Disponibilidade</CardTitle>
                <CardDescription>Configure os horários de trabalho</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map((day) => (
                    <div key={day} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="flex items-center gap-2 w-28">
                        <Switch defaultChecked />
                        <Label className="font-medium">{day}</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input type="time" defaultValue="08:00" className="w-32" />
                        <span className="text-sm text-muted-foreground">até</span>
                        <Input type="time" defaultValue="18:00" className="w-32" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slot-duration">Duração das Consultas</Label>
                  <Select defaultValue="60">
                    <SelectTrigger id="slot-duration">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="45">45 minutos</SelectItem>
                      <SelectItem value="60">60 minutos</SelectItem>
                      <SelectItem value="90">90 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Permissões de Acesso</CardTitle>
                <CardDescription>Defina o que este profissional pode acessar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'Acessar prontuários de todos os pacientes', checked: true },
                  { label: 'Editar dados de pacientes', checked: true },
                  { label: 'Ver financeiro da clínica', checked: false },
                  { label: 'Gerenciar outros profissionais', checked: false },
                  { label: 'Acessar relatórios gerenciais', checked: false },
                ].map((permission) => (
                  <div key={permission.label} className="flex items-center justify-between p-3 border rounded-lg">
                    <Label>{permission.label}</Label>
                    <Switch defaultChecked={permission.checked} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Foto do Profissional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-32 w-32 border-2 border-dashed border-border rounded-full flex items-center justify-center bg-muted">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Input type="file" accept="image/*" />
                  <p className="text-xs text-center text-muted-foreground">
                    Recomendado: 400x400px
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações Adicionais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <Textarea 
                    id="bio"
                    rows={4}
                    placeholder="Breve descrição sobre o profissional..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Salário/Comissão</Label>
                  <Input id="salary" placeholder="R$ 0,00" />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <Label>Status Ativo</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button className="w-full">Salvar Profissional</Button>
              <Link href="/clinic/professionals">
                <Button variant="outline" className="w-full">Cancelar</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
