import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import RedirectPage from '@/components/RedirectPage'

const Login = (): React.ReactElement => {
  const router = useRouter()
  useEffect(() => {
    void router.push('/sign-in').then()
  })

  return (
    <RedirectPage />
  )
}

export default Login
