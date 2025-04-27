import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Alert = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [quickDialNumbers, setQuickDialNumbers] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    // Load quick dial numbers from localStorage on component mount
    const savedNumbers = JSON.parse(localStorage.getItem('quickDialNumbers'));
    if (savedNumbers && Array.isArray(savedNumbers)) {
      setQuickDialNumbers(savedNumbers);
    }
  }, []);

  const isValidPhoneNumber = (number) => {
    const regex = /^\+[1-9]\d{1,14}$/;
    return regex.test(number);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleQuickDialChange = (index, value) => {
    const updatedNumbers = [...quickDialNumbers];
    updatedNumbers[index] = value;
    setQuickDialNumbers(updatedNumbers);
    localStorage.setItem('quickDialNumbers', JSON.stringify(updatedNumbers)); // Save to localStorage
  };

  // Function to get current location
  const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  };

  const handleSendCall = async (targetNumber = phoneNumber) => {
    if (!targetNumber) {
      setMessage('Phone number is required!');
      setMessageType('error');
      return;
    }

    if (!isValidPhoneNumber(targetNumber)) {
      setMessage('Please enter a valid phone number in E.164 format (e.g., +1234567890).');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Get the location of the user
      const position = await getLocation();
      const { latitude, longitude } = position.coords;

      // Prepare the message with the location
      const locationMessage = `Help! I'm at latitude: ${latitude}, longitude: ${longitude}. Please assist!`;

      // Send the call request along with the location message
      const response = await axios.post('http://localhost:3000/api/call', {
        to: targetNumber,
        message: locationMessage, // Send message with location
      });

      if (response.data.success) {
        setMessage('Call initiated successfully!');
        setMessageType('success');
      }
    } catch (error) {
      console.error('Error initiating call:', error);
      if (error.response) {
        setMessage('Failed to send call: ' + (error.response.data.message || 'An unknown error occurred'));
      } else {
        setMessage('Failed to send call: ' + error.message);
      }
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 p-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Alert-Call</h1>

      <div className="mb-6">
        <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-700">Phone Number</label>
        <input
          id="phone-number"
          type="text"
          placeholder="Enter phone number (+1234567890)"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">Format: +[country code][number], e.g., +1234567890</p>
      </div>

      {/* Quick Dial Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Quick Dial Numbers</h2>
        {quickDialNumbers.map((number, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder={`Quick Dial ${index + 1}`}
              value={number}
              onChange={(e) => handleQuickDialChange(index, e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
            />
            <button
              onClick={() => handleSendCall(number)}
              className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
            >
              Call
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => handleSendCall()}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending Call...
          </div>
        ) : (
          'Send Call'
        )}
      </button>

      {message && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            messageType === 'success'
              ? 'bg-green-100 text-green-800 border-green-300'
              : 'bg-red-100 text-red-800 border-red-300'
          } border`}
        >
          <div className="flex items-start">
            <div className="mr-3">
              {messageType === 'success' ? (
                <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-sm">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
