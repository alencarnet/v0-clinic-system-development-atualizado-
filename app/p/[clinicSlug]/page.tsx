'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Calendar, Package, Gift, Bell, User, Clock, MapPin, Phone, Mail, Star, ChevronRight, Search, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface ClinicTheme {
  id: string
  name: string
  slug: string
  logo: string
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  phone: string
  email: string
  address: string
  description: string
  bannerUrl: string
  bannerTitle: string
  bannerSubtitle: string
  aboutText: string
  showServices: boolean
  showPackages: boolean
  showPromotions: boolean
  showTestimonials: boolean
}

export default function PatientHomePage({ params }: { params: { clinicSlug: string } }) {
  const [clinic, setClinic] = useState<ClinicTheme | null>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const loadClinic = async () => {
      try {
        const res = await fetch(`/api/public/clinic/${params.clinicSlug}`)
        const data = await res.json()
        setClinic(data)
        
        if (data) {
          document.documentElement.style.setProperty('--clinic-primary', data.primaryColor)
          document.documentElement.style.setProperty('--clinic-secondary', data.secondaryColor)
          document.documentElement.style.setProperty('--clinic-bg', data.backgroundColor || '#ffffff')
        }
      } catch (error) {
        console.error('Error loading clinic:', error)
      } finally {
        setLoading(false)
      }
    }

    loadClinic()
  }, [params.clinicSlug])

  if (loading || !clinic) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f9fafb' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: clinic?.primaryColor || '#10b981' }} />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  const services = [
    { id: 1, name: 'Limpeza de Pele', category: 'Estética Facial', price: 15000, duration: 60, image: '/facial-cleaning.jpg' },
    { id: 2, name: 'Massagem Relaxante', category: 'Massoterapia', price: 12000, duration: 50, image: '/massage-therapy.png' },
    { id: 3, name: 'Drenagem Linfática', category: 'Estética Corporal', price: 18000, duration: 60, image: '/lymphatic-drainage.jpg' },
  ]

  const packages = [
    { id: 1, name: 'Pacote Glow 10 Sessões', sessions: 10, price: 120000, discount: 20, image: '/glow-package.jpg' },
    { id: 2, name: 'Programa Wellness', sessions: 8, price: 90000, discount: 15, image: '/wellness-program.png' },
  ]

  const promotions = [
    { id: 1, title: 'Black Friday - 30% OFF', description: 'Em todos os pacotes', validUntil: '2025-11-30', badge: 'Limitado' },
    { id: 2, title: 'Indique e Ganhe', description: 'R$ 50 de desconto', validUntil: '2025-12-31', badge: 'Novidade' },
  ]

  const testimonials = [
    { name: 'Ana Silva', text: 'Atendimento excepcional! Profissionais muito qualificados.', rating: 5 },
    { name: 'João Santos', text: 'Ambiente acolhedor e resultados incríveis.', rating: 5 },
    { name: 'Maria Costa', text: 'Melhor clínica da região! Super recomendo.', rating: 5 },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: clinic.backgroundColor }}>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="h-10 w-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: clinic.primaryColor }}
            >
              <span className="text-white font-bold text-lg">
                {clinic.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="font-bold text-lg">{clinic.name}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Sua saúde e beleza</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-4">
            <Link href="#services" className="text-sm hover:underline">Serviços</Link>
            <Link href="#packages" className="text-sm hover:underline">Pacotes</Link>
            <Link href="#about" className="text-sm hover:underline">Sobre</Link>
            <Link href="#contact" className="text-sm hover:underline">Contato</Link>
            <Button size="sm" style={{ backgroundColor: clinic.primaryColor }}>
              <User className="h-4 w-4 mr-2" />
              Entrar
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="flex flex-col p-4 space-y-3">
              <Link href="#services" className="text-sm py-2" onClick={() => setMenuOpen(false)}>Serviços</Link>
              <Link href="#packages" className="text-sm py-2" onClick={() => setMenuOpen(false)}>Pacotes</Link>
              <Link href="#about" className="text-sm py-2" onClick={() => setMenuOpen(false)}>Sobre</Link>
              <Link href="#contact" className="text-sm py-2" onClick={() => setMenuOpen(false)}>Contato</Link>
              <Button size="sm" style={{ backgroundColor: clinic.primaryColor }} className="w-full">
                <User className="h-4 w-4 mr-2" />
                Entrar
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Banner */}
      <section 
        className="relative h-[400px] flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${clinic.bannerUrl || '/spa-clinic-banner.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center max-w-3xl px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {clinic.bannerTitle || 'Bem-vindo à ' + clinic.name}
          </h2>
          <p className="text-lg md:text-xl mb-8">
            {clinic.bannerSubtitle || 'Agende online 24h por dia de qualquer dispositivo'}
          </p>
          <Link href={`/agendamentos/${clinic.slug}`}>
            <Button 
              size="lg" 
              className="text-lg px-8"
              style={{ backgroundColor: clinic.primaryColor }}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Agendar Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: 'Agendamento Online', value: '24/7' },
            { icon: Star, label: 'Avaliação', value: '4.9/5' },
            { icon: Clock, label: 'Atendimento', value: 'Seg-Sáb' },
            { icon: Gift, label: 'Promoções', value: 'Semanais' },
          ].map((stat, idx) => (
            <Card key={idx} className="shadow-lg">
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2" style={{ color: clinic.primaryColor }} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Services Section */}
      {clinic.showServices && (
        <section id="services" className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-muted-foreground">Conheça nossos tratamentos e procedimentos</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <CardContent className="p-6">
                  <Badge className="mb-2" style={{ backgroundColor: clinic.secondaryColor }}>
                    {service.category}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold" style={{ color: clinic.primaryColor }}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(service.price / 100)}
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {service.duration} min
                    </span>
                  </div>
                  <Link href={`/agendamentos/${clinic.slug}/${service.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button 
                      className="w-full"
                      style={{ backgroundColor: clinic.primaryColor }}
                    >
                      Agendar
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href={`/agendamentos/${clinic.slug}`}>
              <Button variant="outline" size="lg">
                Ver Todos os Serviços
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Packages Section */}
      {clinic.showPackages && (
        <section id="packages" className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Pacotes Especiais</h2>
              <p className="text-muted-foreground">Economia e resultados garantidos</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div 
                      className="h-48 md:h-auto md:w-1/3 bg-cover bg-center"
                      style={{ backgroundImage: `url(${pkg.image})` }}
                    />
                    <CardContent className="p-6 flex-1">
                      <Badge className="mb-3" style={{ backgroundColor: clinic.primaryColor }}>
                        {pkg.discount}% de desconto
                      </Badge>
                      <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                      <p className="text-muted-foreground mb-4">
                        <Package className="h-4 w-4 inline mr-1" />
                        {pkg.sessions} sessões incluídas
                      </p>
                      <div className="mb-4">
                        <span className="text-3xl font-bold" style={{ color: clinic.primaryColor }}>
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pkg.price / 100)}
                        </span>
                      </div>
                      <Link href={`/agendamentos/${clinic.slug}/pacotes/${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Button 
                          className="w-full"
                          style={{ backgroundColor: clinic.primaryColor }}
                        >
                          Adquirir Pacote
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Promotions */}
      {clinic.showPromotions && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Promoções Ativas</h2>
            <p className="text-muted-foreground">Aproveite nossas ofertas especiais</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {promotions.map((promo) => (
              <Card key={promo.id} className="border-2" style={{ borderColor: clinic.primaryColor }}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                      <p className="text-muted-foreground">{promo.description}</p>
                    </div>
                    <Badge style={{ backgroundColor: clinic.secondaryColor }}>
                      {promo.badge}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    <span>Válido até {new Date(promo.validUntil).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <Link href={`/agendamentos/${clinic.slug}`}>
                    <Button className="w-full" style={{ backgroundColor: clinic.primaryColor }}>
                      Agendar com Promoção
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Sobre Nós</h2>
          <p className="text-lg text-muted-foreground mb-8">
            {clinic.aboutText || clinic.description}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: '10+ Anos', desc: 'De Experiência' },
              { title: '5000+', desc: 'Clientes Atendidos' },
              { title: '98%', desc: 'Satisfação' },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-4xl font-bold mb-2" style={{ color: clinic.primaryColor }}>
                  {stat.title}
                </p>
                <p className="text-muted-foreground">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {clinic.showTestimonials && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">O Que Dizem Nossos Clientes</h2>
            <p className="text-muted-foreground">Depoimentos reais de quem confia em nosso trabalho</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" style={{ color: clinic.primaryColor }} />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback style={{ backgroundColor: clinic.primaryColor, color: 'white' }}>
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{testimonial.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Contact/CTA Section */}
      <section id="contact" className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Agende seu horário online agora mesmo e transforme sua experiência
          </p>
          <Link href={`/agendamentos/${clinic.slug}`}>
            <Button size="lg" className="text-lg px-8" style={{ backgroundColor: clinic.primaryColor }}>
              <Calendar className="h-5 w-5 mr-2" />
              Agendar Agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">{clinic.name}</h3>
              <p className="text-gray-400 text-sm">{clinic.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{clinic.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{clinic.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span>{clinic.address}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <div className="space-y-2 text-sm">
                <Link href={`/agendamentos/${clinic.slug}`} className="block text-gray-400 hover:text-white">
                  Agendar Consulta
                </Link>
                <Link href="/auth/login" className="block text-gray-400 hover:text-white">
                  Área do Paciente
                </Link>
                <Link href="#" className="block text-gray-400 hover:text-white">
                  Política de Privacidade
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 {clinic.name}. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
