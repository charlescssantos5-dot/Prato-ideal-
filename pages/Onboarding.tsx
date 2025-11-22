import React, { useState } from 'react';
import { UserProfile, GoalType, ActivityLevel } from '../types';
import { StorageService } from '../services/storageService';
import { Activity, Target, ChevronRight, Check } from 'lucide-react';
import { generateDailyPlan } from '../services/geminiService';

interface OnboardingProps {
  onComplete: (user: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    goal: GoalType.HEALTHY,
    activityLevel: ActivityLevel.MODERATE,
    dailyWaterGoal: 2500
  });

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleFinish = async () => {
    setIsLoading(true);
    const newUser: UserProfile = {
      name: formData.name || 'Usuário',
      age: formData.age || 25,
      height: formData.height || 170,
      weight: formData.weight || 70,
      goal: formData.goal as GoalType,
      activityLevel: formData.activityLevel as ActivityLevel,
      dailyWaterGoal: formData.dailyWaterGoal || 2500,
      onboardingComplete: true
    };

    // Save User
    StorageService.saveUser(newUser);
    
    // Generate Initial Plan
    try {
      const plan = await generateDailyPlan(newUser);
      StorageService.savePlan(plan);
    } catch (e) {
      console.error("Failed to generate initial plan");
    }
    
    setIsLoading(false);
    onComplete(newUser);
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-center max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="bg-brand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Activity className="text-brand-600" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Prato Ideal</h1>
        <p className="text-gray-500">Vamos personalizar sua jornada.</p>
      </div>

      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-700">Sobre você</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Nome</label>
              <input type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Seu nome" 
                onChange={(e) => handleChange('name', e.target.value)} value={formData.name || ''} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Idade</label>
                <input type="number" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Anos"
                  onChange={(e) => handleChange('age', parseInt(e.target.value))} value={formData.age || ''} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Sexo</label>
                 <select className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                    <option>Masculino</option>
                    <option>Feminino</option>
                 </select>
              </div>
            </div>
          </div>
          <button onClick={handleNext} disabled={!formData.name} className="w-full bg-brand-600 text-white p-4 rounded-xl font-semibold mt-6 hover:bg-brand-700 transition flex items-center justify-center disabled:opacity-50">
            Próximo <ChevronRight className="ml-2" size={20} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-700">Suas Medidas</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Peso (kg)</label>
              <input type="number" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Ex: 70"
                onChange={(e) => handleChange('weight', parseFloat(e.target.value))} value={formData.weight || ''} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Altura (cm)</label>
              <input type="number" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Ex: 175"
                onChange={(e) => handleChange('height', parseInt(e.target.value))} value={formData.height || ''} />
            </div>
          </div>
          <button onClick={handleNext} className="w-full bg-brand-600 text-white p-4 rounded-xl font-semibold mt-6 hover:bg-brand-700 transition flex items-center justify-center">
            Próximo <ChevronRight className="ml-2" size={20} />
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-700">Seu Objetivo</h2>
          <div className="space-y-3">
            {Object.values(GoalType).map((goal) => (
              <div key={goal} 
                onClick={() => handleChange('goal', goal)}
                className={`p-4 border-2 rounded-xl cursor-pointer flex items-center justify-between transition-all ${formData.goal === goal ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-brand-200'}`}>
                <span className="font-medium text-gray-800">{goal}</span>
                {formData.goal === goal && <Check className="text-brand-600" size={20} />}
              </div>
            ))}
          </div>
          <button onClick={handleFinish} disabled={isLoading} className="w-full bg-brand-600 text-white p-4 rounded-xl font-semibold mt-6 hover:bg-brand-700 transition flex items-center justify-center disabled:opacity-70">
            {isLoading ? 'Criando seu plano...' : 'Começar Jornada'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;