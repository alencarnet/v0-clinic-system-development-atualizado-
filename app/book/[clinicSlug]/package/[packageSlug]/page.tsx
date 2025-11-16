'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DirectPackageBooking({ 
  params 
}: { 
  params: { clinicSlug: string; packageSlug: string } 
}) {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main booking page with package pre-selected
    // In real app, this would fetch package ID from slug and pass it as query param
    router.push(`/book/${params.clinicSlug}?package=${params.packageSlug}`)
  }, [params, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#0FA958]"></div>
        <p className="mt-4 text-gray-600">Carregando pacote...</p>
      </div>
    </div>
  )
}
