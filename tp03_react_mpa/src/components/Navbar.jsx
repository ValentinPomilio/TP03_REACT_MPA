import { NavLink } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';

export function Navbar() {
  const { favorites } = useFavorites();
  const { darkMode, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    `text-sm sm:text-base font-semibold transition-colors ${
      isActive
        ? 'text-yellow-400 border-b-2 border-yellow-400 pb-1'
        : 'text-slate-300 hover:text-white'
    }`;

  return (
    <header className="bg-slate-900 text-white w-full sticky top-0 z-50 shadow-md">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NavLink to="/" className="text-xl sm:text-2xl font-bold text-yellow-500 tracking-wide">
          ⚡ PokéExplorer
        </NavLink>

        <nav className="flex items-center gap-4 sm:gap-8">
          <NavLink to="/" className={linkClass}>
            Inicio
          </NavLink>
          <NavLink to="/items" className={linkClass}>
            Catálogo
          </NavLink>
          <NavLink to="/favoritos" className={linkClass}>
            Favoritos ({favorites.length})
          </NavLink>

          {/* Botón de alternancia de Modo Oscuro / Claro */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-yellow-400 border border-slate-700 transition-colors text-sm font-semibold flex items-center gap-1"
            title="Cambiar Modo"
          >
            {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </nav>
      </div>
    </header>
  );
}