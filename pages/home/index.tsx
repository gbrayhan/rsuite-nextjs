import {Container} from 'rsuite';
import React from "react";
import Sidepanel from "@/components/Sidepanel";
import Dashboard from "@/containers/Dashboard";
import useIsAuth from "@/hooks/useIsAuth";

type ContainerMap = {
    [key: string]: () => JSX.Element
}

const containers: ContainerMap = {
    dashboard: Dashboard,
}

export const renderContainer = (containerSelected: string): JSX.Element => {
    if (containers[containerSelected] === undefined) return <div></div>;
    return containers[containerSelected]();
}

const Home = () => {
    const [activeKey, setActiveKey] = React.useState<string>('dashboard');
    const {userState} = useIsAuth();

    return (
        <div className="show-fake-browser sidebar-page">
            <Container>
                <Sidepanel activeKey={activeKey} setActiveKey={setActiveKey}/>
                {renderContainer(activeKey)}
            </Container>
        </div>);
};

export default Home;