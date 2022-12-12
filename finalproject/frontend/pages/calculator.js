import { FormControl, MenuItem, Paper, Select, Typography, InputLabel, Button, RadioGroup, FormControlLabel, FormLabel, Radio } from '@mui/material'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import IntegerSelect from '../components/integer_select/integer_select'
import Navbar from '../components/navbar/navbar'
import { getCalories, sendCalories } from '../lib/calculator'
import styles from '../styles/calculatorpage.module.css'
import nookies from 'nookies'
import LoginModal from '../components/login_modal/login_modal'


export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)
  const responseCalories = await getCalories(cookies.token);
  return {
    props: {
      calories,
    }
  };
}

export default function CalculatorPage({ responseCalories }) {
  const cookies = parseCookies()
  const token = cookies.token
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  useEffect(() => {
    if (!token || token === '') {
      handleOpen()
    }
  }, [token])

  const [height, setHeight] = useState('0')
  const [weight, setWeight] = useState('0')
  const [age, setAge] = useState('0')
  const [sex, setSex] = useState('male')
  const [activity, setActivity] = useState('1.2')
  const [calories, setCalories] = useState(Math.round(responseCalories))

  const handleClick = () => {
    if (!token) {
      handleOpen()
    }
    else {
      sendCalories(token, height, age, weight, sex, activity, setCalories)
    }
  }

  return (
    <>
      <Head>
        <title>Calculator</title>
      </Head>
      <Navbar />
      <LoginModal open={openModal} handleClose={handleClose} />
      <div className={styles.main}>
        <Paper elevation={3} className={styles.paper}>
          <Typography className={styles.title} variant='h4'>Your Calories: { calories }</Typography>
          <div className={styles.row}>
            <IntegerSelect num={300} decimalSlots={0} variableName={Object.keys({height})} unit={'Cm'} setVariable={setHeight}/>
            <IntegerSelect num={5000} decimalSlots={1} variableName={Object.keys({weight})} unit={'Kg'} setVariable={setWeight}/>
          </div>
          <div className={styles.row}>
            <IntegerSelect num={100} decimalSlots={0} variableName={Object.keys({age})} setVariable={setAge} />
            <FormControl>
              <FormLabel>Sex</FormLabel>
              <RadioGroup defaultValue={sex} onChange={(event) => setSex(event.target.value)}>
                <FormControlLabel control={<Radio />} value='male' label='Male' />
                <FormControlLabel control={<Radio />} value='female' label='Female' />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={styles.row}>
            <FormControl className={styles.activity} variant='standard'>
              <InputLabel id="demo-simple-select-filled-label">Physical Activity Habits</InputLabel>
              <Select className={styles.activityOption} value={activity} required={true} onChange={(event) => setActivity(event.target.value)}>
                <MenuItem className={styles.activityOption} value="1">Unable to move</MenuItem>
                <MenuItem className={styles.activityOption} value="1.2">Sedentary: little or no exercise</MenuItem>
                <MenuItem className={styles.activityOption} value="1.375">Light: exercise 1-3 times/week</MenuItem>
                <MenuItem className={styles.activityOption} value="1.465">Moderate: exercise 4-5 times/week</MenuItem>
                <MenuItem className={styles.activityOption} value="1.55">Active: daily exercise or intense exercise 3-4 times/week</MenuItem>
                <MenuItem className={styles.activityOption} value="1.725">Very Active: intense exercise 6-7 times/week</MenuItem>
                <MenuItem className={styles.activityOption} value="1.9">Extra Active: very intense exercise daily, or physical job</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.rowButton}>
            <Button onClick={handleClick} >Submit</Button>
          </div>
        </Paper>           
      </div>
    </>
  )
}
