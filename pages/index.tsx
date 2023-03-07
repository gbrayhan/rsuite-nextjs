import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { type RootState } from '@/store/store'
import { useEffect } from 'react'

export default function Main (): void {
  const user = useSelector((state: RootState) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (user?.information?.data?.isAuthenticated === true) {
      void router.push('/home').then()
    } else {
      void router.push('/sign-in').then()
    }
  })
}
