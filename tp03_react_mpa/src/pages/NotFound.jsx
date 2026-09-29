import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="text-center p-12">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">¡Ups! La página que buscas no existe.</p>
      <Link to="/" className="bg-slate-800 text-white px-4 py-2 rounded-lg">Volver al Inicio</Link>
    </div>
  );
}