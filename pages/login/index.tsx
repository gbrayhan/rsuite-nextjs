import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Login = (): void => {
  const router = useRouter()
  useEffect(() => {
    void router.push('/sign-in').then()
  })
}

export default Login
