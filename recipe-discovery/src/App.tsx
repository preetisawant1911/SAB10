import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import RecipeDetail from "./pages/RecipeDetail";
import FavoritesPage from "./pages/FavoritesPage";
import SearchResults from "./pages/SearchResults";

const App = () => {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </div>
  );
};

export default App;
