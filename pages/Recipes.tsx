import React from 'react';
import { DEFAULT_RECIPES } from '../constants';
import { Clock, Flame, Plus } from 'lucide-react';
import { StorageService } from '../services/storageService';
import { Ingredient } from '../types';
import { useNavigate } from 'react-router-dom';

const Recipes: React.FC = () => {
  const navigate = useNavigate();

  const addToShoppingList = (ingredients: string[]) => {
    const currentList = StorageService.getShoppingList();
    const newItems: Ingredient[] = ingredients.map(ing => ({
        name: ing,
        amount: '1 un', // Simplification for demo
        checked: false
    }));
    
    // Simple merge to avoid duplicates could go here
    const updatedList = [...currentList, ...newItems];
    StorageService.saveShoppingList(updatedList);
    navigate('/shopping-list');
  };

  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Receitas Saudáveis</h1>

      <div className="grid gap-6">
        {DEFAULT_RECIPES.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
            <div className="relative h-48 overflow-hidden">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1">
                    <Clock size={12} /> {recipe.time}
                </div>
            </div>
            <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                    {recipe.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-bold tracking-wider text-brand-600 bg-brand-50 px-2 py-1 rounded-md">{tag}</span>
                    ))}
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-2">{recipe.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Flame size={16} className="text-orange-500" />
                    <span>{recipe.calories} kcal</span>
                </div>
                
                <button 
                    onClick={() => addToShoppingList(recipe.ingredients)}
                    className="w-full bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2 text-sm">
                    <Plus size={16} /> Adicionar à Lista de Compras
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;