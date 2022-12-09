import { useState } from 'react'
import { Typography } from '@mui/material'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import styles from './navbar.module.css'

export default function RecipesButton() {
  const route = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const handlePopOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handlePopClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  library.add(faCaretDown)
  return (
    <>
      <Typography onClick={handlePopOpen} className={styles.link}>
        Recipes
        <FontAwesomeIcon className={styles.caret} icon={faCaretDown} />
      </Typography>
      <Menu
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopClose}
        disableRestoreFocus
      >
        <MenuItem onClick={() => route.push('/catalog')}>
          <Link href={'/catalog'} className={styles.menuItem}>
            Recipe Catalog
          </Link>
        </MenuItem>
        <MenuItem onClick={() => route.push('/extract')}>
          <Link href={'/extract'} className={styles.menuItem}>
            Recipe Extractor
          </Link>
        </MenuItem>
        <MenuItem onClick={() => route.push('/makerecipe')}>
          <Link href={'/makerecipe'} className={styles.menuItem}>
            Make a Recipe
          </Link>
        </MenuItem>
      </Menu>
    </>
  )
}
