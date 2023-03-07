import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '@/store/store'
import { type UserState } from '@/store/reducers/User/types'
import { useRouter } from 'next/router'

export interface UseIsAuthType {
  router: ReturnType<typeof useRouter>
  userState: UserState
}
const useIsAuth = (): UseIsAuthType => {
  const router = useRouter()
  const userState: UserState = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (!userState.auth.data.isAuthenticated) {
      void router.push('/sign-in').then()
    }
  })

  return { router, userState }
}

export default useIsAuth
