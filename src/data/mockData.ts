import { DNAProfile, GeneticMarker, Meal, MealPlan, Ingredient } from '../types';

// Mock genetic markers
export const mockGeneticMarkers: GeneticMarker[] = [
  {
    id: '1',
    name: 'MTHFR C677T',
    description: 'Affects folate metabolism and methylation processes',
    impact: [
      {
        nutrient: 'Folate',
        effect: 'increase',
        recommendation: 'Increase consumption of leafy greens and folate-rich foods'
      },
      {
        nutrient: 'Vitamin B12',
        effect: 'increase',
        recommendation: 'Ensure adequate B12 intake through animal products or supplements'
      }
    ]
  },
  {
    id: '2',
    name: 'APOE E4',
    description: 'Associated with cardiovascular health and lipid metabolism',
    impact: [
      {
        nutrient: 'Saturated Fat',
        effect: 'decrease',
        recommendation: 'Reduce saturated fat intake, focus on plant-based fats'
      },
      {
        nutrient: 'Omega-3',
        effect: 'increase',
        recommendation: 'Increase omega-3 fatty acids from fish and plant sources'
      }
    ]
  },
  {
    id: '3',
    name: 'FTO',
    description: 'Associated with obesity risk and appetite regulation',
    impact: [
      {
        nutrient: 'Protein',
        effect: 'increase',
        recommendation: 'Higher protein intake may help with satiety'
      },
      {
        nutrient: 'Refined Carbs',
        effect: 'decrease',
        recommendation: 'Limit refined carbohydrates and focus on complex carbs'
      }
    ]
  },
  {
    id: '4',
    name: 'CYP1A2',
    description: 'Affects caffeine metabolism',
    impact: [
      {
        nutrient: 'Caffeine',
        effect: 'decrease',
        recommendation: 'Limit caffeine intake, especially later in the day'
      }
    ]
  },
  {
    id: '5',
    name: 'PEMT',
    description: 'Affects choline production and metabolism',
    impact: [
      {
        nutrient: 'Choline',
        effect: 'increase',
        recommendation: 'Increase choline-rich foods like eggs and liver'
      }
    ]
  }
];

// Mock DNA profile
export const mockDNAProfile: DNAProfile = {
  id: '1',
  name: 'John Doe',
  geneticMarkers: mockGeneticMarkers,
  nutritionalNeeds: {
    calories: 2200,
    protein: 120,
    carbs: 220,
    fat: 73,
    vitamins: {
      'B12': 2.4,
      'D': 600,
      'Folate': 400,
      'C': 90
    },
    minerals: {
      'Iron': 8,
      'Calcium': 1000,
      'Magnesium': 400,
      'Zinc': 11
    }
  },
  healthConditions: ['Mild lactose intolerance'],
  allergies: ['Peanuts']
};

