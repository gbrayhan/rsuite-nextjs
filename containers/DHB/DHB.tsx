import {Container, Content} from "rsuite";
import styles from "./DHB.module.css";
import React from "react";
import TitleContainer from "@/components/TitleContainer";
import CustomTable from "./CustomTable"
import useDHB from "./hooks";
import {columnsCustomTable} from "./const";

const DHB = () => {
    const {
        data,
        loading,
        checked,
        indeterminate,
        checkedKeys,
        handleCheck,
        handleCheckAll,
        handleSortColumn,
        sortColumn,
        sortType,
        handleScroll
    } = useDHB();

    return (<Container>
        <TitleContainer title="Derechohabientes"/>
        <Content style={{margin: "1rem"}}>
            <div className={styles.InfinityTableContainer}>
                <CustomTable
                    indexKey="index" data={data} loading={loading} checkedKeys={checkedKeys} checked={checked}
                    indeterminate={indeterminate} handleCheck={handleCheck} handleCheckAll={handleCheckAll}
                    handleSortColumn={handleSortColumn} sortColumn={sortColumn} sortType={sortType}
                    handleScroll={handleScroll} columnsCustomTable={columnsCustomTable}/>
            </div>
        </Content>
    </Container>)
}
export default DHB;