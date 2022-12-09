import * as React from 'react'
import Typography from '@mui/material/Typography'
import { Select, MenuItem, TextField, Button } from '@mui/material'
import MiniCalendar from './minicalendar'
import styles from './modal.module.css'
import { InputLabel } from '@mui/material'
import { useState } from 'react'
import { addMeal } from '../../lib/recipes'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

export default function MealModalContent({ id }) {
  const [meal, setMeal] = useState('')
  const [day, setDay] = useState(null)
  const [servings, setServings] = useState(1)
  const [error, setError] = useState('')
  const route = useRouter()
  const cookies = parseCookies()
  const token = cookies.token

  const handleServingsChange = (event) => {
    if (isNumeric(event.target.value) === true) {
      setServings(Math.round(parseInt(event.target.value)))
    }
  }

  const submitMeal = () => {
    if (day) {
      addMeal(id, meal, day['_d'], servings, token, route)
    } else {
      setError('Invalid date.')
    }
  }

  function isNumeric(value) {
    return /^\d+$/.test(value)
  }

  return (
    <>
      <div className={styles.boxDiv}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          When will you eat this?
        </Typography>
        <MiniCalendar day={day} setDay={setDay} />
        <InputLabel id='demo-simple-select-label'>Meal</InputLabel>
        <Select
          required
          className={styles.mealFields}
          value={meal}
          onChange={(event) => setMeal(event.target.value)}
        >
          <MenuItem value={'bf'}>Breakfast</MenuItem>
          <MenuItem value={'lun'}>Lunch</MenuItem>
          <MenuItem value={'din'}>Dinner</MenuItem>
          <MenuItem value={'extra'}>Extra</MenuItem>
        </Select>
        <InputLabel>Servings</InputLabel>
        <TextField
          required
          className={styles.servings}
          defaultValue={servings}
          onChange={(event) => handleServingsChange(event)}
        />
      </div>
      <div className={styles.buttonDiv}>
        <Button onClick={submitMeal}>Add</Button>
      </div>
      <Typography color={'red'} variant='body2' component='p'>
        {error}
      </Typography>
    </>
  )
}
