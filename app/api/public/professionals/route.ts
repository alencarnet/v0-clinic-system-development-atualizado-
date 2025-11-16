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

  // Mock data
  const professionals = [
    {
      id: '1',
      clinicSlug: 'bella-estetica',
      name: 'Dra. Carla Mendes',
      specialty: 'Dermatologista',
      photo: '',
      active: true
    },
    {
      id: '2',
      clinicSlug: 'bella-estetica',
      name: 'Ana Paula Silva',
      specialty: 'Esteticista',
      photo: '',
      active: true
    },
    {
      id: '3',
      clinicSlug: 'bella-estetica',
      name: 'Dr. Pedro Lima',
      specialty: 'Fisioterapeuta',
      photo: '',
      active: true
    }
  ]

  const filtered = professionals.filter(p => p.clinicSlug === clinicSlug && p.active)

  return NextResponse.json(filtered)
}
