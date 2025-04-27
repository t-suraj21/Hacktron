import React, { useState, useEffect } from 'react';

const Resources = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating API fetch for martial arts videos
    // In a real implementation, you would replace this with your actual API call
    const fetchVideos = async () => {
      try {
        setLoading(true);
        // Mock API response - replace with actual API endpoint
        // Example: const response = await fetch('https://your-api-endpoint/videos');
        
        // Simulated API response
        const mockVideos = [
          { id: 1, title: 'Basic Self-Defense Techniques', thumbnail: '/api/placeholder/320/180', duration: '12:45' },
          { id: 2, title: 'Essential Martial Arts for Women', thumbnail: '/api/placeholder/320/180', duration: '8:30' },
          { id: 3, title: 'Situational Awareness Training', thumbnail: '/api/placeholder/320/180', duration: '15:20' },
          { id: 4, title: 'Emergency Response Techniques', thumbnail: '/api/placeholder/320/180', duration: '10:15' }
        ];
        
        setTimeout(() => {
          setVideos(mockVideos);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load videos. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchVideos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-800">Women's Safety Resources</h1>
      
      {/* Self-Defense Videos Section */}
      <section className="mb-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">Self-Defense Video Tutorials</h2>
        
        {loading && <p className="text-center py-4">Loading videos...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map(video => (
            <div key={video.id} className="border rounded-lg overflow-hidden bg-gray-50 hover:shadow-lg transition-shadow">
              <img src={video.thumbnail} alt={video.title} className="w-full h-40 object-cover" />
              <div className="p-3">
                <h3 className="font-medium text-lg">{video.title}</h3>
                <p className="text-sm text-gray-600">Duration: {video.duration}</p>
                <button className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm">
                  Watch Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Laws and Rights Section */}
      <section className="mb-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">Laws and Legal Rights</h2>
        <div className="space-y-4">
          <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
            <h3 className="font-semibold text-lg">Workplace Harassment Laws</h3>
            <p className="mt-1">Information about legal protections against workplace harassment and discrimination.</p>
            <a href="#" className="text-purple-600 hover:underline inline-block mt-2">Learn More</a>
          </div>
          
          <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
            <h3 className="font-semibold text-lg">Domestic Violence Protection</h3>
            <p className="mt-1">Resources on restraining orders, shelters, and legal assistance for domestic violence survivors.</p>
            <a href="#" className="text-purple-600 hover:underline inline-block mt-2">Learn More</a>
          </div>
          
          <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
            <h3 className="font-semibold text-lg">Public Safety Regulations</h3>
            <p className="mt-1">Information about public safety laws and your rights in public spaces.</p>
            <a href="#" className="text-purple-600 hover:underline inline-block mt-2">Learn More</a>
          </div>
        </div>
      </section>
      
      {/* Safety Apps Section */}
      <section className="mb-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">Safety Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg">Emergency SOS</h3>
            <p className="text-gray-600 mt-1">One-touch emergency alert app with location tracking</p>
            <div className="flex justify-between items-center mt-3">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Free</span>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm">
                Download
              </button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg">SafeWalk</h3>
            <p className="text-gray-600 mt-1">Track your route and share with trusted contacts</p>
            <div className="flex justify-between items-center mt-3">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Premium</span>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm">
                Download
              </button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-lg">Guard Angel</h3>
            <p className="text-gray-600 mt-1">24/7 monitored personal security service</p>
            <div className="flex justify-between items-center mt-3">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Subscription</span>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm">
                Download
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Emergency Contacts Section */}
      <section className="mb-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">Emergency Contacts</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-red-50 rounded-lg">
            <div className="bg-red-500 text-white p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Emergency Services</h3>
              <p className="text-xl font-bold text-red-600">911</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
            <div className="bg-blue-500 text-white p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">National Domestic Violence Hotline</h3>
              <p className="text-xl font-bold text-blue-600">1-800-799-7233</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-purple-50 rounded-lg">
            <div className="bg-purple-500 text-white p-2 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Crisis Text Line</h3>
              <p className="text-xl font-bold text-purple-600">Text HOME to 741741</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Support Groups Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">Support Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Local Women's Centers</h3>
            <p>Find women's centers in your area that offer support groups, counseling, and resources:</p>
            <div className="mt-3">
              <input type="text" placeholder="Enter your zip code" className="border rounded p-2 w-full mb-2" />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md w-full">
                Find Centers
              </button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Online Communities</h3>
            <p>Join online support groups and communities:</p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                <a href="#" className="text-purple-600 hover:underline">Women's Safety Network Forum</a>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                <a href="#" className="text-purple-600 hover:underline">Survivor Support Group</a>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                <a href="#" className="text-purple-600 hover:underline">Self-Defense Community</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;