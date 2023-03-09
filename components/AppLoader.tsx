import React from 'react'
import { Loader, Placeholder } from 'rsuite'

const AppLoader = (): React.ReactElement => (
    <div>
        <Placeholder.Paragraph rows={15} />
        <Loader backdrop center size="lg" content="loading" vertical/>
    </div>
)
export default AppLoader
