import { useState, useEffect } from 'react';
import { mockMealPlan } from '../data/mockData';
import { generateGroceryList } from '../utils/dnaAnalysis';
import { GroceryItem } from '../types';

const GroceryList = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  useEffect(() => {
    // Generate grocery list from the meal plan
    const groceryList = generateGroceryList(mockMealPlan);
    setGroceryItems(groceryList.items);
  }, []);
  
  const toggleItemChecked = (id: string) => {
    setGroceryItems(prevItems => 
      prevItems.map(item => 
        item.ingredient.id === id 
          ? { ...item, checked: !item.checked } 
          : item
      )
    );
  };
  
  const checkAllItems = () => {
    setGroceryItems(prevItems => 
      prevItems.map(item => ({ ...item, checked: true }))
    );
  };
  
  const uncheckAllItems = () => {
    setGroceryItems(prevItems => 
      prevItems.map(item => ({ ...item, checked: false }))
    );
  };
  
  const filteredItems = groceryItems.filter(item => {
    // Apply filter
    if (filter === 'checked' && !item.checked) return false;
    if (filter === 'unchecked' && item.checked) return false;
    
    // Apply search
    if (searchTerm && !item.ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Group items by category (for this demo, we'll just use the first letter)
  const groupedItems: Record<string, GroceryItem[]> = {};
  
  filteredItems.forEach(item => {
    const firstLetter = item.ingredient.name[0].toUpperCase();
    if (!groupedItems[firstLetter]) {
      groupedItems[firstLetter] = [];
    }
    groupedItems[firstLetter].push(item);
  });
  
  const sortedGroups = Object.keys(groupedItems).sort();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Your Grocery List</h1>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <button
            onClick={checkAllItems}
            className="bg-custom-teal hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-300"
          >
            Check All
          </button>
          <button
            onClick={uncheckAllItems}
            className="bg-custom-gray hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg shadow-sm transition duration-300"
          >
            Uncheck All
          </button>
        </div>
      </div>
      
      <div className="bg-custom-light rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search ingredients..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <select
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Items</option>
              <option value="unchecked">Unchecked Only</option>
              <option value="checked">Checked Only</option>
            </select>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{filteredItems.length} items</span>
            <span>
              {groceryItems.filter(item => item.checked).length} of {groceryItems.length} checked
            </span>
          </div>
          <div className="w-full bg-custom-gray rounded-full h-2.5">
            <div 
              className="bg-custom-teal h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${(groceryItems.filter(item => item.checked).length / groceryItems.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {sortedGroups.length > 0 ? (
          <div className="space-y-6">
            {sortedGroups.map(group => (
              <div key={group}>
                <h3 className="text-lg font-semibold mb-3 border-b pb-2">{group}</h3>
                <ul className="space-y-2">
                  {groupedItems[group].map(item => (
                    <li key={item.ingredient.id} className="flex items-center py-2">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItemChecked(item.ingredient.id)}
                        className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500"
                      />
                      <div className="ml-3 flex-1">
                        <span className={`font-medium ${item.checked ? 'line-through text-gray-400' : ''}`}>
                          {item.ingredient.name}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        {item.totalAmount} {item.ingredient.unit}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 text-lg">No items found</p>
            <p className="text-gray-400 mt-1">Try changing your search or filter</p>
          </div>
        )}
      </div>
      
      <div className="bg-custom-light rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Shopping Tips</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-700 mb-1">Optimized for Your DNA</h3>
            <p className="text-sm text-blue-600">
              This grocery list is tailored to your genetic profile, focusing on ingredients that provide the nutrients your body needs most.
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-700 mb-1">Seasonal Produce</h3>
            <p className="text-sm text-green-600">
              When possible, choose seasonal produce for better flavor, nutrition, and environmental impact.
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-medium text-yellow-700 mb-1">Food Storage</h3>
            <p className="text-sm text-yellow-600">
              Store leafy greens with a paper towel to absorb moisture and keep them fresh longer. Keep berries unwashed until ready to eat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroceryList;
