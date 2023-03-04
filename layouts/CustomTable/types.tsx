import {RowDataType} from "rsuite-table/src/@types/common";
import React from "react";
import {SortType} from "rsuite-table";


export type ColumnDefinition<T> = {
    width: number; sortable?: boolean; resizable?: boolean; fullText?: boolean; fixed?: boolean | 'left' | 'right';

    header: string; dataKey: keyof T; flexGrow?: number; visibleOnInit?: boolean;
};

export type ObjDataTable = {
    [key: string]: string | number;
};


export type NativeCellProps = {
    align?: 'left' | 'center' | 'right'; verticalAlign?: 'top' | 'middle' | 'bottom'; isHeaderCell?: boolean; width?: number; height?: number | ((rowData: RowDataType) => number); left?: number; headerHeight?: number; style?: React.CSSProperties; fullText?: boolean; firstColumn?: boolean; lastColumn?: boolean; hasChildren?: boolean; children?: React.ReactNode | ((rowData: RowDataType, rowIndex?: number) => React.ReactNode); rowKey?: string | number; rowSpan?: number; depth?: number; wordWrap?: boolean | 'break-all' | 'break-word' | 'keep-all'; removed?: boolean; treeCol?: boolean; expanded?: boolean; predefinedStyle?: React.CSSProperties; onTreeToggle?: (rowKey?: string | number, rowIndex?: number, rowData?: RowDataType, event?: React.MouseEvent) => void;

    renderTreeToggle?: (expandButton: React.ReactNode, rowData?: RowDataType, expanded?: boolean) => React.ReactNode; renderCell?: (contentChildren: any) => React.ReactNode;
}


export type CustomTableProps<T> = {
    indexKey: keyof T; data: T[]; tableHeight?: number; columnsCustomTable: ColumnDefinition<T>[]; loading: boolean; checkedKeys: Array<string | number>; handleCheck: (value: number | string, checked: boolean) => void; handleCheckAll: (checked: boolean) => void; handleSortColumn: (dataKey: keyof T, sortType: SortType) => void; handleScroll: (x: number, y: number) => void; sortColumn?: keyof T; sortType?: SortType; checked: boolean; indeterminate: boolean;
}
