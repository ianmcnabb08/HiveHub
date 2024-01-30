import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';


const HiveDetail = () => {
    const [hive, setHive] = useState(null);
    const [inspections, setInspections] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Fetch hive details
        axios
            .get(`http://localhost:8000/api/hives/${id}`)
            .then((res) => {
                setHive(res.data);
            })
            .catch((err) => console.error(err));
    
        // Fetch inspections for the hive
        axios
            .get(`http://localhost:8000/api/hives/${id}/inspections`)  // Fetch inspections for the specific hive ID
            .then((res) => {
                setInspections(res.data);
            })
            .catch((err) => console.error(err));
    }, [id]);

    if (!hive) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };
    const handleDelete = (id) => {
        // Make a DELETE request to the server to delete the inspection
        console.log('Deleting inspection with hive ID:', hive._id, 'and inspection ID:', id);
        axios
            .delete(`http://localhost:8000/api/inspections/${id}`)
            .then(() => {
            // If deletion is successful, update the inspections list
            setInspections((prevInspections) =>
                prevInspections.filter((inspection) => inspection._id !== id)
            );
            })
            .catch((error) => {
            console.error('Error deleting inspection:', error);
            // Handle errors, e.g., display an error message to the user
            });
        };

    return (
    <div>
        <div className="col-10 text-end text-warning my-auto mx-auto border-bottom border-subtle-dark border-solid">
            <h1 className="text-start">Hive<span className='text-dark'>Hub</span></h1>
        </div>

        <div className='text-end col-10 my-auto mx-auto mt-2'>
            <h2 className='text-center'><span className='text-warning'>Hive</span><span className='text-dark'>Details</span></h2>
            <button onClick={() => navigate(`/`)} className="btn btn-dark border-solid border-warning text-end text-warning">
                    Home
            </button>
        </div>

        <div className="row mt-5 ">
        <div className="col-md-6 text-warning m-5 p-2 text-center my-auto mx-auto" id='hivecontainer'>
            {/* Hive details content */}
            <div className='text-center mt-2'>
                <h3>{hive.name}</h3>
                <h4 className='text-dark'>Equipment Type</h4><h5>{hive.equipment}</h5>
                <h4 className='text-dark'>Installation Date</h4><h5>{formatDate(hive.installDate)}</h5>
                <h4 className='text-dark'>Notes</h4><h5>{hive.notes}</h5>
            </div>
            <button
                onClick={() => navigate(`/hives/edit/${hive._id}`)}
                className="btn btn-success text-dark border-solid border-dark m-2 col-2"
            >
                Edit
            </button>
        </div>
            <div className="col-md-6 text-warning m-5 p-2 text-center my-auto mx-auto" id='inspectioncontainer'>
                {/* Inspections section */}
                <div className='d-flex flex-column mt-2'>
                    <h3>Inspections</h3>
                    {inspections.length > 0 ? (
                            <table className="table table-striped table-active">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Inspection Date</th>
                                        <th>Queen Found?</th>
                                        <th>Brood?</th>
                                        <th>Honey?</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inspections.map((inspection, index) => (
                                        <tr key={inspection._id}>
                                            <td>{index + 1}</td>
                                            <td>{formatDate(inspection.date)}</td>
                                            <td>{inspection.queen}</td>
                                            <td>{inspection.brood}</td>
                                            <td>{inspection.honey}</td>
                                            <td>
                                            
                                            <button onClick={() => navigate(`/inspections/${inspection._id}`)}
                                            className='btn btn-success text-dark border border-solid border-light mr-2'
                                            >
                                                View
                                            </button> 
                                            <button onClick={() => handleDelete(inspection._id)}
                                            className='btn btn-danger text-dark border border-solid border-light'
                                            >
                                            Delete
                                            </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <h4 className='text-dark'>Looks like you haven't added any inspections yet...</h4>
                        )}
                    </div>
                    <button
                        onClick={() => navigate(`/hives/${hive._id}/inspections`)}
                        className="btn btn-warning m-2 border border-solid border-dark text-dark font-weight-bold"
                    >
                        Add New Inspection
                    </button>
            </div>
        </div>
    </div>
    );
};

export default HiveDetail;