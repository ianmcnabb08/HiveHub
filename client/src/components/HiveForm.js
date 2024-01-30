import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const HiveForm = (props) => {
    const { hive, setHive } = props;
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [equipment, setEquipment] = useState("");
    const [installDate, setInstallDate] = useState("");
    const [notes, setNotes] = useState("");
    const [nameError, setNameError] = useState(null);
    const [notesError, setNotesError] = useState(null);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (name.length < 2) {
        setNameError('Name must be at least 2 characters.');
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
        console.log('Current State:', { name, equipment, installDate, notes });
        axios.post('http://localhost:8000/api/hives/new', {
        name,
        equipment,
        installDate,
        notes
        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setHive([...hive, res.data]);
            setName("");
            setEquipment("");
            setInstallDate("");
            setNotes("");
        })
        .catch((err) => {
            console.log(err);
        });
        navigate(`/`); // redirect to the home page
    };

    return (
        <div className='container col-10 my-auto mx-auto'>
        <div className="col-10 text-end text-warning my-auto mx-auto border-bottom border-dark border-solid">
            <h1 className="text-start fw-bold">Hive<span className='text-dark'>Hub</span></h1>
        </div>

        <div className='text-end col-10 my-auto mx-auto mt-2'>
            <h2 className='text-center'><span className='text-warning'>New</span><span className='text-dark'>Hive</span></h2>
            <button onClick={() => navigate(`/`)} className="btn btn-dark border-solid border-warning text-end text-warning">
                    Home
            </button>
        </div>

        <form onSubmit={onSubmitHandler} className='col-5 my-auto mx-auto'>
            <div className='mb-3'>
                <label className='form-label text-warning'>Hive Name</label>
                <br />
                <input
                    className={`form-control ${nameError ? 'is-invalid' : ''}`}
                    id='transparent-form'
                    value={name}
                    type='text'
                    onChange={(e) => setName(e.target.value)}
                />
                {nameError && <div className='invalid-feedback'>{nameError}</div>}
            </div>

            <div className='mb-3'>
                <label className='form-label text-warning'>Equipment Type</label>
                <br />
                <select
                    className="form-control text-warning"
                    id='transparent-form'
                    name="hiveType"
                    value={equipment}
                    onChange={(e) => {
                        console.log('Selected Equipment:', e.target.value);
                        setEquipment(e.target.value);
                    }}
                    
                >
                    <option>Select</option>
                    <option value="8 Frame">8 Frame</option>
                    <option value="10 Frame">10 Frame</option>
                    <option value="Top Bar">Top Bar</option>
                </select>
            </div>

            <div className="form-group d-flex flex-column col-4">
                <label htmlFor="datepicker" className='text-warning'>Select Installation Date:</label>
                <DatePicker
                id='transparent-form'
                selected={installDate ? new Date(installDate) : null}
                onChange={(date) => setInstallDate(date)}
                className="form-control"
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
                />
            </div>
            <div>
            {notesError && <div className='invalid-feedback'>{notesError}</div>}
            </div>

            <input className='btn btn-secondary mt-2' type='submit' />
        </form>
        </div>
    );
    };

    export default HiveForm;