import {Loader, Table} from 'rsuite';
import React from "react";
import {faker} from "@faker-js/faker";
import {SortType} from "rsuite-table";

const {Column, HeaderCell, Cell} = Table;

type Data = {
    index: number,
    texts: string,
    name: string,
    age: string,
    date: string,

}
const FixedLoader = () => (<Loader
    content="Loading..."
    style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        background: '#f5f5f5',
        width: '700px',
        padding: '4px 0'
    }}
/>);

const fetchData = (start: number, length: number): Data[] =>
    Array.from({length}).map((_, index) => {
        const itemData: Data = {
            index: start + index,
            texts: faker.lorem.paragraph(1),
            name: faker.name.firstName(),
            age: faker.random.numeric(2),
            date: faker.date.past(1, new Date()).toISOString()
        }
        return itemData;
    });

const tableHeight = 600;


const InfiniteTable = () => {
    const [data, setData] = React.useState<Data[]>(fetchData(0, 50));
    const [sortColumn, setSortColumn] = React.useState<keyof Data>();
    const [sortType, setSortType] = React.useState<SortType>();
    const [loading, setLoading] = React.useState(false);

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
            setData(
                getData([...data, ...fetchData(data.length, 50)], sortColumnParam || sortColumn, sortTypeParam || sortType)
            );
            setLoading(false);
        }, 1000);
    };

    const handleSortColumn = (sortColumnParam: keyof Data, sortTypeParam: SortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumnParam);
            setSortType(sortTypeParam);
            setData(
                getData(data, sortColumnParam, sortTypeParam)
            );
        }, 500);
    };

    const handleScroll = (x: number, y: number) => {
        const contextHeight = data.length * 46;
        const top = Math.abs(y);

        if (contextHeight - top - tableHeight < 300) {
            loadMore(sortColumn, sortType);
        }
    };

    return (<div style={{width: "700px", display: "block"}}>
        <Table
            virtualized
            shouldUpdateScroll={false}
            height={tableHeight}
            data={data}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={(dataKeyParam, sortTypeParam?: SortType) => {
                handleSortColumn(dataKeyParam as keyof Data, sortTypeParam || 'asc');
            }}
            onScroll={handleScroll}
        >
            <Column width={100} sortable>
                <HeaderCell>Index</HeaderCell>
                <Cell dataKey="index"/>
            </Column>
            <Column width={100} sortable>
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey="name"/>
            </Column>
            <Column width={200} fullText>
                <HeaderCell>Texts</HeaderCell>
                <Cell dataKey="texts"/>
            </Column>
            <Column width={100} sortable>
                <HeaderCell>Age</HeaderCell>
                <Cell dataKey="age"/>
            </Column>
            <Column width={200} sortable>
                <HeaderCell>Date</HeaderCell>
                <Cell dataKey="date"/>
            </Column>
        </Table>
        {loading && <FixedLoader/>}
    </div>);


}

export default InfiniteTable;