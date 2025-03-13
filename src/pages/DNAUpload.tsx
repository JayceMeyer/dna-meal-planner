import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDNAProfile } from '../data/mockData';

const DNAUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'service'>('file');
  const [selectedService, setSelectedService] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file && uploadMethod === 'file') {
      alert('Please select a file first');
      return;
    }

    if (!selectedService && uploadMethod === 'service') {
      alert('Please select a service first');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          // Redirect to meal plan page after successful upload
          navigate('/meal-plan');
        }, 500);
      }
    }, 200);
  };

  const handleUseSampleData = () => {
    // Use mock data and navigate to meal plan
    console.log('Using sample data:', mockDNAProfile);
    navigate('/meal-plan');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Upload Your DNA Data</h1>
      
      <div className="bg-custom-light rounded-lg shadow-md p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Choose Upload Method</h2>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                uploadMethod === 'file'
                  ? 'border-teal-600 bg-custom-teal-light text-teal-700'
                  : 'border-gray-300 hover:border-teal-600'
              }`}
              onClick={() => setUploadMethod('file')}
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                <span>Upload DNA File</span>
              </div>
            </button>
            <button
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                uploadMethod === 'service'
                  ? 'border-teal-600 bg-custom-teal-light text-teal-700'
                  : 'border-gray-300 hover:border-teal-600'
              }`}
              onClick={() => setUploadMethod('service')}
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Connect DNA Service</span>
              </div>
            </button>
          </div>
        </div>

        {uploadMethod === 'file' ? (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Upload DNA File</h3>
            <p className="text-gray-600 mb-4">
              Upload your raw DNA data file from services like 23andMe, AncestryDNA, or other genetic testing providers.
            </p>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragging ? 'border-teal-500 bg-custom-teal-light' : 'border-gray-300 hover:border-teal-500 bg-custom-light'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".txt,.csv,.zip"
              />
              
              {file ? (
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-teal-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-medium text-teal-700">{file.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              ) : (
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="font-medium">Drag and drop your DNA file here</p>
                  <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
                  <p className="text-xs text-gray-500 mt-3">Supported formats: .txt, .csv, .zip</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Connect DNA Service</h3>
            <p className="text-gray-600 mb-4">
              Connect directly to your DNA testing service account to import your genetic data.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['23andMe', 'AncestryDNA', 'MyHeritage'].map((service) => (
                <button
                  key={service}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    selectedService === service
                      ? 'border-teal-600 bg-custom-teal-light'
                      : 'border-gray-300 hover:border-teal-500 bg-custom-light'
                  }`}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="text-center">
                    <div className="h-12 w-12 mx-auto bg-custom-gray rounded-full mb-3 flex items-center justify-center">
                      <span className="font-bold text-gray-700">{service[0]}</span>
                    </div>
                    <p className="font-medium">{service}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {isUploading ? (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Uploading...</h3>
            <div className="w-full bg-custom-gray rounded-full h-4">
              <div
                className="bg-custom-teal h-4 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">{uploadProgress}% Complete</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleUpload}
              className="bg-custom-teal hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
              Upload and Analyze
            </button>
            <button
              onClick={handleUseSampleData}
              className="border border-teal-600 text-teal-600 hover:bg-custom-teal-light font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Use Sample Data
            </button>
          </div>
        )}
      </div>

      <div className="bg-custom-light rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Privacy Information</h2>
        <p className="text-gray-600 mb-4">
          Your DNA data is private and secure. We use industry-standard encryption to protect your information.
        </p>
        <div className="bg-custom-gray p-4 rounded-lg">
          <h3 className="font-medium mb-2">How we use your data:</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Analyze genetic markers related to nutrition and metabolism</li>
            <li>Generate personalized meal recommendations</li>
            <li>Your data is never shared with third parties</li>
            <li>You can delete your data at any time from your profile settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DNAUpload;
