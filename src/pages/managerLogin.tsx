import Head from 'next/head'
import LoginForm from '@/components/login'

export default function Login() {
  return (
    <div>
      <Head>
        <title>Manager Login</title>
      </Head>
      <h1>Manager Login</h1>
      <LoginForm userMode={false} />
    </div>
  )
}

