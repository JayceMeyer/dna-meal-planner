import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockMealPlan, mockDNAProfile } from '../data/mockData';
import { Meal } from '../types';

// Define meal type image mappings
const mealTypeImages = {
  breakfast: [
    "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // oatmeal
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // avocado toast
    "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // smoothie bowl
  ],
  lunch: [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // salad
    "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // sandwich
    "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // soup
  ],
  dinner: [
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // pasta
    "https://images.unsplash.com/photo-1598514983318-2f64f55b2b36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // steak
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // vegetable dish
  ],
  snack: [
    "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // nuts
    "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // yogurt
    "https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // fruit
  ]
};

// Specific meal images for certain meals
const specificMealImages: Record<string, string> = {
  "Blueberry Protein Smoothie": "https://images.unsplash.com/photo-1638176067000-9a2539427de7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // blueberry smoothie
  "Sweet Potato and Chicken Bowl": "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" // sweet potato and chicken
};

// Function to get a consistent image for a meal based on its ID and type
const getMealImage = (meal: Meal, mealType: string) => {
  // Check if this meal has a specific image assigned
  if (specificMealImages[meal.name]) {
    return specificMealImages[meal.name];
  }
  
  // Otherwise use the general meal type images
  const typeKey = mealType.toLowerCase() as keyof typeof mealTypeImages;
  const images = mealTypeImages[typeKey] || mealTypeImages.snack;
  // Use the meal ID to consistently select the same image for a meal
  const hash = meal.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return images[hash % images.length];
};

// Debug function to check if images are loading
const debugMealImages = () => {
  console.log("Checking meal images:");
  if (mockMealPlan.days[0].breakfast) {
    console.log(`Breakfast: ${mockMealPlan.days[0].breakfast.name} -> ${getMealImage(mockMealPlan.days[0].breakfast, 'Breakfast')}`);
  }
  if (mockMealPlan.days[0].lunch) {
    console.log(`Lunch: ${mockMealPlan.days[0].lunch.name} -> ${getMealImage(mockMealPlan.days[0].lunch, 'Lunch')}`);
  }
  if (mockMealPlan.days[0].dinner) {
    console.log(`Dinner: ${mockMealPlan.days[0].dinner.name} -> ${getMealImage(mockMealPlan.days[0].dinner, 'Dinner')}`);
  }
  mockMealPlan.days[0].snacks.forEach(snack => {
    console.log(`Snack: ${snack.name} -> ${getMealImage(snack, 'Snack')}`);
  });
};

