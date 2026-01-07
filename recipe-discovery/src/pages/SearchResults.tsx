import { useLocation } from "react-router-dom";
import { useFetch } from "@hooks/useFetch";
import { endpoints } from "@lib/api";
import Spinner from "@components/Spinner";
import ErrorMessage from "@components/ErrorMessage";
import RecipeCard from "@components/RecipeCard";
import "./SearchResults.css";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type SearchResponse = {
  meals: Meal[] | null;
};

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  const url = query ? endpoints.search(query) : null;
  const { data, loading, error } = useFetch<SearchResponse>(url);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="search-container">
      <h1 className="search-title">Search Results for: "{query}"</h1>

      {!data?.meals && <p>No recipes found. Try another search.</p>}

      <div className="search-grid">
        {data?.meals?.map((meal) => (
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

export default SearchResults;
