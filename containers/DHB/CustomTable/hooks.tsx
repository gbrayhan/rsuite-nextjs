import {Checkbox, Loader, Table} from "rsuite";
import {faker} from "@faker-js/faker";
import React from "react";
import {SortType} from "rsuite-table";
import {Data, NativeCellProps} from "./Types";
const {Cell} = Table;
export const tableHeight = 750;

export const FixedLoader = () => (<Loader
    content="Loading..."
    style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        background: '#f5f5f5',
        width: '100%',
        padding: '4px 0'
    }}
/>);

export const fetchData = (start: number, length: number): Data[] => Array.from({length}).map((_, index) => {
    const itemData: Data = {
        index: start + index,
        texts: faker.lorem.paragraph(1),
        name: faker.name.firstName(),
        company: faker.company.name(),
        age: Number(faker.random.numeric(2)),
        registeredDate: faker.date.past(1, new Date()).toISOString(),
        lastOrderDate: faker.date.past(1, new Date()).toISOString(),
        items: Number(faker.random.numeric(3)),
        orders: Number(faker.random.numeric(2)),
        quantity: Number(faker.finance.amount(1, 100, 2))
    }
    return itemData;
});

export type CheckCellProps<T> = {
    rowData?: T, onChange: (value: number, checked: boolean) => void, checkedKeys: number[], dataKey: keyof T, props?: NativeCellProps
}
export const CheckCell = ({
                              rowData = {
                                  index: 0,
                                  texts: '',
                                  name: '',
                                  age: 0,
                                  registeredDate: '',
                                  items: 0,
                                  orders: 0,
                                  lastOrderDate: '',
                                  quantity: 0,
                                  company: ''
                              }, onChange, checkedKeys, dataKey, ...props
                          }: CheckCellProps<Data>) => (<Cell {...props} style={{padding: 0}}>
    <div style={{lineHeight: '46px'}}>
        <Checkbox
            value={rowData[dataKey]}
            inline
            onChange={(value, checked, event) => {
                onChange(Number(value), checked)
            }}
            checked={checkedKeys.some(item => item === rowData[dataKey])}
        />
    </div>
</Cell>);


const useCustomTable = () => {
    const [data, setData] = React.useState<Data[]>(fetchData(0, 50));
    const [sortColumn, setSortColumn] = React.useState<keyof Data>();
    const [sortType, setSortType] = React.useState<SortType>();
    const [loading, setLoading] = React.useState(false);
    const [checkedKeys, setCheckedKeys] = React.useState<number[]>([]);
    let checked = false;
    let indeterminate = false;


    const getData = (prevData: Data[], sortColumnParam?: keyof Data, sortTypeParam?: SortType): Data[] => {
        if (sortColumnParam && sortTypeParam) {
            return prevData.sort((a: Data, b: Data) => {
                let x: string | number | Date = a[sortColumnParam];
                let y: string | number | Date = b[sortColumnParam];

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

    const loadMore = (sortColumnParam?: keyof Data, sortTypeParam?: SortType) => {
        setLoading(true);
        setTimeout(() => {
            setData(getData([...data, ...fetchData(data.length, 50)], sortColumnParam || sortColumn, sortTypeParam || sortType));
            setLoading(false);
        }, 500);
    };

    const handleSortColumn = (sortColumnParam: keyof Data, sortTypeParam: SortType) => {
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

    const handleCheckAll = (value: number, checked: boolean) => {
        const keys = checked ? data.map(item => item.index) : [];
        setCheckedKeys(keys);
    };
    const handleCheck = (value: number, checked: boolean) => {
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