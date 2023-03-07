import { Line } from '@nivo/line'
import React from 'react'
import { DataLine } from '@/components/Dashboard/CustomLine/const'

const CustomLine = (): React.ReactElement => {
  const commonLineProperties = {
    width: 900, height: 400, margin: { top: 20, right: 20, bottom: 60, left: 80 }, data: DataLine, animate: true
  }
  return (
        <Line
            {...commonLineProperties}
            yScale={{
              type: 'linear', stacked: true
            }}
            enableSlices="x"
            curve="natural"/>
  )
}

export default CustomLine
