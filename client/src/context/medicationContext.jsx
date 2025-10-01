import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const MedicineContext = createContext();

export const useMedicine = () => useContext(MedicineContext);

export const MedicineProvider = ({ children }) => {
 


   const [medication, setMedication] = useState({
     pillName: "",
     pillDescription: "",
     dosageDays: [],
     dosageTimes: [],
     dosageAmount: "",
     frequency: "",
     startDate: new Date().toISOString().split('T')[0],
     endDate: ""
   });
   
   
   
   const addMedication=useCallback(async()=>{
     try {
       console.log("medication",medication)
       const response = await axios.post('http://localhost:5000/api/medicine/add', medication);  
       console.log('Medication added successfully:', response.data);
     }
     catch (error) {
       console.error('Error adding medication:', error);
     }
    }
    ,[medication]);

  return (
    <MedicineContext.Provider value={{medication, setMedication,addMedication}}>
      {children}
    </MedicineContext.Provider>
  );
};