const MealPlan = () => {
  const [currentDay, setCurrentDay] = useState<number>(0);
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);
  
  // Debug images on component mount
  useEffect(() => {
    debugMealImages();
  }, []);
  
  const handleDayChange = (index: number) => {
    setCurrentDay(index);
    setExpandedMealId(null);
  };
  
  const handleMealSelect = (meal: Meal) => {
    setExpandedMealId(expandedMealId === meal.id ? null : meal.id);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };
  
  const currentDayData = mockMealPlan.days[currentDay];

  const renderMealCard = (meal: Meal, mealType: string, bgColor: string, textColor: string) => {
    const isExpanded = expandedMealId === meal.id;
    const mealImage = getMealImage(meal, mealType);
    
    return (
      <div className="mb-6">
        <div 
          className={`bg-custom-light rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 ${
            isExpanded ? 'ring-2 ring-teal-500' : ''
          }`}
          onClick={() => handleMealSelect(meal)}
        >
          <div className="h-48 overflow-hidden">
            <img
              src={mealImage}
              alt={meal.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error(`Failed to load image for ${meal.name}`);
                // Fallback to a generic food image if the specific one fails to load
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
              }}
            />
          </div>
          <div className="p-4">
            <div className={`${bgColor} ${textColor} text-xs font-semibold px-2 py-1 rounded-full inline-block mb-2`}>
              {mealType}
            </div>
            <h3 className="text-lg font-semibold mb-2">{meal.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{meal.description}</p>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">{meal.preparationTime} min</span>
              <span className="font-medium">{meal.nutritionalValue.calories} calories</span>
            </div>
          </div>
        </div>
        
        {/* Expanded meal details */}
        {isExpanded && (
          <div className="bg-custom-light rounded-b-lg shadow-md p-4 sm:p-6 mt-1 border-t border-gray-200 animate-fadeIn">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              <div className="w-full lg:w-1/3">
                <img
                  src={mealImage}
                  alt={meal.name}
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    console.error(`Failed to load detail image for ${meal.name}`);
                    // Fallback to a generic food image if the specific one fails to load
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";
                  }}
                />
                
                <div className="mt-4 bg-custom-gray p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Nutritional Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Calories</p>
                      <p className="font-medium">{meal.nutritionalValue.calories} kcal</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Protein</p>
                      <p className="font-medium">{meal.nutritionalValue.protein}g</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Carbs</p>
                      <p className="font-medium">{meal.nutritionalValue.carbs}g</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Fat</p>
                      <p className="font-medium">{meal.nutritionalValue.fat}g</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">DNA Compatibility</h4>
                    <div className="flex items-center">
                      <div className="w-full bg-custom-gray rounded-full h-2.5">
                        <div className="bg-custom-teal h-2.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">85%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      This meal is optimized for your genetic profile
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-2/3 mt-4 lg:mt-0">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">{meal.name}</h2>
                <p className="text-gray-600 mb-4">{meal.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {meal.tags.map((tag) => (
                    <span key={tag} className="bg-custom-gray text-gray-800 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
                  <ul className="space-y-2">
                    {meal.ingredients.map((ingredient) => (
                      <li key={ingredient.id} className="flex items-center">
                        <span className="w-8 h-8 bg-custom-teal-light text-teal-700 rounded-full flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span>
                          {ingredient.amount} {ingredient.unit} {ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                  <ol className="space-y-3">
                    {meal.instructions.map((instruction, index) => (
                      <li key={index} className="flex">
                        <span className="w-6 h-6 bg-custom-teal text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 px-2 sm:px-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Your Weekly Meal Plan</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Tailored for {mockDNAProfile.name} • {formatDate(mockMealPlan.startDate)} - {formatDate(mockMealPlan.endDate)}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/grocery-list"
            className="bg-custom-teal hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition duration-300 inline-flex items-center text-sm sm:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            View Grocery List
          </Link>
        </div>
      </div>
      
      {/* Day selector */}
      <div className="bg-custom-light rounded-lg shadow-md p-4 mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max pb-1">
          {mockMealPlan.days.map((day, index) => (
            <button
              key={day.date}
              className={`px-3 py-2 text-sm sm:text-base sm:px-4 rounded-lg transition-colors flex-shrink-0 ${
                currentDay === index
                  ? 'bg-custom-teal text-white'
                  : 'bg-custom-gray hover:bg-gray-200 text-gray-800'
              }`}
              onClick={() => handleDayChange(index)}
            >
              {formatDate(day.date)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Meal plan for selected day */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Breakfast */}
        <div className={`col-span-1 ${expandedMealId === currentDayData.breakfast.id ? 'md:col-span-2 lg:col-span-3' : ''}`}>
          {renderMealCard(currentDayData.breakfast, 'Breakfast', 'bg-yellow-100', 'text-yellow-800')}
        </div>
        
        {/* Lunch */}
        <div className={`col-span-1 ${expandedMealId === currentDayData.lunch.id ? 'md:col-span-2 lg:col-span-3' : ''}`}>
          {renderMealCard(currentDayData.lunch, 'Lunch', 'bg-blue-100', 'text-blue-800')}
        </div>
        
        {/* Dinner */}
        <div className={`col-span-1 ${expandedMealId === currentDayData.dinner.id ? 'md:col-span-2 lg:col-span-3' : ''}`}>
          {renderMealCard(currentDayData.dinner, 'Dinner', 'bg-purple-100', 'text-purple-800')}
        </div>
        
        {/* Snacks */}
        {currentDayData.snacks.map((snack) => (
          <div key={snack.id} className={`col-span-1 ${expandedMealId === snack.id ? 'md:col-span-2 lg:col-span-3' : ''}`}>
            {renderMealCard(snack, 'Snack', 'bg-green-100', 'text-green-800')}
          </div>
        ))}
      </div>
      
      {/* DNA insights */}
      <div className="bg-custom-light rounded-lg shadow-md p-4 sm:p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">DNA Insights</h2>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          Your meal plan is personalized based on these key genetic markers from your DNA profile:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {mockDNAProfile.geneticMarkers.map((marker) => (
            <div key={marker.id} className="bg-custom-gray p-3 sm:p-4 rounded-lg">
              <h3 className="font-semibold mb-1">{marker.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">{marker.description}</p>
              <div className="space-y-1">
                {marker.impact.map((impact, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <span className={`w-3 h-3 rounded-full mr-2 ${
                      impact.effect === 'increase' 
                        ? 'bg-green-500' 
                        : impact.effect === 'decrease'
                          ? 'bg-red-500'
                          : 'bg-gray-500'
                    }`}></span>
                    <span className="text-gray-700">{impact.nutrient}: </span>
                    <span className="ml-1 font-medium">{impact.effect}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlan;
