// filepath: /c:/myProjects/projectThanos/frontend/src/pages/cuencas/[id]/[id_analysis]/new.js
import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const NewAnalysisPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [analysis, setAnalysis] = useState({
        precipitation: '',
        return_period: '',
        method: 'kirpich',
        runoff: '',
        tc: ''
    });

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setAnalysis((prevAnalysis) => ({
            ...prevAnalysis,
            [name]: value
        }));
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        axios.post(`/api/basins/${id}/analyses/new/`, analysis)
            .then(response => {
                router.push(`/cuencas/${id}`);
            })
            .catch(error => {
                console.error('Error creating analysis:', error);
            });
    }, [analysis, id, router]);

    return (
        <div>
            <h1>Nuevo Análisis para Cuenca {id}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Precipitación:</label>
                    <input
                        type="text"
                        name="precipitation"
                        value={analysis.precipitation}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Periodo de Retorno:</label>
                    <input
                        type="text"
                        name="return_period"
                        value={analysis.return_period}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Método:</label>
                    <select
                        name="method"
                        value={analysis.method}
                        onChange={handleInputChange}
                    >
                        <option value="kirpich">Kirpich</option>
                        <option value="uruguay">Uruguay</option>
                    </select>
                </div>
                <div>
                    <label>Escorrentía:</label>
                    <input
                        type="text"
                        name="runoff"
                        value={analysis.runoff}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Tiempo de Concentración:</label>
                    <input
                        type="text"
                        name="tc"
                        value={analysis.tc}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Crear Análisis</button>
            </form>
        </div>
    );
};

export default NewAnalysisPage;