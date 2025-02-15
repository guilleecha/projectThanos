// filepath: /c:/myProjects/projectThanos/frontend/src/pages/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Cuencas() {
  const [basins, setBasins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentBasin, setCurrentBasin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/cuencas')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => setBasins(data))
      .catch(error => console.error('Fetch error:', error));
  }, []);

  const handleAddBasin = (newBasin) => {
    const method = currentBasin ? 'PUT' : 'POST';
    const url = currentBasin ? `/api/cuencas/${currentBasin.id}` : '/api/cuencas';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBasin),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        if (currentBasin) {
          setBasins(basins.map(basin => (basin.id === data.id ? data : basin)));
        } else {
          setBasins([...basins, data]);
        }
        setShowForm(false);
        setCurrentBasin(null);
      })
      .catch(error => console.error('Fetch error:', error));
  };

  const handleEditBasin = (basin) => {
    router.push(`/cuencas/${basin.id}`);
  };

  const handleDeleteBasin = (id) => {
    fetch(`/api/cuencas/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(() => {
        setBasins(basins.filter(basin => basin.id !== id));
      })
      .catch(error => console.error('Fetch error:', error));
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Cuencas</h1>
      {showForm && <CuencaForm onSubmit={handleAddBasin} initialData={currentBasin} />}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Nombre</th>
            <th className="py-2">Área (km²)</th>
            <th className="py-2">Diferencia Altimétrica (m)</th>
            <th className="py-2">Largo del Cauce Principal (km)</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {basins.map(basin => (
            <tr key={basin.id}>
              <td className="border px-4 py-2">{basin.id}</td>
              <td className="border px-4 py-2">{basin.name}</td>
              <td className="border px-4 py-2">{basin.area}</td>
              <td className="border px-4 py-2">{basin.altimetry}</td>
              <td className="border px-4 py-2">{basin.main_channel_length}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEditBasin(basin)} className="mr-2 p-2 bg-green-500 text-white">Editar</button>
                <button onClick={() => handleDeleteBasin(basin.id)} className="p-2 bg-red-500 text-white">Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          setShowForm(!showForm);
          setCurrentBasin(null);
        }}
        className="button fixed bottom-4 right-4"
      >
        {showForm ? "Cancelar" : "+ Add Basin"}
      </button>
    </div>
  );
}