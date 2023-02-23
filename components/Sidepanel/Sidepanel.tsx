import {Nav, Sidebar, Sidenav} from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import styles from "./Sidepanel.module.css"
import React from "react";
import {router} from "next/client";

const Sidepanel = () => {
    const [expand, setExpand] = React.useState(true);
    // const [activeKey, setActiveKey] = React.useState('1');
    return (
        <Sidebar
            className={styles.SidePanel}
            width={expand ? 260 : 56}
            collapsible
        >
            <Sidenav expanded={expand} defaultOpenKeys={['3']}
                     style={{display: "flex", minHeight: "100vh"}}>
                <Sidenav.Body>
                    <Nav>
                        <Nav.Item eventKey="1" active icon={<DashboardIcon/>}>
                            Dashboard
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<GroupIcon/>}>
                            User Group
                        </Nav.Item>
                        <Nav.Menu
                            eventKey="3"
                            trigger="hover"
                            title="Advanced"
                            icon={<MagicIcon/>}
                            placement="rightStart"
                        >
                            <Nav.Item eventKey="3-1">Geo</Nav.Item>
                            <Nav.Item eventKey="3-2">Devices</Nav.Item>
                            <Nav.Item eventKey="3-3">Brand</Nav.Item>
                            <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
                            <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
                        </Nav.Menu>
                        <Nav.Menu
                            eventKey="4"
                            trigger="hover"
                            title="Settings"
                            icon={<GearCircleIcon/>}
                            placement="rightStart"
                        >
                            <Nav.Item eventKey="4-1">Applications</Nav.Item>
                            <Nav.Item eventKey="4-2">Websites</Nav.Item>
                            <Nav.Item eventKey="4-3">Channels</Nav.Item>
                            <Nav.Item eventKey="4-5">Versions</Nav.Item>
                            <Nav.Item onClick={() => {
                                router.push('/logout').then(() => {
                                })
                            }} eventKey="4-4">Logout</Nav.Item>

                        </Nav.Menu>
                    </Nav>
                </Sidenav.Body>
                <div style={{marginTop: "auto"}}>
                    <Sidenav.Toggle
                        expanded={expand}
                        onToggle={(expanded) => setExpand(expanded)}
                    />
                </div>
            </Sidenav>

        </Sidebar>
    );
};


export default Sidepanel;