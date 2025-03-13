export interface DNAProfile {
  id: string;
  name: string;
  geneticMarkers: GeneticMarker[];
  nutritionalNeeds: NutritionalNeeds;
  healthConditions: string[];
  allergies: string[];
}

export interface GeneticMarker {
  id: string;
  name: string;
  description: string;
  impact: NutritionalImpact[];
}

export interface NutritionalImpact {
  nutrient: string;
  effect: 'increase' | 'decrease' | 'neutral';
  recommendation: string;
}

export interface NutritionalNeeds {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  vitamins: Record<string, number>;
  minerals: Record<string, number>;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  nutritionalValue: NutritionalValue;
  ingredients: Ingredient[];
  preparationTime: number;
  instructions: string[];
  image?: string;
  tags: string[];
}

export interface NutritionalValue {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  vitamins: Record<string, number>;
  minerals: Record<string, number>;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  nutritionalValuePer100g: NutritionalValue;
}

export interface MealPlan {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  days: MealPlanDay[];
}

export interface MealPlanDay {
  date: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
}

export interface GroceryList {
  id: string;
  mealPlanId: string;
  items: GroceryItem[];
}

export interface GroceryItem {
  ingredient: Ingredient;
  totalAmount: number;
  checked: boolean;
}
