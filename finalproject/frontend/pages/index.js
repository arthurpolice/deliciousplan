import Head from 'next/head'
import Navbar from '../components/navbar/navbar'
import styles from '../styles/Home.module.css'
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function Home() {
  return (
    <CacheProvider value={cache}>
      <div className={styles.container}>
        <Head>
          <title>Delicious Plan</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Navbar />
      </div>
    </CacheProvider>
  )
}
