import { useFavorites } from "../context/FavoritesContext";
import { useFetch } from "../hooks/useFetch";
import { endpoints } from "../lib/api";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type MealDetailResponse = {
  meals: MealSummary[] | null;
};

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div>
        <h1>Favorites</h1>
        <p>You have no favorite recipes yet. Browse and add some!</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Favorites</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {favorites.map((id) => (
          <FavoriteItem key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

const FavoriteItem = ({ id }: { id: string }) => {
  const { data, loading, error } = useFetch<MealDetailResponse>(
    endpoints.lookupById(id)
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data?.meals) return null;

  const meal = data.meals[0];

  return (
    <RecipeCard
      id={meal.idMeal}
      title={meal.strMeal}
      thumbnail={meal.strMealThumb}
    />
  );
};

export default FavoritesPage;
