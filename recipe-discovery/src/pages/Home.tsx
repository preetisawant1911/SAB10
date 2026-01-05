import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { endpoints } from "../lib/api";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

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
  if (!data?.categories) return <p>No categories found.</p>;

  return (
    <div>
      <h1>Recipe Categories</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {data.categories.map((cat) => (
          <Link
            key={cat.idCategory}
            to={`/category/${encodeURIComponent(cat.strCategory)}`}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "0.5rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={cat.strCategoryThumb}
              alt={cat.strCategory}
              style={{ width: "100%", borderRadius: "4px" }}
            />
            <h3 style={{ marginTop: "0.5rem" }}>{cat.strCategory}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
