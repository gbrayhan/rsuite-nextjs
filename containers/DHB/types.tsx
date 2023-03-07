import { type ObjDataTable } from '@/layouts/CustomTable/types'

export interface DataDHB extends ObjDataTable {
  index: number
  texts: string
  name: string
  age: number
  items: number
  registeredDate: string
  orders: number
  quantity: number
  lastOrderDate: string
  company: string
}
