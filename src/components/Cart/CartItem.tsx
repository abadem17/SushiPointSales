import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { type CartItem as CartItemType } from '../../types';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b">
      <div className="flex-1">
        <h4 className="font-medium text-gray-800">{item.name}</h4>
        <p className="text-sm text-gray-600">${item.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="p-1 hover:bg-gray-100 rounded"
          disabled={item.quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="p-1 text-red-500 hover:bg-red-50 rounded ml-2"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}