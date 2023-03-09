import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '@/store/store'
import { type UserState } from '@/store/reducers/User/types'
import { useRouter } from 'next/router'

export interface UseIsAuthType {
  router: ReturnType<typeof useRouter>
  userState: UserState
  isAuth: boolean
  loadingAuth: boolean
}
const useIsAuth = (): UseIsAuthType => {
  const router = useRouter()
  const userState: UserState = useSelector((state: RootState) => state.user)
  const isAuth = userState?.auth?.data?.isAuthenticated
  const [loadingAuth, setLoadingAuth] = React.useState<boolean>(true)
  const [isHydrated, setIsHydrated] = React.useState<boolean>(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated && !isAuth) {
      void router.push('/sign-in').then()
    }
    if (isHydrated && isAuth) {
      setLoadingAuth(false)
    }
  }, [isAuth, isHydrated, router, setLoadingAuth])

  return { router, userState, isAuth, loadingAuth }
}

export default useIsAuth
