import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        padding: "1rem",
        borderBottom: "1px solid #ddd",
        marginBottom: "1rem",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>

      <form
        onSubmit={handleSearch}
        style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}
      >
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;

