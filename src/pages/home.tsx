import Head from 'next/head'
import Login from './login'
import CheckUser from '@/components/checkUser'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Capture picture</title>
      </Head>
      <CheckUser />
    </div>
  )
}

