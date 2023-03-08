import React from 'react'
import { type SortType } from 'rsuite-table'
import { type ColumnDefinition, type ObjDataTable } from '@/layouts/CustomTable/types'
import { type HookCustomTable } from './types'
import { debounce } from 'lodash'

export const tableHeight = 750

const useCustomTable = <T extends ObjDataTable>(
  fetchData: (start: number, limit: number, sortColumnParam?: keyof T, sortTypeParam?: SortType, searchBar?: string) => T[],
  indexTable: keyof T, columnsCustomTable: Array<ColumnDefinition<T>>): HookCustomTable<T> => {
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
  }, [])

  React.useEffect(() => {
    if (searchBar.length > 1 || searchBar.length === 0) {
      handleSearch()
    } else {
      setData([])
    }
  }, [searchBar])

  const handleSearch = debounce(() => {
    setLoading(true)
    setData([])

    setTimeout(() => {
      setData(fetchData(0, 50, sortColumn, sortType, searchBar))
      setLoading(false)
    }, 200)
  }, 2000)

  const handleOnSearchBar = (searchBarParam: string): void => {
    setSearchBar(searchBarParam)
    setData([])
  }

  const highlightMatches = (text: string, search: string): React.ReactElement => {
    const regex = new RegExp(search, 'gi')
    const matchArray = text.match(regex)

    if (matchArray == null || search.length < 2) {
      return <>{text}</>
    }

    const matches = matchArray.map((match, index) => ({
      index,
      length: match.length
    }))

    let lastIndex = 0
    const highlightedText: Array<string | React.ReactNode> = []
    for (const match of matches) {
      const { index, length } = match
      const preMatch = text.substring(lastIndex, index)
      if (preMatch !== '') {
        highlightedText.push(preMatch)
      }
      // eslint-disable-next-line no-debugger
      debugger
      highlightedText.push(<mark key={lastIndex}>{search}</mark>)
      lastIndex = index + length
    }

    const remainingText = text.substring(lastIndex)
    if (remainingText !== '') {
      highlightedText.push(remainingText)
    }

    return <>{highlightedText}</>
  }
  const loadMore = (): void => {
    setLoading(true)
    setTimeout(() => {
      const totalData: T[] = [...data, ...fetchData(data.length, 50, sortColumn, sortType, searchBar)]
      setData(totalData)
      setLoading(false)
    }, 500)
  }

  const handleSortColumn = (sortColumnParam: keyof T, sortTypeParam: SortType): void => {
    setLoading(true)
    setData([])

    setTimeout(() => {
      setLoading(false)
      setSortColumn(sortColumnParam)
      setSortType(sortTypeParam)
      setData(fetchData(0, 50, sortColumnParam, sortTypeParam, searchBar))
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
    handleOnSearchBar,
    highlightMatches
  }
}

export default useCustomTable
