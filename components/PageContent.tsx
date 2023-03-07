import React from 'react'
import { Panel, type PanelProps } from 'rsuite'
import Copyright from './Copyright'

interface PageContentProps extends PanelProps {
  showCopyright?: boolean
}

const PageContent = (props: PageContentProps): React.ReactElement => {
  const { showCopyright = true, ...panelProps } = props
  return (
    <>
      <Panel className="page-content" {...panelProps} />
      {showCopyright && <Copyright />}
    </>
  )
}

export default PageContent
