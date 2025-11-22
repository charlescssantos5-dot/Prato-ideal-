import React, { useEffect, useState } from 'react';
import { UserProfile } from '../types';
import { StorageService } from '../services/storageService';
import { Trophy, Settings, Download, LogOut, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(StorageService.getUser());
  }, []);

  const handleReset = () => {
    if(confirm("Tem certeza? Isso apagará todos os seus dados.")) {
        StorageService.clearData();
        window.location.reload();
    }
  };

  if (!user) return null;

  return (
    <div className="p-6 pb-24">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Seu Perfil</h1>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold text-xl">
            {user.name.charAt(0)}
        </div>
        <div>
            <h2 className="font-bold text-xl text-gray-800">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.goal}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
            <p className="text-gray-400 text-xs uppercase font-bold">Peso Atual</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{user.weight} <span className="text-sm font-normal">kg</span></p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
            <p className="text-gray-400 text-xs uppercase font-bold">Altura</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{user.height} <span className="text-sm font-normal">cm</span></p>
        </div>
      </div>

      <h3 className="font-bold text-lg text-gray-800 mb-4">Menu</h3>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <Link to="/shopping-list" className="flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><ShoppingCart size={20}/></div>
            <span className="flex-1 font-medium text-gray-700">Lista de Compras</span>
        </Link>
        <div className="flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer">
            <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600"><Trophy size={20}/></div>
            <span className="flex-1 font-medium text-gray-700">Conquistas</span>
        </div>
        <div className="flex items-center gap-3 p-4 hover:bg-gray-50 transition cursor-pointer">
            <div className="bg-gray-100 p-2 rounded-lg text-gray-600"><Settings size={20}/></div>
            <span className="flex-1 font-medium text-gray-700">Configurações</span>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-brand-500 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
                <Download size={20} />
                <h3 className="font-bold text-lg">Instalar Aplicativo</h3>
            </div>
            <p className="text-brand-100 text-sm mb-4">Acesse suas dietas e treinos mesmo sem internet. Adicione à tela inicial.</p>
            <button className="bg-white text-brand-600 text-sm font-bold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100" onClick={() => alert('Para instalar no Android: Toque nos 3 pontos do navegador > "Adicionar à tela inicial".\n\nNo iOS: Toque no botão compartilhar > "Adicionar à Tela de Início".')}>
                Como Instalar
            </button>
        </div>
        <Download size={120} className="absolute -right-4 -bottom-4 text-white opacity-10 rotate-12" />
      </div>

      <button onClick={handleReset} className="mt-8 w-full text-red-500 text-sm font-medium flex items-center justify-center gap-2 py-4">
        <LogOut size={16} /> Resetar Dados e Sair
      </button>
    </div>
  );
};

export default Profile;