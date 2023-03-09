import React, { useRouter } from 'next/router'
import { useEffect } from 'react'
import RedirectPage from '@/components/RedirectPage'

export default function Main (): React.ReactElement {
  const router = useRouter()

  useEffect(() => {
    void router.push('/home').then()
  })

  return (
      <RedirectPage />
  )
}
