import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CssPage/profile.css';
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Use useNavigate

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Fetch user data from the Laravel backend
    axios.get('http://127.0.0.1:8000/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Check for user role and redirect to /admincrud if admin
  if (user.role === 'admin') {
    navigate('/admincrud'); // Redirect using navigate
    return null; // Prevent rendering profile content if admin
  }

  return (
    <div className="profile-container">
      <div className="profile-section">
        <h1>User Profile</h1>
        <div className="info-user">
          <img src="https://i.pinimg.com/736x/0d/e6/27/0de62786b49769d5cdfb3b06e7299b4b.jpg" alt="" />
          <div className="info-text">
            <h2>Name:<span className='info-text-span'>{user.name}</span></h2>
            <h2>Email:<span className='info-text-span'>{user.email}</span></h2>
          </div>
        </div>
      </div>
      <div className="Status">
        <h3>Your Cat Adoption Request</h3>
      </div>
      {/* Add more user fields as necessary */}
    </div>
  );
}

export default Profile;
