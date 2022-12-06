export async function register(username, email, password) {
  const register = await fetch('https://riko.pythonanywhere.com/register', {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  	body: JSON.stringify({
  		username,
      email,
  		password
  	})
  })
  const response = await register.json()
  const token = response.token
  return token
}