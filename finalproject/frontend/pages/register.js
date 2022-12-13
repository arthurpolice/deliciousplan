import { CacheProvider } from '@emotion/react'
import RegisterForm from '../components/register/register_form'
import Navbar from '../components/navbar/navbar'
import createCache from '@emotion/cache'
import Head from 'next/head'

const cache = createCache({
  key: 'css',
  prepend: true,
})

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <RegisterForm />
    </>
  )
}
