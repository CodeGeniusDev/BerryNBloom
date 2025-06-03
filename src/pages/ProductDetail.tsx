import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Minus, Plus } from 'lucide-react';
import { getProductById, products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const product = id ? getProductById(id) : null;
  
  if (!product) {
    return (
      <div className="container-custom pt-32 pb-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button 
          onClick={() => navigate('/products')}
          className="btn-primary"
        >
          Back to Products
        </button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </button>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-medium text-primary mb-4">
              ${product.price.toFixed(2)}
            </p>
            
            <p className="text-gray-600 mb-6">
              {product.description}
            </p>
            
            <div className="mb-6">
              <div className="flex items-center">
                <span className="mr-4 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-md">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2 hover:bg-gray-50"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="px-4 py-2 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 hover:bg-gray-50"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-primary text-white rounded-md font-semibold flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
            </button>
            
            <div className="mt-8 border-t border-gray-100 pt-6">
              <div className="mb-4">
                <span className="font-medium">Category:</span> {product.category === 'jam' ? 'Jam' : 'Honey'}
              </div>
              
              {product.bestSeller && (
                <div className="inline-block bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-medium mr-2">
                  Best Seller
                </div>
              )}
              
              {product.new && (
                <div className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">
                  New
                </div>
              )}
            </div>
          </motion.div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;