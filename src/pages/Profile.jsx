import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        } else {
          console.error(data.message || 'Failed to fetch profile');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-blue-600">Loading Profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-red-500">Failed to load profile.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Your Profile</h1>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg hover:shadow-lg transition">
            <h2 className="text-gray-600 text-sm">Name</h2>
            <p className="text-lg font-semibold text-gray-800">{user.name}</p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-lg transition">
            <h2 className="text-gray-600 text-sm">Email</h2>
            <p className="text-lg font-semibold text-gray-800">{user.email}</p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-lg transition">
            <h2 className="text-gray-600 text-sm">Emergency Contact</h2>
            <p className="text-lg font-semibold text-gray-800">{user.emergencyContact}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
