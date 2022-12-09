import { useState } from 'react'
import { CacheProvider } from '@emotion/react'
import Calendar from 'react-calendar'
import Paper from '@mui/material/Paper'
import styles from '../styles/calendarpage.module.css'
import Navbar from '../components/navbar/navbar'
import Head from 'next/head'
import Meals from '../components/calendar/meals'
import createCache from '@emotion/cache'
import { parseCookies } from 'nookies'

const cache = createCache({
  key: 'css',
  prepend: true,
})

export default function CalendarPage() {
  const [date, setDate] = useState(new Date())
  const cookies = parseCookies()
  const token = cookies.token

  return (
    <CacheProvider value={cache}>
      <Head>
        <title>Calendar</title>
      </Head>
      <Navbar />
      <div className={styles.calendarDiv}>
        <Paper elevation={3} className={styles.paper}>
          <div className={styles.infoDisplay}>
            <Meals date={date} token={token} />
          </div>
          <Calendar onChange={setDate} value={date} />
        </Paper>
      </div>
    </CacheProvider>
  )
}
