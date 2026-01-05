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
  if (error) return <ErrorMessage message="Failed to load recipe." />;
  if (!data?.meals || data.meals.length === 0) return <p>No recipe found.</p>;

  const recipe = data.meals[0];
  const favorite = isFavorite(recipe.idMeal);

  return (
    <div className="recipe-detail">
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <button onClick={() => favorite ? removeFavorite(recipe.idMeal) : addFavorite(recipe.idMeal)}>
        {favorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <p>{recipe.strInstructions}</p>
    </div>
  );
};

export default RecipeDetail;
