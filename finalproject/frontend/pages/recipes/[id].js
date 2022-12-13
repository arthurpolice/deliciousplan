import { getRecipeData, deleteRecipe } from '../../lib/recipes'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Parallax, Background } from 'react-parallax'
import { Fab } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormControlLabel } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import Summary from '../../components/recipes/summary'
import Navbar from '../../components/navbar/navbar'
import MealModal from '../../components/meal_modal/meal_modal.tsx'
import Ingredients from '../../components/recipes/ingredients'
import LikeButton from '../../components/like_button/like_button'
import styles from '../../styles/recipes.module.css'
import nookies, { parseCookies } from 'nookies'
import LoginModal from '../../components/login_modal/login_modal'

library.add(faTrashCan)

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)
  const recipeData = await getRecipeData(ctx.query.id, cookies)
  if (!recipeData) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      recipeData,
    },
  }
}

export default function Recipe({ recipeData }) {
  const route = useRouter()
  const cookies = parseCookies()
  const token = cookies.token
  const username = cookies.username

  const [measurement, setMeasurement] = useState('grams')
  const handleChange = (event) => {
    setMeasurement(event.target.value)
  }
  // Meal Modal Control
  const [openMealModal, setOpenMealModal] = useState(false)
  const handleCloseMealModal = () => setOpenMealModal(false)

  // Login Modal Control
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const handleCloseLoginModal = () => setOpenLoginModal(false)

  // Controls the behavior of the add meal button.
  const handleOpen = () => {
    token?setOpenMealModal(true):setOpenLoginModal(true)
  }

  const [likesAmount, setLikesAmount] = useState(recipeData.likesAmount)

  const [disabledDelete, setDisabledDelete] = useState(true)
  useEffect(() => {
    if (username === recipeData.recipe.credit) {
      setDisabledDelete(false)
    }
  }, [username, recipeData])

  if (route.isFallback) {
    return <div>Loading...</div>
  }
  
  return (
    <>
      <Head>
        <title>{recipeData.recipe.name}</title>
      </Head>
      <Navbar />
      <LoginModal 
        open={openLoginModal}
        handleClose={handleCloseLoginModal}
      />
      <MealModal
        open={openMealModal}
        handleClose={handleCloseMealModal}
        id={recipeData.recipe.id}
      />
      <div className={styles.main}>
        <Parallax className={styles.parallax} strength={300}>
          <Background className={styles.custombg}>
            <Image
              className={styles.background}
              src={recipeData.recipe.image}
              alt='Recipe picture'
              layout='fill'
              objectFit='cover'
            />
          </Background>
        </Parallax>
        <div className={styles.recipeContainer}>
          <Paper className={styles.paper} elevation={3}>
            <Paper className={styles.smallpaper} elevation={5}>
              <div className={styles.floatingButtons}>
                <LikeButton className={styles.checkBox} recipe={recipeData} token={token} likesAmount={likesAmount} setLikesAmount={setLikesAmount}/>
                <Fab
                  className={styles.fabAdd}
                  variant='extended'
                  color='success'
                  onClick={handleOpen}
                >
                  Add Meal
                </Fab>
              </div>
              <h1 className={styles.title}>{recipeData.recipe.name}</h1>
              <div className={styles.summary}>
                <Summary recipe={recipeData.recipe} />
              </div>
              <div className={styles.floatingButtons}>
                <Fab
                  className={styles.fabDelete}
                  title='Delete'
                  aria-label='delete'
                  color='error'
                  disabled={disabledDelete}
                  onClick={() =>
                    deleteRecipe(recipeData.recipe.id, token, route)
                  }
                >
                  <FontAwesomeIcon
                    className={styles.trashIcon}
                    icon={faTrashCan}
                  />
                </Fab>
              </div>
            </Paper>
            <article>
              <FormControl className={styles.form}>
                <RadioGroup
                  className={styles.buttons}
                  row
                  name='measurement'
                  value={measurement}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value='grams'
                    control={<Radio />}
                    label='Grams'
                  />
                  <FormControlLabel
                    value='metric'
                    control={<Radio />}
                    label='Metric'
                  />
                  <FormControlLabel
                    value='imperial'
                    control={<Radio />}
                    label='US (Imperial)'
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <input
                type='number'
                className={styles.hidden}
                value={recipeData.id}
              />
              <br />
              <h3 className={styles.ingredientssection}>
                Ingredient Breakdown
              </h3>
              <Ingredients
                ingredients={recipeData.ingredients}
                measurement={measurement}
              />
            </article>
          </Paper>
        </div>
      </div>
    </>
  )
}
