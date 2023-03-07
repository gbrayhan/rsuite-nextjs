import { Pie } from '@nivo/pie'
import React from 'react'
import { DataPie } from '@/components/Dashboard/CustomPie/const'

const CustomPie = () => {
  const commonPieProperties = {
    width: 500,
    height: 500,
    margin: { top: 80, right: 120, bottom: 80, left: 120 },
    data: DataPie,
    animate: true,
    activeOuterRadiusOffset: 8
  }
  return (
        <Pie
            {...commonPieProperties}
            innerRadius={0.6}
            padAngle={0.5}
            cornerRadius={5}
            arcLinkLabelsColor={{
              from: 'color'
            }}
            arcLinkLabelsThickness={3}
            arcLinkLabelsTextColor={{
              from: 'color', modifiers: [['darker', 1.2]]
            }}
        />
  )
}

export default CustomPie
