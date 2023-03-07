import React from 'react'
import errorsMap from '@/images/errors'
import Image from 'next/image'

interface ErrorPageProps {
  code?: number
  children?: React.ReactNode
}

const ErrorPage: React.FC<ErrorPageProps> = ({ code = 404, children }) => {
  const errorImg: string = errorsMap[`Error${code}Img`] ?? errorsMap.Error404Img
  return (
        <div className="error-page">
            <div className="item">
                <Image src={errorImg} alt={`${code}`}/>
                <div className="text">
                    <h1 className="error-page-code">{code}</h1>
                    {children}
                </div>
            </div>
        </div>
  )
}
export default ErrorPage
