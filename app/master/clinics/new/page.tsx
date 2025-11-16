'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Save, Upload } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewClinicPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    paymentStatus: 'Teste Grátis',
    expiresAt: '',
    logo: '',
    primaryColor: '#10b981',
    secondaryColor: '#059669',
    accentColor: '#34d399',
  })

  const [logoPreview, setLogoPreview] = useState<string>('/clinic-logo.jpg')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Form submitted:', formData)
    // Here you would send to API
    router.push('/master/clinics')
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setLogoPreview(result)
        setFormData(prev => ({ ...prev, logo: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <DashboardLayout allowedRoles={['MASTER_ADMIN']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/master/clinics">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nova Clínica</h1>
            <p className="text-muted-foreground">Cadastre uma nova clínica no sistema</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
              <TabsTrigger value="address">Endereço</TabsTrigger>
              <TabsTrigger value="access">Controle de Acesso</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                  <CardDescription>Dados principais da clínica</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome da Clínica *</Label>
                      <Input 
                        id="name" 
                        placeholder="Ex: Clínica Estética Premium"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ *</Label>
                      <Input 
                        id="cnpj" 
                        placeholder="00.000.000/0000-00"
                        value={formData.cnpj}
                        onChange={(e) => handleChange('cnpj', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="contato@clinica.com.br"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input 
                        id="phone" 
                        placeholder="(11) 98765-4321"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Breve descrição sobre a clínica..."
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="address" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Endereço</CardTitle>
                  <CardDescription>Localização da clínica</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço Completo *</Label>
                    <Input 
                      id="address" 
                      placeholder="Rua, número, complemento"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade *</Label>
                      <Input 
                        id="city" 
                        placeholder="São Paulo"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleChange('state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">CEP *</Label>
                      <Input 
                        id="zipCode" 
                        placeholder="00000-000"
                        value={formData.zipCode}
                        onChange={(e) => handleChange('zipCode', e.target.value)}
                        required
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
                  <CardDescription>Gerencie o acesso e pagamento da clínica</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="paymentStatus">Status de Pagamento *</Label>
                      <Select 
                        value={formData.paymentStatus} 
                        onValueChange={(value) => handleChange('paymentStatus', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Teste Grátis">Teste Grátis</SelectItem>
                          <SelectItem value="Pago">Pago</SelectItem>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        {formData.paymentStatus === 'Teste Grátis' && 'Período de teste gratuito (geralmente 30 dias)'}
                        {formData.paymentStatus === 'Pago' && 'Cliente com pagamento em dia'}
                        {formData.paymentStatus === 'Pendente' && 'Pagamento aguardando confirmação'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expiresAt">Data de Validade *</Label>
                      <Input 
                        id="expiresAt" 
                        type="date"
                        value={formData.expiresAt}
                        onChange={(e) => handleChange('expiresAt', e.target.value)}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Data até quando a clínica terá acesso ao sistema
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4 bg-muted/50">
                    <h4 className="font-medium mb-2">Resumo do Acesso</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Status:</span> {formData.paymentStatus}</p>
                      {formData.expiresAt && (
                        <p>
                          <span className="font-medium">Válido até:</span>{' '}
                          {new Date(formData.expiresAt).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="branding" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Branding da Clínica</CardTitle>
                  <CardDescription>Personalize a identidade visual da clínica</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Logo da Clínica</Label>
                    <div className="flex items-start gap-6">
                      <div className="space-y-2">
                        <div 
                          className="h-32 w-32 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden"
                          style={{ borderColor: formData.primaryColor }}
                        >
                          <img 
                            src={logoPreview || "/placeholder.svg"} 
                            alt="Logo preview" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <Label htmlFor="logo-upload" className="cursor-pointer">
                          <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                            <Upload className="h-4 w-4" />
                            Upload Logo
                          </div>
                          <Input 
                            id="logo-upload" 
                            type="file" 
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                          />
                        </Label>
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Faça upload da logo da clínica. Formatos aceitos: PNG, JPG, SVG
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Recomendado: 512x512px ou superior, fundo transparente
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Cores do Sistema</Label>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor" className="text-sm">Cor Primária</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="primaryColor" 
                            type="color"
                            value={formData.primaryColor}
                            onChange={(e) => handleChange('primaryColor', e.target.value)}
                            className="h-10 w-20"
                          />
                          <Input 
                            value={formData.primaryColor}
                            onChange={(e) => handleChange('primaryColor', e.target.value)}
                            placeholder="#000000"
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="secondaryColor" className="text-sm">Cor Secundária</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="secondaryColor" 
                            type="color"
                            value={formData.secondaryColor}
                            onChange={(e) => handleChange('secondaryColor', e.target.value)}
                            className="h-10 w-20"
                          />
                          <Input 
                            value={formData.secondaryColor}
                            onChange={(e) => handleChange('secondaryColor', e.target.value)}
                            placeholder="#000000"
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accentColor" className="text-sm">Cor de Destaque</Label>
                        <div className="flex gap-2">
                          <Input 
                            id="accentColor" 
                            type="color"
                            value={formData.accentColor}
                            onChange={(e) => handleChange('accentColor', e.target.value)}
                            className="h-10 w-20"
                          />
                          <Input 
                            value={formData.accentColor}
                            onChange={(e) => handleChange('accentColor', e.target.value)}
                            placeholder="#000000"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-6 space-y-4" style={{ backgroundColor: `${formData.primaryColor}10` }}>
                    <h4 className="font-medium">Preview do Branding</h4>
                    <div className="flex items-center gap-4 p-4 bg-background rounded-lg border">
                      <img 
                        src={logoPreview || "/placeholder.svg"} 
                        alt="Logo" 
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold" style={{ color: formData.primaryColor }}>
                          {formData.name || 'Nome da Clínica'}
                        </h5>
                        <p className="text-sm text-muted-foreground">Sistema White Label</p>
                      </div>
                      <Button style={{ backgroundColor: formData.primaryColor }} size="sm">
                        Botão Exemplo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4">
            <Link href="/master/clinics">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Salvar Clínica
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
