import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Phone, ArrowLeft, Bell, MapPin, Wifi, AlertTriangle,
  ChevronDown, ChevronUp, User, Plus, HelpCircle, Info, Ambulance,
  ShieldAlert, Settings, Menu, Calendar, X, Heart, Smartphone
} from 'lucide-react';

const Alert = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [showContactsDetails, setShowContactsDetails] = useState(false);
  const [showResourcesDetails, setShowResourcesDetails] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [emergencyType, setEmergencyType] = useState('personal');
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
    address: 'Fetching location...',
    accuracy: null
  });
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', primary: false });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastPracticeAlert, setLastPracticeAlert] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  // Check online status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // Fetch user's emergency contacts from localStorage
  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      setEmergencyContacts(JSON.parse(savedContacts));
    }

    const lastPractice = localStorage.getItem('lastPracticeAlert');
    if (lastPractice) {
      setLastPracticeAlert(new Date(JSON.parse(lastPractice)));
    }
  }, []);

  // Save contacts to localStorage when changed
  useEffect(() => {
    if (emergencyContacts.length > 0) {
      localStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
    }
  }, [emergencyContacts]);

  // Get user's current location
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              address: 'Translating coordinates...'
            });

            // In a real app, you would use a reverse geocoding service
            // This is a placeholder for demonstration
            setTimeout(() => {
              setCurrentLocation(prev => ({
                ...prev,
                address: '123 Main Street, Cityville, ST 12345'
              }));
            }, 1000);
          },
          (error) => {
            console.error('Error getting location:', error);
            setCurrentLocation(prev => ({
              ...prev,
              address: 'Location access denied. Please enable location services.'
            }));
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        setCurrentLocation(prev => ({
          ...prev,
          address: 'Geolocation is not supported by this browser.'
        }));
      }
    };

    getLocation();
    // Set up a timer to refresh location every minute
    const locationTimer = setInterval(getLocation, 60000);

    return () => clearInterval(locationTimer);
  }, []);

  // Device shake detection
  useEffect(() => {
    let shakeThreshold = 15;
    let lastUpdate = 0;
    let lastX = 0, lastY = 0, lastZ = 0;

    const handleShake = (event) => {
      const { accelerationIncludingGravity } = event;
      if (!accelerationIncludingGravity) return;

      const currentTime = new Date().getTime();
      if ((currentTime - lastUpdate) > 100) {
        const diffTime = currentTime - lastUpdate;
        lastUpdate = currentTime;

        const x = accelerationIncludingGravity.x;
        const y = accelerationIncludingGravity.y;
        const z = accelerationIncludingGravity.z;

        const speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;

        if (speed > shakeThreshold) {
          handleEmergencyAlert();
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    window.addEventListener('devicemotion', handleShake);

    return () => {
      window.removeEventListener('devicemotion', handleShake);
    };
  }, [emergencyType, alertMessage]);

  // Handle emergency alert with countdown
  const handleEmergencyAlert = () => {
    if (emergencyContacts.length === 0) {
      alert("Please add at least one emergency contact before sending an alert.");
      setShowAddContact(true);
      return;
    }

    // Start countdown from 5 seconds
    setCountdown(5);

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          sendAlert();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Cancel alert during countdown
  const cancelAlert = () => {
    setCountdown(null);
  };

  // Send the actual alert
  const sendAlert = async () => {
    setLoading(true);

    try {
      // In a real app, you would send an API request here
      // Simulate API call with setTimeout
      setTimeout(() => {
        setLoading(false);
        setAlertSent(true);

        // Reset after 8 seconds
        setTimeout(() => {
          setAlertSent(false);
        }, 8000);
      }, 1500);
    } catch (error) {
      console.error('Error sending alert:', error);
      setLoading(false);
    }
  };

  // Handle practice alert
  const handlePracticeAlert = () => {
    localStorage.setItem('lastPracticeAlert', JSON.stringify(new Date()));
    setLastPracticeAlert(new Date());

    // Simulate sending a practice alert
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Practice alert sent successfully! This was just a test - no actual alerts were sent to your contacts.");
    }, 1500);
  };

  // Add a new emergency contact
  const addContact = () => {
    if (!newContact.name || !newContact.phone) {
      alert("Please fill in both name and phone number.");
      return;
    }

    const contactId = Date.now();
    const updatedContacts = [...emergencyContacts, { ...newContact, id: contactId }];
    setEmergencyContacts(updatedContacts);
    setNewContact({ name: '', phone: '', primary: false });
    setShowAddContact(false);
  };

  // Delete a contact
  const deleteContact = (id) => {
    const updatedContacts = emergencyContacts.filter(contact => contact.id !== id);
    setEmergencyContacts(updatedContacts);
  };

  // Toggle primary status
  const togglePrimary = (id) => {
    const updatedContacts = emergencyContacts.map(contact => {
      if (contact.id === id) {
        return { ...contact, primary: !contact.primary };
      }
      return contact;
    });
    setEmergencyContacts(updatedContacts);
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return 'Never';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Emergency types
  const emergencyTypes = [
    { id: 'personal', name: 'Personal Emergency', icon: <User size={18} /> },
    { id: 'medical', name: 'Medical Emergency', icon: <Ambulance size={18} /> },
    { id: 'safety', name: 'Safety Threat', icon: <AlertTriangle size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="text-white mr-3 hover:bg-red-500 p-2 rounded-full transition"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-white" />
              <h1 className="ml-2 text-xl font-bold text-white">Emergency Alert</h1>
            </div>
          </div>
          <button
            onClick={() => setShowNavMenu(!showNavMenu)}
            className="text-white hover:bg-red-500 p-2 rounded-full transition"
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Navigation Menu */}
      {showNavMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
          <div className="w-64 bg-white h-full shadow-lg p-4 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-lg">Menu</h2>
              <button
                onClick={() => setShowNavMenu(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex-grow">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setShowNavMenu(false);
                      navigate('/');
                    }}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-100"
                  >
                    <Shield size={18} className="mr-3 text-red-600" />
                    <span>Home</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setShowNavMenu(false);
                      setShowAddContact(true);
                    }}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-100"
                  >
                    <Phone size={18} className="mr-3 text-red-600" />
                    <span>Manage Contacts</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setShowNavMenu(false);
                      navigate('/settings');
                    }}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-100"
                  >
                    <Settings size={18} className="mr-3 text-red-600" />
                    <span>Settings</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setShowNavMenu(false);
                      handlePracticeAlert();
                    }}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-100"
                  >
                    <Bell size={18} className="mr-3 text-red-600" />
                    <span>Practice Alert</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setShowNavMenu(false);
                      navigate('/help');
                    }}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-100"
                  >
                    <HelpCircle size={18} className="mr-3 text-red-600" />
                    <span>Help & Support</span>
                  </button>
                </li>
              </ul>
            </nav>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                SafeGuard Emergency Alert • Version 3.0
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow container max-w-4xl mx-auto p-4">
        {/* Connection Status */}
        {!isOnline && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-md mb-5 animate-pulse">
            <div className="flex">
              <Wifi size={20} className="text-red-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-700">
                You are currently offline. Emergency alerts require an internet connection to work properly.
              </p>
            </div>
          </div>
        )}

        {/* Location Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-5">
          <div className="flex items-center text-gray-500 mb-2">
            <MapPin size={18} className="mr-2 text-red-500" />
            <span className="text-sm font-medium">Your current location</span>
          </div>
          <p className="text-gray-800 font-medium">{currentLocation.address}</p>
          {currentLocation.accuracy && (
            <p className="text-xs text-gray-500">
              Accuracy: within {Math.round(currentLocation.accuracy)} meters
            </p>
          )}
          <div className="flex items-center mt-2">
            <p className="text-xs text-gray-500">
              This location will be shared with your emergency contacts
            </p>
            <button
              onClick={() => {
                const getLocation = () => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        setCurrentLocation({
                          latitude: position.coords.latitude,
                          longitude: position.coords.longitude,
                          accuracy: position.coords.accuracy,
                          address: 'Translating coordinates...'
                        });

                        setTimeout(() => {
                          setCurrentLocation(prev => ({
                            ...prev,
                            address: '123 Main Street, Cityville, ST 12345'
                          }));
                        }, 1000);
                      },
                      (error) => {
                        console.error('Error getting location:', error);
                      },
                      { enableHighAccuracy: true }
                    );
                  }
                };
                getLocation();
              }}
              className="ml-auto text-xs text-red-600 hover:text-red-800"
            >
              Refresh location
            </button>
          </div>
        </div>

        {/* Emergency Type Selection */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-5">
          <h3 className="font-medium mb-3">Emergency Type</h3>
          <div className="grid grid-cols-3 gap-3">
            {emergencyTypes.map(type => (
              <button
                key={type.id}
                className={`p-3 rounded-lg flex flex-col items-center justify-center ${emergencyType === type.id
                    ? 'bg-red-100 border-2 border-red-500'
                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                onClick={() => setEmergencyType(type.id)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${emergencyType === type.id ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                  {type.icon}
                </div>
                <span className="text-sm font-medium">{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Message */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-5">
          <h3 className="font-medium mb-3">Alert Message (Optional)</h3>
          <textarea
            placeholder="Add a custom message to your emergency contacts..."
            value={alertMessage}
            onChange={(e) => setAlertMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-2">
            This message will be included with your location details
          </p>
        </div>

        {/* Alert Button Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-5 text-center">
          {countdown !== null ? (
            <div className="animate-pulse">
              <div className="text-3xl font-bold text-red-600 mb-4">
                Sending Alert in {countdown}...
              </div>
              <p className="text-gray-600 mb-6">
                Your emergency contacts will be notified with your current location
              </p>
              <button
                onClick={cancelAlert}
                className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          ) : loading ? (
            <div className="py-8">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Bell size={32} className="text-red-500" />
                </div>
                <p className="text-lg font-medium text-gray-700">Sending alert...</p>
              </div>
            </div>
          ) : alertSent ? (
            <div className="py-8">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Bell size={32} className="text-green-500" />
                </div>
                <p className="text-lg font-medium text-green-600">Alert sent successfully!</p>
                <p className="text-gray-600 mt-2">
                  Your emergency contacts have been notified
                </p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-6">Send Emergency Alert</h2>
              <div className="mb-6">
                <div className="relative">
                  <button
                    onClick={handleEmergencyAlert}
                    disabled={emergencyContacts.length === 0}
                    className={`w-40 h-40 rounded-full ${emergencyContacts.length === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-500 hover:bg-red-600 active:bg-red-700'
                      } shadow-lg flex items-center justify-center mx-auto transition transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300`}
                  >
                    <div className="text-white font-bold text-2xl">ALERT</div>
                  </button>
                  {emergencyContacts.length > 0 && (
                    <div className="absolute inset-0 rounded-full border-8 border-red-300 opacity-75 animate-ping" style={{ borderRadius: '9999px' }}></div>
                  )}
                </div>
              </div>
              <p className="text-gray-600">
                {emergencyContacts.length === 0
                  ? "Please add emergency contacts before sending an alert"
                  : "Tap the button to immediately alert your emergency contacts"}
              </p>
              {emergencyContacts.length > 0 && (
                <p className="text-gray-500 text-sm mt-2">
                  You can also shake your device to trigger an alert
                </p>
              )}
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  Last practice alert: {formatDate(lastPracticeAlert)}
                </p>
                <button
                  onClick={handlePracticeAlert}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Send a practice alert
                </button>
              </div>
            </>
          )}
        </div>

        {/* Emergency Contacts Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-5">
          <div
            className="p-4 flex justify-between items-center cursor-pointer"
            onClick={() => setShowContactsDetails(!showContactsDetails)}
          >
            <div className="flex items-center">
              <Phone size={18} className="text-red-500 mr-2" />
              <h3 className="font-medium">Emergency Contacts ({emergencyContacts.length})</h3>
            </div>
            {showContactsDetails ?
              <ChevronUp size={20} className="text-gray-500" /> :
              <ChevronDown size={20} className="text-gray-500" />
            }
          </div>

          {showContactsDetails && (
            <div className="px-4 pb-4 border-t border-gray-100">
              {emergencyContacts.length > 0 ? (
                <div className="space-y-3 mt-3">
                  {emergencyContacts.map(contact => (
                    <div key={contact.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-gray-800">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.phone}</p>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => togglePrimary(contact.id)}
                          className={`mr-3 px-2 py-1 ${contact.primary
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                            } text-xs rounded-full transition`}
                        >
                          {contact.primary ? 'Primary' : 'Secondary'}
                        </button>
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                          aria-label="Delete contact"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-2">No emergency contacts set up yet.</p>
                  <p className="text-sm text-gray-500">Add contacts to enable emergency alerts</p>
                </div>
              )}
              <button
                onClick={() => setShowAddContact(true)}
                className="mt-4 flex items-center text-red-600 hover:text-red-800"
              >
                <Plus size={18} className="mr-1" />
                Add emergency contact
              </button>
            </div>
          )}
        </div>

        {/* Government Resources Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-5">
          <div
            className="p-4 flex justify-between items-center cursor-pointer"
            onClick={() => setShowResourcesDetails(!showResourcesDetails)}
          >
            <div className="flex items-center">
              <Info size={18} className="text-red-500 mr-2" />
              <h3 className="font-medium">Emergency Resources</h3>
            </div>
            {showResourcesDetails ?
              <ChevronUp size={20} className="text-gray-500" /> :
              <ChevronDown size={20} className="text-gray-500" />
            }
          </div>

          {showResourcesDetails && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <div className="space-y-4 mt-3">
                <div className="p-3 bg-blue-50 rounded-md">
                  <h4 className="font-medium text-blue-800 flex items-center">
                    <Police size={16} className="mr-2" />
                    Emergency Services
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    For immediate threats to life or property, call <strong>911</strong>
                  </p>
                  <a href="tel:911" className="mt-2 inline-flex items-center text-sm text-blue-700">
                    <Phone size={14} className="mr-1" /> Call 911
                  </a>
                </div>

                <div className="p-3 bg-red-50 rounded-md">
                  <h4 className="font-medium text-red-800 flex items-center">
                    <Heart size={16} className="mr-2" />
                    Poison Control
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    For poison emergencies: <strong>1-800-222-1222</strong>
                  </p>
                  <a href="tel:18002221222" className="mt-2 inline-flex items-center text-sm text-red-700">
                    <Phone size={14} className="mr-1" /> Call Poison Control
                  </a>
                </div>

                <div className="p-3 bg-purple-50 rounded-md">
                  <h4 className="font-medium text-purple-800 flex items-center">
                    <HelpCircle size={16} className="mr-2" />
                    Crisis Support
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    Mental health crisis support: <strong>988</strong> (Suicide & Crisis Lifeline)
                  </p>
                  <a href="tel:988" className="mt-2 inline-flex items-center text-sm text-purple-700">
                    <Phone size={14} className="mr-1" /> Call 988
                  </a>
                </div>

                <div className="p-3 bg-teal-50 rounded-md">
                  <h4 className="font-medium text-teal-800 flex items-center">
                    <AlertTriangle size={16} className="mr-2" />
                    Disaster Information
                  </h4>
                  <p className="text-sm text-gray-700 mt-1">
                    For local disaster information and evacuation guidance, visit <strong>Ready.gov</strong>
                  </p>
                  <a href="https://www.ready.gov" className="mt-2 inline-flex items-center text-sm text-teal-700">
                    <Info size={14} className="mr-1" /> Visit Ready.gov
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-lg shadow-sm p-5 mb-5">
          <h3 className="font-medium mb-3">How Emergency Alert Works</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex">
              <div className="mr-3 mt-1">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <Bell size={14} className="text-red-600" />
                </div>
              </div>
              <p>When you activate the alert, your emergency contacts will immediately receive an SMS with your location and emergency type.</p>
            </div>
            <div className="flex">
              <div className="mr-3 mt-1">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <MapPin size={14} className="text-red-600" />
                </div>
              </div>
              <p>Your real-time location is updated every minute and shared until you mark yourself as safe.</p>
            </div>
            <div className="flex">
              <div className="mr-3 mt-1">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <Wifi size={14} className="text-red-600" />
                </div>
              </div>
              <p>Internet connection is required for the alert to be sent. The app will keep trying to send if you're temporarily offline.</p>
            </div>
            <div className="flex">
              <div className="mr-3 mt-1">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <Smartphone size={14} className="text-red-600" />
                </div>
              </div>
              <p>Shake detection is enabled even when the app is running in the background (requires permission).</p>
            </div>
          </div>
        </div>

        {/* Additional Safety Tips */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex">
            <AlertTriangle size={20} className="text-yellow-600 mr-2 flex-shrink-0" />
            <div className="flex-grow">
              <p className="text-sm text-yellow-700">
                <strong>Remember:</strong> In case of immediate danger, call emergency services directly at 911. This app is designed to supplement official emergency services, not replace them.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-5 border-b border-gray-200">
              <h3 className="font-bold text-lg">Add Emergency Contact</h3>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="Contact name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="Phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  id="primary"
                  type="checkbox"
                  checked={newContact.primary}
                  onChange={(e) => setNewContact({ ...newContact, primary: e.target.checked })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-gray-700 text-sm" htmlFor="primary">
                  Set as primary contact (contacted first in emergencies)
                </label>
              </div>
              <div className="mt-6 flex flex-col space-y-2">
                <button
                  onClick={addContact}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition"
                >
                  Add Contact
                </button>
                <button
                  onClick={() => setShowAddContact(false)}
                  className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-4xl mx-auto py-4 px-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Quick Links</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>
                  <button className="hover:text-red-600" onClick={() => navigate('/privacy')}>
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button className="hover:text-red-600" onClick={() => navigate('/terms')}>
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button className="hover:text-red-600" onClick={() => handlePracticeAlert()}>
                    Run Test Alert
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">About</h4>
              <p className="text-xs text-gray-600">
                SafeGuard Emergency Alert • Version 3.0
                <br />
                In partnership with local emergency services
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Alert;