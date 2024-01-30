import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateInspection = ({ onInspectionUpdated }) => {
    const { hiveId, inspectionId } = useParams();
    const [hiveData, setHiveData] = useState({});
    const [inspectionDate, setInspectionDate] = useState('');
    const [broodPresent, setBroodPresent] = useState('');
    const [queenPresent, setQueenPresent] = useState('');
    const [honeyStores, setHoneyStores] = useState('');
    const [notes, setNotes] = useState('');
    const [notesError, setNotesError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHiveData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/hives/${hiveId}`);
                setHiveData(response.data);
            } catch (error) {
                console.error('Error fetching hive data:', error);
            }
        };

        if (hiveId) {
            fetchHiveData();
        }

        axios
            .get(`http://localhost:8000/api/inspections/${inspectionId}`)
            .then((res) => {
                const inspectionData = res.data;
                setInspectionDate(new Date(inspectionData.date));
                setBroodPresent(inspectionData.brood);
                setQueenPresent(inspectionData.queen);
                setHoneyStores(inspectionData.honey);
                setNotes(inspectionData.notes);
            })
            .catch((err) => console.error(err));
    }, [hiveId]);

    const handleEditInspection = (e) => {
        e.preventDefault();

        if (notes.length > 255) {
            setNotesError('Notes must contain less than 255 characters.');
            return;
        } else {
            setNotesError(null);
        }

        axios
            .put(`http://localhost:8000/api/inspections/edit/${inspectionId}`, {
                hive: hiveId,
                queen: queenPresent,
                honey: honeyStores,
                brood: broodPresent,
                date: inspectionDate,
                notes: notes,
            })
            .then((res) => {
                onInspectionUpdated(res.data);
                setInspectionDate('');
                setBroodPresent('');
                setQueenPresent('');
                setHoneyStores('');
                setNotes('');
                navigate(`/inspections/${inspectionId}`);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <div className="col-10 text-end text-warning my-auto mx-auto border-bottom border-subtle-dark border-solid">
                <h1 className="text-start">Hive<span className='text-dark'>Hub</span></h1>
            </div>

            <div className='text-end col-10 my-auto mx-auto mt-2'>
                <h2 className='text-center'><span className='text-warning'>Edit</span><span className='text-dark'>Inspection</span></h2>
                <button onClick={() => navigate(`/`)} className="btn btn-dark border-solid border-warning text-end text-warning">
                    Home
                </button>
            </div>

            <form onSubmit={handleEditInspection} className='form-group col-5 my-auto mx-auto'>

                <div className='mb-3'>
                    <label className='form-label text-warning'>Brood Present?</label>
                    <br />
                    <select
                        className="form-control"
                        id='transparent-form'
                        value={broodPresent}
                        name="broodType"
                        onChange={(e) => {
                            console.log('Brood Type:', e.target.value);
                            setBroodPresent(e.target.value);
                        }}
                        required
                    >
                        <option>Select</option>
                        <option value="Eggs Only">Eggs Only</option>
                        <option value="Larva Only">Larva Only</option>
                        <option value="Capped Only">Capped Only</option>
                        <option value="All Types Present">All Types Present</option>
                    </select>
                </div>

                <div className='mb-3'>
                    <label className='form-label text-warning'>Queen Located?</label>
                    <br />
                    <select
                        className="form-control"
                        id='transparent-form'
                        value={queenPresent}
                        name="queenLocated"
                        onChange={(e) => {
                            console.log('Queen Located:', e.target.value);
                            setQueenPresent(e.target.value);
                        }}
                        required
                    >
                        <option>Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label className='form-label text-warning'>Honey Stores?</label>
                    <br />
                    <select
                        className="form-control"
                        id='transparent-form'
                        value={honeyStores}
                        name="honeyStores"
                        onChange={(e) => {
                            console.log('Honey Stores:', e.target.value);
                            setHoneyStores(e.target.value);
                        }}
                        required
                    >
                        <option>Select</option>
                        <option value="0-5 Frames">0-5 Frames</option>
                        <option value="5-10 Frames">5-10 Frames</option>
                        <option value="10+ Frames">10+ Frames</option>
                    </select>
                </div>

                <div className="form-group">
                    <div>
                        <label htmlFor="datepicker" className='text-warning'>Select Inspection Date:</label>
                    </div>
                    <DatePicker
                        id='transparent-form'
                        value={inspectionDate}
                        selected={inspectionDate ? new Date(inspectionDate) : null}
                        onChange={(date) => setInspectionDate(date)}
                        className="form-control"
                        required
                    />
                </div>

                <div className='mt-2'>
                    <label className='form-label text-warning'>Notes:</label>
                    <input
                        type='textarea'
                        className='form-control'
                        id='transparent-form'
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        required
                    />
                </div>
                <div>
                    {notesError && <div className='invalid-feedback'>{notesError}</div>}
                </div>
                <div className='mt-2 d-flex justify-content-between'>
                    <input className='btn btn-secondary ' type='submit' />

                    <button
                        className='btn btn-danger border border-solid border-dark text-dark'
                        onClick={() => navigate(`/inspections/${inspectionId}`)}
                    >
                        Back
                    </button>
                </div>

            </form>
        </div>
    );
};

export default UpdateInspection;