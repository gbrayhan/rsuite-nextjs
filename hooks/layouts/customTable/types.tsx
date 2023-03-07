import { type SortType } from 'rsuite-table'

export interface HookCustomTable<T> {
  data: T[]
  sortColumn: keyof T
  sortType: SortType
  loading: boolean
  checkedKeys: Array<string | number>
  checked: boolean
  indeterminate: boolean
  handleScroll: (x: number, y: number) => void
  handleSortColumn: (sortColumnParam: keyof T, sortTypeParam: SortType) => void
  handleCheckAll: (checked: boolean) => void
  handleCheck: (value: string | number, checked: boolean) => void
  checkedColumnsHide: string[]
  setCheckedColumnsHide: (value: string[]) => void
  searchBar: string
  setSearchBar: (value: string) => void
  handleOnSearchBar: (searchBarParam: string) => void
}
