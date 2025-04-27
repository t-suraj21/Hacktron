import { useState } from 'react';
import { AlertCircle, Clock, MapPin, Shield, Upload, CheckCircle } from 'lucide-react';

export default function HarassmentReportPage() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    incidentType: '',
    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    description: '',
    witnessInfo: '',
    evidenceDescription: '',
    consentToVerify: false,
    ipLocationConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const nextStep = () => {
    setFormStep(formStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // This would connect to your backend API for processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormStep(4);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-700 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Women's Safety Portal</h1>
          <p className="text-sm opacity-90">Safe, Secure, Supportive</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {/* Page Title */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-purple-800">Harassment Report Portal</h2>
            <p className="text-gray-600">Your safety is our priority. All reports are taken seriously and handled confidentially.</p>
          </div>

          {/* Progress Indicator */}
          {!submitted && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                {[1, 2, 3].map((step) => (
                  <div 
                    key={step} 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      formStep >= step ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full">
                <div 
                  className="absolute h-2 bg-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${((formStep - 1) / 2) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Incident Details</span>
                <span>Evidence & Context</span>
                <span>Verification</span>
              </div>
            </div>
          )}

          {/* Form Steps */}
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Incident Information */}
            {formStep === 1 && (
              <div className="space-y-6">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-6">
                  <h3 className="font-medium text-purple-800 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" /> Important Information
                  </h3>
                  <p className="text-sm text-gray-700 mt-2">
                    This form is designed to report genuine cases of harassment. Filing false reports is a serious offense
                    that may lead to legal consequences. We employ verification methods to ensure the authenticity of reports.
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Type of Incident</label>
                  <select 
                    name="incidentType" 
                    value={formData.incidentType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select incident type</option>
                    <option value="verbal">Verbal Harassment</option>
                    <option value="physical">Physical Harassment</option>
                    <option value="online">Online Harassment</option>
                    <option value="stalking">Stalking</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Clock className="w-4 h-4 inline mr-1" /> Date of Incident
                    </label>
                    <input 
                      type="date" 
                      name="incidentDate"
                      value={formData.incidentDate}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Clock className="w-4 h-4 inline mr-1" /> Time of Incident
                    </label>
                    <input 
                      type="time" 
                      name="incidentTime"
                      value={formData.incidentTime}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" /> Location of Incident
                  </label>
                  <input 
                    type="text"
                    name="incidentLocation"
                    value={formData.incidentLocation}
                    onChange={handleChange}
                    placeholder="Physical location or online platform/website"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Detailed Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Please provide a detailed account of what happened..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">Be as specific as possible, including what was said or done.</p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Evidence Collection */}
            {formStep === 2 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                  <h3 className="font-medium text-blue-800">Evidence Helps Verify Your Report</h3>
                  <p className="text-sm text-gray-700 mt-2">
                    Supporting evidence strengthens your report and helps us take appropriate action.
                    Any evidence you provide will be handled confidentially.
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Witness Information</label>
                  <textarea 
                    name="witnessInfo"
                    value={formData.witnessInfo}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Names and contact information of any witnesses (if applicable)"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Evidence Description</label>
                  <textarea 
                    name="evidenceDescription"
                    value={formData.evidenceDescription}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Describe any evidence you have (screenshots, messages, etc.)"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-700 font-medium">Upload Evidence Files</p>
                  <p className="text-sm text-gray-500">Drag and drop files here or click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">Supports images, videos, screenshots, and documents</p>
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Select Files
                  </button>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Verification and Consent */}
            {formStep === 3 && (
              <div className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-6">
                  <h3 className="font-medium text-yellow-800 flex items-center">
                    <Shield className="w-5 h-5 mr-2" /> Verification Process
                  </h3>
                  <p className="text-sm text-gray-700 mt-2">
                    To ensure the accuracy of reports and protect all parties involved, we use a verification system.
                    This helps us address genuine cases while preventing misuse of the reporting system.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800">IP Address Verification</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Our system can verify if your IP address and the reported person's IP address were active at the same location
                    during the reported incident time. This helps validate in-person harassment claims.
                  </p>
                  
                  <div className="mt-4 flex items-start">
                    <input
                      type="checkbox"
                      id="ipLocationConsent"
                      name="ipLocationConsent"
                      checked={formData.ipLocationConsent}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="ipLocationConsent" className="ml-2 block text-sm text-gray-700">
                      I consent to the collection and analysis of IP address and location data to help verify this report
                    </label>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800">Declaration of Truth</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Filing a false report is a serious matter that can have legal consequences and undermines the credibility
                    of legitimate harassment reports.
                  </p>
                  
                  <div className="mt-4 flex items-start">
                    <input
                      type="checkbox"
                      id="consentToVerify"
                      name="consentToVerify"
                      checked={formData.consentToVerify}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="consentToVerify" className="ml-2 block text-sm text-gray-700">
                      I declare that all information provided in this report is true and accurate to the best of my knowledge.
                      I understand that filing a false report may result in legal consequences.
                    </label>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.consentToVerify || !formData.ipLocationConsent}
                    className={`px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${
                      isSubmitting || !formData.consentToVerify || !formData.ipLocationConsent
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {formStep === 4 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-800">Report Submitted Successfully</h3>
                <p className="text-gray-600 mt-4 max-w-md mx-auto">
                  Thank you for your report. Our team will review the details and may contact you for additional information.
                  A confirmation has been sent to your registered email address.
                </p>
                <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100 max-w-md mx-auto text-left">
                  <h4 className="font-medium text-gray-800">Reference Number:</h4>
                  <p className="text-purple-700 font-mono text-lg">HR-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p className="text-xs text-gray-500 mt-2">Please save this reference number for future communications</p>
                </div>
                <button
                  type="button"
                  onClick={() => window.location.href = "/dashboard"}
                  className="mt-8 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </form>

          {/* Help Resources */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">Need Immediate Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800">Emergency Contacts</h4>
                <ul className="mt-2 text-sm space-y-1">
                  <li>Police Emergency: 100</li>
                  <li>Women's Helpline: 1091</li>
                  <li>Domestic Violence Helpline: 181</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-800">Support Resources</h4>
                <ul className="mt-2 text-sm space-y-1">
                  <li>24/7 Crisis Counseling</li>
                  <li>Legal Aid Services</li>
                  <li>Support Groups</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-lg">Women's Safety Portal</h3>
              <p className="text-sm text-gray-300">Empowering women through safety and support</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12">
              <div>
                <h4 className="font-medium mb-2">Resources</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>Safety Tips</li>
                  <li>Legal Information</li>
                  <li>Community Support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Quick Links</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>Emergency Help</li>
                  <li>Report Harassment</li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Women's Safety Portal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}