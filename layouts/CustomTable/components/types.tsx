import { NativeCellProps} from "../types";

export type ActionCellProps<T> = {
    rowData?: T; dataKey: keyof T; props?: NativeCellProps;
}

export type ParamsRenderMenu = {
    onClose: () => void; left: number; top: number; className: string;
}

