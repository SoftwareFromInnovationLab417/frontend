import Head from 'next/head'
import Login from './login'
import Visit from '@/components/visit'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Capture picture</title>
      </Head>
      <Visit />
    </div>
  )
}

