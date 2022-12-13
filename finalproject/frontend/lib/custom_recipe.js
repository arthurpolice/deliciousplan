// This fetches the options for the ingredient field in the custom recipe page.
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

// This fetches all the measurements that have ever been used in the database.
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

// Blueprint for recipes
// It mimics the recipes that come from Spoonacular, so the backend uses the same functions for both methods of logging a recipe.
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
  // If there is authentication, we send a fetch request. We handle possible errors below.
  if (token) {
    const slug = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        recipe,
      }),
    }
    const response = await fetch(
      'https://riko.pythonanywhere.com/log_custom',
      slug
    )
    const response_json = await response.json()
    // Errors come in a key called "detail", so we respond to those.
    if ('detail' in response_json) {
      // If the cookie's token is invalid but still there, we delete the cookie. 
      if (
        response_json.detail === 'Invalid token.' ||
        response_json.detail ===
          'Invalid token header. No credentials provided.'
      ) {
        destroyCookie(null, 'token')
        destroyCookie(null, 'username')
        handleOpen()
      }
    } else {
      const id = response_json['id']
      router.push(`recipes/${id}`)
    }
  } else {
    handleOpen()
  }
}
