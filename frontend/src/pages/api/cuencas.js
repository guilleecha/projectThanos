// filepath: /c:/myProjects/projectThanos/frontend/src/pages/api/cuencas.js
export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const response = await fetch(`http://localhost:8000/api/basins/${id ? id + '/' : ''}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const basins = await response.json();
        res.status(200).json(basins);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching basins' });
      }
      break;
    case 'POST':
      try {
        const response = await fetch('http://localhost:8000/api/basins/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const newBasin = await response.json();
        res.status(201).json(newBasin);
      } catch (error) {
        res.status(500).json({ error: 'Error creating basin' });
      }
      break;
    case 'PUT':
      try {
        const response = await fetch(`http://localhost:8000/api/basins/${id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const updatedBasin = await response.json();
        res.status(200).json(updatedBasin);
      } catch (error) {
        res.status(500).json({ error: 'Error updating basin' });
      }
      break;
    case 'DELETE':
      try {
        const response = await fetch(`http://localhost:8000/api/basins/${id}/`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.body),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const deletedBasin = await response.json();
        res.status(200).json(deletedBasin);
      } catch (error) {
        res.status(500).json({ error: 'Error deleting basin' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}