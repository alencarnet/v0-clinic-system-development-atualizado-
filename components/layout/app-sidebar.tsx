'use client'

import * as React from 'react'
import { Building2, Calendar, FileText, Home, Settings, Users, UserCog, Activity, DollarSign, BarChart3, ClipboardList, Shield, Palette, Package, Bell, LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type UserRole = 'MASTER_ADMIN' | 'CLINIC_ADMIN' | 'PROFESSIONAL' | 'PATIENT'

interface AppSidebarProps {
  userRole: UserRole
  userEmail: string
}

const menuByRole: Record<UserRole, Array<{ title: string; items: Array<{ title: string; url: string; icon: any }> }>> = {
  MASTER_ADMIN: [
    {
      title: 'Administração',
      items: [
        { title: 'Dashboard', url: '/master/dashboard', icon: Home },
        { title: 'Clínicas', url: '/master/clinics', icon: Building2 },
        { title: 'Branding', url: '/master/branding', icon: Palette },
        { title: 'Configurações', url: '/master/settings', icon: Settings },
        { title: 'Logs', url: '/master/logs', icon: Shield },
      ],
    },
  ],
  CLINIC_ADMIN: [
    {
      title: 'Gestão',
      items: [
        { title: 'Dashboard', url: '/clinic/dashboard', icon: Home },
        { title: 'Agenda', url: '/clinic/appointments', icon: Calendar },
        { title: 'Pacientes', url: '/clinic/patients', icon: Users },
        { title: 'Profissionais', url: '/clinic/professionals', icon: UserCog },
      ],
    },
    {
      title: 'Configurações',
      items: [
        { title: 'Serviços', url: '/clinic/services', icon: ClipboardList },
        { title: 'Pacotes', url: '/clinic/packages', icon: Package },
        { title: 'Links de Agendamento', url: '/clinic/booking-links', icon: LinkIcon },
        { title: 'Notificações', url: '/clinic/notifications', icon: Bell },
        { title: 'Relatórios', url: '/clinic/reports', icon: BarChart3 },
        { title: 'Documentos', url: '/clinic/documents', icon: FileText },
        { title: 'Financeiro', url: '/clinic/financial', icon: DollarSign },
        { title: 'Configurações', url: '/clinic/settings', icon: Settings },
      ],
    },
  ],
  PROFESSIONAL: [
    {
      title: 'Atendimento',
      items: [
        { title: 'Dashboard', url: '/professional/dashboard', icon: Home },
        { title: 'Minha Agenda', url: '/professional/appointments', icon: Calendar },
        { title: 'Atendimentos', url: '/professional/consultations', icon: Activity },
        { title: 'Prontuários', url: '/professional/records', icon: FileText },
      ],
    },
    {
      title: 'Pessoal',
      items: [
        { title: 'Meu Perfil', url: '/professional/profile', icon: Settings },
      ],
    },
  ],
  PATIENT: [
    {
      title: 'Minha Área',
      items: [
        { title: 'Dashboard', url: '/patient/dashboard', icon: Home },
        { title: 'Agendamentos', url: '/patient/appointments', icon: Calendar },
        { title: 'Histórico', url: '/patient/history', icon: Activity },
        { title: 'Documentos', url: '/patient/documents', icon: FileText },
        { title: 'Meu Perfil', url: '/patient/profile', icon: Settings },
      ],
    },
  ],
}

export function AppSidebar({ userRole, userEmail }: AppSidebarProps) {
  const pathname = usePathname()
  const menuSections = menuByRole[userRole]

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {userRole === 'MASTER_ADMIN' ? 'White Label Admin' : 'Sistema Clínica'}
            </span>
            <span className="text-xs text-muted-foreground">
              {userRole === 'MASTER_ADMIN' && 'Master Admin'}
              {userRole === 'CLINIC_ADMIN' && 'Administrador'}
              {userRole === 'PROFESSIONAL' && 'Profissional'}
              {userRole === 'PATIENT' && 'Paciente'}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {menuSections.map((section, idx) => (
          <SidebarGroup key={idx}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.url
                  
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url}>
                          <Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {userEmail.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-medium truncate">{userEmail}</span>
            <Link href="/auth/login" className="text-xs text-muted-foreground hover:text-foreground">
              Sair
            </Link>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
