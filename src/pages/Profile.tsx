import { useState } from 'react';
import { mockDNAProfile } from '../data/mockData';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'dna' | 'preferences' | 'account'>('profile');
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({ ...mockDNAProfile });
  
  const handleTabChange = (tab: 'profile' | 'dna' | 'preferences' | 'account') => {
    setActiveTab(tab);
    setEditMode(false);
  };
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  
  const handleSaveProfile = () => {
    // In a real app, this would save to a backend
    console.log('Saving profile:', profile);
    setEditMode(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAllergiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allergies = e.target.value.split(',').map(item => item.trim());
    setProfile(prev => ({
      ...prev,
      allergies
    }));
  };
  
  const handleHealthConditionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const healthConditions = e.target.value.split(',').map(item => item.trim());
    setProfile(prev => ({
      ...prev,
      healthConditions
    }));
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Profile</h1>
        {activeTab === 'profile' && (
          <button
            onClick={toggleEditMode}
            className={`mt-4 md:mt-0 ${
              editMode 
                ? 'bg-custom-gray hover:bg-gray-300 text-gray-800' 
                : 'bg-custom-teal hover:bg-teal-700 text-white'
            } font-medium py-2 px-4 rounded-lg shadow-sm transition duration-300`}
          >
            {editMode ? 'Cancel' : 'Edit Profile'}
          </button>
        )}
      </div>
      
      {/* Tabs */}
      <div className="bg-custom-light rounded-lg shadow-md mb-6 overflow-hidden">
        <div className="flex overflow-x-auto">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'profile' 
                ? 'bg-custom-teal text-white' 
                : 'bg-custom-light text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('profile')}
          >
            Profile
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'dna' 
                ? 'bg-custom-teal text-white' 
                : 'bg-custom-light text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('dna')}
          >
            DNA Data
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'preferences' 
                ? 'bg-custom-teal text-white' 
                : 'bg-custom-light text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('preferences')}
          >
            Preferences
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'account' 
                ? 'bg-custom-teal text-white' 
                : 'bg-custom-light text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('account')}
          >
            Account
          </button>
        </div>
        
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="bg-custom-gray p-6 rounded-lg text-center">
                    <div className="w-24 h-24 bg-custom-teal rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
                    <p className="text-gray-600 mt-1">Member since 2025</p>
                    
                    <div className="mt-6 space-y-2 text-left">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-600">user@example.com</span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-600">(555) 123-4567</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 md:pl-6">
                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={profile.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Allergies</label>
                        <input
                          type="text"
                          value={profile.allergies.join(', ')}
                          onChange={handleAllergiesChange}
                          placeholder="Separate with commas"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Health Conditions</label>
                        <input
                          type="text"
                          value={profile.healthConditions.join(', ')}
                          onChange={handleHealthConditionsChange}
                          placeholder="Separate with commas"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      
                      <div className="pt-4">
                        <button
                          onClick={handleSaveProfile}
                          className="bg-custom-teal hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg shadow-sm transition duration-300"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Allergies</h4>
                          <div className="flex flex-wrap gap-2">
                            {profile.allergies.length > 0 ? (
                              profile.allergies.map((allergy, index) => (
                                <span key={index} className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
                                  {allergy}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500">No allergies listed</span>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Health Conditions</h4>
                          <div className="flex flex-wrap gap-2">
                            {profile.healthConditions.length > 0 ? (
                              profile.healthConditions.map((condition, index) => (
                                <span key={index} className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                                  {condition}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500">No health conditions listed</span>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Nutritional Needs</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-gray-100 p-3 rounded-lg text-center">
                              <div className="text-2xl font-bold text-teal-700">{profile.nutritionalNeeds.calories}</div>
                              <div className="text-sm text-gray-600">Calories</div>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-lg text-center">
                              <div className="text-2xl font-bold text-teal-700">{profile.nutritionalNeeds.protein}g</div>
                              <div className="text-sm text-gray-600">Protein</div>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-lg text-center">
                              <div className="text-2xl font-bold text-teal-700">{profile.nutritionalNeeds.carbs}g</div>
                              <div className="text-sm text-gray-600">Carbs</div>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-lg text-center">
                              <div className="text-2xl font-bold text-teal-700">{profile.nutritionalNeeds.fat}g</div>
                              <div className="text-sm text-gray-600">Fat</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* DNA Data Tab */}
          {activeTab === 'dna' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Your DNA Data</h3>
                <button className="bg-custom-teal hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-300">
                  Upload New Data
                </button>
              </div>
              
              <div className="bg-custom-gray p-4 rounded-lg mb-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium text-gray-800">Your data is private and secure</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Your DNA data is encrypted and only used to generate personalized meal plans. We never share your genetic information with third parties.
                </p>
              </div>
              
              <h4 className="font-medium text-gray-700 mb-3">Genetic Markers</h4>
              <div className="space-y-4 mb-6">
                {profile.geneticMarkers.map((marker) => (
                  <div key={marker.id} className="bg-custom-light p-4 rounded-lg shadow-sm">
                    <h5 className="font-semibold text-gray-800 mb-1">{marker.name}</h5>
                    <p className="text-sm text-gray-600 mb-3">{marker.description}</p>
                    <div className="space-y-2">
                      {marker.impact.map((impact, index) => (
                        <div key={index} className="flex items-center">
                          <span className={`w-3 h-3 rounded-full mr-2 ${
                            impact.effect === 'increase' 
                              ? 'bg-green-500' 
                              : impact.effect === 'decrease'
                                ? 'bg-red-500'
                                : 'bg-gray-500'
                          }`}></span>
                          <span className="text-sm text-gray-700">
                            <span className="font-medium">{impact.nutrient}:</span> {impact.recommendation}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">DNA Data Management</h4>
                <p className="text-sm text-blue-600 mb-3">
                  You can delete your DNA data at any time. This will remove all genetic information from our servers.
                </p>
                <button className="bg-white text-red-600 hover:bg-red-50 border border-red-300 font-medium py-2 px-4 rounded-lg transition duration-300">
                  Delete DNA Data
                </button>
              </div>
            </div>
          )}
          
          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Meal Preferences</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Dietary Preferences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo', 'Low Carb', 'Gluten Free', 'Dairy Free'].map((diet) => (
                      <label key={diet} className="flex items-center bg-custom-light p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" />
                        <span className="ml-2 text-gray-700">{diet}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Meal Plan Settings</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-600 mb-2">Calories per day</label>
                      <input
                        type="range"
                        min="1500"
                        max="3000"
                        step="100"
                        defaultValue="2200"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1500</span>
                        <span>2200</span>
                        <span>3000</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-600 mb-2">Meals per day</label>
                      <div className="flex space-x-2">
                        {[3, 4, 5, 6].map((num) => (
                          <label key={num} className="flex-1 flex items-center justify-center bg-custom-light p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                            <input type="radio" name="mealsPerDay" className="w-4 h-4 text-teal-600 focus:ring-teal-500" defaultChecked={num === 4} />
                            <span className="ml-2 text-gray-700">{num}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" defaultChecked />
                        <span className="ml-2 text-gray-700">Include snacks in meal plan</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500" defaultChecked />
                        <span className="ml-2 text-gray-700">Prioritize recipes based on DNA profile</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Excluded Ingredients</h4>
                  <div className="bg-custom-light p-4 rounded-lg">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {['Mushrooms', 'Bell Peppers', 'Eggplant'].map((item) => (
                        <span key={item} className="bg-custom-gray text-gray-800 text-sm px-3 py-1 rounded-full flex items-center">
                          <span>{item}</span>
                          <button className="ml-2 text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Add ingredient to exclude..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                      <button className="bg-custom-teal hover:bg-teal-700 text-white px-4 py-2 rounded-r-lg">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="bg-custom-teal hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg shadow-sm transition duration-300">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Account Tab */}
          {activeTab === 'account' && (
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Account Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="user@example.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="(555) 123-4567"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-600 mb-2">Current Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <button className="bg-custom-teal hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-300">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Notification Settings</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between bg-custom-light p-3 rounded-lg">
                      <span className="text-gray-700">Email notifications</span>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                        <input type="checkbox" className="absolute w-6 h-6 transition duration-200 ease-in-out bg-white border-2 border-gray-300 rounded-full appearance-none cursor-pointer peer checked:right-0 checked:border-teal-600 right-6" defaultChecked />
                        <span className="absolute inset-0 transition duration-200 ease-in-out rounded-full bg-gray-300 peer-checked:bg-teal-600"></span>
                      </div>
                    </label>
                    <label className="flex items-center justify-between bg-custom-light p-3 rounded-lg">
                      <span className="text-gray-700">SMS notifications</span>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                        <input type="checkbox" className="absolute w-6 h-6 transition duration-200 ease-in-out bg-white border-2 border-gray-300 rounded-full appearance-none cursor-pointer peer checked:right-0 checked:border-teal-600 right-6" />
                        <span className="absolute inset-0 transition duration-200 ease-in-out rounded-full bg-gray-300 peer-checked:bg-teal-600"></span>
                      </div>
                    </label>
                    <label className="flex items-center justify-between bg-custom-light p-3 rounded-lg">
                      <span className="text-gray-700">Weekly meal plan reminders</span>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                        <input type="checkbox" className="absolute w-6 h-6 transition duration-200 ease-in-out bg-white border-2 border-gray-300 rounded-full appearance-none cursor-pointer peer checked:right-0 checked:border-teal-600 right-6" defaultChecked />
                        <span className="absolute inset-0 transition duration-200 ease-in-out rounded-full bg-gray-300 peer-checked:bg-teal-600"></span>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <button className="text-red-600 hover:text-red-800 font-medium transition duration-300">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
