import { Container, Content } from 'rsuite'
import styles from './Home.module.css'
import CustomBar from '@/components/Dashboard/CustomBar'
import CustomPie from '@/components/Dashboard/CustomPie'
import CustomLine from '@/components/Dashboard/CustomLine'
import React from 'react'
import TitleContainer from '@/components/TitleContainer'

const Dashboard = (): React.ReactElement => {
  return (
        <Container>
            <TitleContainer title="Dashboard"/>
            <Content style={{ margin: '1rem' }}>
                <div className={styles.BarGraphContainer}>
                    <CustomBar/>
                </div>
                <div className={styles.SecondSection}>
                    <CustomPie/>
                    <CustomLine/>
                </div>
            </Content>
        </Container>
  )
}

export default Dashboard
