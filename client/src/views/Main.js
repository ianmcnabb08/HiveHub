import React, { useState } from 'react'
import HiveList from '../components/HiveList';

const Main = (props) => {
    
    const [hive, setHive] = useState([]);
    
    return (
        <div>
        <HiveList hive={hive} setHive={setHive}/>
        </div>
    )
}
export default Main;