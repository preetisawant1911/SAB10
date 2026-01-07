import { useFavorites } from "@context/FavoritesContext";
import RecipeCard from "@components/RecipeCard";
import { Link } from "react-router-dom";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Your Favorite Recipes</h1>

      {favorites.length === 0 && (
        <p className="favorites-empty">
          You have no favorites yet.{" "}
          <Link to="/" className="favorites-link">
            Browse recipes
          </Link>
        </p>
      )}

      <div className="favorites-grid">
        {favorites.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            id={meal.idMeal}
            title={meal.strMeal}
            image={meal.strMealThumb}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
