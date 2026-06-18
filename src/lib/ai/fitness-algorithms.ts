// ═══════════════════════════════════════════════════════════════
// Khan's Fitness — AI Fitness Algorithms
// ═══════════════════════════════════════════════════════════════

export interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  advice: string;
  healthRisk: string;
}

export function calculateBMI(weightKg: number, heightCm: number): BMIResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  let category: string, color: string, advice: string, healthRisk: string;

  if (bmi < 16) {
    category = 'Severely Underweight';
    color = '#7A1F2B'; // Wine
    advice = 'You need to gain weight urgently. Consult a doctor and nutritionist immediately.';
    healthRisk = 'Very High';
  } else if (bmi < 18.5) {
    category = 'Underweight';
    color = '#D8A7A7'; // Rose Dust
    advice = 'Focus on calorie-surplus diet with strength training to build healthy mass.';
    healthRisk = 'Moderate';
  } else if (bmi < 25) {
    category = 'Normal Weight';
    color = '#5B0F18'; // Burgundy (Primary accent)
    advice = 'Great job! Maintain your weight with regular exercise and balanced nutrition.';
    healthRisk = 'Low';
  } else if (bmi < 30) {
    category = 'Overweight';
    color = '#D8A7A7'; // Rose Dust
    advice = 'Combine cardio with strength training and maintain a slight calorie deficit.';
    healthRisk = 'Moderate';
  } else if (bmi < 35) {
    category = 'Obese Class I';
    color = '#7A1F2B'; // Wine
    advice = 'Focus on a structured fat loss program with dietary changes and regular exercise.';
    healthRisk = 'High';
  } else if (bmi < 40) {
    category = 'Obese Class II';
    color = '#7A1F2B'; // Wine
    advice = 'Consult a healthcare professional. Start with low-impact exercises and nutritional guidance.';
    healthRisk = 'Very High';
  } else {
    category = 'Obese Class III';
    color = '#5B0F18'; // Burgundy
    advice = 'Seek immediate medical consultation. A supervised program is essential.';
    healthRisk = 'Extremely High';
  }

  return { bmi: Math.round(bmi * 10) / 10, category, color, advice, healthRisk };
}

export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: 'male' | 'female'
): number {
  // Mifflin-St Jeor Equation
  if (gender === 'male') {
    return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + 5);
  }
  return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age - 161);
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9,
  };
  return Math.round(bmr * (multipliers[activityLevel] || 1.55));
}

export function calculateMacros(
  calories: number,
  goal: string
): { protein: number; carbs: number; fat: number } {
  let proteinPct: number, carbsPct: number, fatPct: number;

  switch (goal) {
    case 'weight-loss':
      proteinPct = 0.35;
      carbsPct = 0.35;
      fatPct = 0.30;
      break;
    case 'muscle-gain':
      proteinPct = 0.30;
      carbsPct = 0.45;
      fatPct = 0.25;
      break;
    case 'maintenance':
      proteinPct = 0.25;
      carbsPct = 0.50;
      fatPct = 0.25;
      break;
    default:
      proteinPct = 0.30;
      carbsPct = 0.40;
      fatPct = 0.30;
  }

  return {
    protein: Math.round((calories * proteinPct) / 4),
    carbs: Math.round((calories * carbsPct) / 4),
    fat: Math.round((calories * fatPct) / 9),
  };
}

export function calculateBodyFat(
  gender: 'male' | 'female',
  waistCm: number,
  neckCm: number,
  heightCm: number,
  hipCm?: number
): number {
  // US Navy Method
  if (gender === 'male') {
    const bf = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    return Math.round(bf * 10) / 10;
  }
  const hipVal = hipCm || 90;
  const bf = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipVal - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
  return Math.round(bf * 10) / 10;
}

export function calculateProtein(weightKg: number, goal: string, activityLevel: string): number {
  let multiplier: number;

  if (goal === 'muscle-gain') {
    multiplier = activityLevel === 'very-active' ? 2.2 : 2.0;
  } else if (goal === 'weight-loss') {
    multiplier = activityLevel === 'active' ? 2.0 : 1.8;
  } else {
    multiplier = activityLevel === 'sedentary' ? 1.2 : 1.6;
  }

  return Math.round(weightKg * multiplier);
}

export function calculateWaterIntake(weightKg: number, activityLevel: string): number {
  let base = weightKg * 35; // ml per kg
  if (activityLevel === 'active' || activityLevel === 'very-active') {
    base += 500;
  }
  return Math.round(base / 1000 * 10) / 10; // liters
}

