import { STORAGE_KEYS } from '../constants';
import { UserProfile, DailyPlan, Ingredient } from '../types';

export const StorageService = {
  saveUser: (user: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(user));
  },
  getUser: (): UserProfile | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  },
  savePlan: (plan: DailyPlan) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_PLAN, JSON.stringify(plan));
  },
  getPlan: (): DailyPlan | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_PLAN);
    return data ? JSON.parse(data) : null;
  },
  saveShoppingList: (list: Ingredient[]) => {
    localStorage.setItem(STORAGE_KEYS.SHOPPING_LIST, JSON.stringify(list));
  },
  getShoppingList: (): Ingredient[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SHOPPING_LIST);
    return data ? JSON.parse(data) : [];
  },
  clearData: () => {
    localStorage.clear();
  }
};