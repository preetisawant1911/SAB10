import { createContext, useContext, useState, ReactNode } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type FavoritesContextType = {
  favorites: Meal[];
  addFavorite: (meal: Meal) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Meal[]>([]);

  const addFavorite = (meal: Meal) => {
    setFavorites((prev) => [...prev, meal]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((meal) => meal.idMeal !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((meal) => meal.idMeal === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

