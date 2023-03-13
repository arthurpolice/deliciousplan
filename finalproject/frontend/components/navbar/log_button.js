import { Link, Typography } from "@mui/material";
import { logout } from "../../lib/logout";
import { useRouter } from "next/router";
import styles from './navbar.module.css'
import { destroyCookie } from "nookies";

export default function LogButton ({ token, handleOpen, label }) {
  const router = useRouter()

  const handleLogin = () => {
    if (!token) {
      handleOpen()
    }
    else {
      logout(router, token, destroyCookie)
      destroyCookie(null, 'token')
    }
  }
  return (
    <Link className={styles.logButton} variant='contained' onClick={ handleLogin }>{ label }</Link>
  )
}