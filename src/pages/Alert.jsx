import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Phone, ArrowLeft, Bell, MapPin, Wifi, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

const Alert = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
    address: 'Fetching location...'
  });
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: 'Mom', phone: '555-123-4567', primary: true },
    { id: 2, name: 'Dad', phone: '555-234-5678', primary: true },
    { id: 3, name: 'Sister', phone: '555-345-6789', primary: false }
  ]);
  const [countdown, setCountdown] = useState(null);

  // Fetch user's emergency contacts from API/localStorage
  useEffect(() => {
    // In a real app, you would fetch contacts from API or localStorage
    // This is a placeholder for demonstration
    const fetchContacts = async () => {
      try {
        // Simulate API call
        // const response = await fetch('/api/emergency-contacts');
        // const data = await response.json();
        // setEmergencyContacts(data);
      } catch (error) {
        console.error('Error fetching emergency contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  // Get user's current location
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              ...currentLocation,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
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
            setCurrentLocation({
              ...currentLocation,
              address: 'Location access denied. Please enable location services.'
            });
          }
        );
      } else {
        setCurrentLocation({
          ...currentLocation,
          address: 'Geolocation is not supported by this browser.'
        });
      }
    };

    getLocation();
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
  }, []);

  // Handle emergency alert with countdown
  const handleEmergencyAlert = () => {
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
        
        // Reset after 5 seconds
        setTimeout(() => {
          setAlertSent(false);
        }, 5000);
      }, 1500);
      
      // Example API call:
      // await fetch('/api/send-alert', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     location: currentLocation,
      //     timestamp: new Date().toISOString(),
      //     contacts: emergencyContacts.filter(c => c.primary).map(c => c.id)
      //   }),
      // });
    } catch (error) {
      console.error('Error sending alert:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-purple-700 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="text-white mr-4 hover:bg-purple-600 p-2 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center">
            <Shield className="h-6 w-6 text-purple-200" />
            <h1 className="ml-2 text-xl font-bold text-white">Emergency Alert</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container max-w-4xl mx-auto p-4">
        {/* Location Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-5">
          <div className="flex items-center text-gray-500 mb-2">
            <MapPin size={18} className="mr-2" />
            <span className="text-sm">Your current location</span>
          </div>
          <p className="text-gray-800 font-medium">{currentLocation.address}</p>
          <p className="text-xs text-gray-500 mt-1">
            This location will be shared with your emergency contacts
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
                className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300"
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
                    className="w-40 h-40 rounded-full bg-red-500 shadow-lg flex items-center justify-center mx-auto transition transform hover:scale-105 active:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                  >
                    <div className="text-white font-bold text-2xl">ALERT</div>
                  </button>
                  <div className="absolute inset-0 rounded-full border-8 border-red-300 opacity-75 animate-ping" style={{borderRadius: '9999px'}}></div>
                </div>
              </div>
              <p className="text-gray-600">
                Tap the button to immediately alert your emergency contacts
              </p>
              <p className="text-gray-500 text-sm mt-2">
                You can also shake your device to trigger an alert
              </p>
            </>
          )}
        </div>

        {/* Emergency Contacts Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-5">
          <div 
            className="p-4 flex justify-between items-center cursor-pointer"
            onClick={() => setShowDetails(!showDetails)}
          >
            <div className="flex items-center">
              <Phone size={18} className="text-gray-500 mr-2" />
              <h3 className="font-medium">Emergency Contacts</h3>
            </div>
            {showDetails ? 
              <ChevronUp size={20} className="text-gray-500" /> : 
              <ChevronDown size={20} className="text-gray-500" />
            }
          </div>
          
          {showDetails && (
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
                        {contact.primary && (
                          <span className="mr-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Primary
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 mt-3">No emergency contacts set up yet.</p>
              )}
              <div className="mt-4 flex">
                <Link 
                  to="/edit-contacts" 
                  className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
                >
                  Manage emergency contacts
                </Link>
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
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <Bell size={14} className="text-purple-700" />
                </div>
              </div>
              <p>When you activate the alert, your emergency contacts will immediately receive an SMS with your location.</p>
            </div>
            <div className="flex">
              <div className="mr-3 mt-1">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <MapPin size={14} className="text-purple-700" />
                </div>
              </div>
              <p>Your real-time location is shared until you mark yourself as safe.</p>
            </div>
            <div className="flex">
              <div className="mr-3 mt-1">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <Wifi size={14} className="text-purple-700" />
                </div>
              </div>
              <p>Internet connection is required for the alert to be sent.</p>
            </div>
          </div>
        </div>

        {/* Additional Safety Tips */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex">
            <AlertTriangle size={20} className="text-yellow-600 mr-2 flex-shrink-0" />
            <p className="text-sm text-yellow-700">
              Remember: In case of immediate danger, call emergency services directly at 911.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-4xl mx-auto py-4 px-4 text-center">
          <p className="text-xs text-gray-500">
            SafeGuard Emergency Alert &middot; Version 2.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Alert;