import React from "react";
import styles from "./BarTable.module.css";
import {ButtonToolbar, Checkbox, CheckboxGroup, IconButton, Input, InputGroup, Popover, Whisper} from "rsuite";
import SearchIcon from '@rsuite/icons/Search';
import SettingIcon from '@rsuite/icons/Setting';
import {ColumnDefinition} from "../../Types";


export type PropsColumnsHide<T> = {
    columnsCustomTable: ColumnDefinition<T>[]
}
const ColumnsHide = <T extends object>({columnsCustomTable}: PropsColumnsHide<T>): React.ReactElement => {
    return (
        <Popover title="Title">
            <CheckboxGroup name="checkboxList" style={{width: "15rem"}}>
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
}

const BarTable = <T extends object>({columnsCustomTable}: PropsBarTable<T>) => {
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
                             speaker={ColumnsHide<T>({columnsCustomTable})}>
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