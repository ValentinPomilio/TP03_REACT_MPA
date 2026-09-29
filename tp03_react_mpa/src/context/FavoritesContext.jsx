import { createContext, useState, useContext } from 'react';

// 1. Crear el contexto (Clase 14)
export const FavoritesContext = createContext();

// 2. Componente Proveedor
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((fav) => fav.id === item.id);
      if (exists) {
        return prevFavorites.filter((fav) => fav.id !== item.id);
      } else {
        return [...prevFavorites, item]; // Patrón inmutable (Clase 9 & 14)
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

// Custom Hook para un acceso fácil y limpio (Clase 14 - Buenas prácticas)
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe ser usado dentro de un FavoritesProvider');
  }
  return context;
}