import { type NativeCellProps } from '../types'
import { Checkbox } from 'rsuite'
import React from 'react'
import { Cell } from 'rsuite-table'
import { type ValueType } from 'rsuite/Checkbox'

export interface CheckCellProps<T> {
  rowData?: T
  onChange: (value: number, checked: boolean) => void
  checkedKeys: Array<string | number>
  dataKey: keyof T
  props?: NativeCellProps
}

export const CheckCell = <T extends object>({
  rowData, onChange, checkedKeys, dataKey, ...props
}: CheckCellProps<T>): React.ReactElement => (<Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: '46px' }}>
        <Checkbox
            value={(rowData != null) ? rowData[dataKey] as ValueType : undefined}
            inline
            onChange={(value, checked, event) => {
              onChange(Number(value), checked)
            }}
            checked={(rowData != null) ? checkedKeys.some(item => item === rowData[dataKey]) : false}
        />
    </div>
</Cell>)
