// filepath: /c:/myProjects/projectThanos/frontend/src/pages/api/cuencas/[id]/analyses/[id_analysis]/coverages/index.js
import axios from 'axios';

export default async function handler(req, res) {
    const { id, id_analysis } = req.query;

    if (req.method === 'GET') {
        try {
            const response = await axios.get(`http://localhost:8000/api/basins/${id}/analyses/${id_analysis}/coverages/`);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(error.response?.status || 500).json({ error: error.message });
        }
    } else if (req.method === 'POST') {
        const { surface_type, area, permeability_condition } = req.body;
        try {
            const response = await axios.post(`http://localhost:8000/api/basins/${id}/analyses/${id_analysis}/coverages/`, {
                surface_type,
                area,
                permeability_condition
            });
            res.status(201).json(response.data);
        } catch (error) {
            res.status(error.response?.status || 500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}