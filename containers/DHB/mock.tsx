import { type DataDHB } from '@/containers/DHB/types'
import { faker } from '@faker-js/faker'

export const fetchData = (start: number, length: number): DataDHB[] => Array.from({ length }).map((_, index) => {
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
