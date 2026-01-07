import { useParams } from "react-router-dom";
import { useFavorites } from "@context/FavoritesContext";
import { useFetch } from "@hooks/useFetch";
import { endpoints } from "@lib/api";
import Spinner from "@components/Spinner";
import ErrorMessage from "@components/ErrorMessage";

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
  const favorite = isFavorite(meal.idMeal);

  const handleToggleFavorite = () => {
    favorite ? removeFavorite(meal.idMeal) : addFavorite(meal);
  };

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

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>{meal.strMeal}</h1>

      <img
        src={meal.strMealThumb || ""}
        alt={meal.strMeal}
        style={{ width: "100%", borderRadius: "8px", marginBottom: "1.5rem" }}
      />

      <button
        onClick={handleToggleFavorite}
        style={{
          marginBottom: "1.5rem",
          padding: "0.6rem 1.2rem",
          background: favorite ? "#d9534f" : "#0275d8",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {favorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.ingredient} — {item.measure}
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: "2rem" }}>Instructions</h2>
      <p>{meal.strInstructions}</p>
    </div>
  );
};

export default RecipeDetail;
