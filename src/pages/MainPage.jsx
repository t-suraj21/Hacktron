import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// You would need to install these icons: npm install lucide-react
import { Shield, FileText, BookOpen, LogOut, Bell, Menu, X, User, ChevronDown } from 'lucide-react';

const MainPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('Sarah');
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Mom', phone: '555-123-4567' },
    { name: 'Jane (Sister)', phone: '555-987-6543' }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    // Prevent navigation with back button
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handleBackButton);
    
    // Check if token exists, otherwise redirect to login
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    
    // You would fetch user data and emergency contacts here
    
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  const handleBackButton = () => {
    window.history.pushState(null, '', window.location.href);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header/Navbar */}
      <header className="bg-purple-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-200" />
              <span className="ml-2 text-xl font-bold text-white">ShieldHer</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/alert" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-purple-100 hover:bg-purple-600 hover:text-white transition duration-150">
                <Bell className="mr-1.5 h-5 w-5" />
                Emergency Alert
              </Link>
              <Link to="/harassment-report" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-purple-100 hover:bg-purple-600 hover:text-white transition duration-150">
                <FileText className="mr-1.5 h-5 w-5" />
                Report Incident
              </Link>
              <Link to="/resources" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-purple-100 hover:bg-purple-600 hover:text-white transition duration-150">
                <BookOpen className="mr-1.5 h-5 w-5" />
                Resources
              </Link>
              
              {/* User dropdown */}
              <div className="relative ml-3">
                <div>
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-purple-100 hover:bg-purple-600 hover:text-white rounded-md transition duration-150"
                  >
                    <User className="mr-1.5 h-5 w-5" />
                    {userName}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </div>
                {dropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                    <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </nav>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button 
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-purple-200 hover:text-white hover:bg-purple-600 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-purple-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/alert" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-600">
                <Bell className="mr-2 h-5 w-5" />
                Emergency Alert
              </Link>
              <Link to="/harassment-report" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-600">
                <FileText className="mr-2 h-5 w-5" />
                Report Incident
              </Link>
              <Link to="/resources" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-600">
                <BookOpen className="mr-2 h-5 w-5" />
                Resources
              </Link>
              <Link to="/profile" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-600">
                <User className="mr-2 h-5 w-5" />
                Profile
              </Link>
              <button onClick={handleLogout} className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-600">
                <LogOut className="mr-2 h-5 w-5" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Welcome Banner */}
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back, {userName}</h1>
              <p className="text-gray-600">We hope you're having a safe day. Your safety is our priority.</p>
            </div>
            
            {/* Quick Actions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-purple-100">
                <div className="bg-red-500 py-3 px-4">
                  <h3 className="text-lg font-medium text-white">Emergency Alert</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">Quickly send your location to emergency contacts.</p>
                  <Link to="/alert" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 w-full">
                    Send Alert
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-purple-100">
                <div className="bg-indigo-500 py-3 px-4">
                  <h3 className="text-lg font-medium text-white">Report Incident</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">Document and report harassment or unsafe situations.</p>
                  <Link to="/harassment-report" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full">
                    File Report
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-purple-100">
                <div className="bg-teal-500 py-3 px-4">
                  <h3 className="text-lg font-medium text-white">Safety Resources</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">Access helpful information and local support services.</p>
                  <Link to="/resources" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 w-full">
                    View Resources
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Emergency Contacts Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Emergency Contacts</h2>
                <Link to="/edit-contacts" className="text-sm text-purple-600 hover:text-purple-800">
                  Edit Contacts
                </Link>
              </div>
              {emergencyContacts.length > 0 ? (
                <div className="space-y-3">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-gray-800">{contact.name}</p>
                        <p className="text-sm text-gray-600">{contact.phone}</p>
                      </div>
                      <a 
                        href={`tel:${contact.phone.replace(/-/g, '')}`}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200"
                      >
                        Call
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No emergency contacts set up yet. Add contacts for quick access during emergencies.</p>
              )}
              {emergencyContacts.length < 5 && (
                <Link 
                  to="/add-contact" 
                  className="mt-4 inline-flex items-center text-sm text-purple-600 hover:text-purple-800"
                >
                  + Add new contact
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">&copy; 2025 SafeGuard. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <Link to="/help" className="text-sm text-gray-500 hover:text-gray-700">Help</Link>
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-700">Privacy</Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-700">Terms</Link>
              <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-700">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;