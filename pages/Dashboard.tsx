import React, { useEffect, useState } from 'react';
import { UserProfile, DailyPlan } from '../types';
import { StorageService } from '../services/storageService';
import { Droplets, Zap, Flame, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [water, setWater] = useState(0);

  useEffect(() => {
    const u = StorageService.getUser();
    const p = StorageService.getPlan();
    if (u) {
      setUser(u);
      setWater(p?.waterConsumed || 0);
    }
    if (p) setPlan(p);
  }, []);

  const addWater = () => {
    if (!user || !plan) return;
    const newAmount = water + 250;
    setWater(newAmount);
    const updatedPlan = { ...plan, waterConsumed: newAmount };
    StorageService.savePlan(updatedPlan);
    setPlan(updatedPlan);
  };

  if (!user) return null;

  const caloriesConsumed = 0; // Mock calculation
  const caloriesTarget = 2200; // Mock based on goal

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Olá, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-gray-500 text-sm">Vamos focar na saúde hoje?</p>
        </div>
        <Link to="/profile" className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
           <img src={`https://ui-avatars.com/api/?name=${user.name}&background=10b981&color=fff`} alt="Profile" />
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex flex-col justify-between h-32">
          <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
            <Flame size={16} className="text-orange-500" fill="currentColor" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">Calorias</p>
            <p className="text-xl font-bold text-gray-800">{caloriesConsumed} <span className="text-xs text-gray-400 font-normal">/ {caloriesTarget}</span></p>
          </div>
          <div className="w-full bg-orange-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-orange-500 h-full rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex flex-col justify-between h-32 relative overflow-hidden" onClick={addWater}>
          <div className="absolute -right-4 -top-4 opacity-10">
             <Droplets size={100} className="text-blue-500" />
          </div>
          <div className="flex justify-between items-start z-10">
             <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
              <Droplets size={16} className="text-blue-500" fill="currentColor" />
            </div>
            <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium hover:bg-blue-200 transition">
                +250ml
            </button>
          </div>
          <div className="z-10">
            <p className="text-xs text-gray-500 font-medium uppercase">Água</p>
            <p className="text-xl font-bold text-gray-800">{water/1000}L <span className="text-xs text-gray-400 font-normal">/ {user.dailyWaterGoal/1000}L</span></p>
          </div>
           <div className="w-full bg-blue-200 h-1.5 rounded-full mt-2 overflow-hidden z-10">
            <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((water / user.dailyWaterGoal) * 100, 100)}%` }}></div>
          </div>
        </div>
      </div>

      {/* Today's Workout */}
      <div className="bg-emerald-900 text-white rounded-2xl p-6 relative overflow-hidden">
         <div className="absolute right-0 top-0 h-full w-1/2 opacity-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
                <Zap className="text-yellow-400" size={20} fill="currentColor" />
                <span className="font-semibold tracking-wide text-sm uppercase">Treino do Dia</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">Full Body & Cardio</h3>
            <p className="text-emerald-200 text-sm mb-4">45 min • Intensidade Média</p>
            <Link to="/workout" className="inline-flex items-center bg-white text-emerald-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition">
                Iniciar Treino
            </Link>
         </div>
      </div>

      {/* Next Meal */}
      <div>
        <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold text-gray-800">Próxima Refeição</h2>
            <Link to="/diet" className="text-brand-600 text-sm font-medium flex items-center">Ver tudo <ChevronRight size={16} /></Link>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-4 items-center">
            <img src="https://picsum.photos/100/100?random=10" className="w-16 h-16 rounded-lg object-cover" alt="Food" />
            <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Almoço • 12:30</p>
                <h4 className="text-gray-800 font-bold">Frango Grelhado e Salada</h4>
                <p className="text-xs text-gray-500 mt-1">450 Kcal</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;