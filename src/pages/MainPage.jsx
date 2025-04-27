import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Icons
import { 
  Shield, FileText, BookOpen, LogOut, Bell, Menu, X, User, ChevronDown, 
  Phone, MapPin, Info, AlertTriangle, Clock, Heart, CheckCircle, Calendar,
  Search, ExternalLink, ArrowRight, MessageCircle, Smartphone, Users
} from 'lucide-react';

const MainPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('Sarah');
  const [lastLoginDate, setLastLoginDate] = useState('April 26, 2025');
  const [location, setLocation] = useState('Denver, CO');
  const [safetyTips, setSafetyTips] = useState([]);
  const [localResources, setLocalResources] = useState([]);
  const [recentAlerts, setRecentAlerts] = useState([]);

  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Mom', phone: '555-123-4567', relationship: 'Family', lastNotified: '2 weeks ago' },
    { name: 'Jane', phone: '555-987-6543', relationship: 'Sister', lastNotified: '1 month ago' },
    { name: 'Michael', phone: '555-456-7890', relationship: 'Friend', lastNotified: 'Never' }
  ]);

  // Government resources
  const [governmentResources, setGovernmentResources] = useState([
    {
      title: 'National Domestic Violence Hotline',
      phone: '1-800-799-7233',
      description: 'Available 24/7 for crisis intervention, safety planning, and referrals to local resources.',
      url: 'https://www.thehotline.org/'
    },
    {
      title: 'RAINN Sexual Assault Hotline',
      phone: '1-800-656-4673',
      description: 'Free, confidential support for survivors of sexual assault and their loved ones.',
      url: 'https://www.rainn.org/'
    },
    {
      title: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: 'Free 24/7 text support for those in crisis.',
      url: 'https://www.crisistextline.org/'
    }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      title: 'Self-Defense Workshop',
      date: 'May 5, 2025',
      location: 'Community Center'
    },
    {
      title: 'Safety Awareness Seminar',
      date: 'May 12, 2025',
      location: 'Public Library'
    }
  ]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    // Fetch safety tips from API (simulated)
    setSafetyTips([
      "Share your location with trusted contacts when traveling alone",
      "Use the buddy system when going out at night",
      "Keep your phone charged and accessible at all times",
      "Trust your instincts - if something feels wrong, it probably is"
    ]);

    // Fetch local resources based on location (simulated)
    setLocalResources([
      {
        name: "Denver Women's Crisis Center",
        address: "123 Safety St, Denver, CO",
        phone: "303-555-1234",
        distance: "1.2 miles"
      },
      {
        name: "Colorado Safe Space Network",
        address: "456 Haven Ave, Denver, CO",
        phone: "303-555-5678",
        distance: "2.5 miles"
      }
    ]);

    // Fetch recent alerts (simulated)
    setRecentAlerts([
      {
        type: "Safety Alert",
        area: "Downtown Denver",
        date: "April 25, 2025",
        description: "Increased reports of harassment near transit stations"
      }
    ]);

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
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-100" />
              <span className="ml-2 text-xl font-bold text-white">ShieldHer</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/alert" className="flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition duration-150">
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
              <Link to="/community" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-purple-100 hover:bg-purple-600 hover:text-white transition duration-150">
                <Users className="mr-1.5 h-5 w-5" />
                Community
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
                    <Link to="/safety-plan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Safety Plan</Link>
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
              <Link to="/alert" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white bg-red-500 hover:bg-red-600">
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
              <Link to="/community" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-600">
                <Users className="mr-2 h-5 w-5" />
                Community
              </Link>
              <Link to="/profile" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-600">
                <User className="mr-2 h-5 w-5" />
                Profile
              </Link>
              <Link to="/safety-plan" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-purple-600">
                <CheckCircle className="mr-2 h-5 w-5" />
                My Safety Plan
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
          {/* Dashboard Header */}
          <div className="px-4 py-5 sm:px-0">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl shadow-md p-6 mb-6 text-white">
              <div className="md:flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}</h1>
                  <div className="flex items-center text-purple-100">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="mr-4">{location}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Last login: {lastLoginDate}</span>
                  </div>
                  <p className="mt-3 max-w-2xl">Your safety and well-being are our top priorities. We're here to help you stay safe and informed.</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link to="/alert" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-full text-indigo-700 bg-white hover:bg-indigo-50 shadow-sm transition duration-150">
                    <Bell className="mr-2 h-5 w-5 text-red-500" />
                    Send Emergency Alert
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Status Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-500">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Safety Status</p>
                    <p className="font-semibold text-gray-800">All Clear</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-500">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Contacts Ready</p>
                    <p className="font-semibold text-gray-800">{emergencyContacts.length} Contacts</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-500">
                <div className="flex items-center">
                  <Smartphone className="h-8 w-8 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Emergency Mode</p>
                    <Link to="/settings" className="font-semibold text-purple-700 hover:text-purple-900">Configure</Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Local Alerts</p>
                    <p className="font-semibold text-gray-800">{recentAlerts.length} Recent</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Quick Actions Column */}
              <div className="lg:col-span-1 space-y-6">
                {/* Emergency Alert Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-red-100">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 py-4 px-5">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Emergency Alert
                    </h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 mb-4">Instantly notify your emergency contacts with your location and situation.</p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-red-500" />
                        <span>Shares your precise location</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MessageCircle className="h-4 w-4 mr-2 text-red-500" />
                        <span>Sends custom distress message</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-red-500" />
                        <span>Calls emergency contact</span>
                      </div>
                    </div>
                    <Link to="/alert" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 w-full">
                      Send Alert Now
                    </Link>
                  </div>
                </div>
                
                {/* Report Incident Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-indigo-100">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 py-4 px-5">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Report Incident
                    </h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 mb-4">Document harassment, stalking, or threatening behavior for your records or authorities.</p>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-2 text-indigo-500" />
                        <span>Secure, timestamped records</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-2 text-indigo-500" />
                        <span>Photo and audio evidence</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 mr-2 text-indigo-500" />
                        <span>Optional law enforcement reporting</span>
                      </div>
                    </div>
                    <Link to="/harassment-report" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full">
                      File Report
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Middle Column - Resources and Tips */}
              <div className="lg:col-span-1 space-y-6">
                {/* Safety Resources Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-teal-100">
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 py-4 px-5">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Safety Resources
                    </h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 mb-4">Access helpful guides, local support services, and safety information.</p>
                    <div className="space-y-3 mb-4">
                      <Link to="/resources/self-defense" className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md hover:bg-gray-100 transition">
                        <span className="text-gray-700">Self Defense Guides</span>
                        <ArrowRight className="h-4 w-4 text-teal-600" />
                      </Link>
                      <Link to="/resources/legal" className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md hover:bg-gray-100 transition">
                        <span className="text-gray-700">Legal Resources</span>
                        <ArrowRight className="h-4 w-4 text-teal-600" />
                      </Link>
                      <Link to="/resources/mental-health" className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md hover:bg-gray-100 transition">
                        <span className="text-gray-700">Mental Health Support</span>
                        <ArrowRight className="h-4 w-4 text-teal-600" />
                      </Link>
                    </div>
                    <Link to="/resources" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 w-full">
                      Browse All Resources
                    </Link>
                  </div>
                </div>
                
                {/* Safety Tips Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-purple-100">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 py-4 px-5 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <Info className="h-5 w-5 mr-2" />
                      Safety Tips
                    </h3>
                    <Link to="/tips" className="text-xs text-purple-100 hover:text-white">See All</Link>
                  </div>
                  <div className="p-5">
                    <ul className="space-y-3">
                      {safetyTips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 pt-1">
                            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                          </div>
                          <p className="ml-3 text-sm text-gray-600">{tip}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Contacts and Local Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Emergency Contacts Section */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-blue-100">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-4 px-5 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <Phone className="h-5 w-5 mr-2" />
                      Emergency Contacts
                    </h3>
                    <Link to="/edit-contacts" className="text-xs text-blue-100 hover:text-white">Edit</Link>
                  </div>
                  <div className="p-5">
                    {emergencyContacts.length > 0 ? (
                      <div className="space-y-3">
                        {emergencyContacts.map((contact, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition">
                            <div>
                              <p className="font-medium text-gray-800">{contact.name}</p>
                              <div className="flex items-center">
                                <p className="text-sm text-gray-500 mr-2">{contact.relationship}</p>
                                <p className="text-xs text-gray-400">Last notified: {contact.lastNotified}</p>
                              </div>
                            </div>
                            <a 
                              href={`tel:${contact.phone.replace(/-/g, '')}`}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 flex items-center"
                            >
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No emergency contacts set up yet.</p>
                    )}
                    {emergencyContacts.length < 5 && (
                      <Link 
                        to="/add-contact" 
                        className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        + Add new contact
                      </Link>
                    )}
                  </div>
                </div>
                
                {/* Local Safety Info Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-yellow-100">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-500 py-4 px-5">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <MapPin className="h-5 w-5 mr-2" />
                      Local Resources
                    </h3>
                  </div>
                  <div className="p-5">
                    <div className="space-y-3 mb-4">
                      {localResources.map((resource, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-md">
                          <p className="font-medium text-gray-800">{resource.name}</p>
                          <p className="text-sm text-gray-500">{resource.address}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-400">{resource.distance} away</span>
                            <a 
                              href={`tel:${resource.phone.replace(/-/g, '')}`}
                              className="text-xs text-blue-600 hover:text-blue-800"
                            >
                              {resource.phone}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link to="/local-resources" className="mt-2 inline-flex items-center justify-center text-sm text-yellow-600 hover:text-yellow-800">
                      View all nearby resources
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Government Resources Section */}
            <div className="px-4 py-5 sm:px-0 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-600" />
                    Official Government Resources
                  </h2>
                  <Link to="/government-resources" className="text-sm text-blue-600 hover:text-blue-800">
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {governmentResources.map((resource, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 transition">
                      <h3 className="font-medium text-gray-900 mb-1">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      <div className="flex justify-between items-center">
                        <a href={`tel:${resource.phone.replace(/-/g, '').replace(/\s+/g, '')}`} className="text-blue-600 font-medium text-sm hover:text-blue-800">
                          {resource.phone}
                        </a>
                        <a href={resource.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                          Website
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Recent Alerts and Events Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Recent Alerts */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                    Safety Alerts in Your Area
                  </h2>
                  <Link to="/alerts" className="text-sm text-amber-600 hover:text-amber-800">
                    View All
                  </Link>
                </div>
                {recentAlerts.length > 0 ? (
                  <div className="space-y-4">
                    {recentAlerts.map((alert, index) => (
                      <div key={index} className="p-4 bg-amber-50 border border-amber-200 rounded-md">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-amber-800">{alert.type}</span>
                          <span className="text-xs text-gray-500">{alert.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{alert.description}</p>
                        <p className="text-xs text-gray-500 mt-1">Area: {alert.area}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No recent alerts in your area.</p>
                )}
                <div className="mt-4">
                  <Link to="/alerts/subscribe" className="text-sm text-amber-600 hover:text-amber-800 flex items-center">
                    Subscribe to safety alerts in your area
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              {/* Upcoming Events */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
                    Upcoming Safety Events
                  </h2>
                  <Link to="/events" className="text-sm text-indigo-600 hover:text-indigo-800">
                    View All
                  </Link>
                </div>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="p-4 bg-indigo-50 border border-indigo-200 rounded-md">
                        <h3 className="font-medium text-indigo-800">{event.title}</h3>
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1 text-indigo-500" />
                          <span className="mr-3">{event.date}</span>
                          <MapPin className="h-4 w-4 mr-1 text-indigo-500" />
                          <span>{event.location}</span>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Link to={`/events/${index}`} className="text-indigo-600 hover:text-indigo-800 text-sm">
                            Learn more
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No upcoming events in your area.</p>
                )}
                <div className="mt-4">
                  <Link to="/events/suggest" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                    Suggest a community safety event
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Safety Plan Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-green-200 mb-6">
              <div className="md:flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    Your Personal Safety Plan
                  </h2>
                  <p className="text-sm text-gray-600">A customized plan to help you stay safe in different situations</p>
                </div>
                <div className="mt-3 md:mt-0">
                  <Link to="/safety-plan/edit" className="inline-flex items-center justify-center px-4 py-2 border border-green-600 rounded-md text-sm font-medium text-green-700 bg-white hover:bg-green-50">
                    Update Safety Plan
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-md hover:bg-green-50 transition">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Heart className="h-4 w-4 mr-2 text-pink-500" />
                    Self-Care Reminders
                  </h3>
                  <p className="text-sm text-gray-600">Regular check-ins and mental health support resources</p>
                  <Link to="/safety-plan/self-care" className="mt-2 inline-flex items-center text-sm text-green-600 hover:text-green-800">
                    View details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                <div className="p-4 border border-gray-200 rounded-md hover:bg-green-50 transition">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-500" />
                    Communication Strategy
                  </h3>
                  <p className="text-sm text-gray-600">Check-in protocol with trusted contacts</p>
                  <Link to="/safety-plan/communication" className="mt-2 inline-flex items-center text-sm text-green-600 hover:text-green-800">
                    View details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                <div className="p-4 border border-gray-200 rounded-md hover:bg-green-50 transition">
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-red-500" />
                    Safe Locations
                  </h3>
                  <p className="text-sm text-gray-600">Pre-identified safe places near home, work, and school</p>
                  <Link to="/safety-plan/locations" className="mt-2 inline-flex items-center text-sm text-green-600 hover:text-green-800">
                    View details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-purple-600" />
              <span className="ml-2 text-lg font-bold text-gray-800">ShieldHer</span>
              <span className="ml-2 text-sm text-gray-500">Empowering safety through technology</span>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="mb-4 md:mb-0">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Emergency</h3>
                <p className="text-sm text-gray-500">Call 911 for immediate help</p>
                <a href="tel:988" className="text-sm text-purple-600 hover:text-purple-800">988 - Mental Health Crisis Line</a>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Links</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/help" className="text-sm text-gray-500 hover:text-gray-700">Help</Link>
                  <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-700">Privacy</Link>
                  <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-700">Terms</Link>
                  <Link to="/contact" className="text-sm text-gray-500 hover:text-gray-700">Contact</Link>
                  <Link to="/about" className="text-sm text-gray-500 hover:text-gray-700">About Us</Link>
                  <Link to="/donate" className="text-sm text-gray-500 hover:text-gray-700">Support Our Mission</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">&copy; 2025 ShieldHer. All rights reserved.</p>
            <p className="text-xs text-gray-400 mt-2 md:mt-0">In partnership with the Department of Justice Office on Violence Against Women</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;