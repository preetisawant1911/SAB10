import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Make sure this file exists

const Home = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch meal categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        );
        const data = await res.json();
        const categoryNames = data.meals.map((c: any) => c.strCategory);
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/search?query=${search}`);
    }
  };

  if (loading) return <p className="loading">Loading categories...</p>;

  return (
    <div className="home-container">
      <h1 className="home-title">Discover Delicious Recipes</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {/* Category List */}
      <h2 className="category-title">Meal Categories</h2>

      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat}
            className="category-card"
            onClick={() => navigate(`/category/${cat}`)}
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
