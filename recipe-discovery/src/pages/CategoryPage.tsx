import { useParams } from "react-router-dom";
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

type CategoryMealsResponse = {
  meals: MealSummary[] | null;
};

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const url = categoryName
    ? endpoints.filterByCategory(categoryName)
    : null;

  const { data, loading, error } = useFetch<CategoryMealsResponse>(url);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data?.meals) return <p>No meals found for this category.</p>;

  return (
    <div>
      <h1>Category: {categoryName}</h1>

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

export default CategoryPage;
