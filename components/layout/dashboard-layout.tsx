'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Separator } from '@/components/ui/separator'

type UserRole = 'MASTER_ADMIN' | 'CLINIC_ADMIN' | 'PROFESSIONAL' | 'PATIENT'

interface DashboardLayoutProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export function DashboardLayout({ children, allowedRoles }: DashboardLayoutProps) {
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem('userRole') as UserRole
    const email = localStorage.getItem('userEmail')

    if (!role || !email) {
      router.push('/auth/login')
      return
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      router.push('/auth/login')
      return
    }

    setUserRole(role)
    setUserEmail(email)
  }, [router, allowedRoles])

  if (!userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} userEmail={userEmail} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
        </header>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
