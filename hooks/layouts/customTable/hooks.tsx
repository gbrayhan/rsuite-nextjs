import React from "react";
import {SortType} from "rsuite-table";
import {ObjDataTable} from "@/layouts/CustomTable/types";
import {HookCustomTable} from "./types";

export const tableHeight = 750;

const useCustomTable = <T extends ObjDataTable>(fetchData: (start: number, limit: number) => T[], indexTable: keyof T): HookCustomTable<T> => {
    const [data, setData] = React.useState<T[]>([]);
    const [sortColumn, setSortColumn] = React.useState<keyof T>(indexTable);
    const [sortType, setSortType] = React.useState<SortType>("desc");
    const [loading, setLoading] = React.useState(false);
    const [checkedKeys, setCheckedKeys] = React.useState<Array<string | number>>([]);
    let checked = false;
    let indeterminate = false;


    React.useEffect(() => {
        setData(fetchData(0, 50));
    }, [fetchData]);


    const getData = (prevData: T[], sortColumnParam?: keyof T, sortTypeParam?: SortType): T[] => {
        if (sortColumnParam && sortTypeParam) {
            return prevData.sort((a: T, b: T) => {
                let x: T[keyof T] = a[sortColumnParam];
                let y: T[keyof T] = b[sortColumnParam];

                if (sortTypeParam === 'asc') {
                    if (typeof x === "string" && typeof y === "string") {
                        return x.localeCompare(y);
                    } else if (typeof x === "number" && typeof y === "number") {
                        return x - y;
                    }
                } else {
                    if (typeof x === "string" && typeof y === "string") {
                        return y.localeCompare(x);
                    } else if (typeof x === "number" && typeof y === "number") {
                        return y - x;
                    }
                }
                return -1;
            });
        }
        return prevData;
    };

    const loadMore = (sortColumnParam?: keyof T, sortTypeParam?: SortType) => {
        setLoading(true);
        setTimeout(() => {
            setData(getData([...data, ...fetchData(data.length, 50)], sortColumnParam || sortColumn, sortTypeParam || sortType));
            setLoading(false);
        }, 500);
    };

    const handleSortColumn = (sortColumnParam: keyof T, sortTypeParam: SortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumnParam);
            setSortType(sortTypeParam);
            setData(getData(data, sortColumnParam, sortTypeParam));
        }, 500);
    };

    const handleScroll = (x: number, y: number) => {
        const contextHeight = data.length * 46;
        const top = Math.abs(y);

        if (contextHeight - top - tableHeight < 300) {
            loadMore(sortColumn, sortType);
        }
    };

    if (checkedKeys.length === data.length) {
        checked = true;
    } else if (checkedKeys.length === 0) {
        checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
        indeterminate = true;
    }

    const handleCheckAll = (checked: boolean) => {
        const keys: Array<string | number> = checked ? data.map(item => {
            const value = item[indexTable]
            return value;
        }) : [];
        setCheckedKeys(keys);
    };
    const handleCheck = (value: string | number, checked: boolean) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };

    return {
        handleScroll,
        handleSortColumn,
        sortType,
        sortColumn,
        data,
        loading,
        checked,
        indeterminate,
        handleCheckAll,
        handleCheck,
        checkedKeys
    }
}


export default useCustomTable;