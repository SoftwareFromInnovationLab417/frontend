import '@/styles/globals.css'
import Head from 'next/head'
import { AppProps } from 'next/app'
import Layout from '@/components/layout'
import { useState } from 'react'
import { AppContext, AppState, defaultState } from '@/data/state'

export default function App({ Component, pageProps }: AppProps) {
  const [state, setState] = useState<AppState>({
    data: defaultState
  });
  return (
    <div>
      <Head>
        <title>App</title>
      </Head>
      <AppContext.Provider value={{ state, setState }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </div>
  )
}
