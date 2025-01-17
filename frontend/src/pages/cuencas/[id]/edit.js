// filepath: /c:/myProjects/projectThanos/frontend/src/pages/cuencas/[id]/edit.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EditBasinForm from '../../../components/EditBasinForm';

const EditBasinPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [basin, setBasin] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/cuencas/${id}`)
        .then((res) => res.json())
        .then((data) => setBasin(data))
        .catch((error) => console.error('Error fetching basin:', error));
    }
  }, [id]);

  const handleSave = (updatedBasin) => {
    fetch(`/api/cuencas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBasin),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push('/cuencas');
      })
      .catch((error) => console.error('Error updating basin:', error));
  };

  const handleCancel = () => {
    router.push('/cuencas');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Basin</h1>
      {basin ? (
        <EditBasinForm basin={basin} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditBasinPage;