import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params

  // Mock data - In production, this would query the database
  const clinics: Record<string, any> = {
    'bella-estetica': {
      id: '1',
      name: 'Clínica Bella Estética',
      slug: 'bella-estetica',
      logo: '/clinic-logo.jpg',
      primaryColor: '#0FA958',
      secondaryColor: '#ffffff',
      phone: '(11) 98765-4321',
      email: 'contato@bellaestetica.com',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      description: 'Clínica de estética especializada em tratamentos faciais e corporais',
      workingHours: {
        monday: '09:00-18:00',
        tuesday: '09:00-18:00',
        wednesday: '09:00-18:00',
        thursday: '09:00-18:00',
        friday: '09:00-18:00',
        saturday: '09:00-14:00',
        sunday: 'closed'
      }
    }
  }

  const clinic = clinics[slug]

  if (!clinic) {
    return NextResponse.json(
      { error: 'Clinic not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(clinic)
}
