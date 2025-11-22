import React, { useEffect, useState } from 'react';
import { DailyPlan } from '../types';
import { StorageService } from '../services/storageService';
import { CheckCircle, PlayCircle, Clock, Repeat } from 'lucide-react';

const Workouts: React.FC = () => {
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [checkedExercises, setCheckedExercises] = useState<string[]>([]);

  useEffect(() => {
    const p = StorageService.getPlan();
    if (p) setPlan(p);
  }, []);

  const toggleCheck = (id: string) => {
    if (checkedExercises.includes(id)) {
        setCheckedExercises(prev => prev.filter(exId => exId !== id));
    } else {
        setCheckedExercises(prev => [...prev, id]);
    }
  };

  if (!plan) return <div className="p-6">Carregando treino...</div>;

  return (
    <div className="p-6 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Treino do Dia</h1>
        <p className="text-gray-500">Foco: Corpo Todo</p>
      </div>

      <div className="space-y-4">
        {plan.workout.map((exercise, index) => {
            const isChecked = checkedExercises.includes(exercise.id);
            return (
                <div key={exercise.id} onClick={() => toggleCheck(exercise.id)} className={`bg-white rounded-2xl border shadow-sm p-4 transition-all cursor-pointer ${isChecked ? 'border-brand-500 bg-brand-50' : 'border-gray-100'}`}>
                    <div className="flex items-start gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 flex-shrink-0 transition-colors ${isChecked ? 'bg-brand-500 border-brand-500' : 'border-gray-300'}`}>
                            {isChecked && <CheckCircle size={14} className="text-white" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className={`font-bold text-lg ${isChecked ? 'text-brand-800 line-through' : 'text-gray-800'}`}>{exercise.name}</h3>
                                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded font-medium">{exercise.muscleGroup}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Repeat size={14} />
                                    <span>{exercise.sets}x {exercise.reps}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    <span>{exercise.rest}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>

      <div className="mt-8 bg-brand-600 rounded-2xl p-6 text-white flex items-center justify-between shadow-lg shadow-brand-200">
        <div>
            <p className="font-semibold text-brand-100 text-sm mb-1">Tudo pronto?</p>
            <h3 className="font-bold text-xl">Iniciar Cronômetro</h3>
        </div>
        <PlayCircle size={48} className="text-white opacity-90" />
      </div>
    </div>
  );
};

export default Workouts;