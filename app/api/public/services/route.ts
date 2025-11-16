import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const clinicSlug = searchParams.get('clinicSlug')

  if (!clinicSlug) {
    return NextResponse.json(
      { error: 'Clinic slug is required' },
      { status: 400 }
    )
  }

  // Mock data - In production, query database filtered by clinic_id
  const services = [
    {
      id: '1',
      clinicSlug: 'bella-estetica',
      name: 'Limpeza de Pele',
      slug: 'limpeza-de-pele',
      description: 'Limpeza profunda com extração de cravos',
      duration: 60,
      price: 15000,
      category: 'Facial',
      active: true
    },
    {
      id: '2',
      clinicSlug: 'bella-estetica',
      name: 'Massagem Relaxante',
      slug: 'massagem-relaxante',
      description: 'Massagem corporal completa para relaxamento',
      duration: 90,
      price: 20000,
      category: 'Corporal',
      active: true
    },
    {
      id: '3',
      clinicSlug: 'bella-estetica',
      name: 'Drenagem Linfática',
      slug: 'drenagem-linfatica',
      description: 'Drenagem para reduzir inchaço e retenção',
      duration: 60,
      price: 18000,
      category: 'Corporal',
      active: true
    },
    {
      id: '4',
      clinicSlug: 'bella-estetica',
      name: 'Peeling Químico',
      slug: 'peeling-quimico',
      description: 'Renovação celular profunda da pele',
      duration: 45,
      price: 25000,
      category: 'Facial',
      active: true
    },
    {
      id: '5',
      clinicSlug: 'bella-estetica',
      name: 'Botox',
      slug: 'botox',
      description: 'Aplicação de toxina botulínica',
      duration: 30,
      price: 80000,
      category: 'Estético',
      active: true
    }
  ]

  // Filter by clinic
  const filtered = services.filter(s => s.clinicSlug === clinicSlug && s.active)

  return NextResponse.json(filtered)
}
