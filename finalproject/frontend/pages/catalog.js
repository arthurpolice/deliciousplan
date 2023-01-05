import { getRecipeCatalog } from '../lib/catalog'
import { Grid } from '@mui/material'
import { useState, useCallback, useEffect } from 'react'
import Catalog from '../components/catalog/catalog'
import Navbar from '../components/navbar/navbar'
import SearchBox from '../components/searchbox/searchbox'
import Head from 'next/head'
import createCache from '@emotion/cache'
import nookies from 'nookies'
import styles from '../styles/catalog.module.css'

const cache = createCache({
  key: 'css',
  prepend: true,
})

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)
  const recipeCatalog = await getRecipeCatalog(cookies)
  return {
    props: {
      recipeCatalog,
    },
  }
}

export default function CatalogPage({ recipeCatalog }) {
  const [searchField, setSearchField] = useState('')
  const [likeFilter, setLikeFilter] = useState(null)
  const [amount, setAmount] = useState(12)
  let filteredRecipes = recipeCatalog.list.filter((entry) => {
    return entry.name.toLowerCase().includes(searchField)
  })
  if (likeFilter === true) {
    filteredRecipes = filteredRecipes.filter((entry) => {
      return entry.likeStatus === likeFilter
    })
  }
  
  const onScroll = useCallback(() => {
    const { pageYOffset } = window;
    if (pageYOffset > document.documentElement.scrollHeight - 1500) {
      setAmount((amount) => amount + 12)
    }
  }, []);

  useEffect(() => {
  //add eventlistener to window
  window.addEventListener("scroll", onScroll, { passive: true });
  // remove event on unmount to prevent a memory leak with the cleanup
  return () => {
     window.removeEventListener("scroll", onScroll, { passive: true });
  }
  }, [onScroll]);


  return (
    <>
      <Head>
        <title>Catalog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <SearchBox
        setSearchField={setSearchField}
        setLikeFilter={setLikeFilter}
      />
      <Grid container className={styles.catalog}>
        <Catalog recipeCatalog={filteredRecipes.slice(0, amount)} />
      </Grid>
    </>
  )
}
