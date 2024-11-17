import { useState } from "react";
import "./MainPage.css";
import { ref, set } from "firebase/database";
import { database } from "../../database/firebaseConfig.js";
const MainPage = () => {
  const [temperature, setTemperature] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [race, setRace] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");

  
  const handleGetData = async () => {
    try {
      // URL của ESP8266 (thay đổi thành đúng địa chỉ IP của ESP8266)
      const esp8266Url = "http://172.26.51.136/data";
  
      console.log("Fetching data from ESP8266...");
  
      // Gửi HTTP GET request đến ESP8266
      const response = await fetch(esp8266Url, {
        method: "GET",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Đọc dữ liệu JSON từ ESP8266
      const data = await response.json();
  
      // Cập nhật giá trị lên React state (giả sử bạn có các state sau)
      setTemperature(data.temperature); // Cập nhật nhiệt độ
      setHeartRate(data.heartRate);     // Cập nhật nhịp tim
      setRespiratoryRate(data.spo2);   // Cập nhật nồng độ oxy trong máu
  
      console.log("Data fetched successfully: ", data);
    } catch (error) {
      console.error("Error fetching data from ESP8266: ", error);
    }
  };
  

  const handleDetect = async () => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          race: race == "to" ? 1 : 2,
          sex: sex == "duc" ? 0 : 1,
          age: parseInt(age,10),
          temperature: parseFloat(temperature,10),
          heartRate: parseInt(heartRate,10),
          respiratoryRate: parseInt(respiratoryRate,10),
        })
      });
      
      const data = await response.json();
      setDiagnosis(data.diagnosis);
      setShowAlert(true);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };
  

  const handleSaveProfile = () => {
    const profileId = Date.now().toString(); // Tạo ID duy nhất cho hồ sơ
    const profileData = {
      race : race == "to" ? 1 : 2,
      sex : sex == "duc" ?  0 : 1,
      age : parseInt(age,10), 
      temperature: parseFloat(temperature,10),
      heartRate : parseInt(heartRate,10),
      respiratoryRate : parseInt(respiratoryRate,10),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      diagnosis : diagnosis,
    };
  
    set(ref(database, 'profiles/' + profileId), profileData)
      .then(() => {
        console.log("Data saved successfully!");
        setShowAlert(false);
      })
      .catch((error) => {
        console.error("Error saving data: ", error);
      });
  };

  const exitShowAlert = () => {
    setShowAlert(false)
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Chỉ số sức khỏe</h2>
        </div>
        <div className="card-content">
          <div className="grid-container">
            <input
              type="number"
              placeholder="Nhiệt độ"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="input"
            />
            <input
              type="number"
              placeholder="Nhịp tim"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              className="input"
            />
            <input
              type="number"
              placeholder="Nhịp thở"
              value={respiratoryRate}
              onChange={(e) => setRespiratoryRate(e.target.value)}
              className="input"
            />
          </div>
          <button onClick={handleGetData} className="button">
            Lấy dữ liệu từ ESP8266
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Thông tin thú cưng</h2>
        </div>
        <div className="card-content">
          <div className="grid-container">
            <select
              value={race}
              onChange={(e) => setRace(e.target.value)}
              className="input"
            >
              <option value="">Chọn giống</option>
              <option value="to">To</option>
              <option value="nho">Nhỏ</option>
            </select>

            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="input"
            >
              <option value="">Chọn giới tính</option>
              <option value="duc">Đực</option>
              <option value="cai">Cái</option>
            </select>
            <input
              type="number"
              placeholder="Tuổi"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input"
            />
          </div>
          <button onClick={handleDetect} className="button">
            Phát hiện bệnh
          </button>
        </div>
      </div>

      {showAlert && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-title">Kết quả phát hiện</div>
            <div className="modal-content">{diagnosis}</div>
            <div className="modal-footer">
              <button onClick={handleSaveProfile} className="button">
                Lưu hồ sơ
              </button>
              <button onClick={exitShowAlert} className="exitBtn">
                Thoát
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
