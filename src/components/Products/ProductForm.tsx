import React, { useState } from 'react';
import { type SushiItem } from '../../types';

interface ProductFormProps {
  onSubmit: (product: Omit<SushiItem, 'id'>) => void;
  initialProduct?: SushiItem;
}

export function ProductForm({ onSubmit, initialProduct }: ProductFormProps) {
  const [product, setProduct] = useState({
    name: initialProduct?.name ?? '',
    description: initialProduct?.description ?? '',
    price: initialProduct?.price ?? 0,
    image: initialProduct?.image ?? '',
    category: initialProduct?.category ?? 'rolls',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Precio</label>
        <input
          type="number"
          step="0.01"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">URL de la imagen</label>
        <input
          type="url"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value as SushiItem['category'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
        >
          <option value="rolls">Rolls</option>
          <option value="nigiri">Nigiri</option>
          <option value="sashimi">Sashimi</option>
          <option value="special">Especiales</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
      >
        {initialProduct ? 'Actualizar Producto' : 'Agregar Producto'}
      </button>
    </form>
  );
}