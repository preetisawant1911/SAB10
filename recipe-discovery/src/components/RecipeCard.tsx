import { Link } from "react-router-dom";

type Props = {
  id: string;
  title: string;
  image: string;
};

const RecipeCard = ({ id, title, image }: Props) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        background: "white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        transition: "0.2s",
      }}
    >
      <Link to={`/recipe/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "160px", objectFit: "cover" }}
        />
        <div style={{ padding: "1rem" }}>
          <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
