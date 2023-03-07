import { type NativeCellProps } from '../types'

export interface ActionCellProps<T> {
  rowData?: T; dataKey: keyof T; props?: NativeCellProps
}

export interface ParamsRenderMenu {
  onClose: () => void; left: number; top: number; className: string
}
