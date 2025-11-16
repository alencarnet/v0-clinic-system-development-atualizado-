'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DirectServiceBooking({ 
  params 
}: { 
  params: { clinicSlug: string; serviceSlug: string } 
}) {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main booking page with service pre-selected
    // In real app, this would fetch service ID from slug and pass it as query param
    router.push(`/book/${params.clinicSlug}?service=${params.serviceSlug}`)
  }, [params, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0FA958]"></div>
        <p className="mt-4 text-gray-600">Carregando agendamento...</p>
      </div>
    </div>
  )
}
