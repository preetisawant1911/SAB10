const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const endpoints = {
  categories: `${BASE_URL}/categories.php`,
  filterByCategory: (category: string) =>
    `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
  lookupById: (id: string) => `${BASE_URL}/lookup.php?i=${id}`,
  searchByName: (query: string) =>
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`,
};
