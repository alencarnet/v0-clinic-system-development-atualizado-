'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { LinkIcon, Copy, ExternalLink, QrCode, Package, Wrench, Globe, Settings } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'

export default function BookingLinksPage() {
  const domainType = 'default' // 'default' or 'custom'
  const customDomain = 'clinicaviviane.com'
  const clinicSlug = 'bella-estetica'
  
  const fullBaseUrl = domainType === 'custom' 
    ? `https://${customDomain}/agendamentos`
    : `${typeof window !== 'undefined' ? window.location.origin : ''}/agendamentos/${clinicSlug}`

  const services = [
    { id: '1', name: 'Limpeza de Pele', slug: 'limpeza-de-pele', active: true, bookings: 45 },
    { id: '2', name: 'Massagem Relaxante', slug: 'massagem-relaxante', active: true, bookings: 32 },
    { id: '3', name: 'Drenagem Linfática', slug: 'drenagem-linfatica', active: true, bookings: 28 },
    { id: '4', name: 'Peeling Químico', slug: 'peeling-quimico', active: false, bookings: 12 },
    { id: '5', name: 'Botox', slug: 'botox', active: true, bookings: 67 }
  ]

  const packages = [
    { id: 'p1', name: 'Pacote Rejuvenescimento', slug: 'pacote-rejuvenescimento', active: true, bookings: 18 },
    { id: 'p2', name: 'Pacote Corpo Perfeito', slug: 'pacote-corpo-perfeito', active: true, bookings: 15 },
    { id: 'p3', name: 'Pacote Pele Perfeita', slug: 'pacote-pele-perfeita', active: true, bookings: 22 }
  ]

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    alert('Link copiado!')
  }

  return (
    <DashboardLayout allowedRoles={['CLINIC_ADMIN']}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Links de Agendamento</h1>
            <p className="text-muted-foreground">
              Gerencie e compartilhe links diretos para agendamento online 24/7
            </p>
          </div>
          <Link href="/clinic/settings">
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              Configurar Domínio
            </Button>
          </Link>
        </div>

        {/* Domain Status Alert */}
        <Alert className={domainType === 'custom' ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-blue-500 bg-blue-50 dark:bg-blue-950'}>
          <Globe className={`h-4 w-4 ${domainType === 'custom' ? 'text-green-600' : 'text-blue-600'}`} />
          <AlertDescription>
            {domainType === 'custom' ? (
              <div className="flex items-center justify-between">
                <span className="text-green-900 dark:text-green-100">
                  <strong>Domínio Personalizado Ativo:</strong> {customDomain}
                </span>
                <Badge variant="default" className="bg-green-600">Premium</Badge>
              </div>
            ) : (
              <span className="text-blue-900 dark:text-blue-100">
                <strong>URL Padrão do Sistema:</strong> /agendamentos/{clinicSlug} • <Link href="/clinic/settings" className="underline">Configurar domínio próprio</Link>
              </span>
            )}
          </AlertDescription>
        </Alert>

        <div className="grid gap-6">
          {/* Main Booking Link */}
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-[#0FA958]" />
                Link Raiz de Agendamento
              </CardTitle>
              <CardDescription>
                Página principal com todos os serviços e pacotes disponíveis. Clientes podem filtrar e agendar diretamente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input 
                  readOnly 
                  value={fullBaseUrl}
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyUrl(fullBaseUrl)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(fullBaseUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                >
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>•</span>
                <span>Este é o link principal que você deve divulgar</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services and Packages */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-600" />
                Serviços Individuais ({services.filter(s => s.active).length} ativos)
              </CardTitle>
              <CardDescription>Links diretos para cada serviço específico</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id} className="p-3 border rounded-lg hover:border-primary/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{service.name}</h3>
                          <Badge variant={service.active ? 'default' : 'secondary'}>
                            {service.active ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {service.bookings} agendamentos via link
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        readOnly 
                        value={`${fullBaseUrl}/${service.slug}`}
                        className="font-mono text-xs"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyUrl(`${fullBaseUrl}/${service.slug}`)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => window.open(`${fullBaseUrl}/${service.slug}`, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Packages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-purple-600" />
                Pacotes ({packages.filter(p => p.active).length} ativos)
              </CardTitle>
              <CardDescription>Links diretos para cada pacote promocional</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="p-3 border rounded-lg hover:border-primary/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{pkg.name}</h3>
                          <Badge variant={pkg.active ? 'default' : 'secondary'}>
                            {pkg.active ? 'Ativo' : 'Inativo'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          {pkg.bookings} agendamentos via link
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        readOnly 
                        value={`${fullBaseUrl}/${pkg.slug}`}
                        className="font-mono text-xs"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyUrl(`${fullBaseUrl}/${pkg.slug}`)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => window.open(`${fullBaseUrl}/${pkg.slug}`, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">Dicas de Uso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>• <strong>Link Raiz:</strong> Use este para marketing geral (redes sociais, site, cartões)</p>
            <p>• <strong>Links Específicos:</strong> Compartilhe em campanhas focadas em serviços específicos</p>
            <p>• <strong>QR Codes:</strong> Gere códigos QR para uso físico em recepção, folders e cartazes</p>
            <p>• <strong>Domínio Próprio:</strong> Aumente credibilidade usando seu próprio domínio (recurso premium)</p>
            <p>• <strong>Estrutura:</strong> /agendamentos = raiz | /agendamentos/nome-servico = específico</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
