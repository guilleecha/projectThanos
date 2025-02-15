// filepath: /c:/myProjects/projectThanos/frontend/src/components/EditBasinForm.js
import React, { useState, useEffect } from 'react';

const EditBasinForm = ({ basin, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    altimetry: '',
    main_channel_length: '',
  });

  useEffect(() => {
    if (basin) {
      setFormData({
        name: basin.name,
        area: basin.area,
        altimetry: basin.altimetry,
        main_channel_length: basin.main_channel_length,
      });
    }
  }, [basin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Basin</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="area">
          Area (km²)
        </label>
        <input
          type="number"
          id="area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="altimetry">
          Altimetry (m)
        </label>
        <input
          type="number"
          id="altimetry"
          name="altimetry"
          value={formData.altimetry}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="main_channel_length">
          Main Channel Length (km)
        </label>
        <input
          type="number"
          id="main_channel_length"
          name="main_channel_length"
          value={formData.main_channel_length}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBasinForm;