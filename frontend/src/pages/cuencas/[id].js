// filepath: /c:/myProjects/projectThanos/frontend/src/pages/cuencas/[id].js
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CuencaForm from '../../components/CuencaForm';

export default function EditCuenca() {
  const router = useRouter();
  const { id } = router.query;
  const [basin, setBasin] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/basins/${id}/`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(data => setBasin(data))
        .catch(error => console.error('Fetch error:', error));
    }
  }, [id]);

  const handleUpdateBasin = (updatedBasin) => {
    fetch(`http://localhost:8000/api/basins/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBasin),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(() => {
        router.push('/cuencas');
      })
      .catch(error => console.error('Fetch error:', error));
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Editar Cuenca</h1>
      {basin && <CuencaForm onSubmit={handleUpdateBasin} initialData={basin} />}
    </div>
  );
}