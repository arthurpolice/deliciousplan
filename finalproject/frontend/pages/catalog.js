import { getRecipeCatalog } from '../lib/catalog'
import { Grid } from '@mui/material'
import { useState } from 'react'
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
  let filteredRecipes = recipeCatalog.list.filter((entry) => {
    return entry.name.toLowerCase().includes(searchField)
  })
  if (likeFilter === true) {
    filteredRecipes = filteredRecipes.filter((entry) => {
      return entry.likeStatus === likeFilter
    })
  }
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
        <Catalog recipeCatalog={filteredRecipes} />
      </Grid>
    </>
  )
}
