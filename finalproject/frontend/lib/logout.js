export async function logout(route, token, destroyCookie) {
  const sender = await fetch('https://riko.pythonanywhere.com/logout', {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  destroyCookie(null, 'token')
  destroyCookie(null, 'username')
  route.push('/')
}
