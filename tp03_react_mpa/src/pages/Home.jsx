import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export function Home() {
  const { darkMode } = useTheme();

  return (
    <section className="flex flex-col items-center justify-center min-h-[75vh] text-center px-4 py-8 w-full">
      <div
        className={`w-full max-w-2xl p-8 sm:p-12 rounded-3xl shadow-lg border transition-colors ${
          darkMode
            ? 'bg-slate-800 border-slate-700 text-white'
            : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          <span className={darkMode ? 'text-slate-100' : 'text-slate-900'}>
            Bienvenido a{' '}
          </span>
          <span className="text-blue-600 dark:text-blue-400">PokéExplorer</span>
        </h1>
        
        <p className={`text-base sm:text-lg mb-8 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          Explora la lista completa de Pokémon, consulta sus características detalladas y guarda tus favoritos en un estado global.
        </p>

        <div className="w-full">
          <Link
            to="/items"
            className="inline-block w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all duration-200"
          >
            Ver Catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}