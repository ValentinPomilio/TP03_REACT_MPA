import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFavorites } from '../context/FavoritesContext';

export function ItemsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    let cancelRequest = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        const formattedData = response.data.results.map((item, index) => {
          const id = index + 1;
          return {
            id,
            name: item.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          };
        });

        if (!cancelRequest) setItems(formattedData);
      } catch (err) {
        if (!cancelRequest) setError('Error al cargar la lista de ítems.');
      } finally {
        if (!cancelRequest) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelRequest = true; };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-slate-600">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mr-3"></div>
        <span>Cargando catálogo...</span>
      </div>
    );
  }

  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 flex flex-col items-center hover:shadow-md transition-shadow"
        >
          <div className="w-32 h-32 bg-slate-50 rounded-xl p-2 mb-3 flex items-center justify-center">
            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
          </div>

          <h3 className="capitalize font-bold text-slate-800 text-lg mb-4 text-center">{item.name}</h3>

          <div className="mt-auto w-full flex items-center gap-2">
            <Link
              to={`/items/${item.id}`}
              className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 rounded-xl transition-colors"
            >
              Ver Detalle
            </Link>
            <button
              onClick={() => toggleFavorite(item)}
              className={`p-2 rounded-xl text-sm font-bold border transition-colors ${
                isFavorite(item.id)
                  ? 'bg-red-50 border-red-200 text-red-500'
                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
              }`}
              title="Favorito"
            >
              {isFavorite(item.id) ? '♥' : '♡'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}