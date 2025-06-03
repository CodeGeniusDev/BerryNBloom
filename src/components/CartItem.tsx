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
    <div className="flex items-start py-3 sm:py-4 border-b border-gray-100">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-3 sm:ml-4 flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate pr-2">{item.name}</h3>
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-1 text-gray-400 hover:text-gray-600 sm:ml-2"
            aria-label="Remove item"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">${item.price.toFixed(2)}</p>
        
        <div className="mt-2 sm:mt-3 flex items-center justify-between">
          <div className="flex items-center border border-gray-200 rounded-md">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1.5 sm:p-2 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            
            <span className="px-2 py-1 min-w-[28px] sm:min-w-[32px] text-center text-sm sm:text-base">
              {item.quantity}
            </span>
            
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1.5 sm:p-2 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
          
          <p className="text-sm sm:text-base font-medium whitespace-nowrap ml-2 sm:ml-4">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;