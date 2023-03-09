import React, { useEffect } from 'react'
import { type Form, type FormInstance, Schema } from 'rsuite'
import { useDispatch, useSelector } from 'react-redux'
import { type ThunkDispatch } from 'redux-thunk'
import { type RootState } from '@/store/store'
import { type AnyAction } from '@reduxjs/toolkit'
import { login } from '@/store/reducers/User/UserThunks'
import { type UserState } from '@/store/reducers/User/types'
import { useRouter } from 'next/router'

export const { StringType, NumberType } = Schema.Types

export const model = Schema.Model({
  email: StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),
  password: StringType().isRequired('This field is required.')
})

export interface FormValues {
  email: string
  password: string
}

export interface UseSignIn {
  formValue: FormValues
  setFormValue: (value: FormValues) => void
  handleSubmit: () => void
  formRef: React.RefObject<FormInstance<Record<string, undefined>, string, Record<string, string | undefined>>>
  router: ReturnType<typeof useRouter>
  userState: UserState

  isAuth: boolean
  loadingAuth: boolean
}

const useSignIn = (): UseSignIn => {
  const router = useRouter()
  const userState: UserState = useSelector((state: RootState) => state.user)
  const isAuth = userState?.auth?.data?.isAuthenticated
  const [loadingAuth, setLoadingAuth] = React.useState<boolean>(true)
  const [isHydrated, setIsHydrated] = React.useState<boolean>(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated && isAuth) {
      void router.push('/home').then()
    }

    if (isHydrated && !isAuth) {
      setLoadingAuth(false)
    }
  }, [isAuth, isHydrated, router])

  const formRef = React.useRef<React.ElementRef<typeof Form>>(null)
  const [formValue, setFormValue] = React.useState<FormValues>({
    email: '',
    password: ''
  })
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>()

  const handleSubmit = (): void => {
    const resultCheck = formRef.current?.check()
    if (resultCheck === false) {
      return
    }
    void dispatch(login({ email: formValue.email, password: formValue.password }))
  }

  return { formValue, setFormValue, handleSubmit, formRef, router, userState, isAuth, loadingAuth }
}

export default useSignIn
