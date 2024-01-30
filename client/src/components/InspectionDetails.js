import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const InspectionDetails = () => {
    const { hiveId, inspectionId } = useParams();
    const [inspectionData, setInspectionData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/inspections/${inspectionId}`)
            .then((res) => {
                const inspectionData = res.data;
                setInspectionData(inspectionData);
            })
            .catch((err) => console.error(err));
    }, [inspectionId]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };

    return (
        <div>
            <div className="col-10 text-end text-warning my-auto mx-auto border-bottom border-subtle-dark border-solid">
                <h1 className="text-start">Hive<span className='text-dark'>Hub</span></h1>
            </div>

            <div className='text-end col-10 my-auto mx-auto mt-2'>
                <h2 className='text-center'><span className='text-warning'>Inspection</span><span className='text-dark'>Details</span></h2>
                <button onClick={() => navigate(`/`)} className="btn btn-dark border-solid border-warning text-end text-warning">
                    Home
                </button>
            </div>

            <div className='col-5 my-auto mx-auto text-center mb-5' id='inspectiondetails'>
                
                <div>
                    <h4 className='text-warning mt-4'>Inspection Date</h4>
                    <h5 className='text-dark'>{formatDate(inspectionData.date)}</h5>

                    <h4 className='form-label text-warning'>Brood Present?</h4>
                    <h5>{inspectionData.brood}</h5>

                    <h4 className='form-label text-warning'>Queen Located?</h4>
                    <h5>{inspectionData.queen}</h5>

                    <h4 className='form-label text-warning'>Honey Stores?</h4>
                    <h5>{inspectionData.honey}</h5>

                    <h4 className='form-label text-warning'>Notes:</h4>
                    <h5>{inspectionData.notes}</h5>
                </div>

                <div className='mt-5 mb-2'>
                    <button
                        className='btn btn-success text-dark border-solid border-dark m-2 col-2'
                        onClick={() => navigate(`/inspections/${inspectionId}/edit`)}
                    >
                        Edit
                    </button>
                    <button
                        className='btn btn-danger border border-solid border-dark text-dark col-2'
                        onClick={() => navigate(`/hives/${inspectionData.hive}`)}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InspectionDetails;

