import {Container, Content} from "rsuite";
import styles from "./DHB.module.css";
import React from "react";
import TitleContainer from "@/components/TitleContainer";
import CustomTable from "../../layouts/CustomTable"
import useCustomTable from "@/hooks/layouts/customTable/hooks";
import {columnsCustomTable} from "./const";
import {DataDHB} from "./types";
import {fetchData} from "@/containers/DHB/mock";

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
    } = useCustomTable(fetchData, "index");

    return (<Container>
        <TitleContainer title="Derechohabientes"/>
        <Content style={{margin: "1rem"}}>
            <div className={styles.InfinityTableContainer}>
                <CustomTable<DataDHB>
                    indexKey="index" data={data} tableHeight={700} loading={loading} checkedKeys={checkedKeys}
                    checked={checked}
                    indeterminate={indeterminate} handleCheck={handleCheck} handleCheckAll={handleCheckAll}
                    handleSortColumn={handleSortColumn} sortColumn={sortColumn} sortType={sortType}
                    handleScroll={handleScroll} columnsCustomTable={columnsCustomTable}/>
            </div>
        </Content>
    </Container>)
}
export default DHB;