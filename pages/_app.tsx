import React from 'react'
import 'rsuite/dist/rsuite.min.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../store/store'

export default function App ({ Component, pageProps }: AppProps): React.ReactElement {
  return (
        <Provider store={store}>
                <Component {...pageProps} />
        </Provider>
  )
}
