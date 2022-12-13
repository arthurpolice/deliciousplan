export async function dayFetcher(token, date, setData, setTotalCalories) {
  const request = await fetch(
    'https://riko.pythonanywhere.com/get_daily_plan',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        date,
      }),
    }
  )
  const response = await request.json()
  // If the fetch is successful, it'll carry a "day" key, so we use that to check the success.
  if (response.day) {
    setData(response.day)
    setTotalCalories(response.day.totalCalories)
  }
  // If the fetch is unsuccessful, we render a message on the calendar.
  else {
    setData(response.message)
    setTotalCalories(null)
  }
}

export async function removeRecipe(token, recipeId, date, mealType) {
  const sender = await fetch(
    'https://riko.pythonanywhere.com/daily_plan/remove',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        recipeId,
        date,
        mealType,
      }),
    }
  )
}
