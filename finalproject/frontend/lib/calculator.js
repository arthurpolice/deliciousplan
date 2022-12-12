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
}

export async function sendCalories(height, age, weight, sex, activity) {
  const request = await fetch(
    'https://riko.pythonanywhere.com/calculate_calories',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,s
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
}