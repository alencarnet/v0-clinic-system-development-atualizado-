import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(request.url)
  const clinicSlug = searchParams.get('clinicSlug')

  if (!clinicSlug) {
    return NextResponse.json(
      { error: 'Clinic slug is required' },
      { status: 400 }
    )
  }

  // Mock data - In production, query database filtered by clinic_id
  const services: Record<string, any> = {
    'limpeza-de-pele': {
      id: '1',
      clinicSlug: 'bella-estetica',
      name: 'Limpeza de Pele',
      slug: 'limpeza-de-pele',
      description: 'Limpeza profunda com extração de cravos e espinhas, ideal para todos os tipos de pele',
      duration: 60,
      price: 15000,
      active: true
    },
    'massagem-relaxante': {
      id: '2',
      clinicSlug: 'bella-estetica',
      name: 'Massagem Relaxante',
      slug: 'massagem-relaxante',
      description: 'Massagem corporal completa com técnicas de relaxamento profundo',
      duration: 90,
      price: 20000,
      active: true
    }
  }

  const service = services[params.slug]

  if (!service || service.clinicSlug !== clinicSlug) {
    return NextResponse.json(
      { error: 'Service not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(service)
}
