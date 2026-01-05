import { useLocation } from "react-router-dom";
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

type SearchResponse = {
  meals: MealSummary[] | null;
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("query") || "";
  const url = query ? endpoints.searchByName(query) : null;

  const { data, loading, error } = useFetch<SearchResponse>(url);

  if (!query) return <p>Please enter a search term.</p>;
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data?.meals) return <p>No results found for "{query}".</p>;

  return (
    <div>
      <h1>Search results for "{query}"</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {data.meals.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            id={meal.idMeal}
            title={meal.strMeal}
            thumbnail={meal.strMealThumb}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
