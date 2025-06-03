import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';

interface CartItemProps {
  item: Product & { quantity: number };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center py-4 border-b border-gray-100">
      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center border border-gray-200 rounded-md">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-2 hover:bg-gray-50"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3 h-3" />
        </button>
        
        <span className="px-2 py-1 min-w-[32px] text-center">
          {item.quantity}
        </span>
        
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-2 hover:bg-gray-50"
          aria-label="Increase quantity"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
      
      <div className="ml-6 text-right">
        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      
      <button
        onClick={() => removeFromCart(item.id)}
        className="ml-4 p-1 text-gray-400 hover:text-gray-600"
        aria-label="Remove item"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CartItem;