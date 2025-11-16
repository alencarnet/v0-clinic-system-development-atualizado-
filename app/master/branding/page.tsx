'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save, Upload, Eye } from 'lucide-react'

export default function BrandingPage() {
  const [brandConfig, setBrandConfig] = useState({
    primaryColor: '#22c55e',
    secondaryColor: '#16a34a',
    accentColor: '#15803d',
    logoUrl: '',
    companyName: 'White Label Admin',
    favicon: '',
  })

  const handleSave = () => {
    console.log('[v0] Saving brand config:', brandConfig)
    // Here you would send to API
  }

  const handleColorChange = (field: string, value: string) => {
    setBrandConfig(prev => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout allowedRoles={['MASTER_ADMIN']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Branding</h1>
            <p className="text-muted-foreground">Configure a identidade visual do sistema</p>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="colors">
              <TabsList className="w-full">
                <TabsTrigger value="colors" className="flex-1">Cores</TabsTrigger>
                <TabsTrigger value="logos" className="flex-1">Logos</TabsTrigger>
                <TabsTrigger value="general" className="flex-1">Geral</TabsTrigger>
              </TabsList>

              <TabsContent value="colors" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Paleta de Cores</CardTitle>
                    <CardDescription>Defina as cores principais do sistema</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor">Cor Primária</Label>
                        <div className="flex gap-4 items-center">
                          <Input 
                            id="primaryColor" 
                            type="color"
                            value={brandConfig.primaryColor}
                            onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                            className="w-20 h-10"
                          />
                          <Input 
                            value={brandConfig.primaryColor}
                            onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                            placeholder="#22c55e"
                            className="flex-1"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Cor principal usada em botões e destaques</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="secondaryColor">Cor Secundária</Label>
                        <div className="flex gap-4 items-center">
                          <Input 
                            id="secondaryColor" 
                            type="color"
                            value={brandConfig.secondaryColor}
                            onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                            className="w-20 h-10"
                          />
                          <Input 
                            value={brandConfig.secondaryColor}
                            onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                            placeholder="#16a34a"
                            className="flex-1"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Cor complementar para elementos secundários</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accentColor">Cor de Destaque</Label>
                        <div className="flex gap-4 items-center">
                          <Input 
                            id="accentColor" 
                            type="color"
                            value={brandConfig.accentColor}
                            onChange={(e) => handleColorChange('accentColor', e.target.value)}
                            className="w-20 h-10"
                          />
                          <Input 
                            value={brandConfig.accentColor}
                            onChange={(e) => handleColorChange('accentColor', e.target.value)}
                            placeholder="#15803d"
                            className="flex-1"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Cor para elementos de atenção e alertas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logos" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Logos e Ícones</CardTitle>
                    <CardDescription>Faça upload dos arquivos de identidade visual</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Logo Principal</Label>
                        <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                          {brandConfig.logoUrl ? (
                            <div className="flex items-center justify-center">
                              <img src={brandConfig.logoUrl || "/placeholder.svg"} alt="Logo" className="max-h-24" />
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <Upload className="h-8 w-8 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">Arraste ou clique para fazer upload</p>
                            </div>
                          )}
                          <Button variant="outline" size="sm">
                            Selecionar Arquivo
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Formato PNG ou SVG, tamanho recomendado: 200x50px</p>
                      </div>

                      <div className="space-y-2">
                        <Label>Favicon</Label>
                        <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                          <div className="flex flex-col items-center gap-2">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Upload do ícone do navegador</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Selecionar Arquivo
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Formato ICO ou PNG, tamanho: 32x32px ou 64x64px</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="general" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações Gerais</CardTitle>
                    <CardDescription>Informações gerais do sistema</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Nome da Empresa</Label>
                      <Input 
                        id="companyName" 
                        value={brandConfig.companyName}
                        onChange={(e) => setBrandConfig(prev => ({ ...prev, companyName: e.target.value }))}
                        placeholder="Nome exibido no sistema"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="systemTitle">Título do Sistema</Label>
                      <Input 
                        id="systemTitle" 
                        placeholder="Sistema de Gestão de Clínicas"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tagline">Slogan/Tagline</Label>
                      <Input 
                        id="tagline" 
                        placeholder="Gestão inteligente para sua clínica"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </CardTitle>
                <CardDescription>Visualização das cores aplicadas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="h-12 rounded-lg flex items-center justify-center text-white font-medium"
                       style={{ backgroundColor: brandConfig.primaryColor }}>
                    Cor Primária
                  </div>
                  <div className="h-12 rounded-lg flex items-center justify-center text-white font-medium"
                       style={{ backgroundColor: brandConfig.secondaryColor }}>
                    Cor Secundária
                  </div>
                  <div className="h-12 rounded-lg flex items-center justify-center text-white font-medium"
                       style={{ backgroundColor: brandConfig.accentColor }}>
                    Cor de Destaque
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <p className="text-sm font-medium">Botões de Exemplo</p>
                  <div className="space-y-2">
                    <button 
                      className="w-full py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: brandConfig.primaryColor }}
                    >
                      Botão Primário
                    </button>
                    <button 
                      className="w-full py-2 rounded-lg border-2 font-medium"
                      style={{ borderColor: brandConfig.primaryColor, color: brandConfig.primaryColor }}
                    >
                      Botão Outline
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
