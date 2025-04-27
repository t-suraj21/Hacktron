import React, { useState } from 'react';
import axios from 'axios';

const Alert = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Phone number format validation using regex
  const isValidPhoneNumber = (number) => {
    const regex = /^\+[1-9]\d{1,14}$/; // E.164 format (e.g., +1234567890)
    return regex.test(number);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSendCall = async () => {
    if (!phoneNumber) {
      setMessage('Phone number is required!');
      setMessageType('error');
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setMessage('Please enter a valid phone number in E.164 format (e.g., +1234567890).');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Make the API request to the backend to initiate the call
      const response = await axios.post('http://localhost:3000/api/call', {
        to: phoneNumber,
      });

      // If the call was successful
      if (response.data.success) {
        setMessage('Call initiated successfully!');
        setMessageType('success');
      }
    } catch (error) {
      console.error('Error initiating call:', error);

      // Check if the error has a response from the backend
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

      <div className="mb-4">
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

      <button
        onClick={handleSendCall}
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
