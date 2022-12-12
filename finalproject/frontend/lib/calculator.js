export async function getCalories(token) {
  const request = await fetch(
    'https://riko.pythonanywhere.com/get_calories',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      }
    }
  )
  const response = await request.json()
  return response.calories
}

export async function sendCalories(token, height, age, weight, sex, activity, setCalories) {
  const request = await fetch(
    'https://riko.pythonanywhere.com/log_calories',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      },
      body: JSON.stringify({
        height,
        age,
        weight,
        sex,
        activity
      })
    }
  )
  const response = await request.json()
  const calories = Math.round(response.calories)
  setCalories(calories)
}