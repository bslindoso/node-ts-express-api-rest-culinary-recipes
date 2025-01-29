export const buildRecipeQuery = (params: object) => {
  const conditions = Object.entries(params).map(([key, value]) => {
    return `${key}~${value}`
  }).join(" & ") // join conditions with '&'

  return `[*${conditions}]` // return a valid query
}