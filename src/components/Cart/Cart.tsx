import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartItem } from './CartItem';
import { type CartItem as CartItemType } from '../../types';

interface CartProps {
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemove, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-semibold">Carrito</h2>
      </div>
      
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">El carrito está vacío</p>
        ) : (
          <>
            <div className="max-h-96 overflow-y-auto">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>
              
              <button
                onClick={onCheckout}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Proceder al pago
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}