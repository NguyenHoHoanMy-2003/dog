import { useState, useEffect } from "react";
import "./ProfilePage.css";
 import { ref, onValue } from "firebase/database";
 import { database } from "../../database/firebaseConfig.js";

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);

   useEffect(() => {
     const profilesRef = ref(database, 'profiles');
     onValue(profilesRef, (snapshot) => {
       const data = snapshot.val();
       const profilesArray = data ? Object.keys(data).map((key) => ({
         id: key,
         ...data[key]
       })) : [];
      setProfiles(profilesArray);
    });
   }, []);
  return (
    <div className="profile-container">
      <h2>Hồ sơ thú cưng</h2>
      {profiles.length > 0 ? (
        <div className="profile-list">
          {profiles.map((profile) => (
            <div key={profile.id} className="profile-card">
              <p><strong>Ngày khám:</strong> {profile.date}</p>
              <p><strong>Giờ khám:</strong> {profile.time}</p>
              <p>
                <strong>Giống:</strong> {profile.race == 1 ? "to" : "nhỏ"}
              </p>
              <p>
                <strong>Giới tính:</strong> {profile.sex == 0 ? "đực" : "cái"}
              </p>
              <p>
                <strong>Tuổi:</strong> {profile.age}
              </p>
              <p>
                <strong>Nhiệt độ:</strong> {profile.temperature}
              </p>
              <p>
                <strong>Nhịp tim:</strong> {profile.heartRate}
              </p>
              <p>
                <strong>Nhịp thở:</strong> {profile.respiratoryRate}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có hồ sơ nào.</p>
      )}
    </div>
  );
};

export default ProfilePage;
