import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

export function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-slate-800">Sin favoritos aún</h2>
        <p className="text-slate-500 text-sm mb-6">Explora el catálogo y añade tus Pokémon preferidos.</p>
        <Link to="/items" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm">
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">Mis Favoritos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {favorites.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm border p-4 flex flex-col items-center">
            <img src={item.image} alt={item.name} className="w-28 h-28 object-contain mb-2" />
            <h3 className="capitalize font-bold text-slate-800 text-lg mb-4">{item.name}</h3>
            <button
              onClick={() => toggleFavorite(item)}
              className="mt-auto w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2 rounded-xl text-sm border border-red-200 transition-colors"
            >
              Quitar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}