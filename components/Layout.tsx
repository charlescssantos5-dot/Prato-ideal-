import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Utensils, Dumbbell, ShoppingCart, User, BookOpen } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <Link to={to} className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${isActive(to) ? 'text-brand-600' : 'text-gray-400 hover:text-brand-400'}`}>
      <Icon size={24} strokeWidth={isActive(to) ? 2.5 : 2} />
      <span className="text-[10px] mt-1 font-medium">{label}</span>
    </Link>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto shadow-2xl relative overflow-hidden">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {children}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16 pb-safe">
          <NavItem to="/" icon={Home} label="Início" />
          <NavItem to="/diet" icon={Utensils} label="Dieta" />
          <NavItem to="/workout" icon={Dumbbell} label="Treino" />
          <NavItem to="/recipes" icon={BookOpen} label="Receitas" />
          <NavItem to="/profile" icon={User} label="Perfil" />
        </div>
      </nav>
    </div>
  );
};

export default Layout;