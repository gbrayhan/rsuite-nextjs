import React from 'react'
import { type SortType } from 'rsuite-table'
import { type ColumnDefinition, type ObjDataTable } from '@/layouts/CustomTable/types'
import { type HookCustomTable } from './types'

export const tableHeight = 750

const useCustomTable = <T extends ObjDataTable>(fetchData: (start: number, limit: number, sortColumnParam?: keyof T, sortTypeParam?: SortType, searchBar?: string) => T[], indexTable: keyof T, columnsCustomTable: Array<ColumnDefinition<T>>): HookCustomTable<T> => {
  const [data, setData] = React.useState<T[]>([])
  const [sortColumn, setSortColumn] = React.useState<keyof T>(indexTable)
  const [sortType, setSortType] = React.useState<SortType>('desc')
  const [loading, setLoading] = React.useState(false)
  const [checkedKeys, setCheckedKeys] = React.useState<Array<string | number>>([])
  const [checkedColumnsHide, setCheckedColumnsHide] = React.useState<string[]>(columnsCustomTable.map((item: ColumnDefinition<T>, index) => {
    return item.dataKey as string
  }))
  const [searchBar, setSearchBar] = React.useState<string>('')

  let checked = false
  let indeterminate = false

  React.useEffect(() => {
    setData(fetchData(0, 50))
  }, [fetchData])

  const highlightMatches = (text: string, search: string): T[keyof T] => {
    const regex = new RegExp(search, 'gi')
    return text.replace(regex, match => `<mark>${match}</mark>`) as T[keyof T]
  }

  const loadMore = (): void => {
    setLoading(true)
    setTimeout(() => {
      const totalData: T[] = [...data, ...fetchData(data.length, 50, sortColumn, sortType, searchBar)]
      setData(totalData)
      setLoading(false)
    }, 500)
  }

  const highlightData = (dataParam: T[]): T[] => {
    return dataParam.map((item: T) => {
      const obj: T = item
      Object.keys(item).forEach((key: keyof T) => {
        const value: T[keyof T] = item[key]
        if (typeof value === 'string') {
          obj[key] = highlightMatches(value, searchBar)
        } else {
          obj[key] = value
        }
      })
      return obj
    })
  }

  const handleSortColumn = (sortColumnParam: keyof T, sortTypeParam: SortType): void => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSortColumn(sortColumnParam)
      setSortType(sortTypeParam)
      setData(fetchData(0, 50, sortColumnParam, sortTypeParam, searchBar))
    }, 500)
  }
  const handleOnSearchBar = (searchBarParam: string): void => {
    // eslint-disable-next-line no-debugger
    debugger
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSearchBar(searchBarParam)
      setData(fetchData(0, 50, sortColumn, sortType, searchBarParam))
    }, 500)
  }

  const handleScroll = (x: number, y: number): void => {
    const contextHeight = data.length * 46
    const top = Math.abs(y)

    if (contextHeight - top - tableHeight < 300) {
      loadMore()
    }
  }

  if (checkedKeys.length === data.length) {
    checked = true
  } else if (checkedKeys.length === 0) {
    checked = false
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true
  }

  const handleCheckAll = (checked: boolean): void => {
    const keys: Array<string | number> = checked
      ? data.map(item => {
        const value = item[indexTable]
        return value
      })
      : []
    setCheckedKeys(keys)
  }
  const handleCheck = (value: string | number, checked: boolean): void => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value)
    setCheckedKeys(keys)
  }

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
    checkedKeys,
    checkedColumnsHide,
    setCheckedColumnsHide,
    searchBar,
    setSearchBar,
    handleOnSearchBar
  }
}

export default useCustomTable
