import { getRecipeData, deleteRecipe, likeSubmit } from '../../lib/recipes'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Parallax, Background } from 'react-parallax'
import { Fab } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { pink, yellow } from '@mui/material/colors'
import Head from 'next/head'
import Image from 'next/image'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import StarBorder from '@mui/icons-material/StarBorder'
import Star from '@mui/icons-material/Star'
import Summary from '../../components/recipes/summary'
import Navbar from '../../components/navbar/navbar'
import MealModal from '../../components/meal_modal/meal_modal.tsx'
import Ingredients from '../../components/recipes/ingredients'
import styles from '../../styles/recipes.module.css'
import nookies, { parseCookies } from 'nookies'

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

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [disabledDelete, setDisabledDelete] = useState(true)
  useEffect(() => {
    if (username === recipeData.recipe.credit) {
      setDisabledDelete(false)
    }
  }, [username, recipeData])

  const [like, setLike] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const [disabledCheck, setDisabledCheck] = useState(true)

  useEffect(() => {
    if (recipeData.likeStatus === true) {
      setLike(true)
    }
  })

  useEffect(() => {
    if (token) {
      setDisabledCheck(false)
    }
  })

  const likeHandler = event => {
    likeSubmit(recipeData.recipe.id, token)
    setLike(event.target.checked)
  }

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
                <FormControlLabel
                  control={
                    <Checkbox
                      className={styles.checkBox}
                      checked={like}
                      disabled={disabledCheck}
                      icon={<FavoriteBorder className={styles.checkBoxIcon}/>}
                      checkedIcon={<Favorite className={styles.checkBoxIcon}/>}
                      sx={{
                        color: pink[800],
                        '&.Mui-checked': {
                          color: pink[600],
                        },
                      }}
                    />
                  }
                  onChange={(event) => likeHandler(event)}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      className={styles.checkBox}
                      checked={favorite}
                      disabled={disabledCheck}
                      icon={<StarBorder className={styles.checkBoxIcon}/>}
                      checkedIcon={<Star className={styles.checkBoxIcon}/>}
                      sx={{
                        color: yellow[800],
                        '&.Mui-checked': {
                          color: yellow[600],
                        },
                      }}
                    />
                  }
                  onChange={(event) => setFavorite(event.target.checked)}
                />
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
