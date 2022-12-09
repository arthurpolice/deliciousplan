import { getRecipeData, deleteRecipe, like } from '../../lib/recipes'
import { faHeart, faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Parallax, Background } from 'react-parallax'
import { Fab } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Summary from '../../components/recipes/summary'
import Navbar from '../../components/navbar/navbar'
import MealModal from '../../components/meal_modal/meal_modal.tsx'
import Ingredients from '../../components/recipes/ingredients'
import styles from '../../styles/recipes.module.css'
import nookies, { parseCookies } from 'nookies'

library.add(faHeart, faStar, faTrashCan)

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
  const [heart, setHeart] = useState('black')
  const [star, setStar] = useState('black')

  const [measurement, setMeasurement] = useState('grams')
  const handleChange = (event) => {
    setMeasurement(event.target.value)
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    if (username === recipeData.recipe.credit) {
      setDisabled(false)
    }
  }, [username, recipeData])

  useEffect(() => {
    if (recipeData.likeStatus === true) {
      setHeart('red')
    }
  })

  if (route.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Head>
        <title>{recipeData.recipe.name}</title>
      </Head>
      <Navbar />
      <MealModal
        open={open}
        handleClose={handleClose}
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
                <Fab
                  className={styles.fabHeart}
                  title='Like'
                  aria-label='like'
                  onClick={() => like(recipeData.recipe.id, token, setHeart)}
                >
                  <FontAwesomeIcon
                    className={styles.heartIcon}
                    icon={faHeart}
                    color={heart}
                  />
                </Fab>
                <Fab
                  className={styles.fabStar}
                  title='Favorite'
                  aria-label='favorite'
                >
                  <FontAwesomeIcon
                    className={styles.starIcon}
                    icon={faStar}
                    color={star}
                  />
                </Fab>
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
                  disabled={disabled}
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