export function calculateLeanBodyMass(weightKg: number, bodyFatPct: number): number {
  return Math.round(weightKg * (1 - bodyFatPct / 100) * 10) / 10;
}

export interface FitnessScore {
  score: number;
  level: string;
  color: string;
  recommendations: string[];
  suggestedPlan: string;
  calorieTarget: number;
}

export function calculateFitnessScore(
  age: number,
  heightCm: number,
  weightKg: number,
  gender: 'male' | 'female',
  fitnessLevel: string,
  goal: string
): FitnessScore {
  const bmiResult = calculateBMI(weightKg, heightCm);
  let score = 50; // Base score

  // BMI score (0-25 points)
  if (bmiResult.bmi >= 18.5 && bmiResult.bmi < 25) score += 25;
  else if (bmiResult.bmi >= 16 && bmiResult.bmi < 18.5) score += 15;
  else if (bmiResult.bmi >= 25 && bmiResult.bmi < 30) score += 10;
  else score += 0;

  // Age factor (0-10 points)
  if (age >= 18 && age <= 35) score += 10;
  else if (age > 35 && age <= 50) score += 7;
  else if (age > 50 && age <= 65) score += 5;
  else score += 3;

  // Fitness level (0-15 points)
  if (fitnessLevel === 'advanced') score += 15;
  else if (fitnessLevel === 'intermediate') score += 10;
  else score += 5;

  score = Math.min(100, Math.max(0, score));

  let level: string, color: string;
  if (score >= 80) { level = 'Excellent'; color = '#5B0F18'; } // Burgundy
  else if (score >= 60) { level = 'Good'; color = '#7A1F2B'; } // Wine
  else if (score >= 40) { level = 'Average'; color = '#D8A7A7'; } // Rose Dust
  else { level = 'Needs Improvement'; color = '#7A1F2B'; } // Wine

  const bmr = calculateBMR(weightKg, heightCm, age, gender);
  const tdee = calculateTDEE(bmr, fitnessLevel === 'beginner' ? 'light' : 'moderate');
  let calorieTarget = tdee;

  if (goal === 'weight-loss') calorieTarget = tdee - 500;
  else if (goal === 'muscle-gain') calorieTarget = tdee + 300;

  const recommendations: string[] = [];
  if (bmiResult.bmi > 25) recommendations.push('Focus on cardiovascular exercise 3-5x per week');
  if (bmiResult.bmi < 18.5) recommendations.push('Increase caloric intake with nutrient-dense foods');
  if (fitnessLevel === 'beginner') recommendations.push('Start with basic compound exercises');
  if (age > 40) recommendations.push('Include flexibility and mobility work');
  recommendations.push('Stay hydrated — aim for 3-4 liters of water daily');
  recommendations.push('Get 7-9 hours of quality sleep per night');

  const suggestedPlan = bmiResult.bmi > 25 ? 'Half Yearly' : 'Quarterly';

  return { score, level, color, recommendations, suggestedPlan, calorieTarget };
}

// ─── Workout Generator ────────────────────────────────────

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  muscleGroup: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
  duration: string;
  intensity: string;
}

