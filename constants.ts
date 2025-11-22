import { Recipe } from './types';

export const DEFAULT_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Salada de Quinoa e Abacate',
    image: 'https://picsum.photos/400/300?random=1',
    calories: 350,
    time: '15 min',
    ingredients: ['1 xícara de quinoa cozida', '1/2 abacate', 'Tomate cereja', 'Limão', 'Azeite'],
    instructions: ['Misture a quinoa com os vegetais.', 'Tempere com limão e azeite.'],
    tags: ['Vegano', 'Sem Glúten']
  },
  {
    id: '2',
    title: 'Frango Grelhado com Legumes',
    image: 'https://picsum.photos/400/300?random=2',
    calories: 450,
    time: '25 min',
    ingredients: ['Peito de frango', 'Brócolis', 'Cenoura', 'Batata Doce'],
    instructions: ['Grelhe o frango.', 'Cozinhe os legumes no vapor.'],
    tags: ['Proteína', 'Low Carb']
  },
  {
    id: '3',
    title: 'Smoothie Verde Detox',
    image: 'https://picsum.photos/400/300?random=3',
    calories: 200,
    time: '5 min',
    ingredients: ['Espinafre', 'Maçã verde', 'Pepino', 'Gengibre', 'Água de coco'],
    instructions: ['Bata tudo no liquidificador até ficar homogêneo.'],
    tags: ['Detox', 'Bebida']
  }
];

export const STORAGE_KEYS = {
  USER_PROFILE: 'prato_ideal_user',
  CURRENT_PLAN: 'prato_ideal_plan',
  SHOPPING_LIST: 'prato_ideal_shopping',
  WATER_LOG: 'prato_ideal_water',
  LAST_GENERATED: 'prato_ideal_last_gen'
};