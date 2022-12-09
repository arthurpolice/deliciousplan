export async function login(username, password) {
  const login = await fetch('https://riko.pythonanywhere.com/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  const response = await login.json()
  const token = response.token
  return token
}
