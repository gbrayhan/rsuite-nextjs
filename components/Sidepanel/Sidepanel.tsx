import { Nav, Sidebar, Sidenav } from 'rsuite'
import DashboardIcon from '@rsuite/icons/legacy/Dashboard'
import GroupIcon from '@rsuite/icons/legacy/Group'
import MagicIcon from '@rsuite/icons/legacy/Magic'
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle'
import styles from './Sidepanel.module.css'
import React from 'react'
import { useRouter } from 'next/router'

interface PropsSidePanel {
  activeKey: string
  setActiveKey: React.Dispatch<React.SetStateAction<string>>
}

const Sidepanel = ({ activeKey, setActiveKey }: PropsSidePanel) => {
  const [openKeys, setOpenKeys] = React.useState<string[]>(['4'])
  const [expand, setExpand] = React.useState<boolean>(true)

  const router = useRouter()

  return (<Sidebar
        className={styles.SidePanel}
        width={expand ? 260 : 56}
        collapsible
    >
        <Sidenav expanded={expand}
                 style={{ display: 'flex', minHeight: '100vh' }}
                 openKeys={openKeys}
                 onOpenChange={setOpenKeys}
        >
            <Sidenav.Body>
                <Nav activeKey={activeKey} onSelect={setActiveKey}>
                    <Nav.Item eventKey="dashboard" icon={<DashboardIcon/>}>
                        Dashboard
                    </Nav.Item>
                    <Nav.Item eventKey="dhb" icon={<GroupIcon/>}>
                        DHB
                    </Nav.Item>
                    <Nav.Menu
                        eventKey="advanced"
                        trigger="hover"
                        title="Advanced"
                        icon={<MagicIcon/>}
                        placement="rightStart"
                    >
                        <Nav.Item eventKey="advancedGeo">Geo</Nav.Item>
                        <Nav.Item eventKey="advancedDevices">Devices</Nav.Item>
                        <Nav.Item eventKey="advancedBrand">Brand</Nav.Item>
                        <Nav.Item eventKey="advancedLoyalty">Loyalty</Nav.Item>
                        <Nav.Item eventKey="advancedVisitDepth">Visit Depth</Nav.Item>
                    </Nav.Menu>
                    <Nav.Menu
                        eventKey="settings"
                        trigger="hover"
                        title="Settings"
                        icon={<GearCircleIcon/>}
                        placement="rightStart"
                    >
                        <Nav.Item eventKey="settingsApplications">Applications</Nav.Item>
                        <Nav.Item eventKey="settingsWebsites">Websites</Nav.Item>
                        <Nav.Item eventKey="settingsChannels">Channels</Nav.Item>
                        <Nav.Item eventKey="settingsVersions">Versions</Nav.Item>
                        <Nav.Item onClick={() => {
                          router.push('/logout').then(() => {
                          })
                        }} eventKey="settingsLogout">Logout</Nav.Item>
                    </Nav.Menu>
                </Nav>
            </Sidenav.Body>
            <div style={{ marginTop: 'auto' }}>
                <Sidenav.Toggle
                    expanded={expand}
                    onToggle={(expanded) => { setExpand(expanded) }}
                />
            </div>
        </Sidenav>

    </Sidebar>)
}

export default Sidepanel
