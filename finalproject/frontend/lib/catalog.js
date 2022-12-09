export async function getRecipeCatalog(cookies) {
  let slug = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  if (cookies.token) {
    slug.headers = Object.assign(slug.headers, {
      Authorization: `Token ${cookies.token}`,
    })
  }
  const response = await fetch(
    'https://riko.pythonanywhere.com/get_all_recipes',
    slug
  )
  const catalog = await response.json()
  return catalog
}
