import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Diet from './pages/Diet';
import Workouts from './pages/Workouts';
import Recipes from './pages/Recipes';
import ShoppingList from './pages/ShoppingList';
import Profile from './pages/Profile';
import { StorageService } from './services/storageService';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = StorageService.getUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-emerald-500 text-white font-bold">Carregando...</div>;
  }

  if (!user) {
    return <Onboarding onComplete={(u) => setUser(u)} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/shopping-list" element={<ShoppingList />} />
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/diet" element={<Diet />} />
              <Route path="/workout" element={<Workouts />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;