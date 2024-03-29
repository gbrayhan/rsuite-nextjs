import { Container, Loader } from 'rsuite'
import React from 'react'
import Sidepanel from '@/components/Sidepanel'
import Dashboard from '@/containers/Dashboard'
import useIsAuth from '@/hooks/useIsAuth'
import DHB from '@/containers/DHB'

type ContainerMap = Record<string, () => JSX.Element>

const containers: ContainerMap = {
  dashboard: Dashboard,
  dhb: DHB
}

const Home = (): React.ReactElement => {
  const [activeKey, setActiveKey] = React.useState<string>('dashboard')
  const { loadingAuth } = useIsAuth()

  const renderContainer = React.useCallback((containerSelected: string): JSX.Element => {
    const ContainerComponent = containers[containerSelected]
    if (ContainerComponent === undefined) return <div></div>

    return <ContainerComponent/>
  }, [])

  return (
        <div className="show-fake-browser sidebar-page">
            <Container>
                <Sidepanel activeKey={activeKey} setActiveKey={setActiveKey}/>
                {renderContainer(activeKey)}
            </Container>
            {(Boolean(loadingAuth)) && <Loader backdrop center size="lg" content="loading" vertical/>}
        </div>)
}

export default Home
