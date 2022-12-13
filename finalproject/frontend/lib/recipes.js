export async function getRecipeData(id, cookies) {
  // This is used to dynamically control the presence of authentication or not being sent to the backend.
  // It's used because we want to be able to identify who the authenticated user is, if there is one (even though we're using SSR)
  // But still not block the page from unauthenticated users without needing another function
  // This is used because of the likes function in the page
  let slug = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  if (cookies.token) {
    slug.headers = Object.assign(slug.headers, {
      Authorization: `Token ${cookies.token}`,
    })
  }
  const recipe_info = await fetch(
    `https://riko.pythonanywhere.com/get_recipe/${id}`,
    slug
  )
  const json_recipe_info = await recipe_info.json()
  const recipe = json_recipe_info.info
  return recipe
}

export async function deleteRecipe(recipeId, token, route) {
  const sender = await fetch('https://riko.pythonanywhere.com/remove_recipe', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      recipeId,
    }),
  })
  const response = sender.json()
  route.push('/catalog')
}

export async function addMeal(
  recipeId,
  mealType,
  date,
  servings,
  token,
  route
) {
  const sender = await fetch('https://riko.pythonanywhere.com/daily_plan/add', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      recipeId,
      mealType,
      date,
      servings,
    }),
  })
  const response = sender.json()
  route.push('/calendar')
}

export async function likeSubmit(recipeId, token) {
  const sender = await fetch('https://riko.pythonanywhere.com/likes_handler', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      recipeId,
    }),
  })
  const response = sender.json()
}
