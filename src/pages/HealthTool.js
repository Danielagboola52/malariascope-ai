import React, { useState } from 'react';

export default function MalariaScopeChecker() {
  // Initial state values - ADD COUGH HERE
  const initialState = {
    patientName: '',
    age: '',
    temperature: '',
    gender: 'Female',
    symptoms: {
      fever: false,
      chills: false,
      sweats: false,
      headache: false,
      muscleAches: false,
      fatigue: false,
      nausea: false,
      abdominalPain: false,
      vomiting: false,
      diarrhea: false,
      anemia: false,
      jaundice: false,
      rapidHeartRate: false,
      seizures: false,
      mentalConfusion: false,
      coma: false,
      difficultyBreathing: false,
      rapidBreathing: false,
      chestPain: false,
      cough: false  // ADD THIS LINE
    },
    diagnosis: null
  };

  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [temperature, setTemperature] = useState('');
  const [gender, setGender] = useState('Female');
  
  // ADD COUGH TO SYMPTOMS STATE
  const [symptoms, setSymptoms] = useState({
    fever: false,
    chills: false,
    sweats: false,
    headache: false,
    muscleAches: false,
    fatigue: false,
    nausea: false,
    abdominalPain: false,
    vomiting: false,
    diarrhea: false,
    anemia: false,
    jaundice: false,
    rapidHeartRate: false,
    seizures: false,
    mentalConfusion: false,
    coma: false,
    difficultyBreathing: false,
    rapidBreathing: false,
    chestPain: false,
    cough: false  // ADD THIS LINE
  });

  const [diagnosis, setDiagnosis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Clear all data function
  const clearAllData = () => {
    setPatientName('');
    setAge('');
    setTemperature('');
    setGender('Female');
    setSymptoms(initialState.symptoms);
    setDiagnosis(null);
    setIsLoading(false);
    
    // Call backend to clear session
    fetch('http://localhost:5000/clear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }).catch(error => console.log('Clear session error:', error));
  };

  // Handle input field clicks (clear data when clicked)
  const handleInputFocus = (inputType) => {
    if (diagnosis !== null) {
      clearAllData();
    }
  };

  const handleSymptomChange = (symptom) => {
    setSymptoms(prev => ({
      ...prev,
      [symptom]: !prev[symptom]
    }));
  };

  const predictDiagnosis = async () => {
    // Validate required fields
    if (!patientName || !age) {
      alert('Please fill in Patient Name and Age');
      return;
    }

    setIsLoading(true);
    
    try {
      // Prepare data exactly as expected by your backend model - ADD COUGH HERE
      const requestData = {
        Age: parseInt(age),
        Gender: gender,
        Temperature: parseFloat(temperature) || 37.0,
        // Map to exact backend expected format
        Fever: symptoms.fever ? 1 : 0,
        Chills: symptoms.chills ? 1 : 0,
        Sweats: symptoms.sweats ? 1 : 0,
        Headache: symptoms.headache ? 1 : 0,
        Muscle_aches: symptoms.muscleAches ? 1 : 0,
        Fatigue: symptoms.fatigue ? 1 : 0,
        Nausea: symptoms.nausea ? 1 : 0,
        Abdominal_pain: symptoms.abdominalPain ? 1 : 0,
        Vomiting: symptoms.vomiting ? 1 : 0,
        Diarrhea: symptoms.diarrhea ? 1 : 0,
        Anemia: symptoms.anemia ? 1 : 0,
        Jaundice: symptoms.jaundice ? 1 : 0,
        Rapid_heart_rate: symptoms.rapidHeartRate ? 1 : 0,
        Seizures: symptoms.seizures ? 1 : 0,
        Mental_confusion: symptoms.mentalConfusion ? 1 : 0,
        Coma: symptoms.coma ? 1 : 0,
        Difficulty_breathing: symptoms.difficultyBreathing ? 1 : 0,
        Rapid_breathing: symptoms.rapidBreathing ? 1 : 0,
        Chest_pain: symptoms.chestPain ? 1 : 0,
        Cough: symptoms.cough ? 1 : 0  // ADD THIS LINE
      };

      console.log('Sending to API:', requestData);

      // Call your Flask API
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        // Try to read backend error message for easier debugging
        let backendText = '';
        try {
          backendText = await response.text();
        } catch {}
        throw new Error(`HTTP ${response.status}${backendText ? `: ${backendText}` : ''}`);
      }

      const result = await response.json();
      console.log('API Response:', result);

      if (result.error) {
        throw new Error(result.error);
      }

      // Accept either 'severity' (new backend) or 'prediction' (old backend)
      const incomingSeverity = (result && (result.severity || result.prediction)) || 'Unknown';

      setDiagnosis({
        severity: incomingSeverity,
        recommendedDrugs: Array.isArray(result?.recommendations) && result.recommendations.length > 0
          ? result.recommendations
          : ['Consult a doctor'],
        confidence: typeof result?.confidence === 'number' ? result.confidence : 85,
        message: result?.message || (incomingSeverity !== 'Unknown'
          ? `Predicted ${String(incomingSeverity).toLowerCase()} malaria`
          : 'Prediction complete')
      });

    } catch (error) {
      console.error('Prediction error:', error);
      alert(`API Error: ${error.message}. Please check if your Flask server is running on http://localhost:5000`);
    } finally {
      setIsLoading(false);
    }
  };

  const submitDiagnosis = () => {
    predictDiagnosis();
  };

  const printReport = () => {
    const reportData = {
      patientName,
      age,
      gender,
      temperature,
      symptoms: Object.entries(symptoms)
        .filter(([_, value]) => value)
        .map(([key, _]) => key),
      diagnosis
    };
    console.log('Report Data:', reportData);
    alert('Report data logged to console. In a real application, this would generate a PDF.');
  };

  const seekMedicalHelp = () => {
    alert('In a real application, this would connect you to medical services or provide emergency contacts.');
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Mild': return '#22c55e';
      case 'Moderate': return '#f59e0b';
      case 'Severe': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getSeverityBgColor = (severity) => {
    switch(severity) {
      case 'Mild': return '#f0fdf4';
      case 'Moderate': return '#fffbeb';
      case 'Severe': return '#fef2f2';
      default: return '#f9fafb';
    }
  };

  // Group symptoms by severity/category for better organization - ADD COUGH HERE
  const symptomGroups = {
    'Common Symptoms': {
      fever: 'Fever',
      chills: 'Chills',
      sweats: 'Sweats',
      headache: 'Headache',
      muscleAches: 'Muscle Aches',
      fatigue: 'Fatigue',
      cough: 'Cough'  // ADD THIS LINE
    },
    'Gastrointestinal': {
      nausea: 'Nausea',
      abdominalPain: 'Abdominal Pain',
      vomiting: 'Vomiting',
      diarrhea: 'Diarrhea'
    },
    'Respiratory & Cardiac': {
      rapidHeartRate: 'Rapid Heart Rate',
      rapidBreathing: 'Rapid Breathing',
      difficultyBreathing: 'Difficulty Breathing',
      chestPain: 'Chest Pain'
    },
    'Severe Complications': {
      anemia: 'Anemia',
      jaundice: 'Jaundice',
      seizures: 'Seizures',
      mentalConfusion: 'Mental Confusion',
      coma: 'Coma'
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {/* Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px',
            margin: 0
          }}>
            MalariaScope
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            maxWidth: '800px',
            margin: '16px auto 0',
            lineHeight: '1.6'
          }}>
            Advanced AI-powered malaria diagnosis tool based on clinical symptoms and patient data
          </p>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Left Column - Patient Information */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: 0
              }}>
                Patient Information
              </h2>
              {(patientName || age || temperature || Object.values(symptoms).some(v => v)) && (
                <button
                  onClick={clearAllData}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#f3f4f6',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  New Patient
                </button>
              )}
            </div>
            <p style={{
              color: '#6b7280',
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              Please fill in the details accurately for proper diagnosis.
            </p>

            {/* Name and Age */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Patient Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  onFocus={() => handleInputFocus('name')}
                  placeholder="Enter patient name"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  onFocus={() => handleInputFocus('age')}
                  placeholder="Enter age"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            {/* Temperature and Gender */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Temperature (°C) <span style={{ color: '#6b7280', fontSize: '12px' }}>(Optional)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  onFocus={() => handleInputFocus('temperature')}
                  placeholder="e.g., 38.5"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  onFocus={() => handleInputFocus('gender')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'white',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>

            {/* Clinical Symptoms - Organized by Groups */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                Clinical Symptoms
              </h3>
              <p style={{
                color: '#6b7280',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                Select all symptoms currently present (based on clinical assessment).
              </p>
              
              {Object.entries(symptomGroups).map(([groupName, groupSymptoms]) => (
                <div key={groupName} style={{ marginBottom: '24px' }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '12px',
                    paddingBottom: '6px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    {groupName}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                    {Object.entries(groupSymptoms).map(([key, label]) => (
                      <label key={key} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        backgroundColor: symptoms[key] ? '#e0e7ff' : 'transparent',
                        border: '1px solid',
                        borderColor: symptoms[key] ? '#6366f1' : '#e5e7eb'
                      }}>
                        <input
                          type="checkbox"
                          checked={symptoms[key]}
                          onChange={() => handleSymptomChange(key)}
                          style={{
                            width: '14px',
                            height: '14px',
                            accentColor: '#6366f1'
                          }}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              onClick={submitDiagnosis}
              disabled={isLoading || !patientName || !age}
              style={{
                width: '100%',
                padding: '12px 24px',
                backgroundColor: isLoading || !patientName || !age ? '#9ca3af' : '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: isLoading || !patientName || !age ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (!isLoading && patientName && age) {
                  e.target.style.backgroundColor = '#5b5fcc';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && patientName && age) {
                  e.target.style.backgroundColor = '#6366f1';
                }
              }}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid #ffffff',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Processing...
                </>
              ) : (
                'Generate Diagnosis'
              )}
            </button>
          </div>

          {/* Right Column - Diagnosis Results */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '8px'
            }}>
              Diagnosis Results
            </h2>
            <p style={{
              color: '#6b7280',
              marginBottom: '32px',
              fontSize: '14px'
            }}>
              AI-powered analysis based on clinical symptoms and patient data.
            </p>

            {diagnosis ? (
              <>
                {/* Diagnosis Result */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '24px',
                  backgroundColor: getSeverityBgColor(diagnosis.severity),
                  borderRadius: '12px',
                  marginBottom: '32px',
                  border: `2px solid ${getSeverityColor(diagnosis.severity)}20`
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: getSeverityColor(diagnosis.severity),
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {diagnosis.severity === 'Severe' ? (
                      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    ) : (
                      <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '28px',
                      fontWeight: 'bold',
                      color: getSeverityColor(diagnosis.severity),
                      margin: 0
                    }}>
                      {diagnosis.severity} Malaria
                    </h3>
                    <p style={{
                      color: '#6b7280',
                      margin: '4px 0 0 0',
                      fontSize: '14px'
                    }}>
                      {Math.round(diagnosis.confidence * 100)}% Confidence Level
                    </p>
                  </div>
                </div>

                {/* Recommended Treatment */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    Recommended Actions
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '16px',
                    fontSize: '14px'
                  }}>
                    Based on trained AI model with clinical symptom analysis.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {diagnosis.recommendedDrugs.map((recommendation, index) => (
                      <div key={index} style={{
                        padding: '16px',
                        backgroundColor: diagnosis.severity === 'Severe' ? '#fef2f2' : '#f9fafb',
                        borderRadius: '8px',
                        border: `1px solid ${diagnosis.severity === 'Severe' ? '#fecaca' : '#e5e7eb'}`,
                        color: diagnosis.severity === 'Severe' ? '#dc2626' : '#374151'
                      }}>
                        <strong>{recommendation}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clinical Notes */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    Clinical Notes
                  </h3>
                  <div style={{
                    padding: '16px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#374151',
                    lineHeight: '1.6'
                  }}>
                    <p><strong>Patient:</strong> {patientName}, {gender}, Age {age}</p>
                    {temperature && <p><strong>Temperature:</strong> {temperature}°C</p>}
                    <p><strong>Symptoms Present:</strong> {Object.entries(symptoms).filter(([_, value]) => value).map(([key, _]) => {
                      // Find the display name for this symptom
                      for (const group of Object.values(symptomGroups)) {
                        if (group[key]) return group[key];
                      }
                      return key;
                    }).join(', ') || 'None selected'}</p>
                    <p><strong>Model:</strong> Symptom-based AI prediction</p>
                  </div>
                </div>

                <div style={{
                  padding: '16px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#6b7280',
                  fontStyle: 'italic',
                  lineHeight: '1.5',
                  marginBottom: '24px'
                }}>
                  <strong>Disclaimer:</strong> This AI tool provides preliminary assessment based on symptom analysis. Results should always be validated by qualified healthcare professionals.
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={printReport}
                    style={{
                      flex: 1,
                      padding: '12px 24px',
                      backgroundColor: 'white',
                      color: '#6366f1',
                      border: '1px solid #6366f1',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2 2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                    </svg>
                    Generate Report
                  </button>
                  <button
                    onClick={seekMedicalHelp}
                    style={{
                      flex: 1,
                      padding: '12px 24px',
                      backgroundColor: '#6366f1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                    Medical Help
                  </button>
                </div>
              </>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#6b7280'
              }}>
                <svg width="64" height="64" fill="currentColor" viewBox="0 0 24 24" style={{ margin: '0 auto 16px' }}>
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '8px' }}>
                  Ready for Diagnosis
                </h3>
                <p style={{ fontSize: '14px' }}>
                  Enter patient information and symptoms, then click "Generate Diagnosis" to see results.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add CSS for loading spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}