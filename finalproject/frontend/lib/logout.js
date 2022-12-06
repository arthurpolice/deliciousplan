export async function logout(route, token, changeToken) {
  const sender = await fetch('https://riko.pythonanywhere.com/logout', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`
    },
  })
  changeToken('')
  route.push('/')
}