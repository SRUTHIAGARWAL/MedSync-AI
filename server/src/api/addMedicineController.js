import Medication from "../models/medicineModel.js";


export const addMedication = async (req, res) => {
  try {
    const {
      
      pillName,
      pillDescription,
      dosageDays,
      dosageTimes,
      dosageAmount,
      frequency,
      startDate,
      endDate,
      doctorName,
      prescriptionId,
      adherenceHistory,
      notes
    } = req.body;
    const medication = new Medication({
      
      pillName,
      pillDescription,
      dosageDays,
      dosageTimes,
      dosageAmount,
      frequency,
      startDate,
      endDate,
      doctorName,
      prescriptionId,
      adherenceHistory,
      notes
    });

    
    await medication.save();
    return res.status(201).json({
      success: true,
      message: "Medication saved successfully",
      data: medication
    });
  } catch (error) {
    console.error("Error saving medication:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving medication",
      error: error.message
    });
  }
};
