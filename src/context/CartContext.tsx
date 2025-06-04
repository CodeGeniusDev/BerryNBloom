import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';
import { Product } from '../types/product';
import { getProductById } from '../data/products';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Load cart data from local storage for non-authenticated users
  useEffect(() => {
    if (!user) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  // Load cart data from database for authenticated users
  useEffect(() => {
    if (user) {
      loadCartFromDB();
    }
  }, [user]);

  // Save cart to local storage for non-authenticated users
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  const loadCartFromDB = async () => {
    try {
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      const loadedCart: CartItem[] = cartItems.map(item => {
        const product = getProductById(item.product_id);
        if (!product) return null;
        return { ...product, quantity: item.quantity };
      }).filter(Boolean) as CartItem[];

      setCart(loadedCart);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addToCart = async (product: Product, quantity = 1) => {
    try {
      const existingItem = cart.find(item => item.id === product.id);
      const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

      if (user) {
        if (existingItem) {
          await supabase
            .from('cart_items')
            .update({ quantity: newQuantity })
            .eq('product_id', product.id)
            .eq('user_id', user.id);
        } else {
          await supabase
            .from('cart_items')
            .insert({
              user_id: user.id,
              product_id: product.id,
              quantity: quantity
            });
        }
        await loadCartFromDB();
      } else {
        setCart(prevCart => {
          if (existingItem) {
            return prevCart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [...prevCart, { ...product, quantity }];
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      if (user) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('product_id', productId)
          .eq('user_id', user.id);
        await loadCartFromDB();
      } else {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      if (user) {
        await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('product_id', productId)
          .eq('user_id', user.id);
        await loadCartFromDB();
      } else {
        setCart(prevCart =>
          prevCart.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
        await loadCartFromDB();
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};