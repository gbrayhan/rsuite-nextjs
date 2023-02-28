import {Loader} from "rsuite";
import React from "react";

export const FixedLoader = () => (<Loader
    content="Loading..."
    style={{
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        background: '#f5f5f5',
        width: '100%',
        padding: '4px 0'
    }}
/>);
