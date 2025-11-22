import React, { useEffect, useState } from 'react';
import { DailyPlan } from '../types';
import { StorageService } from '../services/storageService';
import { PlusCircle } from 'lucide-react';

const Diet: React.FC = () => {
  const [plan, setPlan] = useState<DailyPlan | null>(null);

  useEffect(() => {
    const p = StorageService.getPlan();
    if (p) setPlan(p);
  }, []);

  if (!plan) return <div className="p-6">Carregando plano...</div>;

  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Sua Dieta de Hoje</h1>

      <div className="space-y-6">
        {plan.meals.map((meal, index) => (
          <div key={meal.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-brand-50 px-4 py-2 border-b border-brand-100 flex justify-between items-center">
                <span className="text-brand-700 font-bold text-sm uppercase tracking-wide">{meal.type}</span>
                <span className="text-brand-600 text-xs font-semibold">{meal.calories} kcal</span>
            </div>
            <div className="p-4">
                <div className="flex gap-4">
                     <img src={`https://picsum.photos/200/200?random=${index+20}`} className="w-20 h-20 rounded-xl object-cover bg-gray-200" alt={meal.name} />
                     <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{meal.name}</h3>
                        <p className="text-sm text-gray-500 leading-snug mb-2">{meal.description}</p>
                        <div className="flex gap-2 text-[10px] text-gray-400 font-medium uppercase">
                            <span className="bg-gray-100 px-2 py-1 rounded">P: {meal.protein}g</span>
                            <span className="bg-gray-100 px-2 py-1 rounded">C: {meal.carbs}g</span>
                            <span className="bg-gray-100 px-2 py-1 rounded">G: {meal.fats}g</span>
                        </div>
                     </div>
                </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-400 flex items-center justify-center gap-2 hover:border-brand-400 hover:text-brand-500 transition">
        <PlusCircle size={20} />
        Registrar refeição extra
      </button>
    </div>
  );
};

export default Diet;