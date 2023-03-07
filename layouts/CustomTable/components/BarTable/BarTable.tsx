import React from "react";
import styles from "./BarTable.module.css";
import {ButtonToolbar, Checkbox, CheckboxGroup, IconButton, Input, InputGroup, Popover, Whisper} from "rsuite";
import SearchIcon from '@rsuite/icons/Search';
import SettingIcon from '@rsuite/icons/Setting';
import {ColumnDefinition} from "../../types";


export type PropsColumnsHide<T> = {
    columnsCustomTable: ColumnDefinition<T>[]
    checkedColumnsHide: Array<string>
    setCheckedColumnsHide: (value: Array<string>) => void

}
const ColumnsHide = <T extends object>({
                                           columnsCustomTable,
                                           checkedColumnsHide,
                                           setCheckedColumnsHide
                                       }: PropsColumnsHide<T>): React.ReactElement => {
    const handleChange = (value: Array<string>) => setCheckedColumnsHide(value);

    return (
        <Popover title="Title">
            <CheckboxGroup onChange={(value, event) => handleChange(value as Array<string>)} value={checkedColumnsHide}
                           name="checkboxList" style={{width: "15rem"}}>
                {columnsCustomTable.map((item: ColumnDefinition<T>, index) => {
                    return (
                        <Checkbox key={index} value={item.dataKey as string}>{item.header}</Checkbox>
                    )
                })}
            </CheckboxGroup>
        </Popover>
    )
}


export type PropsBarTable<T> = {
    columnsCustomTable: ColumnDefinition<T>[]
    checkedColumnsHide: Array<string>
    setCheckedColumnsHide: (value: Array<string>) => void
}

const BarTable = <T extends object>({
                                        columnsCustomTable,
                                        checkedColumnsHide,
                                        setCheckedColumnsHide
                                    }: PropsBarTable<T>) => {
    return (
        <div className={styles.BarTableContainer}>

            <div className={styles.LeftContainer}>
                <InputGroup className={styles.SearchBar}>
                    <Input/>
                    <InputGroup.Button>
                        <SearchIcon/>
                    </InputGroup.Button>
                </InputGroup>

            </div>
            <div className={styles.RightContainer}>
                <ButtonToolbar className={styles.BarIconGroup}>
                    <Whisper placement="autoVerticalEnd" trigger="click" controlId="control-id-settings"
                             speaker={ColumnsHide<T>({columnsCustomTable, checkedColumnsHide, setCheckedColumnsHide})}>
                        <IconButton icon={<SettingIcon style={{fontSize: "2rem"}}/>}/>
                    </Whisper>
                    {/*<Whisper placement="autoVerticalEnd" trigger="click" controlId="control-id-columns"
                             speaker={<div>Some</div>}>
                        <IconButton icon={<TableColumnIcon style={{fontSize: "2rem"}}/>}/>
                    </Whisper>*/}

                </ButtonToolbar>
            </div>
        </div>
    )
}

export default BarTable


/*
                        <Checkbox key={index} value={item.dataKey as string}>{item.header}</Checkbox>)
*/