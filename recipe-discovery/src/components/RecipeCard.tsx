import { Link } from "react-router-dom";

type RecipeCardProps = {
  id: string;
  title: string;
  thumbnail: string;
};

const RecipeCard = ({ id, title, thumbnail }: RecipeCardProps) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "0.5rem",
      }}
    >
      <img
        src={thumbnail}
        alt={title}
        style={{ width: "100%", borderRadius: "4px" }}
      />
      <h3>{title}</h3>
      <Link to={`/recipe/${id}`}>View Details</Link>
    </div>
  );
};

export default RecipeCard;
