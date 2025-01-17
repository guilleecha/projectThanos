// filepath: /c:/myProjects/projectThanos/frontend/src/app/cuencas/page.js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CuencaCard from '../../components/CuencaCard';
import CuencaForm from '../../components/CuencaForm';

export default function Cuencas() {
  const [basins, setBasins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentBasin, setCurrentBasin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8000/api/basins/')
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
    const url = currentBasin ? `http://localhost:8000/api/basins/${currentBasin.id}/` : 'http://localhost:8000/api/basins/';

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

  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Basins</h1>
      {showForm && <CuencaForm onSubmit={handleAddBasin} initialData={currentBasin} />}
      {basins.map(basin => (
        <div key={basin.id} className="card">
          <CuencaCard cuenca={basin} onEdit={handleEditBasin} />
        </div>
      ))}
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