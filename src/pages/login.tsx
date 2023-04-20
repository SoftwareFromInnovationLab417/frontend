import Head from 'next/head'
import LoginForm from '@/components/login'

export default function Login() {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <h1>User Login</h1>
      <LoginForm userMode={true} />
    </div>
  )
}
