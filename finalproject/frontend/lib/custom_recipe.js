export async function getAllIngredients() {
  const response = await fetch(
    'https://riko.pythonanywhere.com/get_all_ingredients',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
  const ingredients_object = await response.json()
  const ingredients = ingredients_object.list
  return ingredients
}

export async function getAllMeasures() {
  const response = await fetch(
    'https://riko.pythonanywhere.com/get_all_measures',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
  const measures_object = await response.json()
  const measures = measures_object.list
  return measures
}

export function makeRecipeObject() {
  const object = {
    title: '',
    image: '',
    sourceUrl: '',
    id: -1,
    cuisines: [''],
    extendedIngredients: [],
    vegan: false,
    vegetarian: false,
    dairyFree: false,
    glutenFree: false,
    ketogenic: false,
  }
  return object
}

// Data sender

export async function logRecipe(
  recipe,
  router,
  token,
  destroyCookie,
  handleOpen
) {
  let slug = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipe,
    }),
  }
  if (token) {
    slug.headers = Object.assign(slug.headers, {
      Authorization: `Token ${token}`,
    })
  }
  const response = await fetch(
    'https://riko.pythonanywhere.com/log_custom',
    slug
  )
  const response_json = await response.json()
  if ('detail' in response_json) {
    if (
      response_json.detail === 'Invalid token.' ||
      response_json.detail === 'Invalid token header. No credentials provided.'
    ) {
      destroyCookie(null, 'token')
      destroyCookie(null, 'username')
      handleOpen()
    }
  } else {
    const id = response_json['id']
    router.push(`recipes/${id}`)
  }
}
