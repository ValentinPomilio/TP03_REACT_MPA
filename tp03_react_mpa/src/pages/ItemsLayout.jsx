import { Outlet } from 'react-router-dom';

export function ItemsLayout() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">Catálogo de Pokémon</h2>
      {/* Outlet sirve de ventana para las rutas hijas (Clase 12) */}
      <Outlet />
    </div>
  );
}