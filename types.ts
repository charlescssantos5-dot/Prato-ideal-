export enum GoalType {
  LOSE_WEIGHT = 'Perder Peso',
  GAIN_MUSCLE = 'Ganhar Músculos',
  MAINTAIN = 'Manter Peso',
  HEALTHY = 'Alimentação Saudável'
}

export enum ActivityLevel {
  SEDENTARY = 'Sedentário',
  MODERATE = 'Moderado',
  ACTIVE = 'Ativo',
  VERY_ACTIVE = 'Muito Ativo'
}

export interface UserProfile {
  name: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  goal: GoalType;
  activityLevel: ActivityLevel;
  dailyWaterGoal: number; // ml
  onboardingComplete: boolean;
}

export interface Ingredient {
  name: string;
  amount: string;
  checked?: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  image: string;
  calories: number;
  time: string;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

export interface Meal {
  id: string;
  type: 'Café da Manhã' | 'Almoço' | 'Lanche' | 'Jantar';
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  description: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string; // e.g., "12-15" or "30 sec"
  rest: string;
  muscleGroup: string;
}

export interface DailyPlan {
  date: string;
  meals: Meal[];
  workout: Exercise[];
  waterConsumed: number;
}

export interface AppState {
  user: UserProfile | null;
  currentPlan: DailyPlan | null;
  recipes: Recipe[];
  shoppingList: Ingredient[];
}