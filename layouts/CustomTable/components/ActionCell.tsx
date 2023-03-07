import { Dropdown, IconButton, Popover, Whisper } from 'rsuite'
import MoreIcon from '@rsuite/icons/legacy/More'
import React from 'react'
import { Cell } from 'rsuite-table'
import { type ActionCellProps, type ParamsRenderMenu } from './types'

export const renderMenuActionCell = ({
  onClose, left, top, className
}: ParamsRenderMenu, ref?: ((instance: (HTMLDivElement | null)) => void) | React.RefObject<HTMLDivElement> | null | undefined): React.ReactElement => {
  const handleSelect = (eventKey?: string) => {
    onClose()
  }
  return (<Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
            <Dropdown.Item eventKey={1}>Follow</Dropdown.Item>
            <Dropdown.Item eventKey={2}>Sponsor</Dropdown.Item>
            <Dropdown.Item eventKey={3}>Add to friends</Dropdown.Item>
            <Dropdown.Item eventKey={4}>View Profile</Dropdown.Item>
            <Dropdown.Item eventKey={5}>Block</Dropdown.Item>
        </Dropdown.Menu>
    </Popover>)
}

export const ActionCell = <T extends object>({ rowData, dataKey, ...props }: ActionCellProps<T>) => {
  return (<Cell {...props} className="link-group">
        <Whisper placement="autoVerticalStart" trigger="click"
                 speaker={(params, ref) => renderMenuActionCell(params as ParamsRenderMenu, ref)}>
            <IconButton appearance="subtle" icon={<MoreIcon/>}/>
        </Whisper>
    </Cell>)
}
