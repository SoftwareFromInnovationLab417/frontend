import Head from 'next/head'
import Login from './login'
import CheckUser from '@/components/checkUser'

export default function Home() {
  return (
    <div>
      <Head>
        <title>打卡界面</title>
      </Head>
      <CheckUser />
    </div>
  )
}

