🍽️ Recipe Discovery App
A modern React + TypeScript single-page application (SPA) that allows users to browse recipes, view details, search meals, and save favorites — powered by TheMealDB API.

🚀 Features
✔ Browse Categories
Fetches and displays all recipe categories from TheMealDB.

✔ View Recipes by Category
Dynamic route:
/category/:categoryName

✔ Recipe Details
Dynamic route:
/recipe/:recipeId  
Shows:

Image

Ingredients

Instructions

Add/Remove Favorites

✔ Favorites System
Global state using Context API

Persistent using localStorage

Favorites page: /favorites

✔ Search Recipes
Search bar in Navbar
Results page: /search?query=...

✔ Custom Hooks
useFetch → API fetching

useLocalStorage → persistent favorites

✔ Clean UI Components
Navbar

RecipeCard

Spinner

ErrorMessage