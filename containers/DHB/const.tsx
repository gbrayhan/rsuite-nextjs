import {ColumnDefinition, DataDHB} from "./CustomTable/Types";

export const columnsCustomTable: ColumnDefinition<DataDHB>[] = [
    {
        width: 100,
        sortable: true,
        resizable: true,
        header: 'Index',
        dataKey: 'index',
        fixed: "left"
    },
    {
        width: 100,
        sortable: true,
        resizable: true,
        header: 'Name',
        dataKey: 'name',
        fixed: "left"
    },
    {
        width: 150,
        fullText: true,
        sortable: true,
        resizable: true,
        header: 'Company',
        dataKey: 'company'
    },
    {
        width: 200,
        fullText: true,
        resizable: true,
        header: 'Texts',
        dataKey: 'texts'
    },
    {
        width: 100,
        sortable: true,
        resizable: true,
        header: 'Age',
        dataKey: 'age'
    },
    {
        width: 100,
        sortable: true,
        resizable: true,
        header: 'Items',
        dataKey: 'items'
    },
    {
        width: 100,
        sortable: true,
        resizable: true,
        header: 'Orders',
        dataKey: 'orders'
    },
    {
        width: 100,
        sortable: true,
        resizable: true,
        header: 'Quantity',
        dataKey: 'quantity'
    },
    {
        width: 200,
        sortable: true,
        resizable: true,
        header: 'Last Order',
        dataKey: 'lastOrderDate'
    },
    {
        width: 200,
        sortable: true,
        resizable: true,
        header: 'Register',
        dataKey: 'registeredDate'
    }
];