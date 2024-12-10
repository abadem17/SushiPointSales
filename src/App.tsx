import React, { useState } from 'react';
import { Cart } from './components/Cart/Cart';
import { MenuItem } from './components/Menu/MenuItem';
import { Sidebar } from './components/Layout/Sidebar';
import { ProductList } from './components/Products/ProductList';
import { ProductForm } from './components/Products/ProductForm';
import { SalesReport } from './components/Reports/SalesReport';
import { CashRegister } from './components/Cash/CashRegister';
import { menuItems } from './data/menu';
import { type CartItem, type SushiItem, type View, type Sale } from './types';

function App() {
  const [currentView, setCurrentView] = useState<View>('sales');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState(menuItems);
  const [sales, setSales] = useState<Sale[]>([]);
  const [editingProduct, setEditingProduct] = useState<SushiItem | null>(null);

  const addToCart = (item: SushiItem) => {
    setCartItems((current) => {
      const existingItem = current.find((i) => i.id === item.id);
      if (existingItem) {
        return current.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...current, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const sale: Sale = {
      id: Date.now().toString(),
      items: [...cartItems],
      total,
      date: new Date().toLocaleString(),
    };
    
    setSales((current) => [...current, sale]);
    setCartItems([]);
    alert('¡Gracias por tu compra!');
  };

  const handleAddProduct = (product: Omit<SushiItem, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts((current) => [...current, newProduct]);
    setEditingProduct(null);
  };

  const handleUpdateProduct = (product: Omit<SushiItem, 'id'>) => {
    if (!editingProduct) return;
    
    setProducts((current) =>
      current.map((p) =>
        p.id === editingProduct.id ? { ...product, id: p.id } : p
      )
    );
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProducts((current) => current.filter((p) => p.id !== id));
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'sales':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">Menú</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onAdd={addToCart}
                  />
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <Cart
                items={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        );
      
      case 'products':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
              </h2>
              <ProductForm
                onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                initialProduct={editingProduct ?? undefined}
              />
            </div>
            <div className="bg-white rounded-lg shadow">
              <ProductList
                products={products}
                onEdit={setEditingProduct}
                onDelete={handleDeleteProduct}
              />
            </div>
          </div>
        );
      
      case 'reports':
        return <SalesReport sales={sales} />;
      
      case 'cash':
        return <CashRegister sales={sales} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;