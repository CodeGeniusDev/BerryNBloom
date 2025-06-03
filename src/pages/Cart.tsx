import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Cart: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-16">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <div className="border-b border-gray-100 pb-2 mb-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Product</span>
                  <span>Total</span>
                </div>
              </div>
              
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
              
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => navigate('/products')}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Continue Shopping
                </button>
                
                <button
                  onClick={clearCart}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                {shipping > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    Free shipping on orders over $50
                  </div>
                )}
                
                <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3 bg-primary text-white rounded-md font-semibold flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;