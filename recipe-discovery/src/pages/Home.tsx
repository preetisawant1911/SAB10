import { Link } from "react-router-dom";
import { useFetch } from "@hooks/useFetch";
import { endpoints } from "@lib/api";
import Spinner from "@components/Spinner";
import ErrorMessage from "@components/ErrorMessage";
import "./Home.css";

type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type CategoriesResponse = {
  categories: Category[];
};

const Home = () => {
  const { data, loading, error } = useFetch<CategoriesResponse>(
    endpoints.categories
  );

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="home-container">
      <h1 className="home-title">Recipe Categories</h1>

      <div className="categories-grid">
        {data?.categories.map((cat) => (
          <Link
            key={cat.idCategory}
            to={`/category/${cat.strCategory}`}
            className="category-card"
          >
            <img
              src={cat.strCategoryThumb}
              alt={cat.strCategory}
              className="category-img"
            />
            <div className="category-info">
              <h3>{cat.strCategory}</h3>
              <p className="category-desc">
                {cat.strCategoryDescription.slice(0, 80)}...
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
