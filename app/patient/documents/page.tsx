'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Download, FileText, Image, FileCheck } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function PatientDocumentsPage() {
  const documents = {
    exams: [
      { id: 1, name: 'Hemograma Completo', date: '2024-12-20', type: 'Exame de Sangue', size: '2.3 MB' },
      { id: 2, name: 'Raio-X Coluna', date: '2024-12-15', type: 'Imagem', size: '5.8 MB' },
      { id: 3, name: 'Ultrassom Abdominal', date: '2024-11-30', type: 'Imagem', size: '4.2 MB' },
    ],
    prescriptions: [
      { id: 4, name: 'Receita - Dra. Carla Mendes', date: '2024-12-28', type: 'Prescrição', size: '0.8 MB' },
      { id: 5, name: 'Receita - Dr. Pedro Lima', date: '2024-12-01', type: 'Prescrição', size: '0.6 MB' },
    ],
    reports: [
      { id: 6, name: 'Laudo Dermatológico', date: '2024-12-01', type: 'Laudo Médico', size: '1.2 MB' },
      { id: 7, name: 'Relatório Fisioterapia', date: '2024-11-20', type: 'Relatório', size: '1.5 MB' },
    ],
  }

  const renderDocumentIcon = (type: string) => {
    if (type === 'Imagem') return <Image className="h-5 w-5 text-blue-500" />
    if (type === 'Prescrição') return <FileCheck className="h-5 w-5 text-green-500" />
    return <FileText className="h-5 w-5 text-orange-500" />
  }

  const DocumentList = ({ documents }: { documents: any[] }) => (
    <div className="space-y-3">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            {renderDocumentIcon(doc.type)}
            <div>
              <p className="font-medium">{doc.name}</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                <span>{new Date(doc.date).toLocaleDateString('pt-BR')}</span>
                <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                <span>{doc.size}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">Visualizar</Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Baixar
            </Button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <DashboardLayout allowedRoles={['PATIENT']}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meus Documentos</h1>
          <p className="text-muted-foreground">Acesse exames, receitas e laudos</p>
        </div>

        <Card>
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Todos ({documents.exams.length + documents.prescriptions.length + documents.reports.length})</TabsTrigger>
                <TabsTrigger value="exams">Exames ({documents.exams.length})</TabsTrigger>
                <TabsTrigger value="prescriptions">Receitas ({documents.prescriptions.length})</TabsTrigger>
                <TabsTrigger value="reports">Laudos ({documents.reports.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <DocumentList documents={[...documents.exams, ...documents.prescriptions, ...documents.reports]} />
              </TabsContent>

              <TabsContent value="exams">
                <DocumentList documents={documents.exams} />
              </TabsContent>

              <TabsContent value="prescriptions">
                <DocumentList documents={documents.prescriptions} />
              </TabsContent>

              <TabsContent value="reports">
                <DocumentList documents={documents.reports} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
