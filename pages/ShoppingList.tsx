import React, { useEffect, useState } from 'react';
import { Ingredient } from '../types';
import { StorageService } from '../services/storageService';
import { Trash2, ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<Ingredient[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setItems(StorageService.getShoppingList());
  }, []);

  const save = (newItems: Ingredient[]) => {
    setItems(newItems);
    StorageService.saveShoppingList(newItems);
  };

  const toggleItem = (index: number) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    save(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    save(newItems);
  };
  
  const addItem = () => {
    if(!newItemName.trim()) return;
    const newItems = [...items, { name: newItemName, amount: '1', checked: false }];
    save(newItems);
    setNewItemName('');
  };

  return (
    <div className="p-6 pb-24 bg-white min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100">
            <ArrowLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Lista de Compras</h1>
      </div>

      {/* Add Item Input */}
      <div className="flex gap-2 mb-6">
        <input 
            type="text" 
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder="Adicionar item..." 
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button onClick={addItem} className="bg-brand-600 text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-brand-700">
            <Plus size={24} />
        </button>
      </div>

      <div className="space-y-2">
        {items.length === 0 && (
            <div className="text-center py-10 text-gray-400">
                Sua lista está vazia.
            </div>
        )}
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:shadow-sm transition">
            <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => toggleItem(index)}>
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.checked ? 'bg-brand-500 border-brand-500' : 'border-gray-300'}`}>
                    {item.checked && <Plus size={12} className="text-white rotate-45" />}
                </div>
                <span className={`${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item.name}</span>
            </div>
            <button onClick={() => removeItem(index)} className="text-gray-400 hover:text-red-500 p-2">
                <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;