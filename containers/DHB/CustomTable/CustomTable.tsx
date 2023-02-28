import React from "react";
import {Checkbox, Table} from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';
import {SortType} from "rsuite-table";
import {ColumnDefinition} from "./Types";
import {tableHeight} from "../hooks";
import {ActionCell} from "@/containers/DHB/CustomTable/components/ActionCell";
import {FixedLoader} from "@/containers/DHB/CustomTable/components/FixedLoader";
import {CheckCell} from "@/containers/DHB/CustomTable/components/CheckCell";
const {Column, HeaderCell, Cell} = Table;


export type CustomTableProps<T> = {
    indexKey: keyof T;
    data: T[];
    columnsCustomTable: ColumnDefinition<T>[];
    loading: boolean;
    checkedKeys: number[];
    handleCheck: (value: number, checked: boolean) => void;
    handleCheckAll: (checked: boolean) => void;
    handleSortColumn: (dataKey: keyof T, sortType: SortType) => void;
    handleScroll: (x: number, y: number) => void;
    sortColumn?: keyof T;
    sortType?: SortType;
    checked: boolean;
    indeterminate: boolean;
}

const CustomTable = <T extends object>({
                                           indexKey, data,
                                           sortColumn,
                                           sortType,
                                           handleSortColumn,
                                           handleScroll,
                                           handleCheckAll,
                                           checked,
                                           checkedKeys,
                                           handleCheck,
                                           loading,
                                           indeterminate,
                                           columnsCustomTable
                                       }: CustomTableProps<T>) => {


    return (<div>
        <div>
            <div>Some</div>
        </div>
        <Table
            virtualized
            shouldUpdateScroll={false}
            height={tableHeight}
            data={data}
            sortColumn={sortColumn as string}
            sortType={sortType}
            bordered
            cellBordered
            onSortColumn={(dataKeyParam, sortTypeParam?: SortType) => {
                handleSortColumn(dataKeyParam as keyof T, sortTypeParam || 'asc');
            }}
            onScroll={handleScroll}
        >
            <Column width={50} align="center" fixed={"left"}>
                <HeaderCell style={{padding: 0}}>
                    <div style={{lineHeight: '40px'}}>
                        <Checkbox
                            inline
                            checked={checked}
                            indeterminate={indeterminate}
                            onChange={(value, checked, event) => {
                                handleCheckAll(checked)
                            }}
                        />
                    </div>
                </HeaderCell>
                <CheckCell<T> dataKey={indexKey} checkedKeys={checkedKeys} onChange={handleCheck}/>
            </Column>

            {columnsCustomTable.map((column: ColumnDefinition<T>, index: number) => (
                <Column
                    key={index}
                    width={column.width}
                    flexGrow={column.flexGrow}
                    resizable={column.resizable}
                    sortable={column.sortable}
                    fixed={column.fixed}
                >
                    <HeaderCell>{column.header}</HeaderCell>
                    <Cell dataKey={column.dataKey as string}/>
                </Column>
            ))}

            <Column width={120} fixed={"right"}>
                <HeaderCell>
                    <MoreIcon/>
                </HeaderCell>
                <ActionCell<T> dataKey={indexKey}/>
            </Column>
        </Table>
        {loading && <FixedLoader/>}
    </div>);


}

export default CustomTable;