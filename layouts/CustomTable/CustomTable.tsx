import React from "react";
import {Checkbox, Table} from 'rsuite';
import MoreIcon from '@rsuite/icons/legacy/More';
import {SortType} from "rsuite-table";
import {ColumnDefinition, CustomTableProps, ObjDataTable} from "./types";
import {ActionCell} from "./components/ActionCell";
import {FixedLoader} from "./components/FixedLoader";
import {CheckCell} from "./components/CheckCell";
import BarTable from "./components/BarTable";

const {Column, HeaderCell, Cell} = Table;

const CustomTable = <T extends ObjDataTable>({
                                                 indexKey,
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
                                                 indeterminate,
                                                 columnsCustomTable,
                                                 tableHeight,
                                             }: CustomTableProps<T>) => {


    return (<div>
        <BarTable<T> columnsCustomTable={columnsCustomTable}/>
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

            {columnsCustomTable.map((column: ColumnDefinition<T>, index: number) => (<Column
                key={index}
                width={column.width}
                flexGrow={column.flexGrow}
                resizable={column.resizable}
                sortable={column.sortable}
                fixed={column.fixed}
            >
                <HeaderCell>{column.header}</HeaderCell>
                <Cell dataKey={column.dataKey as string}/>
            </Column>))}

            <Column width={70} fixed={"right"}>
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