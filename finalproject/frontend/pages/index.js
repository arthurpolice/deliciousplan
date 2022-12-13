import { useRouter } from 'next/router'
import { CacheProvider } from '@emotion/react'
import { useEffect } from 'react'
import { Typography } from '@mui/material'
import { parseCookies } from 'nookies'
import Head from 'next/head'
import Navbar from '../components/navbar/navbar'
import styles from '../styles/Home.module.css'
import createCache from '@emotion/cache'


const cache = createCache({
  key: 'css',
  prepend: true,
})

export default function Home() {
  const cookies = parseCookies()
  let username = cookies.username
  const route = useRouter()
  // Couldn't think of a homepage yet, so I'm redirecting to catalog.
  useEffect(() => {
    route.push('/catalog')
  })
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Delicious Plan</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Navbar />
        <div className={styles.main}>
          <Typography variant='h3'>Welcome, {username?username:'friend'}!</Typography>
        </div>
      </div>
    </>
  )
}