// Mock ingredients
export const mockIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Spinach',
    amount: 100,
    unit: 'g',
    nutritionalValuePer100g: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      vitamins: { 'A': 9377, 'C': 28, 'K': 483, 'Folate': 194 },
      minerals: { 'Iron': 2.7, 'Calcium': 99, 'Magnesium': 79, 'Potassium': 558 }
    }
  },
  {
    id: '2',
    name: 'Salmon',
    amount: 100,
    unit: 'g',
    nutritionalValuePer100g: {
      calories: 208,
      protein: 20.4,
      carbs: 0,
      fat: 13.4,
      vitamins: { 'D': 526, 'B12': 2.6, 'B6': 0.6 },
      minerals: { 'Selenium': 31, 'Phosphorus': 240, 'Potassium': 363 }
    }
  },
  {
    id: '3',
    name: 'Quinoa',
    amount: 100,
    unit: 'g',
    nutritionalValuePer100g: {
      calories: 120,
      protein: 4.4,
      carbs: 21.3,
      fat: 1.9,
      vitamins: { 'E': 1.2, 'B6': 0.1, 'Folate': 42 },
      minerals: { 'Iron': 1.5, 'Magnesium': 64, 'Zinc': 1.1, 'Potassium': 172 }
    }
  },
  {
    id: '4',
    name: 'Blueberries',
    amount: 100,
    unit: 'g',
    nutritionalValuePer100g: {
      calories: 57,
      protein: 0.7,
      carbs: 14.5,
      fat: 0.3,
      vitamins: { 'C': 9.7, 'K': 19.3, 'A': 54 },
      minerals: { 'Manganese': 0.3, 'Potassium': 77 }
    }
  },
  {
    id: '5',
    name: 'Eggs',
    amount: 1,
    unit: 'large',
    nutritionalValuePer100g: {
      calories: 155,
      protein: 12.6,
      carbs: 0.6,
      fat: 10.6,
      vitamins: { 'D': 87, 'B12': 1.1, 'A': 487, 'Choline': 147 },
      minerals: { 'Iron': 1.8, 'Zinc': 1.3, 'Selenium': 30.7 }
    }
  },
  {
    id: '6',
    name: 'Avocado',
    amount: 100,
    unit: 'g',
    nutritionalValuePer100g: {
      calories: 160,
      protein: 2,
      carbs: 8.5,
      fat: 14.7,
      vitamins: { 'K': 21, 'E': 2.1, 'C': 10 },
      minerals: { 'Potassium': 485, 'Magnesium': 29, 'Folate': 81 }
    }
  },
  {
    id: '7',
    name: 'Sweet Potato',
    amount: 100,
    unit: 'g',
    nutritionalValuePer100g: {
      calories: 86,
      protein: 1.6,
      carbs: 20.1,
      fat: 0.1,
      vitamins: { 'A': 14187, 'C': 2.4, 'B6': 0.2 },
      minerals: { 'Potassium': 337, 'Manganese': 0.3 }
    }
  },
  {
    id: '8',
    name: 'Chicken Breast',
    amount: 100,
    unit: 'g',
    nutritionalValuePer100g: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      vitamins: { 'B6': 0.6, 'B12': 0.3, 'D': 5 },
      minerals: { 'Phosphorus': 196, 'Selenium': 24, 'Potassium': 256 }
    }
  },
  {
    id: '9',
    name: 'Broccoli',
    amount: 100,
    unit: 'g',
    nutritionalValuePer100g: {
      calories: 34,
      protein: 2.8,
      carbs: 6.6,
      fat: 0.4,
      vitamins: { 'C': 89.2, 'K': 102, 'A': 623 },
      minerals: { 'Potassium': 316, 'Calcium': 47, 'Magnesium': 21 }
    }
  },
  {
    id: '10',
    name: 'Olive Oil',
    amount: 15,
    unit: 'ml',
    nutritionalValuePer100g: {
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
      vitamins: { 'E': 14.4, 'K': 60.2 },
      minerals: {}
    }
  }
];

