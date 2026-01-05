import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { endpoints } from "../lib/api";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useFavorites } from "../context/FavoritesContext";

type MealDetail = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: string | null;
};

type MealDetailResponse = {
  meals: MealDetail[] | null;
};

const RecipeDetail = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const url = recipeId ? endpoints.lookupById(recipeId) : null;
  const { data, loading, error } = useFetch<MealDetailResponse>(url);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data?.meals || data.meals.length === 0)
    return <p>Recipe not found.</p>;

  const meal = data.meals[0];

  // Extract ingredients + measures
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push({
        ingredient: ing,
        measure: meas || "",
      });
    }
  }

  const favorite = isFavorite(meal.idMeal);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(meal.idMeal);
    } else {
      addFavorite(meal.idMeal);
    }
  };

  return (
    <div>
      <h1>{meal.strMeal}</h1>

      <button
        onClick={handleToggleFavorite}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        {favorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
      />

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, idx) => (
          <li key={idx}>
            {item.ingredient} — {item.measure}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p style={{ whiteSpace: "pre-line" }}>{meal.strInstructions}</p>
    </div>
  );
};

export default RecipeDetail;
