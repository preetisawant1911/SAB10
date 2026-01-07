export const endpoints = {
  categories: "https://www.themealdb.com/api/json/v1/1/categories.php",
  filterByCategory: (category: string) =>
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  lookupById: (id: string) =>
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  search: (query: string) =>
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
};
