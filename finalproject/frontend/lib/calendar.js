export async function dayFetcher(token, date, setData, setTotalCalories) {
  const request = await fetch('https://riko.pythonanywhere.com/get_daily_plan', {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: JSON.stringify({
      date
    })
  })
  const response = await request.json()
  console.log(response)
  if (response.day) {
    setData(response.day)
    setTotalCalories(response.day.totalCalories)
  }
  else {
    setData(response.message)
    setTotalCalories(null)
  }
}


export async function removeRecipe(token, recipeId, date, mealType) {
  const sender = await fetch('https://riko.pythonanywhere.com/daily_plan/remove', {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    },
    body: JSON.stringify({
      recipeId,
      date,
      mealType
    })
  })
  const response = await sender.json()
}
