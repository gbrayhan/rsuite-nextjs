import { Divider, Header } from 'rsuite'
import React from 'react'

interface TitleContainerProps {
  title: string
}
const TitleContainer = ({ title }: TitleContainerProps): React.ReactElement => {
  return (
        <>
            <Header style={{ marginTop: '1rem', marginLeft: '1rem' }}>
                <h2>{title}</h2>
            </Header>
            <Divider style={{ marginLeft: '1rem', marginRight: '1rem' }}/>
        </>
  )
}

export default TitleContainer