// Mock meals
export const mockMeals: Meal[] = [
  {
    id: '1',
    name: 'Spinach and Salmon Breakfast Bowl',
    description: 'A nutrient-dense breakfast bowl with sautéed spinach and baked salmon',
    nutritionalValue: {
      calories: 350,
      protein: 30,
      carbs: 15,
      fat: 20,
      vitamins: { 'D': 526, 'B12': 2.6, 'Folate': 194 },
      minerals: { 'Iron': 2.7, 'Calcium': 99, 'Magnesium': 79 }
    },
    ingredients: [
      { ...mockIngredients[0], amount: 100 }, // Spinach
      { ...mockIngredients[1], amount: 100 }, // Salmon
      { ...mockIngredients[9], amount: 5 }    // Olive Oil
    ],
    preparationTime: 20,
    instructions: [
      'Preheat oven to 400°F (200°C)',
      'Season salmon with salt and pepper',
      'Bake salmon for 12-15 minutes',
      'Sauté spinach in olive oil until wilted',
      'Combine in a bowl and serve'
    ],
    image: 'spinach_salmon_bowl.jpg',
    tags: ['high-protein', 'omega-3', 'folate-rich']
  },
  {
    id: '2',
    name: 'Quinoa Avocado Salad',
    description: 'A refreshing salad with quinoa, avocado, and mixed vegetables',
    nutritionalValue: {
      calories: 420,
      protein: 12,
      carbs: 45,
      fat: 22,
      vitamins: { 'E': 3.3, 'K': 21, 'Folate': 123 },
      minerals: { 'Magnesium': 93, 'Potassium': 657 }
    },
    ingredients: [
      { ...mockIngredients[2], amount: 150 }, // Quinoa
      { ...mockIngredients[5], amount: 100 }, // Avocado
      { ...mockIngredients[8], amount: 50 },  // Broccoli
      { ...mockIngredients[9], amount: 10 }   // Olive Oil
    ],
    preparationTime: 25,
    instructions: [
      'Cook quinoa according to package instructions',
      'Chop broccoli into small florets and steam for 5 minutes',
      'Dice avocado',
      'Combine all ingredients in a bowl',
      'Drizzle with olive oil and season with salt and pepper'
    ],
    image: 'quinoa_avocado_salad.jpg',
    tags: ['plant-based', 'complex-carbs', 'healthy-fats']
  },
  {
    id: '3',
    name: 'Blueberry Protein Smoothie',
    description: 'A delicious smoothie packed with antioxidants and protein',
    nutritionalValue: {
      calories: 300,
      protein: 20,
      carbs: 30,
      fat: 10,
      vitamins: { 'C': 9.7, 'D': 87, 'B12': 1.1 },
      minerals: { 'Calcium': 300, 'Potassium': 77 }
    },
    ingredients: [
      { ...mockIngredients[3], amount: 100 }, // Blueberries
      { ...mockIngredients[4], amount: 1 }    // Egg (for protein)
    ],
    preparationTime: 5,
    instructions: [
      'Blend all ingredients until smooth',
      'Serve immediately'
    ],
    image: 'blueberry_smoothie.jpg',
    tags: ['quick', 'antioxidants', 'breakfast']
  },
  {
    id: '4',
    name: 'Sweet Potato and Chicken Bowl',
    description: 'A hearty bowl with roasted sweet potatoes and grilled chicken',
    nutritionalValue: {
      calories: 450,
      protein: 35,
      carbs: 40,
      fat: 15,
      vitamins: { 'A': 14187, 'B6': 0.8, 'C': 2.4 },
      minerals: { 'Potassium': 593, 'Phosphorus': 196 }
    },
    ingredients: [
      { ...mockIngredients[6], amount: 200 }, // Sweet Potato
      { ...mockIngredients[7], amount: 100 }, // Chicken Breast
      { ...mockIngredients[9], amount: 5 }    // Olive Oil
    ],
    preparationTime: 35,
    instructions: [
      'Preheat oven to 425°F (220°C)',
      'Cube sweet potatoes and toss with olive oil, salt, and pepper',
      'Roast sweet potatoes for 25-30 minutes',
      'Season chicken breast with salt and pepper',
      'Grill chicken for 6-7 minutes per side',
      'Slice chicken and combine with sweet potatoes in a bowl'
    ],
    image: 'sweet_potato_chicken.jpg',
    tags: ['high-protein', 'complex-carbs', 'vitamin-A']
  },
  {
    id: '5',
    name: 'Salmon and Broccoli Dinner',
    description: 'A nutritious dinner with baked salmon and steamed broccoli',
    nutritionalValue: {
      calories: 380,
      protein: 32,
      carbs: 10,
      fat: 22,
      vitamins: { 'D': 526, 'C': 89.2, 'B12': 2.6 },
      minerals: { 'Selenium': 55, 'Potassium': 679 }
    },
    ingredients: [
      { ...mockIngredients[1], amount: 150 }, // Salmon
      { ...mockIngredients[8], amount: 100 }, // Broccoli
      { ...mockIngredients[9], amount: 5 }    // Olive Oil
    ],
    preparationTime: 25,
    instructions: [
      'Preheat oven to 400°F (200°C)',
      'Season salmon with salt, pepper, and herbs',
      'Bake salmon for 12-15 minutes',
      'Steam broccoli for 5-7 minutes',
      'Drizzle with olive oil and serve'
    ],
    image: 'salmon_broccoli.jpg',
    tags: ['omega-3', 'high-protein', 'vitamin-C']
  }
];

// Mock meal plan
export const mockMealPlan: MealPlan = {
  id: '1',
  userId: '1',
  startDate: '2025-03-14',
  endDate: '2025-03-20',
  days: [
    {
      date: '2025-03-14',
      breakfast: mockMeals[0],
      lunch: mockMeals[1],
      dinner: mockMeals[4],
      snacks: [mockMeals[2]]
    },
    {
      date: '2025-03-15',
      breakfast: mockMeals[2],
      lunch: mockMeals[3],
      dinner: mockMeals[4],
      snacks: []
    },
    {
      date: '2025-03-16',
      breakfast: mockMeals[0],
      lunch: mockMeals[1],
      dinner: mockMeals[3],
      snacks: [mockMeals[2]]
    },
    {
      date: '2025-03-17',
      breakfast: mockMeals[2],
      lunch: mockMeals[4],
      dinner: mockMeals[1],
      snacks: []
    },
    {
      date: '2025-03-18',
      breakfast: mockMeals[0],
      lunch: mockMeals[3],
      dinner: mockMeals[4],
      snacks: [mockMeals[2]]
    },
    {
      date: '2025-03-19',
      breakfast: mockMeals[2],
      lunch: mockMeals[1],
      dinner: mockMeals[3],
      snacks: []
    },
    {
      date: '2025-03-20',
      breakfast: mockMeals[0],
      lunch: mockMeals[4],
      dinner: mockMeals[1],
      snacks: [mockMeals[2]]
    }
  ]
};
