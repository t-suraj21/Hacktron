import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user data from backend using token
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Send token in header
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user); // Assuming your backend returns { user: {...} }
        } else {
          console.error(data.message || 'Failed to fetch profile');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (!user) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Your Profile</h2>
      <div className="space-y-4 text-gray-700">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {/* Add more fields if your user has like phone, address etc */}
      </div>
    </div>
  );
};

export default Profile;
