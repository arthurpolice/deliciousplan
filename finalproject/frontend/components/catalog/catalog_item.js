import React, { useEffect, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Grid, Grow } from '@mui/material'
import Link from 'next/link'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import styles from './catalog.module.css'
import 'tachyons'

export default function CatalogItem({ recipe }) {
  library.add(faSeedling, faHeart)
  const [heart, setHeart] = useState('black')

  useEffect(() => {
    if (recipe.likeStatus === true) {
      setHeart('red')
    }
    else {
      ('black')
    }
  }, [recipe])

  return (
    <Grow in={true} timeout={1000}>
      <Grid className={styles.catalogitem}>
        <Link href={`/recipes/${recipe.id}`}>
          <Card className={`${styles.card} ${'grow'}`} sx={{ maxWidth: 345 }}>
            <CardMedia
              component='img'
              alt={recipe.name}
              height={250}
              image={
                recipe.image ? recipe.image : '/images/healthy-food-icon.png'
              }
              className={styles.cardMedia}
            />
            <CardContent className={styles.content}>
              <Typography className={styles.title} variant='h6' component='div'>
                {recipe.name}
              </Typography>
              <div className={styles.info}>
                <Typography variant='body2' color='text.secondary'>
                  Servings: {recipe.total_servings}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {Math.round(recipe.calories / recipe.total_servings)}{' '}
                  kcal/serving
                </Typography>
              </div>
              <br />
              <div className={styles.footer}>
                <div>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    className={styles.source}
                  >
                    By {recipe.credit}
                  </Typography>
                </div>
                <div className={styles.restrictions}>
                  <span className={styles.restriction}>
                    {recipe.vegetarian ? (
                      <Image
                        src={'/images/no-meat.png'}
                        alt='vegetarian'
                        title='Vegetarian'
                        height={24}
                        width={24}
                      />
                    ) : (
                      <></>
                    )}
                  </span>
                  <span className={styles.restriction}>
                    {recipe.vegan ? (
                      <span title='Vegan'>
                        <FontAwesomeIcon
                          icon={faSeedling}
                          color='green'
                          alt='vegan'
                        />
                      </span>
                    ) : (
                      <></>
                    )}
                  </span>
                  <span className={styles.restriction}>
                    {recipe.dairy_free ? (
                      <Image
                        src={'/images/dairy-free.png'}
                        alt='dairy free'
                        title='Dairy Free'
                        height={24}
                        width={24}
                      />
                    ) : (
                      <></>
                    )}
                  </span>
                </div>
              </div>
              <div className={styles.likeSection} title='Likes'>
                <FontAwesomeIcon className={styles.heartIcon} icon={faHeart} color={heart}/>
                <Typography className={styles.likesAmount} variant='body2'>{ recipe.likesAmount }</Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    </Grow>
  )
}
