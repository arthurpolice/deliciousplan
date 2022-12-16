import { MenuItem } from '@mui/material'
import styles from './navbar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function RegisterButton({ register }) {
  route = useRouter()
  if (register) {
    return (
      <MenuItem onClick={() => route.push('/register')}>
        <Link className={styles.logButton} href={'/register'}>
          {register}
        </Link>
      </MenuItem>
    )
  }
  else {
    <span className={styles.hidden}></span>
  }
}