const exerciseDB = {
  chest: [
    { name: 'Bench Press', sets: 4, reps: '8-12', rest: '90s', muscleGroup: 'Chest' },
    { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60s', muscleGroup: 'Chest' },
    { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '45s', muscleGroup: 'Chest' },
    { name: 'Push-Ups (Weighted)', sets: 3, reps: '15-20', rest: '45s', muscleGroup: 'Chest' },
    { name: 'Dumbbell Pullover', sets: 3, reps: '10-12', rest: '60s', muscleGroup: 'Chest' },
  ],
  back: [
    { name: 'Deadlift', sets: 4, reps: '6-8', rest: '120s', muscleGroup: 'Back' },
    { name: 'Lat Pulldown', sets: 4, reps: '10-12', rest: '60s', muscleGroup: 'Back' },
    { name: 'Barbell Row', sets: 3, reps: '8-10', rest: '90s', muscleGroup: 'Back' },
    { name: 'Seated Cable Row', sets: 3, reps: '10-12', rest: '60s', muscleGroup: 'Back' },
    { name: 'Face Pulls', sets: 3, reps: '15-20', rest: '45s', muscleGroup: 'Back' },
  ],
  shoulders: [
    { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s', muscleGroup: 'Shoulders' },
    { name: 'Lateral Raises', sets: 4, reps: '12-15', rest: '45s', muscleGroup: 'Shoulders' },
    { name: 'Front Raises', sets: 3, reps: '12-15', rest: '45s', muscleGroup: 'Shoulders' },
    { name: 'Rear Delt Flyes', sets: 3, reps: '12-15', rest: '45s', muscleGroup: 'Shoulders' },
  ],
  legs: [
    { name: 'Squats', sets: 4, reps: '8-10', rest: '120s', muscleGroup: 'Legs' },
    { name: 'Romanian Deadlift', sets: 3, reps: '10-12', rest: '90s', muscleGroup: 'Legs' },
    { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s', muscleGroup: 'Legs' },
    { name: 'Leg Curls', sets: 3, reps: '12-15', rest: '60s', muscleGroup: 'Legs' },
    { name: 'Calf Raises', sets: 4, reps: '15-20', rest: '45s', muscleGroup: 'Legs' },
    { name: 'Lunges', sets: 3, reps: '10/leg', rest: '60s', muscleGroup: 'Legs' },
  ],
  arms: [
    { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60s', muscleGroup: 'Biceps' },
    { name: 'Hammer Curls', sets: 3, reps: '10-12', rest: '45s', muscleGroup: 'Biceps' },
    { name: 'Tricep Pushdowns', sets: 3, reps: '10-12', rest: '45s', muscleGroup: 'Triceps' },
    { name: 'Overhead Tricep Extension', sets: 3, reps: '10-12', rest: '45s', muscleGroup: 'Triceps' },
    { name: 'Preacher Curls', sets: 3, reps: '12-15', rest: '45s', muscleGroup: 'Biceps' },
  ],
  core: [
    { name: 'Planks', sets: 3, reps: '45-60s', rest: '30s', muscleGroup: 'Core' },
    { name: 'Russian Twists', sets: 3, reps: '20', rest: '30s', muscleGroup: 'Core' },
    { name: 'Leg Raises', sets: 3, reps: '12-15', rest: '30s', muscleGroup: 'Core' },
    { name: 'Cable Crunches', sets: 3, reps: '15-20', rest: '30s', muscleGroup: 'Core' },
  ],
  cardio: [
    { name: 'Treadmill Run', sets: 1, reps: '20 min', rest: '-', muscleGroup: 'Cardio' },
    { name: 'Jump Rope', sets: 3, reps: '5 min', rest: '60s', muscleGroup: 'Cardio' },
    { name: 'Cycling', sets: 1, reps: '25 min', rest: '-', muscleGroup: 'Cardio' },
    { name: 'Battle Ropes', sets: 3, reps: '30s', rest: '30s', muscleGroup: 'Cardio' },
  ],
};

export function generateWorkout(
  goal: string,
  level: string,
  days: number
): WorkoutDay[] {
  const plan: WorkoutDay[] = [];

  if (days <= 3) {
    // Full Body Split
    const dayLabels = ['Monday', 'Wednesday', 'Friday'].slice(0, days);
    dayLabels.forEach((day) => {
      const exercises: Exercise[] = [
        exerciseDB.legs[0],
        exerciseDB.chest[0],
        exerciseDB.back[2],
        exerciseDB.shoulders[1],
        exerciseDB.core[0],
      ];
      if (goal === 'weight-loss') exercises.push(exerciseDB.cardio[0]);
      plan.push({
        day,
        focus: 'Full Body',
        exercises: exercises.slice(0, level === 'beginner' ? 4 : 6),
        duration: '45-60 min',
        intensity: level === 'beginner' ? 'Moderate' : 'High',
      });
    });
  } else if (days <= 4) {
    // Upper/Lower Split
    const schedule = [
      { day: 'Monday', focus: 'Upper Body', groups: [...exerciseDB.chest.slice(0, 2), ...exerciseDB.back.slice(1, 3), ...exerciseDB.shoulders.slice(0, 2)] },
      { day: 'Tuesday', focus: 'Lower Body', groups: [...exerciseDB.legs.slice(0, 4), ...exerciseDB.core.slice(0, 2)] },
      { day: 'Thursday', focus: 'Upper Body + Arms', groups: [...exerciseDB.chest.slice(1, 3), ...exerciseDB.back.slice(2, 4), ...exerciseDB.arms.slice(0, 3)] },
      { day: 'Friday', focus: 'Lower Body + Cardio', groups: [...exerciseDB.legs.slice(1, 5), ...exerciseDB.cardio.slice(0, 1)] },
    ];
    schedule.slice(0, days).forEach((s) => {
      plan.push({
        day: s.day,
        focus: s.focus,
        exercises: s.groups.slice(0, level === 'beginner' ? 4 : 6),
        duration: '50-65 min',
        intensity: level === 'beginner' ? 'Moderate' : 'High',
      });
    });
  } else {
    // Push Pull Legs
    const schedule = [
      { day: 'Monday', focus: 'Push (Chest, Shoulders, Triceps)', groups: [...exerciseDB.chest.slice(0, 3), ...exerciseDB.shoulders.slice(0, 2), exerciseDB.arms[2]] },
      { day: 'Tuesday', focus: 'Pull (Back, Biceps)', groups: [...exerciseDB.back.slice(0, 4), ...exerciseDB.arms.slice(0, 2)] },
      { day: 'Wednesday', focus: 'Legs & Core', groups: [...exerciseDB.legs.slice(0, 4), ...exerciseDB.core.slice(0, 2)] },
      { day: 'Thursday', focus: 'Push (Variation)', groups: [exerciseDB.chest[1], exerciseDB.chest[2], exerciseDB.chest[3], ...exerciseDB.shoulders.slice(1, 4)] },
      { day: 'Friday', focus: 'Pull (Variation)', groups: [exerciseDB.back[1], exerciseDB.back[3], exerciseDB.back[4], exerciseDB.arms[1], exerciseDB.arms[4]] },
      { day: 'Saturday', focus: 'Legs & Cardio', groups: [...exerciseDB.legs.slice(2, 6), ...exerciseDB.cardio.slice(0, 2)] },
    ];
    schedule.slice(0, days).forEach((s) => {
      plan.push({
        day: s.day,
        focus: s.focus,
        exercises: s.groups.slice(0, level === 'beginner' ? 4 : 7),
        duration: '55-70 min',
        intensity: level === 'advanced' ? 'Very High' : 'High',
      });
    });
  }

  return plan;
}

// ─── Diet Planner ──────────────────────────────────────────

export interface Meal {
  time: string;
  name: string;
  items: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DietPlan {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  meals: Meal[];
  groceryList: string[];
  tips: string[];
}

const indianMeals = {
  veg: {
    breakfast: [
      { name: 'Oats Upma + Fruits', items: ['Oats (50g)', 'Mixed vegetables', 'Banana', 'Green tea'], calories: 350, protein: 12, carbs: 55, fat: 8 },
      { name: 'Poha + Sprouts', items: ['Flattened rice (80g)', 'Peanuts', 'Sprout salad', 'Lemon water'], calories: 380, protein: 14, carbs: 58, fat: 10 },
      { name: 'Ragi Dosa + Chutney', items: ['Ragi dosa (2)', 'Coconut chutney', 'Boiled egg whites (3)', 'Buttermilk'], calories: 400, protein: 18, carbs: 52, fat: 12 },
      { name: 'Idli + Sambar', items: ['Idli (4)', 'Sambar bowl', 'Coconut chutney', 'Fruits'], calories: 370, protein: 14, carbs: 60, fat: 6 },
    ],
    lunch: [
      { name: 'Dal Rice + Sabzi', items: ['Brown rice (100g)', 'Toor dal', 'Mixed veg sabzi', 'Curd', 'Salad'], calories: 500, protein: 20, carbs: 75, fat: 12 },
      { name: 'Roti + Paneer Bhurji', items: ['Wheat roti (3)', 'Paneer bhurji (150g)', 'Dal', 'Salad'], calories: 550, protein: 28, carbs: 60, fat: 18 },
      { name: 'Rajma Rice', items: ['Brown rice (80g)', 'Rajma curry', 'Raita', 'Green salad'], calories: 520, protein: 22, carbs: 72, fat: 10 },
    ],
    dinner: [
      { name: 'Roti + Dal + Sabzi', items: ['Wheat roti (2)', 'Moong dal', 'Palak sabzi', 'Salad'], calories: 400, protein: 18, carbs: 55, fat: 10 },
      { name: 'Khichdi + Curd', items: ['Moong dal khichdi', 'Curd', 'Papad', 'Pickle'], calories: 380, protein: 16, carbs: 58, fat: 8 },
      { name: 'Vegetable Pulao', items: ['Veg pulao (150g rice)', 'Raita', 'Sauteed paneer', 'Salad'], calories: 450, protein: 18, carbs: 62, fat: 12 },
    ],
    snack: [
      { name: 'Protein Snack', items: ['Mixed nuts (30g)', 'Protein shake', 'Apple'], calories: 250, protein: 20, carbs: 25, fat: 10 },
      { name: 'Evening Snack', items: ['Roasted chana (50g)', 'Green tea', 'Banana'], calories: 220, protein: 12, carbs: 35, fat: 5 },
    ],
  },
  nonveg: {
    breakfast: [
      { name: 'Egg Omelette + Toast', items: ['Whole eggs (3)', 'Multigrain bread (2)', 'Banana', 'Black coffee'], calories: 420, protein: 24, carbs: 40, fat: 18 },
      { name: 'Egg Bhurji + Roti', items: ['Eggs (4) scrambled', 'Wheat roti (2)', 'Fruits', 'Green tea'], calories: 450, protein: 28, carbs: 42, fat: 16 },
    ],
    lunch: [
      { name: 'Chicken Rice + Salad', items: ['Grilled chicken (200g)', 'Brown rice (100g)', 'Green salad', 'Curd'], calories: 580, protein: 42, carbs: 55, fat: 15 },
      { name: 'Fish Curry + Rice', items: ['Fish curry (200g)', 'Brown rice (80g)', 'Sabzi', 'Salad'], calories: 520, protein: 38, carbs: 50, fat: 14 },
    ],
    dinner: [
      { name: 'Chicken Tikka + Roti', items: ['Chicken tikka (150g)', 'Wheat roti (2)', 'Raita', 'Salad'], calories: 450, protein: 36, carbs: 40, fat: 14 },
      { name: 'Egg Curry + Rice', items: ['Egg curry (3 eggs)', 'Brown rice (80g)', 'Salad'], calories: 420, protein: 22, carbs: 48, fat: 14 },
    ],
    snack: [
      { name: 'Protein Snack', items: ['Boiled eggs (2)', 'Protein shake', 'Almonds (10)'], calories: 280, protein: 30, carbs: 15, fat: 14 },
    ],
  },
};

export function generateDietPlan(
  calories: number,
  goal: string,
  preference: 'veg' | 'nonveg'
): DietPlan {
  const meals: Meal[] = [];
  const db = indianMeals[preference];

  // Select meals based on calorie target
  const breakfastIdx = Math.floor(Math.random() * db.breakfast.length);
  const lunchIdx = Math.floor(Math.random() * db.lunch.length);
  const dinnerIdx = Math.floor(Math.random() * db.dinner.length);
  const snackIdx = Math.floor(Math.random() * db.snack.length);

  const breakfast = { time: '7:00 AM', ...db.breakfast[breakfastIdx] };
  const midSnack = { time: '10:30 AM', name: 'Mid-Morning Snack', items: ['Fruits (apple/banana)', 'Green tea'], calories: 120, protein: 2, carbs: 28, fat: 1 };
  const lunch = { time: '1:00 PM', ...db.lunch[lunchIdx] };
  const eveningSnack = { time: '4:30 PM', ...db.snack[snackIdx] };
  const dinner = { time: '8:00 PM', ...db.dinner[dinnerIdx] };

  meals.push(breakfast, midSnack, lunch, eveningSnack, dinner);

  // Adjust calories
  const currentTotal = meals.reduce((sum, m) => sum + m.calories, 0);
  const ratio = calories / currentTotal;

  const adjustedMeals = meals.map((m) => ({
    ...m,
    calories: Math.round(m.calories * ratio),
    protein: Math.round(m.protein * ratio),
    carbs: Math.round(m.carbs * ratio),
    fat: Math.round(m.fat * ratio),
  }));

  const totalCalories = adjustedMeals.reduce((s, m) => s + m.calories, 0);
  const totalProtein = adjustedMeals.reduce((s, m) => s + m.protein, 0);
  const totalCarbs = adjustedMeals.reduce((s, m) => s + m.carbs, 0);
  const totalFat = adjustedMeals.reduce((s, m) => s + m.fat, 0);

  const groceryList = [...new Set(adjustedMeals.flatMap((m) => m.items))];

  const tips = [
    'Drink water 30 minutes before each meal',
    'Eat slowly and chew thoroughly',
    'Avoid processed foods and sugary drinks',
    'Include protein in every meal',
    'Have your last meal 2-3 hours before bedtime',
    goal === 'weight-loss' ? 'Maintain a 500-calorie deficit consistently' : 'Ensure calorie surplus for muscle growth',
  ];

  return { totalCalories, totalProtein, totalCarbs, totalFat, meals: adjustedMeals, groceryList, tips };
}
