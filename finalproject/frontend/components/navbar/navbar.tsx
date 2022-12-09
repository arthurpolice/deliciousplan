import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Slide from '@mui/material/Slide'
import Link from 'next/link'
import Image from 'next/image'
import styles from './navbar.module.css'
import LogButton from './log_button'
import LoginModal from '../login_modal/login_modal'
import RecipesButton from './recipes_button'
import { parseCookies } from 'nookies'

function HideOnScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  )
}

export default function Navbar(props) {
  const cookies = parseCookies()
  const token = cookies.token
  const [label, setLabel] = React.useState('Log Out')
  const [register, setRegister] = React.useState(null)
  React.useEffect(() => {
    if (!token || token === '') {
      setLabel('Log In')
      setRegister('Register')
    } else {
      setLabel('Log Out')
      setRegister(null)
    }
  }, [token])
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar className={styles.navbar}>
          <Toolbar className={styles.links}>
            <div className={styles.linkButtons}>
              <Link href={'/'}>
                <Image
                  src={'/images/icon.png'}
                  alt='logo'
                  width={48}
                  height={48}
                />
              </Link>
              <RecipesButton />
              <Link href={'/calendar'} className={styles.link}>
                Calendar
              </Link>
            </div>
            <div className={styles.logButtonDiv}>
              <LogButton token={token} label={label} handleOpen={handleOpen} />
              <Link className={styles.logButton} href={'/register'}>
                  {register}
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <LoginModal open={open} handleClose={handleClose} />
    </React.Fragment>
  )
}
