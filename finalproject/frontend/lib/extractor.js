export async function sendUrl(
  url,
  route,
  token,
  destroyCookie,
  setErrorMessage,
  setLoading,
  handleOpen
) {
  if (token) {
    const slug = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        url,
      }),
    }
    const sender = await fetch(
      'https://riko.pythonanywhere.com/extract_recipe',
      slug
    )
    const response = await sender.json()
    // Errors come in a key called "detail", so we respond to those.
    if ('detail' in response) {
      // If the cookie's token is invalid but still there, we delete the cookie. 
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
      // Redirect the user to the page they just created.
      route.push(`/recipes/${id}`)
    } else {
      setErrorMessage('Invalid URL!')
      setLoading(false)
    }
  } 
  // If user is not authenticated, we open the modal and block the fetch.
  else {
    handleOpen()
  }
}
