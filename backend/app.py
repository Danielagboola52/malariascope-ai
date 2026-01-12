from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import sys
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Load model, scaler, encoder
model = joblib.load("models/logistic_model.pkl")
scaler = joblib.load("models/scaler.pkl")
label_encoder = joblib.load("models/label_encoder.pkl")

# Drug recommendation function based on your dataset
def get_drug_recommendations(severity, age, symptoms_dict):
    """
    Returns age-appropriate drug recommendations based on malaria severity, patient age, and specific symptoms
    """
    age = int(age)
    recommendations = []
    
    # Primary antimalarial based on age and severity
    if severity.lower() == "mild":
        if age <= 6:
            primary_drug = "Camosunate (for children 1 to 6 years)"
        elif age <= 15:
            primary_drug = "Artequin 300/375 (for children 15 and below)"
        else:
            primary_drug = "Coartem 80/480"
        recommendations.append(primary_drug)
        
    elif severity.lower() == "moderate":
        if age <= 6:
            primary_drug = "Camosunate (for children 1 to 6 years)"
            secondary_drug = "Artequick (pediatric formulation)"
        elif age <= 15:
            primary_drug = "Artequin 300/375 (for children 15 and below)"
            secondary_drug = "Coartem 80/480 (reduced dose)"
        else:
            primary_drug = "Combairt 20/120mg"
            secondary_drug = "Coartem 80/480"
        
        recommendations.extend([primary_drug, secondary_drug])
        
    elif severity.lower() == "severe":
        if age <= 15:
            return [
                "URGENT: Immediate pediatric hospital admission required",
                "Severe malaria in children requires specialized care",
                "Contact emergency services immediately",
                "Do not attempt home treatment"
            ]
        else:
            return [
                "URGENT: Immediate hospital admission required",
                "Severe malaria requires IV antimalarial therapy",
                "Contact emergency services immediately", 
                "Adult ICU care may be necessary"
            ]
    
    # Add symptom-specific supportive care
    supportive_care = []
    
    # Fever management
    if symptoms_dict.get('Fever', 0) == 1:
        if age > 12:
            supportive_care.append("Paracetamol 500mg (for fever reduction)")
        else:
            supportive_care.append("Paracetamol syrup (for fever reduction)")
    
    # Headache management
    if symptoms_dict.get('Headache', 0) == 1:
        if age > 16:
            supportive_care.append("Paracetamol 500mg (for headache relief)")
        elif age > 12:
            supportive_care.append("Paracetamol 250mg (for headache relief)")
        else:
            supportive_care.append("Paracetamol syrup (for headache relief)")
    
    # Muscle aches and pain management
    if symptoms_dict.get('Muscle_aches', 0) == 1:
        if age > 16:
            supportive_care.append("Diclofenac 50mg (for muscle aches)")
        elif age > 12:
            supportive_care.append("Ibuprofen 200mg (for muscle aches)")
        else:
            supportive_care.append("Ibuprofen syrup (for muscle aches)")
    
    # Chest pain management
    if symptoms_dict.get('Chest_pain', 0) == 1:
        if age > 16:
            supportive_care.append("Diclofenac 50mg (for chest pain)")
        else:
            supportive_care.append("Consult doctor for chest pain in children")
    
    # Nausea management
    if symptoms_dict.get('Nausea', 0) == 1:
        if age > 12:
            supportive_care.append("Domperidone 10mg (for nausea)")
        else:
            supportive_care.append("Domperidone syrup (for nausea)")
    
    # Vomiting management
    if symptoms_dict.get('Vomiting', 0) == 1:
        if age > 12:
            supportive_care.append("Ondansetron 4mg (for vomiting)")
        else:
            supportive_care.append("Ondansetron syrup (for vomiting)")
    
    # Diarrhea management
    if symptoms_dict.get('Diarrhea', 0) == 1:
        supportive_care.append("ORS (Oral Rehydration Salts) for fluid replacement")
        if age > 12:
            supportive_care.append("Loperamide 2mg (for diarrhea control)")
    
    # Cough management
    if symptoms_dict.get('Cough', 0) == 1:
        if age > 12:
            supportive_care.append("Dextromethorphan cough syrup")
        else:
            supportive_care.append("Pediatric cough syrup (consult pharmacist)")
    
    # Add supportive care to recommendations
    if supportive_care:
        recommendations.extend(supportive_care)
    
    return recommendations if recommendations else ["Consult a healthcare professional for proper diagnosis"]

