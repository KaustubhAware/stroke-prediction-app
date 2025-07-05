import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { FaUser, FaHeartbeat, FaSmoking, FaWeight } from 'react-icons/fa';

function App() {
  const [formData, setFormData] = useState({
    gender: "Male",
    age: "",
    hypertension: 0,
    heart_disease: 0,
    ever_married: "No",
    work_type: "Private",
    Residence_type: "Urban",
    avg_glucose_level: "",
    bmi: "",
    smoking_status: "never smoked"
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(res.data.stroke === 1 ? "⚠️ High Risk of Stroke" : "✅ Low Risk of Stroke");
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Please check console.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>🧠 Stroke Prediction App</h1>
      <form onSubmit={handleSubmit}>
        <h3><FaUser /> Personal Information</h3>
        <div className="form-group">
          <label>Age</label>
          <input name="age" type="number" min="1" max="120" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select name="gender" onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Residence Type</label>
          <select name="Residence_type" onChange={handleChange}>
            <option>Urban</option>
            <option>Rural</option>
          </select>
        </div>

        <h3><FaHeartbeat /> Medical Information</h3>
        <div className="form-group">
          <label>Hypertension</label>
          <select name="hypertension" onChange={handleChange}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label>Heart Disease</label>
          <select name="heart_disease" onChange={handleChange}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label>Ever Married</label>
          <select name="ever_married" onChange={handleChange}>
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label>Work Type</label>
          <select name="work_type" onChange={handleChange}>
            <option>Private</option>
            <option>Self-employed</option>
            <option>Govt_job</option>
            <option>children</option>
            <option>Never_worked</option>
          </select>
        </div>

        <div className="form-group">
          <label>Average Glucose Level</label>
          <input name="avg_glucose_level" type="number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label><FaWeight /> BMI</label>
          <input name="bmi" type="number" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label><FaSmoking /> Smoking Status</label>
          <select name="smoking_status" onChange={handleChange}>
            <option>never smoked</option>
            <option>formerly smoked</option>
            <option>smokes</option>
            <option>Unknown</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>{loading ? "Predicting..." : "Predict Stroke"}</button>
      </form>

      {prediction && <div className="prediction">Prediction: {prediction}</div>}
    </div>
  );
}

export default App;
