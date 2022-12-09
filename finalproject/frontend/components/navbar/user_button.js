import { Avatar } from '@mui/material'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import LogButton from './log_button'
import RegisterButton from './register_button'
import styles from './navbar.module.css'

function stringToColor(string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  }
}

export default function UserButton({ token, label, handleOpen, register }) {
  const [username, setUsername] = useState('-')
  useEffect(() => {
    const cookies = parseCookies()
    setUsername(cookies.username)
  })

  const [anchorEl, setAnchorEl] = useState(null)
  const handlePopOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  console.log(token)
  return (
    <>
      <Avatar {...stringAvatar(`${username}`)} onClick={handlePopOpen} />
      <Menu
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handlePopClose}
        disableRestoreFocus
      >
        <MenuItem>
          <LogButton token={token} label={label} handleOpen={handleOpen} />
        </MenuItem>
        <RegisterButton register={register} />
      </Menu>
    </>
  )
}
