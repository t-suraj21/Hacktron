import React, { useState } from 'react';
import { 
  AlertCircle, Calendar, Clock, MapPin, Shield, 
  Send, FileText, User, Users, CheckCircle, 
  Info, Camera, X, ChevronRight, Clipboard 
} from 'lucide-react';

const EnhancedHarassmentReport = () => {
  const [formData, setFormData] = useState({
    caseId: generateCaseId(),
    incidentType: '',
    description: '',
    date: '',
    time: '',
    location: '',
    witnesses: '',
    perpetratorInfo: '',
    evidenceInfo: '',
    reporterName: '',
    reporterContact: '',
    reporterAgency: '',
    consentToContact: false,
    consentToShare: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [locationLoading, setLocationLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Generate a case ID with format GOV-YYYY-XXXXX
  function generateCaseId() {
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    return `GOV-${year}-${randomDigits}`;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleGetLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          setFormData(prev => ({
            ...prev,
            location: `${lat}, ${lng}`
          }));
          setLocationLoading(false);
        },
        (error) => {
          alert(`Error getting location: ${error.message}`);
          setLocationLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setLocationLoading(false);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.incidentType) newErrors.incidentType = 'Please select an incident type';
      if (!formData.date) newErrors.date = 'Date is required';
      if (!formData.description || formData.description.length < 10) 
        newErrors.description = 'Description must be at least 10 characters';
    } else if (step === 3) {
      if (!formData.consentToShare) newErrors.consentToShare = 'Consent to share is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setActiveStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call to government system
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send data to the server here
      console.log('Submitting report:', formData);
      
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error) {
      alert('Error submitting report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      caseId: generateCaseId(),
      incidentType: '',
      description: '',
      date: '',
      time: '',
      location: '',
      witnesses: '',
      perpetratorInfo: '',
      evidenceInfo: '',
      reporterName: '',
      reporterContact: '',
      reporterAgency: '',
      consentToContact: false,
      consentToShare: false
    });
    setIsSubmitted(false);
    setErrors({});
    setActiveStep(1);
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // Progress steps
  const steps = [
    { number: 1, title: "Incident Details" },
    { number: 2, title: "Additional Information" },
    { number: 3, title: "Contact & Submit" }
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-50 p-8 border-b border-green-100">
            <div className="flex justify-center">
              <div className="bg-green-100 rounded-full p-3">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-green-800 mt-4">Report Successfully Submitted</h2>
            <p className="text-center text-green-700 mt-2">Your case has been registered in our system</p>
          </div>
          
          <div className="p-6">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-blue-800">Case Information</h3>
                <button 
                  onClick={() => copyToClipboard(formData.caseId)}
                  className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <Clipboard className="h-4 w-4 mr-1" />
                  {copySuccess ? "Copied!" : "Copy ID"}
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Case ID</p>
                  <p className="text-lg font-mono font-semibold">{formData.caseId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Submission Date</p>
                  <p className="text-lg font-semibold">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Incident Type</p>
                  <p className="text-lg font-semibold">{formData.incidentType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Incident Date</p>
                  <p className="text-lg font-semibold">{formData.date}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Next Steps</h3>
              <ol className="space-y-4">
                <li className="flex">
                  <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-800 text-sm font-medium">1</span>
                  </div>
                  <div>
                    <p className="text-gray-700">Save your case ID for reference: <strong>{formData.caseId}</strong></p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-800 text-sm font-medium">2</span>
                  </div>
                  <div>
                    <p className="text-gray-700">A confirmation email will be sent if you provided contact information</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-800 text-sm font-medium">3</span>
                  </div>
                  <div>
                    <p className="text-gray-700">Your report will be reviewed within 2-3 business days</p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={resetForm}
                className="py-3 px-8 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md"
              >
                Submit Another Report
              </button>
              <button
                onClick={() => window.print()}
                className="py-3 px-8 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors border border-gray-300"
              >
                Print Receipt
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 text-center text-sm text-gray-500 border-t border-gray-200">
            <p>If you have questions about your report, contact the Ethics Office at ethics@gov.agency.gov</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header with seal/logo */}
      <div className="bg-blue-800 text-white p-6 rounded-t-lg flex items-center">
        <div className="bg-white rounded-full p-2 mr-4">
          <Shield className="h-8 w-8 text-blue-800" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Official Harassment Reporting System</h1>
          <p className="text-blue-100">Department of Government Ethics and Workplace Safety</p>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="bg-blue-700 px-6 py-4">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col items-center relative">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeStep >= step.number 
                    ? 'bg-white text-blue-700' 
                    : 'bg-blue-600 text-blue-200'
                } font-bold text-sm z-10`}
              >
                {activeStep > step.number ? <CheckCircle className="h-5 w-5" /> : step.number}
              </div>
              
              <p className={`mt-1 text-xs font-medium ${
                activeStep >= step.number ? 'text-white' : 'text-blue-200'
              }`}>
                {step.title}
              </p>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-4 left-8 w-full h-0.5 bg-blue-600">
                  <div 
                    className={`h-full bg-white transition-all ${
                      activeStep > step.number ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="bg-white p-6 md:p-8 rounded-b-lg shadow-lg border border-gray-200 border-t-0">
        {/* Case ID banner */}
        <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mb-6 flex justify-between items-center">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-gray-700">
                Your case ID: <span className="font-mono font-medium">{formData.caseId}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Save this ID for future reference and to check report status
              </p>
            </div>
          </div>
          <button 
            onClick={() => copyToClipboard(formData.caseId)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            <Clipboard className="h-4 w-4 mr-1" />
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Step 1: Incident Details */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Incident Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="incidentType" className="block text-sm font-medium text-gray-700 mb-1">
                    Type of Harassment*
                  </label>
                  <select
                    id="incidentType"
                    name="incidentType"
                    value={formData.incidentType}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md ${
                      errors.incidentType ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                    aria-invalid={errors.incidentType ? 'true' : 'false'}
                  >
                    <option value="">Select type...</option>
                    <option value="Verbal Harassment">Verbal Harassment</option>
                    <option value="Physical Harassment">Physical Harassment</option>
                    <option value="Sexual Harassment">Sexual Harassment</option>
                    <option value="Discrimination">Discrimination</option>
                    <option value="Workplace Bullying">Workplace Bullying</option>
                    <option value="Retaliation">Retaliation</option>
                    <option value="Hostile Work Environment">Hostile Work Environment</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.incidentType && 
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.incidentType}
                    </p>
                  }
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Incident*
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-md pl-10 ${
                          errors.date ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                        aria-invalid={errors.date ? 'true' : 'false'}
                      />
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                    {errors.date && 
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.date}
                      </p>
                    }
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Time (approx.)
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                      <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description of Incident*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please provide detailed information about what occurred"
                  rows={5}
                  className={`w-full p-3 border rounded-md ${
                    errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                  aria-invalid={errors.description ? 'true' : 'false'}
                />
                <div className="flex justify-between mt-1">
                  {errors.description ? (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.description}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Please be specific and factual. Include what happened, when, and who was involved.
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {formData.description.length} characters
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location of Incident
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Building, floor, room number, or coordinates"
                      className="w-full p-3 border border-gray-300 rounded-md pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  <button
                    type="button"
                    disabled={locationLoading}
                    onClick={handleGetLocation}
                    className={`py-2 px-4 rounded-md flex items-center ${
                      locationLoading 
                        ? 'bg-gray-100 text-gray-500' 
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    } transition border border-blue-200`}
                  >
                    {locationLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Locating...
                      </span>
                    ) : (
                      <>
                        <MapPin className="h-5 w-5 mr-1" />
                        <span>Get Location</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  If using location services, please ensure you are at or near the incident location
                </p>
              </div>
            </div>
          )}
          
          {/* Step 2: Additional Information */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Additional Information
              </h2>

              <div>
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-blue-600 mr-2" />
                  <label htmlFor="witnesses" className="block text-sm font-medium text-gray-700">
                    Witnesses (if any)
                  </label>
                </div>
                <textarea
                  id="witnesses"
                  name="witnesses"
                  value={formData.witnesses}
                  onChange={handleChange}
                  placeholder="Names and contact information of any witnesses"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Include names, roles, and how they witnessed the incident
                </p>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <User className="h-5 w-5 text-blue-600 mr-2" />
                  <label htmlFor="perpetratorInfo" className="block text-sm font-medium text-gray-700">
                    Individual(s) Responsible (if known)
                  </label>
                </div>
                <textarea
                  id="perpetratorInfo"
                  name="perpetratorInfo"
                  value={formData.perpetratorInfo}
                  onChange={handleChange}
                  placeholder="Name, position, agency, or any identifying information"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 text-blue-600 mr-2" />
                  <label htmlFor="evidenceInfo" className="block text-sm font-medium text-gray-700">
                    Evidence
                  </label>
                </div>
                <textarea
                  id="evidenceInfo"
                  name="evidenceInfo"
                  value={formData.evidenceInfo}
                  onChange={handleChange}
                  placeholder="Describe any evidence (emails, documents, recordings). Do not upload files here."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You will be contacted for secure file transfer if needed
                </p>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-md">
                <div className="flex">
                  <Camera className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Evidence Submission</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      For security and privacy reasons, this form does not accept file uploads. An investigator will contact you if evidence needs to be submitted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Contact & Submit */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Contact Information & Submission
              </h2>
              
              <div className="bg-blue-50 p-5 rounded-md border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-3">Reporter Information</h3>
                <p className="text-sm text-blue-700 mb-4">
                  This information is optional but helps with follow-up investigation
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reporterName" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="reporterName"
                      name="reporterName"
                      value={formData.reporterName}
                      onChange={handleChange}
                      className="w-full p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="reporterContact" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Information
                    </label>
                    <input
                      type="text"
                      id="reporterContact"
                      name="reporterContact"
                      value={formData.reporterContact}
                      onChange={handleChange}
                      placeholder="Email or phone number"
                      className="w-full p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label htmlFor="reporterAgency" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Agency/Department
                  </label>
                  <input
                    type="text"
                    id="reporterAgency"
                    name="reporterAgency"
                    value={formData.reporterAgency}
                    onChange={handleChange}
                    className="w-full p-3 border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-800">Consent & Privacy</h3>
                
                <div className="bg-white border border-gray-200 rounded-md p-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consentToContact"
                      name="consentToContact"
                      checked={formData.consentToContact}
                      onChange={handleChange}
                      className="h-5 w-5 text-blue-600 mt-1 mr-3 rounded focus:ring-blue-500"
                    />
                    <div>
                      <label htmlFor="consentToContact" className="text-sm text-gray-700 font-medium">
                        I consent to be contacted regarding this report
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        An investigator may need to contact you for additional information
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={`bg-white border rounded-md p-4 ${
                  errors.consentToShare ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="consentToShare"
                      name="consentToShare"
                      checked={formData.consentToShare}
                      onChange={handleChange}
                      className={`h-5 w-5 mt-1 mr-3 rounded focus:ring-blue-500 ${
                        errors.consentToShare ? 'border-red-500' : 'text-blue-600'
                      }`}
                      aria-invalid={errors.consentToShare ? 'true' : 'false'}
                    />
                    <div>
                      <label htmlFor="consentToShare" className="text-sm text-gray-700 font-medium">
                        I understand this report may be shared with relevant authorities*
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        This report may be shared with appropriate departments, agencies, or supervisors as needed for investigation
                      </p>{errors.consentToShare && 
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.consentToShare}
                        </p>
                      }
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-md border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-2">Before You Submit</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-600">Your report will be kept confidential to the extent possible by law</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-600">You will receive a confirmation with your case ID</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-600">Federal law prohibits retaliation against those who report harassment</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Footer with navigation */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col-reverse sm:flex-row sm:justify-between">
            {activeStep > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="mt-3 sm:mt-0 py-3 px-6 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition flex items-center justify-center"
              >
                <ChevronRight className="h-5 w-5 mr-1 transform rotate-180" />
                Back
              </button>
            )}
            
            <div className="flex justify-end space-x-3">
              {activeStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm flex items-center"
                >
                  Continue
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-8 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-sm flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Submit Report
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
        
        {/* Help section */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-gray-800">Need Help?</h3>
              <p className="text-sm text-gray-600 mt-1">
                If you need assistance with this form or have questions about the reporting process, 
                please contact the Ethics Office at <span className="text-blue-600">ethics@gov.agency.gov</span> or call 
                <span className="text-blue-600"> (555) 123-4567</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 rounded-b-lg border-t border-gray-200">
        <p>Protected by the Privacy Act of 1974 • All information is encrypted and securely stored</p>
        <p className="mt-1">
          Government Harassment Reporting System • Version 2.3.1 • Last Updated: April 2025
        </p>
      </div>
    </div>
  );
};

export default EnhancedHarassmentReport;