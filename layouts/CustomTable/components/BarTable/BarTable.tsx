import React from 'react'
import styles from './BarTable.module.css'
import { ButtonToolbar, Checkbox, CheckboxGroup, IconButton, Input, InputGroup, Popover, Whisper } from 'rsuite'
import SearchIcon from '@rsuite/icons/Search'
import SettingIcon from '@rsuite/icons/Setting'
import { type ColumnDefinition } from '../../types'

export interface PropsColumnsHide<T> {
  columnsCustomTable: Array<ColumnDefinition<T>>
  checkedColumnsHide: string[]
  setCheckedColumnsHide: (value: string[]) => void

}

const ColumnsHide = <T extends object>({
  columnsCustomTable,
  checkedColumnsHide,
  setCheckedColumnsHide
}: PropsColumnsHide<T>): React.ReactElement => {
  const handleChange = (value: string[]): void => {
    setCheckedColumnsHide(value)
  }

  return (
        <Popover title="Title">
            <CheckboxGroup onChange={(value, event) => {
              handleChange(value as string[])
            }} value={checkedColumnsHide}
                           name="checkboxList" style={{ width: '15rem' }}>
                {columnsCustomTable.map((item: ColumnDefinition<T>, index) => {
                  return (
                        <Checkbox key={index} value={item.dataKey as string}>{item.header}</Checkbox>
                  )
                })}
            </CheckboxGroup>
        </Popover>
  )
}

export interface PropsBarTable<T> {
  columnsCustomTable: Array<ColumnDefinition<T>>
  checkedColumnsHide: string[]
  setCheckedColumnsHide: (value: string[]) => void
  searchBar: string
  handleOnSearchBar: (value: string) => void

}

const BarTable = <T extends object>({
  columnsCustomTable,
  checkedColumnsHide,
  setCheckedColumnsHide,
  searchBar,
  handleOnSearchBar
}: PropsBarTable<T>): React.ReactElement => {
  return (
        <div className={styles.BarTableContainer}>

            <div className={styles.LeftContainer}>
                <InputGroup className={styles.SearchBar}>
                    <Input value={searchBar} onChange={handleOnSearchBar} />
                    <InputGroup.Button>
                        <SearchIcon/>
                    </InputGroup.Button>
                </InputGroup>

            </div>
            <div className={styles.RightContainer}>
                <ButtonToolbar className={styles.BarIconGroup}>
                    <Whisper placement="autoVerticalEnd" trigger="click" controlId="control-id-settings"
                             speaker={ColumnsHide<T>({ columnsCustomTable, checkedColumnsHide, setCheckedColumnsHide })}>
                        <IconButton icon={<SettingIcon style={{ fontSize: '2rem' }}/>}/>
                    </Whisper>
                    {/* <Whisper placement="autoVerticalEnd" trigger="click" controlId="control-id-columns"
                             speaker={<div>Some</div>}>
                        <IconButton icon={<TableColumnIcon style={{fontSize: "2rem"}}/>}/>
                    </Whisper> */}

                </ButtonToolbar>
            </div>
        </div>
  )
}

export default BarTable

/*
                        <Checkbox key={index} value={item.dataKey as string}>{item.header}</Checkbox>)
*/
