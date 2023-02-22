import {Container, Content, Header} from 'rsuite';
import React from "react";
import Sidepanel from "@/components/Sidepanel";
import styles from "./Home.module.css"
import useHome from "./hooks";
import CustomBar from "@/components/Dashboard/CustomBar";
import CustomPie from "@/components/Dashboard/CustomPie";
import CustomLine from "@/components/Dashboard/CustomLine";


const Home = () => {
    useHome();

    return <div className="show-fake-browser sidebar-page">
        <Container>
            <Sidepanel/>
            <Container>
                <Header style={{margin: "1rem"}}>
                    <h2>Dashboard</h2>
                </Header>
                <Content style={{margin: "1rem"}}>
                    <div className={styles.BarGraphContainer}>
                        <CustomBar/>
                    </div>
                    <div className={styles.SecondSection}>
                        <CustomPie/>

                        <CustomLine/>
                    </div>
                </Content>
            </Container>
        </Container>
    </div>;
};

export default Home;