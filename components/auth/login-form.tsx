'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      // Simulate different user roles based on email
      let role = 'PATIENT'
      if (email.includes('admin')) role = 'MASTER_ADMIN'
      else if (email.includes('clinic')) role = 'CLINIC_ADMIN'
      else if (email.includes('prof')) role = 'PROFESSIONAL'

      // Store in localStorage (replace with proper auth later)
      localStorage.setItem('userRole', role)
      localStorage.setItem('userEmail', email)

      toast({
        title: 'Login realizado',
        description: 'Bem-vindo ao sistema!',
      })

      // Redirect based on role
      if (role === 'MASTER_ADMIN') router.push('/master/dashboard')
      else if (role === 'CLINIC_ADMIN') router.push('/clinic/dashboard')
      else if (role === 'PROFESSIONAL') router.push('/professional/dashboard')
      else router.push('/patient/dashboard')

      setIsLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Entrar'}
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-4">
        Teste: admin@test.com, clinic@test.com, prof@test.com, patient@test.com
      </p>
    </form>
  )
}
