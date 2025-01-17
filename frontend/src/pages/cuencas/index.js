// filepath: /c:/myProjects/projectThanos/frontend/src/pages/cuencas/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../styles/CuencasPage.module.css';
import '../../fontawesome'; // Importa la configuración de Font Awesome

const CuencasPage = () => {
    const [basins, setBasins] = useState([]);
    const [expandedBasin, setExpandedBasin] = useState(null);

    useEffect(() => {
        axios.get('/api/cuencas')
            .then(response => {
                setBasins(response.data);
            })
            .catch(error => {
                console.error('Error fetching basins:', error);
            });
    }, []);

    const handleExpandClick = (basinId) => {
        if (expandedBasin === basinId) {
            setExpandedBasin(null);
        } else {
            axios.get(`/api/cuencas/${basinId}/analyses/summary`)
                .then(response => {
                    setBasins(basins.map(basin => {
                        if (basin.id === basinId) {
                            return { ...basin, analyses: response.data };
                        }
                        return basin;
                    }));
                    setExpandedBasin(basinId);
                })
                .catch(error => {
                    console.error('Error fetching analyses summary:', error);
                });
        }
    };

    const handleDelete = (basinId) => {
        axios.delete(`/api/cuencas/${basinId}`)
            .then(() => {
                setBasins(basins.filter(basin => basin.id !== basinId));
            })
            .catch(error => {
                console.error('Error deleting basin:', error);
            });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cuencas</h1>
            <table className={styles.basinTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Área (km²)</th>
                        <th>Altimetría (m)</th>
                        <th>Longitud del Cauce (km)</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {basins.map(basin => (
                        <tr key={basin.id}>
                            <td>{basin.id}</td>
                            <td>{basin.name}</td>
                            <td>{basin.area}</td>
                            <td>{basin.altimetry}</td>
                            <td>{basin.main_channel_length}</td>
                            <td className={styles.actions}>
                                <button onClick={() => handleExpandClick(basin.id)}>
                                    <FontAwesomeIcon icon={expandedBasin === basin.id ? 'eye-slash' : 'eye'} />
                                </button>
                                <Link href={`/cuencas/${basin.id}/edit`}>
                                    <button>
                                        <FontAwesomeIcon icon="edit" />
                                    </button>
                                </Link>
                                <button onClick={() => handleDelete(basin.id)}>
                                    <FontAwesomeIcon icon="trash" />
                                </button>
                                <Link href={`/cuencas/${basin.id}/analyses/new`}>
                                    <button>
                                        <FontAwesomeIcon icon="plus" />
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {expandedBasin && (
                <div className={styles.analysisContainer}>
                    <h2>Análisis para Cuenca {expandedBasin}</h2>
                    <table className={styles.analysisTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Precipitación</th>
                                <th>Periodo de Retorno</th>
                                <th>Método</th>
                                <th>Escorrentía</th>
                                <th>Tiempo de Concentración</th>
                                <th>Coeficiente de Escorrentía Ponderado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {basins.find(basin => basin.id === expandedBasin).analyses.map(analysis => (
                                <tr key={analysis.id}>
                                    <td>{analysis.id}</td>
                                    <td>{analysis.precipitation}</td>
                                    <td>{analysis.return_period}</td>
                                    <td>{analysis.method}</td>
                                    <td>{analysis.runoff}</td>
                                    <td>{analysis.tc}</td>
                                    <td>{analysis.weighted_runoff_coefficient}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CuencasPage;