import React from 'react';

const About = () => {
  const symptoms = [
    'Fever (often cyclical)',
    'Chills and shivering (intense and shaking)',
    'Headache (severe, persistent)',
    'Muscle aches and joint pain',
    'Fatigue and general malaise',
    'Nausea, vomiting, and diarrhea',
    'Abdominal pain',
    'Loss of appetite'
  ];

  const severeSymptoms = [
    'Impaired consciousness or coma (cerebral malaria)',
    'Severe weakness (inability to sit or stand)',
    'Difficulty breathing or respiratory distress',
    'Convulsions (seizures)',
    'Jaundice (yellowing of skin and eyes)',
    'Abnormal bleeding or blood clotting problems',
    'Signs of anemia (pallor, extreme fatigue)',
    'Dark or red-brown urine (hemoglobinuria)',
    'Low blood pressure (shock)',
    'Acute kidney injury or failure',
    'High parasite density in blood tests'
  ];

  const stages = [
    {
      title: 'Cold Stage',
      description: 'The attack begins with intense feelings of coldness, uncontrollable shivering, and a sensation of being extremely cold, even as the body temperature starts to rise. This phase can last from 15 minutes to one hour.',
      color: 'from-blue-100 to-blue-200',
      borderColor: 'border-blue-400'
    },
    {
      title: 'Hot Stage',
      description: 'Following the cold stage, the patient experiences a sudden onset of high fever (up to 40°C or 104°F and above), flushed, dry skin, and a throbbing headache. This phase can last for several hours, marked by intense heat and discomfort.',
      color: 'from-red-100 to-red-200',
      borderColor: 'border-red-400'
    },
    {
      title: 'Sweating Stage',
      description: 'The hot stage gives way to profuse sweating as the fever breaks. The body temperature rapidly falls, and the patient feels exhausted but often better. This stage can also last for several hours, after which the patient may fall asleep and wake up feeling relatively well until the next attack.',
      color: 'from-green-100 to-green-200',
      borderColor: 'border-green-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-8 shadow-lg">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            About MalariaScope AI
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Understanding malaria is crucial for early detection and effective treatment. 
            Our AI-powered platform provides comprehensive information and diagnostic tools 
            to help combat this life-threatening disease.
          </p>
        </div>

        {/* Disease Overview Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Understanding the Disease</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Malaria is a life-threatening disease caused by parasites that are transmitted to people through the bites of infected female Anopheles mosquitoes. It is preventable and curable. Key symptoms include fever, chills, and flu-like illness.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  If not treated, malaria can lead to severe complications and death. Early diagnosis and treatment are critical for preventing severe complications and improving outcomes.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">249M</div>
                  <div className="text-sm text-gray-600 mb-4">Cases in 2022</div>
                  <div className="text-4xl font-bold text-red-600 mb-2">608K</div>
                  <div className="text-sm text-gray-600">Deaths in 2022</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Symptoms Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Common Symptoms</h2>
            </div>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Malaria symptoms typically appear 10 to 15 days after the infective mosquito bite. Initial symptoms can often be mild and may be difficult to recognize as malaria.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {symptoms.map((symptom, index) => (
                <div key={index} className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-l-4 border-orange-400">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-800 font-medium">{symptom}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Malarial Attacks Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Malarial Attacks (Cyclical Pattern)</h2>
            </div>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              One of the distinguishing features of malaria is the cyclical nature of its attacks, which align with the parasite's life cycle in the red blood cells. A typical attack progresses through three stages:
            </p>
            <div className="space-y-6">
              {stages.map((stage, index) => (
                <div key={index} className={`bg-gradient-to-r ${stage.color} p-6 rounded-xl border-l-4 ${stage.borderColor} transform hover:scale-105 transition-transform duration-200`}>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{stage.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{stage.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
              <p className="text-gray-700 font-medium">
                💡 The periodicity of these attacks (every 24, 48, or 72 hours) depends on the specific Plasmodium species causing the infection.
              </p>
            </div>
          </div>
        </div>

        {/* Severe Symptoms Warning */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-xl p-8 lg:p-12 text-white">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">Severe Malaria Symptoms</h2>
            </div>
            <p className="text-xl mb-8 opacity-90">⚠️ Requires Immediate Medical Attention</p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {severeSymptoms.map((symptom, index) => (
                <div key={index} className="flex items-center p-4 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                  <span className="font-medium">{symptom}</span>
                </div>
              ))}
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-sm">
              <p className="text-xl font-bold">
                🚨 Early diagnosis and treatment are critical for preventing severe complications and improving outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Prevention Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl shadow-xl p-8 lg:p-12 text-white">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold">Key Protective Strategies</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4">💉 Vaccine Recommendation</h3>
                <p className="leading-relaxed opacity-90">
                  The RTS,S/AS01 (Mosquirix) vaccine is the world's first malaria vaccine recommended by the WHO for broad use in children living in areas with moderate to high malaria transmission. It provides partial protection against the disease and significantly reduces severe malaria.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4">✈️ Travel Protection</h3>
                <p className="leading-relaxed opacity-90">
                  Travelers visiting malaria-endemic regions should take specific precautions including antimalarial medications, using repellents, wearing long-sleeved clothing, and sleeping under insecticide-treated bed nets.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RDT Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Rapid Malaria Diagnostic Test (RDT)</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">How RDTs Work</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Rapid Diagnostic Tests (RDTs) for malaria are small, portable devices that detect specific malaria antigens in a patient's blood. These tests provide results in 15-20 minutes without requiring laboratory equipment or electricity.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  When blood is deposited on the test strip, specific antibodies react with malaria antigens, producing a visible line that indicates whether malaria parasites are present.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Performing an RDT</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">1</div>
                    <div>
                      <p className="font-semibold text-gray-800">Preparation</p>
                      <p className="text-gray-600 text-sm">Ensure components are at room temperature, clean hands, wear gloves.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">2</div>
                    <div>
                      <p className="font-semibold text-gray-800">Sample Collection</p>
                      <p className="text-gray-600 text-sm">Cleanse fingertip, use sterile lancet for finger prick.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">3</div>
                    <div>
                      <p className="font-semibold text-gray-800">Testing</p>
                      <p className="text-gray-600 text-sm">Add blood sample and buffer solution as instructed.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">4</div>
                    <div>
                      <p className="font-semibold text-gray-800">Reading Results</p>
                      <p className="text-gray-600 text-sm">Read results at exactly 15-20 minutes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">🤖 Our AI Enhancement</h3>
              <p className="text-indigo-700 leading-relaxed">
                MalariaScope AI takes RDT testing to the next level by using advanced machine learning algorithms to analyze test results with greater accuracy and provide additional insights. Our system helps healthcare workers interpret results more confidently and reduce diagnostic errors.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600">
            © 2025 MalariaScope AI. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;