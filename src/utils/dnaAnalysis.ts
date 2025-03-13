import { DNAProfile, Meal, MealPlan, NutritionalNeeds } from '../types';

/**
 * Analyzes a DNA profile to determine optimal nutritional needs
 * @param profile The DNA profile to analyze
 * @returns Optimized nutritional needs based on genetic markers
 */
export const analyzeNutritionalNeeds = (profile: DNAProfile): NutritionalNeeds => {
  // Start with the base nutritional needs
  const optimizedNeeds = { ...profile.nutritionalNeeds };

  // Adjust based on genetic markers
  profile.geneticMarkers.forEach(marker => {
    marker.impact.forEach(impact => {
      // Adjust vitamins and minerals based on genetic markers
      if (impact.effect === 'increase') {
        if (optimizedNeeds.vitamins[impact.nutrient]) {
          optimizedNeeds.vitamins[impact.nutrient] *= 1.2; // Increase by 20%
        }
        if (optimizedNeeds.minerals[impact.nutrient]) {
          optimizedNeeds.minerals[impact.nutrient] *= 1.2; // Increase by 20%
        }
      } else if (impact.effect === 'decrease') {
        if (optimizedNeeds.vitamins[impact.nutrient]) {
          optimizedNeeds.vitamins[impact.nutrient] *= 0.8; // Decrease by 20%
        }
        if (optimizedNeeds.minerals[impact.nutrient]) {
          optimizedNeeds.minerals[impact.nutrient] *= 0.8; // Decrease by 20%
        }
      }
    });
  });

  return optimizedNeeds;
};

/**
 * Scores a meal based on how well it matches the nutritional needs of a DNA profile
 * @param meal The meal to score
 * @param profile The DNA profile to compare against
 * @returns A score from 0-100 indicating compatibility
 */
export const scoreMealForProfile = (meal: Meal, profile: DNAProfile): number => {
  const optimizedNeeds = analyzeNutritionalNeeds(profile);
  let score = 100;

  // Check for allergens
  const allergyMatch = profile.allergies.some(allergy => 
    meal.ingredients.some(ingredient => 
      ingredient.name.toLowerCase().includes(allergy.toLowerCase())
    )
  );
  
  if (allergyMatch) {
    return 0; // Zero score for meals with allergens
  }

  // Check macronutrient balance
  const calorieRatio = meal.nutritionalValue.calories / optimizedNeeds.calories;
  if (calorieRatio < 0.1 || calorieRatio > 0.5) {
    score -= 20;
  }

  const proteinRatio = meal.nutritionalValue.protein / optimizedNeeds.protein;
  if (proteinRatio < 0.1 || proteinRatio > 0.5) {
    score -= 15;
  }

  // Check micronutrients based on genetic markers
  profile.geneticMarkers.forEach(marker => {
    marker.impact.forEach(impact => {
      const nutrient = impact.nutrient;
      
      // Check if the meal provides nutrients that should be increased
      if (impact.effect === 'increase') {
        const hasNutrient = 
          (meal.nutritionalValue.vitamins[nutrient] && meal.nutritionalValue.vitamins[nutrient] > 0) ||
          (meal.nutritionalValue.minerals[nutrient] && meal.nutritionalValue.minerals[nutrient] > 0);
        
        if (!hasNutrient) {
          score -= 10;
        }
      }
      
      // Check if the meal avoids nutrients that should be decreased
      if (impact.effect === 'decrease') {
        const hasNutrient = 
          (meal.nutritionalValue.vitamins[nutrient] && meal.nutritionalValue.vitamins[nutrient] > 0) ||
          (meal.nutritionalValue.minerals[nutrient] && meal.nutritionalValue.minerals[nutrient] > 0);
        
        if (hasNutrient) {
          score -= 10;
        }
      }
    });
  });

  // Ensure score is within 0-100 range
  return Math.max(0, Math.min(100, score));
};

/**
 * Generates a personalized meal plan based on DNA profile
 * @param profile The DNA profile to use for personalization
 * @param availableMeals Array of meals to choose from
 * @param days Number of days to plan for
 * @returns A personalized meal plan
 */
export const generateMealPlan = (
  profile: DNAProfile, 
  availableMeals: Meal[], 
  days: number
): MealPlan => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + days - 1);
  
  // Score all meals for this profile
  const scoredMeals = availableMeals.map(meal => ({
    meal,
    score: scoreMealForProfile(meal, profile)
  })).filter(item => item.score > 0); // Remove any meals with allergens
  
  // Sort by score (highest first)
  scoredMeals.sort((a, b) => b.score - a.score);
  
  // Create meal plan days
  const mealPlanDays = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(startDate.getDate() + i);
    
    // Rotate through the top-scoring meals for variety
    const breakfastIndex = i % scoredMeals.length;
    const lunchIndex = (i + Math.floor(scoredMeals.length / 3)) % scoredMeals.length;
    const dinnerIndex = (i + Math.floor(2 * scoredMeals.length / 3)) % scoredMeals.length;
    const snackIndex = (i + Math.floor(scoredMeals.length / 2)) % scoredMeals.length;
    
    mealPlanDays.push({
      date: date.toISOString().split('T')[0],
      breakfast: scoredMeals[breakfastIndex].meal,
      lunch: scoredMeals[lunchIndex].meal,
      dinner: scoredMeals[dinnerIndex].meal,
      snacks: [scoredMeals[snackIndex].meal]
    });
  }
  
  return {
    id: `plan-${Date.now()}`,
    userId: profile.id,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
    days: mealPlanDays
  };
};

/**
 * Generates a grocery list from a meal plan
 * @param mealPlan The meal plan to generate a grocery list for
 * @returns A grocery list with all needed ingredients
 */
export const generateGroceryList = (mealPlan: MealPlan) => {
  const ingredientMap = new Map();
  
  // Collect all ingredients from all meals in the plan
  mealPlan.days.forEach(day => {
    const meals = [day.breakfast, day.lunch, day.dinner, ...day.snacks];
    
    meals.forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        const key = ingredient.id;
        
        if (ingredientMap.has(key)) {
          // Update amount if ingredient already exists
          const existingItem = ingredientMap.get(key);
          existingItem.totalAmount += ingredient.amount;
          ingredientMap.set(key, existingItem);
        } else {
          // Add new ingredient
          ingredientMap.set(key, {
            ingredient,
            totalAmount: ingredient.amount,
            checked: false
          });
        }
      });
    });
  });
  
  return {
    id: `grocery-${Date.now()}`,
    mealPlanId: mealPlan.id,
    items: Array.from(ingredientMap.values())
  };
};
