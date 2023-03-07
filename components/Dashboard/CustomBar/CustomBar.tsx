import { Bar } from '@nivo/bar'
import React from 'react'
import { DataGraphBar } from '@/components/Dashboard/CustomBar/const'

const CustomBar = (): React.ReactElement => {
  const keys = ['hot dogs', 'burgers', 'sandwich', 'kebab', 'fries', 'donut']

  const commonBarProps = {
    width: 1200,
    height: 500,
    margin: { top: 60, right: 110, bottom: 60, left: 80 },
    data: DataGraphBar,
    indexBy: 'month',
    keys,
    padding: 0.2,
    labelTextColor: 'inherit:darker(1.4)',
    labelSkipWidth: 16,
    labelSkipHeight: 16
  }

  return (
        <Bar
            {...commonBarProps}
            initialHiddenIds={keys.slice(2, 4)}
            legends={[{
              anchor: 'bottom',
              dataFrom: 'keys',
              direction: 'row',
              itemHeight: 20,
              itemWidth: 80,
              toggleSerie: true,
              translateY: 50
            }]}
        />
  )
}

export default CustomBar
