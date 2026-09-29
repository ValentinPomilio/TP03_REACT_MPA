import { useState, useEffect } from 'react';
import { useParams, Link, NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';

export function ItemDetail() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { darkMode } = useTheme();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => {
        if (isMounted) {
          const data = {
            id: res.data.id,
            name: res.data.name,
            height: res.data.height,
            weight: res.data.weight,
            types: res.data.types ? res.data.types.map((t) => t.type.name) : [],
            abilities: res.data.abilities ? res.data.abilities.map((a) => a.ability.name) : [],
            image:
              res.data.sprites?.other?.['official-artwork']?.front_default ||
              res.data.sprites?.front_default ||
              ''
          };
          setDetails(data);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(err);
          setError('No se pudo encontrar el detalle del Pokémon seleccionado.');
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-slate-500">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mr-3"></div>
        <span>Cargando detalles...</span>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border dark:border-slate-700 p-6 max-w-lg mx-auto my-8">
        <p className="text-red-500 font-medium mb-4">{error || 'Ítem no encontrado.'}</p>
        <Link to="/items" className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-3xl mx-auto rounded-3xl shadow-sm border p-6 sm:p-8 transition-colors ${
        darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <Link
        to="/items"
        className="inline-flex items-center text-sm font-semibold text-blue-500 hover:underline mb-6"
      >
        ← Volver al catálogo
      </Link>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <div className="w-48 h-48 sm:w-56 sm:h-56 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 flex items-center justify-center border dark:border-slate-700">
          {details.image ? (
            <img src={details.image} alt={details.name} className="w-full h-full object-contain" />
          ) : (
            <span>Sin imagen</span>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left w-full">
          <h2 className="text-3xl font-extrabold capitalize mb-4">{details.name}</h2>

          <div className="space-y-2 text-sm opacity-90 mb-6">
            <p><strong>Altura:</strong> {details.height / 10} m</p>
            <p><strong>Peso:</strong> {details.weight / 10} kg</p>
            <p><strong>Tipos:</strong> {details.types.join(', ')}</p>
          </div>

          <button
            onClick={() => toggleFavorite(details)}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
              isFavorite(details.id)
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100'
            }`}
          >
            {isFavorite(details.id) ? '♥ Quitar de Favoritos' : '♡ Añadir a Favoritos'}
          </button>
        </div>
      </div>

      <div className="border-b border-slate-200 dark:border-slate-700 flex gap-6 mb-6">
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            `pb-2 text-sm font-semibold border-b-2 transition-all ${
              isActive
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`
          }
        >
          Habilidades
        </NavLink>
        <NavLink
          to="resenas"
          className={({ isActive }) =>
            `pb-2 text-sm font-semibold border-b-2 transition-all ${
              isActive
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`
          }
        >
          Reseñas
        </NavLink>
      </div>

      <div className="pt-2">
        <Outlet context={details} />
      </div>
    </div>
  );
}