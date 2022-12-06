export async function getRecipeCatalog() {
  const response = await fetch('https://riko.pythonanywhere.com/get_all_recipes',{
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  })
  const catalog = await response.json()
  return catalog
}