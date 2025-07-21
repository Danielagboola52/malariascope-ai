import React, { useState } from 'react';
import { Upload, Calendar, Phone } from 'lucide-react';

export default function ConsultDoctorPage() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    symptoms: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendRequest = () => {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleScheduleCall = () => {
    console.log('Schedule video call clicked');
    // Handle video call scheduling logic
  };

  const handleUrgentCall = () => {
    console.log('Urgent consultation call clicked');
    // Handle urgent consultation logic
  };

  const handleFileUpload = () => {
    console.log('File upload clicked');
    // Handle file upload logic
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h1 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              Consult a Doctor
            </h1>
            
            {/* Form Section */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe Your Symptoms
                </label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  placeholder="E.g., Fever, headache, sore throat, how long have you had them?"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                />
              </div>
              
              {/* Upload Section */}
              <div className="flex justify-end">
                <button
                  onClick={handleFileUpload}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <Upload size={20} />
                  <span>Upload Photo or File</span>
                </button>
              </div>
              
              {/* Send Request Button */}
              <button
                onClick={handleSendRequest}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Send Request
              </button>
            </div>
          </div>
          
          {/* Consultation Options Section */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <div className="text-gray-400 text-sm font-medium mb-6">OR</div>
              
              <div className="space-y-4">
                {/* Schedule Video Call */}
                <button
                  onClick={handleScheduleCall}
                  className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-lg transition-colors"
                >
                  <Calendar size={20} />
                  <span>Schedule Video Call</span>
                </button>
                
                <div className="text-gray-500 text-sm mb-4">
                  Need immediate help?
                </div>
                
                {/* Urgent Consultation */}
                <button
                  onClick={handleUrgentCall}
                  className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-medium py-4 px-6 rounded-lg transition-colors"
                >
                  <Phone size={20} />
                  <span>Call for Urgent Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}