'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Download, Filter, Eye, Calendar } from 'lucide-react'

export default function LogsPage() {
  const [filterLevel, setFilterLevel] = useState('all')
  const [filterAction, setFilterAction] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const logs = [
    {
      id: 1,
      timestamp: '2024-03-20 14:35:22',
      level: 'info',
      action: 'LOGIN',
      user: 'admin@test.com',
      description: 'Login realizado com sucesso',
      ip: '192.168.1.100',
      details: 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0'
    },
    {
      id: 2,
      timestamp: '2024-03-20 14:30:15',
      level: 'success',
      action: 'CREATE',
      user: 'admin@test.com',
      description: 'Nova clínica criada: Clínica Estética Premium',
      ip: '192.168.1.100',
      details: 'Clinic ID: 12, CNPJ: 12.345.678/0001-90, Payment: Pago, Expires: 2025-01-15'
    },
    {
      id: 3,
      timestamp: '2024-03-20 14:25:10',
      level: 'warning',
      action: 'UPDATE',
      user: 'admin@test.com',
      description: 'Tentativa de atualizar configurações de segurança',
      ip: '192.168.1.100',
      details: 'Alteração em: maintenance_mode de false para true'
    },
    {
      id: 4,
      timestamp: '2024-03-20 14:20:05',
      level: 'error',
      action: 'LOGIN',
      user: 'unknown@test.com',
      description: 'Tentativa de login falhada - credenciais inválidas',
      ip: '192.168.1.105',
      details: '3 tentativas consecutivas. Conta bloqueada temporariamente por 15 minutos.'
    },
    {
      id: 5,
      timestamp: '2024-03-20 14:15:00',
      level: 'success',
      action: 'DELETE',
      user: 'admin@test.com',
      description: 'Usuário removido do sistema',
      ip: '192.168.1.100',
      details: 'User ID: 45, Email: old@clinic.com, Role: PROFESSIONAL'
    },
    {
      id: 6,
      timestamp: '2024-03-20 14:10:45',
      level: 'info',
      action: 'BACKUP',
      user: 'system',
      description: 'Backup automático realizado',
      ip: 'localhost',
      details: 'Database size: 2.4GB, Duration: 45s, Status: Success'
    },
    {
      id: 7,
      timestamp: '2024-03-20 14:05:30',
      level: 'success',
      action: 'UPDATE',
      user: 'admin@test.com',
      description: 'Branding atualizado para Clínica Bem Estar',
      ip: '192.168.1.100',
      details: 'Logo uploaded, Primary color changed to #8b5cf6'
    },
    {
      id: 8,
      timestamp: '2024-03-20 14:00:12',
      level: 'warning',
      action: 'ACCESS',
      user: 'clinic@test.com',
      description: 'Acesso expirando em breve',
      ip: '192.168.1.110',
      details: 'Clinic: Centro de Saúde Integral, Expires in 5 days'
    },
  ]

  const getLevelColor = (level: string) => {
    const colors = {
      info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    }
    return colors[level as keyof typeof colors] || colors.info
  }

  const filteredLogs = logs.filter(log => {
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel
    const matchesAction = filterAction === 'all' || log.action.toLowerCase() === filterAction.toLowerCase()
    const matchesSearch = searchTerm === '' || 
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesLevel && matchesAction && matchesSearch
  })

  const handleExport = () => {
    const csvContent = [
      ['Timestamp', 'Level', 'Action', 'User', 'Description', 'IP', 'Details'].join(','),
      ...filteredLogs.map(log => 
        [log.timestamp, log.level, log.action, log.user, log.description, log.ip, log.details].join(',')
      )
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `logs-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <DashboardLayout allowedRoles={['MASTER_ADMIN']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Logs do Sistema</h1>
            <p className="text-muted-foreground">Monitore todas as ações e eventos do sistema</p>
          </div>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Exportar Logs
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Refine a busca de logs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar por descrição, usuário ou detalhes..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Níveis</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterAction} onValueChange={setFilterAction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Ações</SelectItem>
                    <SelectItem value="login">Login</SelectItem>
                    <SelectItem value="create">Create</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                    <SelectItem value="backup">Backup</SelectItem>
                    <SelectItem value="access">Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Data Inicial
                  </Label>
                  <Input 
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Data Final
                  </Label>
                  <Input 
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    className="gap-2 w-full"
                    onClick={() => {
                      setSearchTerm('')
                      setFilterLevel('all')
                      setFilterAction('all')
                      setDateFrom('')
                      setDateTo('')
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Mostrando {filteredLogs.length} de {logs.length} registros
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registros de Auditoria</CardTitle>
            <CardDescription>Últimas atividades do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum log encontrado com os filtros aplicados
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4 space-y-2 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 flex-1 flex-wrap">
                        <Badge variant="outline" className={getLevelColor(log.level)}>
                          {log.level.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {log.action}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="shrink-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div>
                      <p className="font-medium">{log.description}</p>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span>Usuário: {log.user}</span>
                        <span>IP: {log.ip}</span>
                      </div>
                    </div>
                    
                    <details className="text-xs text-muted-foreground">
                      <summary className="cursor-pointer hover:text-foreground">
                        Ver detalhes
                      </summary>
                      <div className="mt-2 p-2 bg-muted rounded font-mono">
                        {log.details}
                      </div>
                    </details>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

import { Label } from '@/components/ui/label'
