import {Checkbox, Table} from 'rsuite';
import React from "react";
import {SortType} from "rsuite-table";
import {ColumnDefinition, Data} from "./Types";
import useCustomTable, {CheckCell, FixedLoader, tableHeight} from "./hooks";
import {columnsCustomTable} from "@/containers/DHB/CustomTable/const";

const {Column, HeaderCell, Cell} = Table;


const CustomTable = () => {
    const {
        data,
        sortColumn,
        sortType,
        handleSortColumn,
        handleScroll,
        handleCheckAll,
        checked,
        checkedKeys,
        handleCheck,
        loading,
        indeterminate
    } = useCustomTable();


        return (<div>
        <Table
            virtualized
            shouldUpdateScroll={false}
            height={tableHeight}
            data={data}
            sortColumn={sortColumn}
            sortType={sortType}
            bordered
            cellBordered
            onSortColumn={(dataKeyParam, sortTypeParam?: SortType) => {
                handleSortColumn(dataKeyParam as keyof Data, sortTypeParam || 'asc');
            }}
            onScroll={handleScroll}
        >
            <Column width={50} align="center">
                <HeaderCell style={{padding: 0}}>
                    <div style={{lineHeight: '40px'}}>
                        <Checkbox
                            inline
                            checked={checked}
                            indeterminate={indeterminate}
                            onChange={(value, checked, event) => {
                                handleCheckAll(Number(value), checked)
                            }}
                        />
                    </div>
                </HeaderCell>
                <CheckCell dataKey="index" checkedKeys={checkedKeys} onChange={handleCheck}/>
            </Column>

            {columnsCustomTable.map((column: ColumnDefinition<Data>, index: number) => (
                <Column
                    key={index}
                    width={column.width}
                    flexGrow={column.flexGrow}
                    resizable={column.resizable}
                    sortable={column.sortable}
                >
                    <HeaderCell>{column.header}</HeaderCell>
                    <Cell dataKey={column.dataKey} />
                </Column>
            ))}
        </Table>
        {loading && <FixedLoader/>}
    </div>);


}

export default CustomTable;