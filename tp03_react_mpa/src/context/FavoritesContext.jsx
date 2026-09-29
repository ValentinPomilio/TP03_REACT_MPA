import { createContext, useState, useContext } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((fav) => fav.id === item.id);
      if (exists) {
        return prevFavorites.filter((fav) => fav.id !== item.id);
      } else {
        return [...prevFavorites, item]; 
      }
    });
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === Number(id) || fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe ser usado dentro de un FavoritesProvider');
  }
  return context;
}