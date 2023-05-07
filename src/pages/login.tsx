import Head from 'next/head'
import LoginForm from '@/components/login'
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function Login() {

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <h1>User Login</h1>
      <LoginForm />
    </div>
  )
}

