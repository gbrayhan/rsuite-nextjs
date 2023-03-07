import { type DataDHB } from '@/containers/DHB/types'
import { faker } from '@faker-js/faker'
import { type SortType } from 'rsuite-table'

export const getMoreItems = (start: number, length: number): DataDHB[] => Array.from({ length }).map((_, index) => {
  const itemData: DataDHB = {
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
  return itemData
})

export const fetchData = (start: number, limit: number, sortColumnParam?: keyof DataDHB, sortTypeParam?: SortType, searchBar?: string): DataDHB[] => {
  let data: DataDHB[] = getMoreItems(start, limit)

  data = data.filter((item: DataDHB) => {
    if (searchBar != null && searchBar !== '') {
      return Object.values(item).some((value: DataDHB[keyof DataDHB]) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchBar.toLowerCase())
        }
        return false
      })
    }
    return true
  })

  if (Boolean(sortColumnParam) && Boolean(sortTypeParam)) {
    return data.sort((a: DataDHB, b: DataDHB) => {
      const x: DataDHB[keyof DataDHB] = a[sortColumnParam as keyof DataDHB]
      const y: DataDHB[keyof DataDHB] = b[sortColumnParam as keyof DataDHB]

      if (sortTypeParam === 'asc') {
        if (typeof x === 'string' && typeof y === 'string') {
          return x.localeCompare(y)
        } else if (typeof x === 'number' && typeof y === 'number') {
          return x - y
        }
      } else {
        if (typeof x === 'string' && typeof y === 'string') {
          return y.localeCompare(x)
        } else if (typeof x === 'number' && typeof y === 'number') {
          return y - x
        }
      }
      return -1
    })
  }
  return data
}
