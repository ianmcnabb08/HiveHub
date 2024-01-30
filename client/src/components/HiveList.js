import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HiveList = (props) => {
    const { hive, setHive } = props;
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/hives')
            .then((res) => {
                console.log(res.data);
                setHive(res.data);
            })
            .catch((err) => console.log(err));
    }, [setHive]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
        return formattedDate;
    };
    
    const handleDelete = async (hiveId) => {
        try {
            await axios.delete(`http://localhost:8000/api/hives/delete/${hiveId}`);
            
            setHive((prevHives) => prevHives.filter((hive) => hive._id !== hiveId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="col-10 text-end text-warning my-auto mx-auto border-bottom border-subtle-dark border-solid">
                <h1 className="text-start">Hive<span className='text-dark'>Hub</span></h1>
            </div>

            <div className='text-end col-10 my-auto mx-auto mt-2'>
                <button onClick={() => navigate(`/hives/new`)} className="btn btn-warning text-dark border border-solid border-dark text-end">
                    Add a Hive
                </button>
            </div>
            <div className='row col-8 my-auto mx-auto'>
                {hive.length === 0 ? (
                    <div className="col-10 text-center text-light mt-4 my-auto mx-auto">
                        <h2>Welcome! Get started by adding your first hive!</h2>
                    </div>
                ) : (
                    hive.map((singleHive, index) => (
                        <div className="col-md-3 m-2 my-auto mx-auto text-warning mt-4" key={index} id='hivecontainer'>
                            <div className='text-center mt-4'>
                                <h3>{singleHive.name}</h3>
                                <h4 className='text-dark'>Equipment Type:</h4> <h5>{singleHive.equipment}</h5>
                                <h4 className='text-dark'>Installation Date:</h4> <h5>{formatDate(singleHive.installDate)}</h5>
                                <h5 className='text-dark'>Notes:</h5> <h5>{singleHive.notes}</h5>
                                <button
                                    onClick={() => navigate(`/hives/${singleHive._id}`)}
                                    className="btn btn-success border border-solid border-dark text-dark m-2"
                                >
                                    Info
                                </button>

                                <button
                                    onClick={() => handleDelete(singleHive._id)}
                                    className="btn btn-danger border border-solid border-dark text-dark m-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HiveList;