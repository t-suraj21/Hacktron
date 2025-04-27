import React, { useState } from 'react';
import axios from 'axios';

const Alert = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [name, setName] = useState('');
  
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: '', number: '', selected: false },
    { id: 2, name: '', number: '', selected: false },
    { id: 3, name: '', number: '', selected: false }
  ]);

  const isValidPhoneNumber = (number) => {
    const regex = /^\+[1-9]\d{1,14}$/;
    return regex.test(number);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmergencyContactChange = (id, field, value) => {
    const updatedContacts = emergencyContacts.map(contact => {
      if (contact.id === id) {
        return { ...contact, [field]: value };
      }
      return contact;
    });
    setEmergencyContacts(updatedContacts);
  };

  const toggleContactSelection = (id) => {
    const updatedContacts = emergencyContacts.map(contact => {
      if (contact.id === id) {
        return { ...contact, selected: !contact.selected };
      }
      return contact;
    });
    setEmergencyContacts(updatedContacts);
  };

  const handleSendCall = async () => {
    if (!phoneNumber) {
      setMessage('Your phone number is required!');
      setMessageType('error');
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setMessage('Please enter a valid phone number in E.164 format (e.g., +1234567890).');
      setMessageType('error');
      return;
    }

    if (!name) {
      setMessage('Your name is required!');
      setMessageType('error');
      return;
    }

    const selectedContacts = emergencyContacts.filter(contact => contact.selected);

    if (selectedContacts.length === 0) {
      setMessage('Please select at least one emergency contact!');
      setMessageType('error');
      return;
    }

    for (const contact of selectedContacts) {
      if (!contact.name || !contact.number) {
        setMessage(`Please complete all details for emergency contact ${contact.id}`);
        setMessageType('error');
        return;
      }
      if (!isValidPhoneNumber(contact.number)) {
        setMessage(`Invalid phone number for ${contact.name}`);
        setMessageType('error');
        return;
      }
    }

    setLoading(true);
    setMessage('');

    try {
      const payload = {
        caller: {
          name: name,
          number: phoneNumber,
        },
        emergencyContacts: selectedContacts.map(contact => ({
          name: contact.name,
          number: contact.number,
        })),
      };

      const response = await axios.post('http://localhost:3000/api/emergency-call', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setMessage('Emergency calls initiated successfully!');
        setMessageType('success');
      } else {
        setMessage(response.data.message || 'Emergency call failed.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Call initiation error:', error);

      if (error.response && error.response.data && error.response.data.message) {
        setMessage('Failed to send calls: ' + error.response.data.message);
      } else {
        setMessage('Failed to send calls: ' + (error.message || 'Unknown error'));
      }
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16 p-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Emergency Alert-Call</h1>

      <div className="mb-4">
        <label htmlFor="user-name" className="block text-sm font-semibold text-gray-700">Your Name</label>
        <input
          id="user-name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-700">Your Phone Number</label>
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

      <div className="mt-8 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Emergency Contacts</h2>
        <p className="text-sm text-gray-600 mb-4">Add up to 3 emergency contacts. Click on a contact to select it.</p>
        
        {emergencyContacts.map(contact => (
          <div 
            key={contact.id} 
            className={`mb-4 p-4 border rounded-lg ${contact.selected ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} cursor-pointer`}
            onClick={() => toggleContactSelection(contact.id)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Emergency Contact {contact.id}</span>
              <div className={`w-5 h-5 rounded-full border ${contact.selected ? 'bg-blue-500 border-blue-500' : 'border-gray-400'} flex items-center justify-center`}>
                {contact.selected && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  placeholder="Contact Name"
                  value={contact.name}
                  onChange={(e) => handleEmergencyContactChange(contact.id, 'name', e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone Number (+1234567890)"
                  value={contact.number}
                  onChange={(e) => handleEmergencyContactChange(contact.id, 'number', e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSendCall}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending Emergency Alerts...
          </div>
        ) : (
          'SEND EMERGENCY ALERT'
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

      <div className="mt-6 border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600">
          In case of emergency, this alert will call your selected emergency contacts with an automated message including your name and that you need assistance.
        </p>
      </div>
    </div>
  );
};

export default Alert;
