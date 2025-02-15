// filepath: /c:/myProjects/projectThanos/frontend/src/components/CuencaForm.js
import { useState, useEffect } from 'react';

export default function CuencaForm({ onSubmit, initialData = {} }) {
  const [name, setName] = useState(initialData.name || '');
  const [area, setArea] = useState(initialData.area || '');
  const [altimetry, setAltimetry] = useState(initialData.altimetry || '');
  const [mainChannelLength, setMainChannelLength] = useState(initialData.main_channel_length || '');

  useEffect(() => {
    setName(initialData.name || '');
    setArea(initialData.area || '');
    setAltimetry(initialData.altimetry || '');
    setMainChannelLength(initialData.main_channel_length || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, area, altimetry, main_channel_length: mainChannelLength });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Área (km²)</label>
        <input type="number" value={area} onChange={(e) => setArea(e.target.value)} />
      </div>
      <div>
        <label>Diferencia Altimétrica (m)</label>
        <input type="number" value={altimetry} onChange={(e) => setAltimetry(e.target.value)} />
      </div>
      <div>
        <label>Largo del Cauce Principal (km)</label>
        <input type="number" value={mainChannelLength} onChange={(e) => setMainChannelLength(e.target.value)} />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
}