import React, { useState } from 'react';

export default function MalariaScopeChecker() {
  const [patientName, setPatientName] = useState('Jane Doe');
  const [age, setAge] = useState('28');
  const [temperature, setTemperature] = useState('38.9');
  const [gender, setGender] = useState('Female');
  const [travelHistory, setTravelHistory] = useState('Southeast Asia');
  
  const [symptoms, setSymptoms] = useState({
    fever: true,
    headache: true,
    chills: true,
    fatigue: true,
    convulsion: false,
    muscleAches: false,
    sweating: false,
    soreThroat: false,
    dizziness: false,
    vomiting: false,
    diarrhea: false,
    weakness: false,
    jointPain: false,
    nausea: false,
    dryCough: false,
    abdominalPain: false
  });

  const handleSymptomChange = (symptom) => {
    setSymptoms(prev => ({
      ...prev,
      [symptom]: !prev[symptom]
    }));
  };

  const submitDiagnosis = () => {
    console.log('Submitting diagnosis...');
  };

  const printReport = () => {
    console.log('Printing report...');
  };

  const seekMedicalHelp = () => {
    console.log('Seeking medical help...');
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
            Utilize our Advanced diagnostics tool for quick health assessment and gain access to a wealth of medical knowledge, all designed to support your well-being journey
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
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '8px'
            }}>
              Patient Information
            </h2>
            <p style={{
              color: '#6b7280',
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              Please fill in the details accurately to help with the diagnosis.
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
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
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
                  Temperature (°C)
                </label>
                <input
                  type="text"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
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
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Common Symptoms */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                Common Symptoms
              </h3>
              <p style={{
                color: '#6b7280',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                Select all symptoms you are currently experiencing.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {Object.entries({
                  fever: 'Fever',
                  vomiting: 'Vomiting',
                  headache: 'Headache',
                  convulsion: 'Convulsion',
                  fatigue: 'Fatigue',
                  chills: 'Chills',
                  muscleAches: 'Muscle Aches',
                  diarrhea: 'Diarrhea',
                  nausea: 'Nausea',
                  sweating: 'Sweating',
                  weakness: 'Weakness',
                  dryCough: 'Dry Cough',
                  soreThroat: 'Sore Throat',
                  jointPain: 'Joint Pain',
                  abdominalPain: 'Abdominal Pain',
                  dizziness: 'Dizziness'
                }).map(([key, label]) => (
                  <label key={key} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    <input
                      type="checkbox"
                      checked={symptoms[key]}
                      onChange={() => handleSymptomChange(key)}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#6366f1'
                      }}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* Recent Travel History */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                Recent Travel History
              </h3>
              <input
                type="text"
                value={travelHistory}
                onChange={(e) => setTravelHistory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <p style={{
                color: '#6b7280',
                marginTop: '8px',
                fontSize: '12px'
              }}>
                Mention any regions or countries you've visited recently where malaria is prevalent.
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={submitDiagnosis}
              style={{
                width: '100%',
                padding: '12px 24px',
                backgroundColor: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5b5fcc'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6366f1'}
            >
              Submit Diagnosis
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
              Based on the information provided, here is your health assessment.
            </p>

            {/* Diagnosis Result */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '24px',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              marginBottom: '32px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#22c55e',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <div>
                <h3 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#22c55e',
                  margin: 0
                }}>
                  Mild Malaria
                </h3>
                <p style={{
                  color: '#6b7280',
                  margin: '4px 0 0 0',
                  fontSize: '14px'
                }}>
                  92% Confidence Level
                </p>
              </div>
            </div>

            {/* Recommended Medication */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                Recommended Medication
              </h3>
              <p style={{
                color: '#6b7280',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                These medications are commonly used for this condition. Always consult your doctor.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <strong>Paracetamol</strong>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <strong>Artemether-Lumefantrine</strong>
                </div>
              </div>
              
              <div style={{
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <strong>Rehydration Salts</strong>
              </div>
            </div>

            {/* Important Advice */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                Important Advice
              </h3>
              <p style={{
                color: '#6b7280',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                Follow these guidelines for recovery and prevention.
              </p>
              
              <div style={{ color: '#374151', fontSize: '14px', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '12px' }}>
                  Complete the full course of prescribed medication, even if you feel better.
                </p>
                <p style={{ marginBottom: '12px' }}>
                  Rest adequately and ensure sufficient hydration by drinking plenty of fluids.
                </p>
                <p style={{ marginBottom: '12px' }}>
                  Monitor for any worsening of symptoms or development of new ones. Keep a symptom diary.
                </p>
                <p style={{ marginBottom: '12px' }}>
                  If symptoms persist or worsen after 48 hours of starting treatment, seek immediate medical attention.
                </p>
                <p style={{ marginBottom: '12px' }}>
                  Take measures to prevent future mosquito bites, such as using repellents and mosquito nets.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  Consider a follow-up consultation with your doctor to confirm complete recovery.
                </p>
              </div>
              
              <div style={{
                padding: '16px',
                backgroundColor: '#f3f4f6',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#6b7280',
                fontStyle: 'italic',
                lineHeight: '1.5'
              }}>
                This tool provides an initial assessment based on your inputs and is not a substitute for professional medical diagnosis or treatment. Always consult a qualified healthcare provider for any health concerns or before making decisions about your health.
              </div>
            </div>

            {/* Action Buttons */}
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
                  <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                </svg>
                Print Report
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
                Seek Medical Help
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}