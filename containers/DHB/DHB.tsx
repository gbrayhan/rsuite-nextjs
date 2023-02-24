import {Container, Content} from "rsuite";
import styles from "./DHB.module.css";
import React from "react";
import TitleContainer from "@/components/TitleContainer";
import InfiniteTable from "@/components/InfiniteTable";

const DHB = () => {
    return (
        <Container>
            <TitleContainer title="Derechohabientes"/>
            <Content style={{margin: "1rem"}}>
                <div className={styles.InfinityTableContainer}>
                    <InfiniteTable/>
                </div>
            </Content>
        </Container>
    )
}
export default DHB;