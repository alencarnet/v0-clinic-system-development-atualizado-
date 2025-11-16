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
  const packages = [
    {
      id: 'p1',
      clinicSlug: 'bella-estetica',
      name: 'Pacote Rejuvenescimento',
      slug: 'pacote-rejuvenescimento',
      description: 'Botox + Preenchimento + Bioestimulador',
      duration: 180,
      price: 89000,
      sessions: 3,
      services: ['Botox', 'Preenchimento Labial', 'Bioestimulador'],
      active: true
    },
    {
      id: 'p2',
      clinicSlug: 'bella-estetica',
      name: 'Pacote Corpo Perfeito',
      slug: 'pacote-corpo-perfeito',
      description: 'Criolipólise + Drenagem + Radiofrequência',
      duration: 240,
      price: 149000,
      sessions: 5,
      services: ['Criolipólise', 'Drenagem Linfática', 'Radiofrequência'],
      active: true
    },
    {
      id: 'p3',
      clinicSlug: 'bella-estetica',
      name: 'Pacote Pele Perfeita',
      slug: 'pacote-pele-perfeita',
      description: 'Limpeza + Peeling + Hidratação',
      duration: 120,
      price: 59000,
      sessions: 4,
      services: ['Limpeza de Pele', 'Peeling Químico', 'Hidratação Profunda'],
      active: true
    }
  ]

  const filtered = packages.filter(p => p.clinicSlug === clinicSlug && p.active)

  return NextResponse.json(filtered)
}
