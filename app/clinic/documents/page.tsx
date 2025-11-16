'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, Search, FileText, Upload, Download, Eye, Trash2, Filter } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const mockDocuments = [
  { id: 1, name: 'Termo de Consentimento - Maria Silva', type: 'consent', patient: 'Maria Silva Santos', date: '15/11/2025', size: '245 KB', category: 'Consentimento' },
  { id: 2, name: 'Anamnese Inicial - João Santos', type: 'anamnese', patient: 'João Pedro Santos', date: '14/11/2025', size: '189 KB', category: 'Anamnese' },
  { id: 3, name: 'Fotos Antes - Ana Costa', type: 'photos', patient: 'Ana Costa Oliveira', date: '12/11/2025', size: '1.2 MB', category: 'Fotos' },
  { id: 4, name: 'Evolução - Pedro Oliveira', type: 'evolution', patient: 'Pedro Oliveira', date: '10/11/2025', size: '156 KB', category: 'Evolução' },
  { id: 5, name: 'Receituário - Carla Rodrigues', type: 'prescription', patient: 'Carla Rodrigues', date: '08/11/2025', size: '98 KB', category: 'Receituário' },
]

export default function DocumentsPage() {
  const [view, setView] = useState<'all' | 'recent'>('all')

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Consentimento': return 'bg-blue-100 text-blue-700'
      case 'Anamnese': return 'bg-green-100 text-green-700'
      case 'Fotos': return 'bg-purple-100 text-purple-700'
      case 'Evolução': return 'bg-orange-100 text-orange-700'
      case 'Receituário': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <DashboardLayout allowedRoles={['CLINIC_ADMIN']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
            <p className="text-muted-foreground">Gerencie documentos e arquivos dos pacientes</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Upload de Documentos
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Documentos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">342 pacientes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
              <Upload className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">novos uploads</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Espaço Usado</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 GB</div>
              <p className="text-xs text-muted-foreground">de 10 GB disponíveis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorias</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">tipos diferentes</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Todos os Documentos</TabsTrigger>
            <TabsTrigger value="upload">Upload em Massa</TabsTrigger>
            <TabsTrigger value="organized">Documentos Organizados</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar documentos por nome ou paciente..."
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">Filtrar por Tipo</Button>
                  <Button variant="outline">Filtrar por Data</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{doc.name}</h3>
                            <Badge variant="outline" className={getCategoryColor(doc.category)}>
                              {doc.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Paciente: {doc.patient}</span>
                            <span>•</span>
                            <span>{doc.date}</span>
                            <span>•</span>
                            <span>{doc.size}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload em Massa com IA</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Faça upload de múltiplos arquivos e deixe a IA organizar automaticamente
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Arraste arquivos aqui ou clique para selecionar</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Suporta PDF, RTF, DOCX, JPG, PNG (máx. 10MB por arquivo)
                  </p>
                  <Button>Selecionar Arquivos</Button>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    O que a IA faz automaticamente:
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Lê o CPF dos documentos
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Identifica o tipo de documento (anamnese, evolução, termo, etc)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Organiza por paciente automaticamente
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Adiciona no prontuário correto
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Extrai informações importantes
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organized" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentos Organizados por Paciente</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Visualização estruturada dos documentos de cada paciente
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Maria Silva Santos', 'João Pedro Santos', 'Ana Costa Oliveira'].map((patient, idx) => (
                    <div key={idx} className="border rounded-lg">
                      <div className="p-4 bg-accent/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-semibold text-sm">{patient.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{patient}</h3>
                            <p className="text-sm text-muted-foreground">8 documentos • 2.4 MB</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Ver Todos</Button>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-100 text-blue-700">Anamnese</Badge>
                            <span>3 arquivos</span>
                          </div>
                          <span className="text-muted-foreground">Última: 10/11/2025</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-purple-100 text-purple-700">Fotos</Badge>
                            <span>12 arquivos</span>
                          </div>
                          <span className="text-muted-foreground">Última: 08/11/2025</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-orange-100 text-orange-700">Evolução</Badge>
                            <span>5 arquivos</span>
                          </div>
                          <span className="text-muted-foreground">Última: 15/11/2025</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
