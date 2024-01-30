import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/Main';
import Update from './components/UpdateHive';
import HiveForm from './components/HiveForm';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HiveDetail from './components/HiveDetail';
import InspectionForm from './components/InspectionForm';
import InspectionDetails from './components/InspectionDetails';
import UpdateInspection from './components/UpdateInspection';


function App() {
  // Define a state to track inspections
  const [inspections, setInspections] = useState([]);

  // Define the onInspectionAdded function
  const handleAddInspection = (newInspection) => {
    // Update the inspections state with the new inspection
    setInspections((prevInspections) => [...prevInspections, newInspection]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Main />} path="/" />
          <Route element={<HiveForm />} path="/hives/new" />
          <Route element={<Update />} path="/hives/edit/:id" />
          <Route element={<HiveDetail />} path="/hives/:id" />
          {/* Pass the InspectionForm component and the onInspectionAdded function */}
          <Route
            element={<InspectionForm onInspectionAdded={handleAddInspection} />}
            path="/hives/:id/inspections"
          />
          <Route element={<InspectionDetails />} 
          path="inspections/:inspectionId"
          />
          <Route
            element={<UpdateInspection onInspectionUpdated={(updatedInspection) => handleAddInspection(updatedInspection)} />}
            path="/inspections/:inspectionId/edit"
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
