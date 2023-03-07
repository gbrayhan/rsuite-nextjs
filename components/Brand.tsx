import React from 'react'
import Link from 'next/link'
import Logo from './Logo'
import { Stack } from 'rsuite'

export interface NativeStackProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'

  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'

  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
  spacing?: number | string | Array<number | string>
  divider?: React.ReactNode
  wrap?: boolean
  childrenRenderMode?: 'clone' | 'wrap'
}

export type BrandProps = NativeStackProps & {
  showText?: boolean
}

const Brand = (props: BrandProps): React.ReactElement => {
  const { showText, ...rest } = props
  return (
        <Stack className="brand" {...rest}>
            <Logo height={26} style={{ marginTop: 6 }}/>
            {(Boolean(showText)) && (
                <Link href="/" passHref legacyBehavior>
                    <span style={{ marginLeft: 14 }}>Kanban Boards</span>
                </Link>
            )}
        </Stack>
  )
}

export default Brand
