export async function getRecipeCatalog() {
  const response = await fetch('http://127.0.0.1:8000/get_all_recipes',{
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  })
  const catalog = await response.json()
  return catalog
}