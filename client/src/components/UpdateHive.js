import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [equipment, setEquipment] = useState('');
    const [installDate, setInstallDate] = useState('');
    const [notes, setNotes] = useState('');
    const [nameError, setNameError] = useState(null);
    const [notesError, setNotesError] = useState(null);

    useEffect(() => {
    axios
        .get(`http://localhost:8000/api/hives/${id}`)
        .then((res) => {
        setName(res.data.name);
        setEquipment(res.data.equipment);
        setInstallDate(res.data.installDate);
        setNotes(res.data.notes);
        })
        .catch((err) => console.log(err));
    }, [id]);

    const updateHive = (e) => {
    e.preventDefault();

    if (name.length < 2) {
        setNameError('Hive Name must be at least 2 characters.');
        return;
    } else {
        setNameError(null);
    }

    if (notes.length > 255) {
        setNotesError('Notes must contain less than 255 characters.');
        return;
    } else {
        setNotesError(null);
    }

    axios
        .put(`http://localhost:8000/api/hives/${id}`, {
        name,
        equipment,
        installDate,
        notes,
        })
        .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate('/');
        })
        .catch((err) => {
        console.log(err);
        });
    };

    const deleteHive = () => {
    axios
        .delete(`http://localhost:8000/api/hives/${id}`)
        .then((res) => {
        console.log(res.data);
        navigate(`/hives/${id}`);
        })
        .catch((err) => {
        console.log(err);
        });
    };

    return (
    <div className="container col-10">
        <div className="col-10 text-end text-warning my-auto mx-auto border-bottom border-subtle-dark border-solid">
            <h1 className="text-start">Hive<span className='text-dark'>Hub</span></h1>
        </div>

        <div className='text-end col-10 my-auto mx-auto mt-2'>
            <h2 className='text-center'><span className='text-warning'>Edit</span><span className='text-dark'>Hive</span></h2>
            <button onClick={() => navigate(`/`)} className="btn btn-dark border-solid border-warning text-end text-warning">
                    Home
            </button>
        </div>

        <form onSubmit={updateHive} className='col-5 my-auto mx-auto'>
            <div className="mb-3">
                <label className="form-label text-warning">Hive Name</label>
                <br />
                <input
                className={`form-control ${nameError ? 'is-invalid' : ''}`}
                value={name}
                id='transparent-form'
                type="text"
                onChange={(e) => setName(e.target.value)}
                />
                {nameError && <div className="invalid-feedback">{nameError}</div>}
            </div>

            <div className="mb-3">
                <label className="form-label text-warning">Equipment Type</label>
                <br />
                <select
                className="form-control"
                id='transparent-form'
                name="hiveType"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                >
                <option value="8Frame">8 Frame</option>
                <option value="10Frame">10 Frame</option>
                <option value="TopBar">Top Bar</option>
                </select>
            </div>

            <div className="form-group text-warning d-flex flex-column mb-2">
                <label htmlFor="datepicker">Select Date:</label>
                <DatePicker
                className="form-control"
                id='transparent-form'
                selected={installDate ? new Date(installDate) : null}
                onChange={(date) => setInstallDate(date)}
                />
            </div>

            <div>
                <label className="form-label text-warning">Notes:</label>
                <input
                type="textarea"
                className="form-control"
                id='transparent-form'
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                />
            </div>

            {notesError && <div className="invalid-feedback">{notesError}</div>}

            <div className="mt-2 d-flex justify-content-between">
                <button 
                    className="btn btn-secondary me-2" type="submit">
                    Submit
                </button>
                <button
                    className='btn btn-danger border border-solid border-dark text-dark'
                    onClick={() => navigate(`/hives/${id}`)}
                >
                    Back
                </button>
            </div>
        </form>
    </div>
    );
};

export default Update;
