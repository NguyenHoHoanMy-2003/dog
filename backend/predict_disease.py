from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Load the trained model
model = joblib.load("random_forest_model.pkl")

app = Flask(__name__)
CORS(app)  # Kích hoạt CORS cho toàn bộ ứng dụng

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    race =  data['race'] 
    sex = data['sex'] 
    age =   data['age']
    temperature = data['temperature']
    heart_rate = data['heartRate']
    respiratory_rate = data['respiratoryRate']

    # Prepare the input array
    input_data = np.array([[race, sex, age, temperature, heart_rate, respiratory_rate]])
    
    # Make prediction
    prediction = model.predict(input_data)
    
    # Return the result
    result = "Bị bệnh" if prediction[0] == 1 else "Khỏe mạnh"
    return jsonify({"diagnosis": result})

if __name__ == '__main__':
    app.run(debug=True)
