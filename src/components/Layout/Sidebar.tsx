import React from 'react';
import { 
  ShoppingCart, 
  Package, 
  FileSpreadsheet, 
  DollarSign,
  Menu as MenuIcon
} from 'lucide-react';
import { type View } from '../../types';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function Sidebar({ 
  currentView, 
  onViewChange, 
  isSidebarOpen, 
  onToggleSidebar 
}: SidebarProps) {
  const menuItems = [
    { id: 'sales', label: 'Ventas', icon: ShoppingCart },
    { id: 'products', label: 'Productos', icon: Package },
    { id: 'reports', label: 'Reportes', icon: FileSpreadsheet },
    { id: 'cash', label: 'Caja', icon: DollarSign },
  ] as const;

  return (
    <>
      <button
        onClick={onToggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
      >
        <MenuIcon className="w-6 h-6" />
      </button>

      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:w-64
      `}>
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Sushipilon</h2>
          <nav className="space-y-2">
            {menuItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onViewChange(id as View)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${currentView === id 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                <Icon className="w-5 h-5" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}