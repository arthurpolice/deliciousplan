import { Typography } from '@mui/material'
import { parseCookies } from 'nookies'
import Head from 'next/head'
import Navbar from '../components/navbar/navbar'
import styles from '../styles/Home.module.css'
import createCache from '@emotion/cache'
import Link from 'next/link'
import Image from 'next/image'
import pizzaMan from '../public/images/pizza_man.png'
import flexGirl from '../public/images/flex.png'
import rocket from '../public/images/taking_off.png'


const cache = createCache({
  key: 'css',
  prepend: true,
})

export default function Home() {
  const cookies = parseCookies()
  let username = cookies.username
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Delicious Plan</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Navbar />
        <div className={styles.main}>
          <div className={styles.landing}>
            <Typography className={styles.greeting} variant='h4'>Welcome to Delicious Plan!</Typography>
            <div className={styles.section}>
              <div className={styles.sectionContent}>
                <div className={styles.sectionText}>
                  <Typography className={styles.sectionTitle} variant='h5'>We&apos;re here to help you!</Typography>
                  <Typography variant='body1'>One of the most challenging aspects of dieting is calculating how many calories you&apos;re eating at every moment.</Typography>
                  <Typography variant='body1'>This plays a big part in why losing weight is a big struggle, because us humans are notoriously bad at estimating the calories contained in a meal!</Typography>
                  <Typography variant='body1'>That&apos;s where we come in. Let us show you how we can help you in your weight loss journey.</Typography>
                </div>
                <div className={styles.sectionImage}>
                  <Image className={styles.landingPageImage} src={pizzaMan} alt={'Man eating pizza.'} />
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.sectionContent}>
                <div className={styles.sectionImage}>
                  <Image className={styles.landingPageImage} src={rocket} alt={'Rocket taking off.'} />
                </div>
                <div className={styles.sectionText}>
                  <Typography className={styles.sectionTitle} variant='h5'>Getting started</Typography>
                  <Typography variant='body1'>In our website, you&apos;ll find multiple tools that will allow you to nail down your calorie intake levels.</Typography>
                  <Typography variant='body1'>The first step is to head to our <Link className={styles.landingPageLink} href={'/calculator'}>Calorie Calculator</Link> and find out your daily allowance!</Typography>
                  <Typography variant='body1'>Next up, get to know our <Link className={styles.landingPageLink} href={'/calendar'}>Calendar</Link>. That&apos;s where you&apos;ll be able to see your scheduled meals and if you&apos;re within your limit.</Typography>
                  <Typography variant='body1'>Forgot to schedule a meal? No problem, you can always add a meal to a day that has passed to keep accurate count of your diet!</Typography>
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <div className={styles.sectionContent}>
                <div className={styles.sectionText}>
                  <Typography className={styles.sectionTitle} variant='h5'>The power is yours!</Typography>
                  <Typography variant='body1'>You&apos;re now ready to go! Remember that tasty recipe you saw online? Head on to our <Link className={styles.landingPageLink} href={'/extract'}>Recipe Extractor</Link> and paste its link there!</Typography>
                  <Typography variant='body1'>Doing so will give you a breakdown of each ingredient&apos;s amount, its calories, and much more. We even convert the measurements to other systems when possible!</Typography>
                  <br />
                  <Typography variant='body1'>Pasting your recipe didn&apos;t work? Fret not! We got you covered. At our <Link className={styles.landingPageLink} href={'/makerecipe'}>Custom Recipe Maker</Link> you&apos;ll find our whole catalog of ingredients and you can quickly and easily add your own recipe to our catalog.</Typography>
                  <Typography variant='body1'>Our selection of ingredients grows with every recipe added to the website from external sources. So the more people use the website, the better it becomes!</Typography>
                  <br />
                  <Typography variant='body1'>Or perhaps you&apos;re feeling uncreative today? Our <Link className={styles.landingPageLink} href={'/catalog'}>Catalog</Link> has a collection of recipes uploaded by our users, you&apos;re sure to find something that piques your interest there!</Typography>
                </div>
                <div className={styles.sectionImage}>
                  <Image className={styles.landingPageImage} src={flexGirl} alt={'Woman flexing.'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