# Define the expected feature order (must match training data order!)
FEATURE_ORDER = [
    "Age", "Gender", "Temperature",
    "Fever", "Chills", "Sweats", "Headache", "Muscle_aches",
    "Fatigue", "Nausea", "Abdominal_pain", "Vomiting", "Diarrhea",
    "Anemia", "Jaundice", "Rapid_heart_rate", "Seizures",
    "Mental_confusion", "Coma", "Difficulty_breathing",
    "Rapid_breathing", "Chest_pain", "Cough"
]

# Add root route to fix 404 error
@app.route("/")
def home():
    return jsonify({
        "message": "Malaria Prediction API",
        "status": "running",
        "endpoints": {
            "/predict": "POST - Make malaria predictions",
            "/health": "GET - Check API health"
        }
    })

# Add health check route
@app.route("/health")
def health():
    return jsonify({"status": "healthy", "model_loaded": True})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Log raw request body for debugging
        raw_body = request.data.decode('utf-8')
        print(f"📥 Raw Request Body: {raw_body}", file=sys.stdout)
        
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid JSON or empty request"}), 400
        
        # Debug: Print received data
        print(f"📊 Received data keys: {list(data.keys())}")
        print(f"📊 Expected features: {len(FEATURE_ORDER)}")
        
        # Convert Gender to numeric (same as during training)
        if "Gender" in data:
            if str(data["Gender"]).lower() == "male":
                data["Gender"] = 1
            elif str(data["Gender"]).lower() == "female":
                data["Gender"] = 0
            else:
                return jsonify({"error": "Gender must be 'male' or 'female'"}), 400
        
        # Check for missing features
        missing_features = [feature for feature in FEATURE_ORDER if feature not in data]
        if missing_features:
            return jsonify({
                "error": f"Missing required features: {missing_features}",
                "received_features": list(data.keys()),
                "expected_features": FEATURE_ORDER
            }), 400
        
        # Extract features in the correct order
        features = []
        for feature in FEATURE_ORDER:
            value = data[feature]
            # Ensure numeric values
            try:
                features.append(float(value))
            except (ValueError, TypeError):
                return jsonify({"error": f"Invalid value for {feature}: {value}"}), 400
        
        # Convert to numpy array and reshape
        features_array = np.array(features).reshape(1, -1)
        
        # Debug: Print feature array shape
        print(f"📊 Features array shape: {features_array.shape}")
        print(f"📊 Features: {features}")
        
        # Check if scaler expects the same number of features
        try:
            # Scale the features
            features_scaled = scaler.transform(features_array)
            print(f"✅ Scaling successful")
        except ValueError as e:
            return jsonify({
                "error": f"Scaling error: {str(e)}",
                "features_provided": len(features),
                "scaler_expects": "Check your model training"
            }), 400
        
        # Make prediction
        try:
            prediction = model.predict(features_scaled)
            prediction_proba = model.predict_proba(features_scaled)
            
            # Convert prediction to human-readable format
            result = label_encoder.inverse_transform(prediction)[0]
            confidence = float(max(prediction_proba[0]))
            
            # Create symptoms dictionary for targeted recommendations
            symptoms_data = dict(zip(FEATURE_ORDER, features))
            # Remove non-symptom features
            symptoms_only = {k: v for k, v in symptoms_data.items() if k not in ['Age', 'Gender', 'Temperature']}
            
            # Get age-appropriate and symptom-specific drug recommendations
            patient_age = features[0]  # Age is the first feature in FEATURE_ORDER
            recommendations = get_drug_recommendations(result, patient_age, symptoms_data)
            
            print(f"Prediction successful: {result} (confidence: {confidence:.2f})")
            print(f"Patient age: {patient_age}")
            print(f"Symptoms present: {[k for k, v in symptoms_only.items() if v == 1]}")
            print(f"Targeted recommendations: {recommendations}")
            
            return jsonify({
                "prediction": result,
                "confidence": confidence,
                "recommendations": recommendations,
                "probabilities": {
                    "negative": float(prediction_proba[0][0]),
                    "positive": float(prediction_proba[0][1])
                },
                "input_features": dict(zip(FEATURE_ORDER, features))
            })
            
        except Exception as e:
            return jsonify({"error": f"Prediction error: {str(e)}"}), 500
            
    except Exception as e:
        print(f"❌ Error in /predict: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("🚀 Starting Malaria Prediction API...")
    print(f"📊 Model expects {len(FEATURE_ORDER)} features")
    print(f"📋 Feature order: {FEATURE_ORDER}")
    # UPDATED FOR PRODUCTION - Use environment PORT variable
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)