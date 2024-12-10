import React from 'react';
import { type Sale } from '../../types';

interface CashRegisterProps {
  sales: Sale[];
}

export function CashRegister({ sales }: CashRegisterProps) {
  const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Estado de Caja</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total en Ventas</p>
          <p className="text-2xl font-bold text-green-600">${totalSales.toFixed(2)}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Número de Ventas</p>
          <p className="text-2xl font-bold text-blue-600">{sales.length}</p>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold mb-2">Últimas Transacciones</h4>
        <div className="space-y-2">
          {sales.slice(-5).reverse().map((sale) => (
            <div key={sale.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm text-gray-600">{sale.date}</span>
              <span className="font-semibold">${sale.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}