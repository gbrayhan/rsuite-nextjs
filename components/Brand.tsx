import React from 'react';
import Link  from 'next/link'
import Logo from './Logo';
import { Stack } from 'rsuite';

const Brand = (props: any) => {
    const  { showText, ...rest } = props;
    return (
        <Stack className="brand" {...rest}>
            <Logo height={26} style={{ marginTop: 6 }} />
            {showText && (
        <Link href="/">
          <span style={{ marginLeft: 14 }}>Kanban Boards</span>
        </Link>
      )}
    </Stack>
  );
};

export default Brand;
