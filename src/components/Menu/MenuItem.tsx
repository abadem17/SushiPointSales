import React from 'react';
import { type SushiItem } from '../../types';

interface MenuItemProps {
  item: SushiItem;
  onAdd: (item: SushiItem) => void;
}

export function MenuItem({ item, onAdd }: MenuItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-green-600">${item.price}</span>
          <button
            onClick={() => onAdd(item)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}