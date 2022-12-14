import TextField from '@mui/material/TextField'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FormControl } from '@mui/material'
import { sendUrl } from '../lib/extractor'
import { CacheProvider } from '@emotion/react'
import { destroyCookie, parseCookies } from 'nookies'
import styles from '../styles/extract.module.css'
import LoadingButton from '@mui/lab/LoadingButton'
import DiningOutlinedIcon from '@mui/icons-material/DiningOutlined'
import Navbar from '../components/navbar/navbar'
import Head from 'next/head'
import LoginModal from '../components/login_modal/login_modal'
import createCache from '@emotion/cache'

const cache = createCache({
  key: 'css',
  prepend: true,
})

export default function ExtractPage() {
  const cookies = parseCookies()
  const token = cookies.token
  const route = useRouter()

  // Fetch and response control
  const [url, setUrl] = useState('')
  // Prevents spam of fetches
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  function handleLoading(url, route) {
    setLoading(true)
    sendUrl(
      url,
      route,
      token,
      destroyCookie,
      setErrorMessage,
      setLoading,
      handleOpen
    )
  }

  // Modal control
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  useEffect(() => {
    if (!token || token === '') {
      handleOpen()
    }
  }, [token])

  return (
    <>
      <Head>
        <title>Extract Recipes</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <LoginModal open={openModal} handleClose={handleClose} />
      <div className={styles.main}>
        <FormControl className={styles.form}>
          <TextField
            id='url-extractor'
            label="Your recipe's URL"
            variant='standard'
            helperText={errorMessage}
            className={styles.urlextractor}
            onChange={(event) => setUrl(event.target.value)}
          />
          <LoadingButton
            loading={loading}
            loadingPosition='start'
            variant='text'
            onClick={() => {
              handleLoading(url, route)
            }}
            startIcon={<DiningOutlinedIcon />}
          >
            Send
          </LoadingButton>
        </FormControl>
      </div>
    </>
  )
}
