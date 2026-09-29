import { useOutletContext } from 'react-router-dom';

export function ItemAbilitiesChild() {
  const details = useOutletContext(); 

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <h3 className="font-bold text-lg mb-2">Habilidades de {details.name}:</h3>
      <ul className="list-disc pl-5">
        {details.abilities.map((ability, idx) => (
          <li key={idx} className="capitalize text-gray-700">{ability}</li>
        ))}
      </ul>
    </div>
  );
}

export function ItemReviewsChild() {
  const details = useOutletContext();

  return (
    <div className="p-4 bg-slate-50 rounded-lg">
      <h3 className="font-bold text-lg mb-2">Reseñas de la comunidad para {details.name}:</h3>
      <p className="text-gray-600 italic">"¡Un Pokémon indispensable en cualquier equipo!" - Entrenador Kanto</p>
    </div>
  );
}