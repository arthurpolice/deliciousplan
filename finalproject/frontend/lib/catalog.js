export async function getRecipeCatalog(cookies) {
  // This is used to dynamically control the presence of authentication or not being sent to the backend.
  // It's used because we want to be able to identify who the authenticated user is, if there is one (even though we're using SSR)
  // But still not block the page from unauthenticated users without needing another function
  // This is used because of the likes function in the catalog
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
