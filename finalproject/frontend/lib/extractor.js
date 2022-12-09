export async function sendUrl(
  url,
  route,
  token,
  destroyCookie,
  setErrorMessage,
  setLoading,
  handleOpen
) {
  let slug = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
    }),
  }
  if (token) {
    slug.headers = Object.assign(slug.headers, {
      Authorization: `Token ${token}`,
    })
  }
  const sender = await fetch(
    'https://riko.pythonanywhere.com/extract_recipe',
    slug
  )
  const response = await sender.json()
  if ('detail' in response) {
    if (
      response.detail === 'Invalid token.' ||
      response.detail === 'Invalid token header. No credentials provided.'
    ) {
      setLoading(false)
      destroyCookie(null, 'token')
      destroyCookie(null, 'username')
      handleOpen()
    }
  } else if ('id' in response) {
    const id = response.id
    route.push(`/recipes/${id}`)
  } else {
    setErrorMessage('Invalid URL!')
    setLoading(false)
  }
}
