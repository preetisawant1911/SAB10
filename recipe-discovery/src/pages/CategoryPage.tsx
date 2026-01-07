import { useParams } from "react-router-dom";
import { useFetch } from "@hooks/useFetch";
import { endpoints } from "@lib/api";
import Spinner from "@components/Spinner";
import ErrorMessage from "@components/ErrorMessage";
import RecipeCard from "@components/RecipeCard";
import "./CategoryPage.css";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type CategoryMealsResponse = {
  meals: Meal[];
};

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const url = categoryName ? endpoints.filterByCategory(categoryName) : null;
  const { data, loading, error } = useFetch<CategoryMealsResponse>(url);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data?.meals) return <p>No meals found.</p>;

  return (
    <div className="category-container">
      <h1 className="category-title">{categoryName} Recipes</h1>

      <div className="category-grid">
        {data.meals.map((meal) => (
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

export default CategoryPage;
