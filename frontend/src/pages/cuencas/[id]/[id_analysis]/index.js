// filepath: /c:/myProjects/projectThanos/frontend/src/pages/cuencas/[id]/[id_analysis]/index.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AnalysisPage = () => {
    const router = useRouter();
    const { id, id_analysis } = router.query;
    const [coverages, setCoverages] = useState([]);
    const [newCoverage, setNewCoverage] = useState({
        surface_type: '',
        area: '',
        permeability_condition: 'promedio'
    });
    const [method, setMethod] = useState('kirpich');

    useEffect(() => {
        if (id && id_analysis) {
            // Fetch existing coverages for the analysis
            axios.get(`/api/basins/${id}/analyses/summary`)
                .then(response => {
                    const analysis = response.data.find(a => a.id === parseInt(id_analysis));
                    if (analysis) {
                        setCoverages(analysis.coverages);
                    }
                })
                .catch(error => {
                    console.error('Error fetching coverages:', error);
                });
        }
    }, [id, id_analysis]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCoverage({
            ...newCoverage,
            [name]: value
        });
    };

    const handleAddCoverage = () => {
        axios.post(`/api/basins/${id}/analyses/${id_analysis}/coverages`, newCoverage)
            .then(response => {
                setCoverages([...coverages, response.data]);
                setNewCoverage({
                    surface_type: '',
                    area: '',
                    permeability_condition: 'promedio'
                });
            })
            .catch(error => {
                console.error('Error adding coverage:', error);
            });
    };

    const handleMethodChange = (e) => {
        setMethod(e.target.value);
    };

    return (
        <div>
            <h1>Análisis para Cuenca {id} - Análisis {id_analysis}</h1>
            <div>
                <h2>Seleccionar Método de Tiempo de Concentración</h2>
                <select value={method} onChange={handleMethodChange}>
                    <option value="kirpich">Kirpich</option>
                    <option value="uruguay">Uruguay</option>
                </select>
            </div>
            <div>
                <h2>Agregar Nueva Cobertura</h2>
                <input
                    type="text"
                    name="surface_type"
                    placeholder="Tipo de Superficie"
                    value={newCoverage.surface_type}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="area"
                    placeholder="Área (km²)"
                    value={newCoverage.area}
                    onChange={handleInputChange}
                />
                <select
                    name="permeability_condition"
                    value={newCoverage.permeability_condition}
                    onChange={handleInputChange}
                >
                    <option value="minimo">Mínimo</option>
                    <option value="promedio">Promedio</option>
                    <option value="maximo">Máximo</option>
                </select>
                <button onClick={handleAddCoverage}>Agregar Cobertura</button>
            </div>
            <div>
                <h2>Lista de Coberturas</h2>
                <ul>
                    {coverages.map((coverage, index) => (
                        <li key={index}>
                            {coverage.surface_type} - {coverage.area} km² - {coverage.permeability_condition}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AnalysisPage;