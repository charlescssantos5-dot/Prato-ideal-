import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, DailyPlan, Meal, Exercise } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateDailyPlan = async (user: UserProfile): Promise<DailyPlan> => {
  if (!apiKey) {
    console.warn("API Key not found. Returning mock data.");
    return getMockPlan();
  }

  const prompt = `
    Crie um plano de dieta de 1 dia e uma rotina de treino para esta pessoa:
    Nome: ${user.name}
    Idade: ${user.age}
    Peso: ${user.weight}kg
    Altura: ${user.height}cm
    Objetivo: ${user.goal}
    Nível de Atividade: ${user.activityLevel}
    
    Retorne APENAS JSON válido seguindo o schema solicitado.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            meals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ['Café da Manhã', 'Almoço', 'Lanche', 'Jantar'] },
                  name: { type: Type.STRING },
                  calories: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  carbs: { type: Type.NUMBER },
                  fats: { type: Type.NUMBER },
                  description: { type: Type.STRING }
                },
                required: ['id', 'type', 'name', 'calories', 'protein', 'carbs', 'fats', 'description']
              }
            },
            workout: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  sets: { type: Type.NUMBER },
                  reps: { type: Type.STRING },
                  rest: { type: Type.STRING },
                  muscleGroup: { type: Type.STRING }
                },
                required: ['id', 'name', 'sets', 'reps', 'rest', 'muscleGroup']
              }
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text);
    
    return {
      date: new Date().toISOString().split('T')[0],
      meals: result.meals,
      workout: result.workout,
      waterConsumed: 0
    };

  } catch (error) {
    console.error("Gemini API failed, falling back to mock", error);
    return getMockPlan();
  }
};

// Fallback if API fails or is offline initially
const getMockPlan = (): DailyPlan => {
  const mockMeals: Meal[] = [
    { id: 'm1', type: 'Café da Manhã', name: 'Ovos Mexidos com Espinafre', calories: 350, protein: 20, carbs: 5, fats: 25, description: '3 ovos, punhado de espinafre, azeite.' },
    { id: 'm2', type: 'Almoço', name: 'Frango Grelhado e Batata Doce', calories: 500, protein: 40, carbs: 50, fats: 10, description: '150g peito de frango, 200g batata doce.' },
    { id: 'm3', type: 'Lanche', name: 'Iogurte e Frutas', calories: 200, protein: 15, carbs: 30, fats: 5, description: 'Iogurte natural e morangos.' },
    { id: 'm4', type: 'Jantar', name: 'Salada de Atum', calories: 300, protein: 35, carbs: 10, fats: 12, description: 'Atum em água, mix de folhas, azeite.' },
  ];

  const mockWorkout: Exercise[] = [
    { id: 'e1', name: 'Agachamento', sets: 3, reps: '12', rest: '60s', muscleGroup: 'Pernas' },
    { id: 'e2', name: 'Flexão de Braço', sets: 3, reps: '10-15', rest: '60s', muscleGroup: 'Peito' },
    { id: 'e3', name: 'Prancha', sets: 3, reps: '30-45s', rest: '45s', muscleGroup: 'Core' },
  ];

  return {
    date: new Date().toISOString().split('T')[0],
    meals: mockMeals,
    workout: mockWorkout,
    waterConsumed: 0
  };
}