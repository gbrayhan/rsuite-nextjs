import {NativeCellProps} from "@/containers/DHB/CustomTable/Types";
import {Checkbox} from "rsuite";
import React from "react";
import {Cell} from "rsuite-table";
import {ValueType} from "rsuite/Checkbox";


export type CheckCellProps<T> = {
    rowData?: T, onChange: (value: number, checked: boolean) => void, checkedKeys: number[], dataKey: keyof T, props?: NativeCellProps
}
export const CheckCell = <T extends object>({
                                                rowData, onChange, checkedKeys, dataKey, ...props
                                            }: CheckCellProps<T>) => (<Cell {...props} style={{padding: 0}}>
    <div style={{lineHeight: '46px'}}>
        <Checkbox
            value={rowData ? rowData[dataKey] as ValueType : undefined}
            inline
            onChange={(value, checked, event) => {
                onChange(Number(value), checked)
            }}
            checked={rowData ? checkedKeys.some(item => item === rowData[dataKey]) : false}
        />
    </div>
</Cell>);