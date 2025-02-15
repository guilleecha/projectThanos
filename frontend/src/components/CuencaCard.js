// filepath: /c:/myProjects/projectThanos/frontend/src/components/CuencaCard.js
import React from 'react';
import { useRouter } from 'next/router';

export default function CuencaCard({ cuenca }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/cuencas/${cuenca.id}`);
  };

  return (
    <div className="border p-4 mb-4">
      <h2 className="text-xl font-bold">{cuenca.name}</h2>
      <p>Área: {cuenca.area} km²</p>
      <p>Diferencia Altimétrica: {cuenca.altimetry} m</p>
      <p>Largo del Cauce Principal: {cuenca.main_channel_length} km</p>
      <button onClick={handleEdit} className="mt-2 p-2 bg-green-500 text-white">Editar</button>
    </div>
  );
}