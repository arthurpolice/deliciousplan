import { useEffect, useState } from 'react'
import {
  getAllIngredients,
  getAllMeasures,
  makeRecipeObject,
  logRecipe,
} from '../lib/custom_recipe'
import { destroyCookie, parseCookies } from 'nookies'
import { CacheProvider } from '@emotion/react'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import Head from 'next/head'
import IngredientForm from '../components/ingredient_input/ingredient_form'
import Navbar from '../components/navbar/navbar'
import Header from '../components/ingredient_input/header'
import styles from '../styles/makerecipe.module.css'
import LoginModal from '../components/login_modal/login_modal'
import createCache from '@emotion/cache'

const cache = createCache({
  key: 'css',
  prepend: true,
})

export async function getServerSideProps() {
  const ingredientList = await getAllIngredients()
  const measuresList = await getAllMeasures()
  return {
    props: {
      ingredientList,
      measuresList,
    },
  }
}

export default function CustomRecipePage({ ingredientList, measuresList }) {
  const cookies = parseCookies()
  const token = cookies.token
  const route = useRouter()

  // Provides a blueprint for the fetch request to be sent
  const recipeProp = makeRecipeObject()
  const [recipe, setRecipe] = useState(recipeProp)

  // Controls the amount of ingredient rows to show in the page using the recipe object
  const [ingredientNumber, setIngredientNumber] = useState(1)

  const handleClick = (num) => {
    setIngredientNumber(ingredientNumber + num)
    if (num === 1) {
      recipe['extendedIngredients'].push({})
    } else if (num === -1) {
      recipe['extendedIngredients'].pop
    }
  }

  const [measuringSystem, setMeasuringSystem] = useState('metric')

  // Modal control
  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(true)
  const handleClose = () => setOpenModal(false)

  // Used to make sure the servings field is a digit
  const isNumeric = (value) => {
    return /^\d+$/.test(value)
  }

  // Function that builds the recipe piece by piece, field change by field change
  const fieldChange = (event) => {
    let { name, value } = event.target
    if (name === 'servings') {
      if (isNumeric(value) === false) {
        value = 1
      } else {
        Math.round(parseInt(value))
      }
    }
    setRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // Checkbox names must match the key names in recipeProp
  const checkboxChange = (event) => {
    const { name, checked } = event.target
    setRecipe((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
  }

  // Authentication check
  useEffect(() => {
    if (!token || token === '') {
      handleOpen()
    }
  }, [token])

  return (
    <>
      <Head>
        <title>Make Custom Recipe</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <LoginModal open={openModal} handleClose={handleClose} />
      <div className={styles.form}>
        <Header
          fieldChange={fieldChange}
          setMeasuringSystem={setMeasuringSystem}
          checkboxChange={checkboxChange}
        />
        <IngredientForm
          ingredientList={ingredientList}
          ingredientNumber={ingredientNumber}
          measuresList={measuresList}
          setRecipe={setRecipe}
          recipe={recipe}
          measuringSystem={measuringSystem}
        />
      </div>
      <div className={styles.control}>
        <Button
          variant='outlined'
          color='error'
          onClick={() => handleClick(-1)}
        >
          -
        </Button>
        <Button variant='outlined' onClick={() => handleClick(1)}>
          +
        </Button>
      </div>
      <div className={styles.submitButtonDiv}>
        <Button
          variant='outlined'
          color='success'
          onClick={() =>
            logRecipe(recipe, route, token, destroyCookie, handleOpen)
          }
        >
          Submit
        </Button>
      </div>
    </>
  )
}
