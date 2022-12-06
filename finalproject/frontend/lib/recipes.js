export async function getAllRecipeIds() {
  const recipes = await fetch('https://riko.pythonanywhere.com/get_all_recipes', {
    method: 'POST'
  })
  const json_recipes = await recipes.json()
  
  return json_recipes.list.map((recipe) => {
    return {
      params: {
        id: `${recipe.id}`,
      },
    }
  })
}

export async function getRecipeData(id) {
  const recipe_info = await fetch(`https://riko.pythonanywhere.com/get_recipe/${id}`, {
    method: 'POST'
  })
  const json_recipe_info = await recipe_info.json()
  const recipe =  json_recipe_info.info
  return recipe
}

export async function deleteRecipe(recipeId, token, route) {
  const sender = await fetch('https://riko.pythonanywhere.com/remove_recipe', {
    method: 'POST',
    headers: {
      'Accept': "application/json",
      'Content-Type': "application/json",
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({
      recipeId
    })
  })
  const response = sender.json()
  console.log(response)
  route.push('/catalog')
}

export async function addMeal(recipeId, mealType, date, servings, token, route) {
  const sender = await fetch('https://riko.pythonanywhere.com/daily_plan/add', {
    method: 'POST',
    headers: {
      'Accept': "application/json",
      'Content-Type': "application/json",
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify({
      recipeId,
      mealType,
      date,
      servings
    })
  })
  const response = sender.json()
  console.log(response)
  route.push('/calendar')
}