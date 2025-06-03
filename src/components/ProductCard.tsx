import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          
          {product.new && (
            <div className="absolute top-4 right-4 bg-accent text-white text-xs px-2 py-1 rounded-full">
              New
            </div>
          )}
          
          {product.bestSeller && (
            <div className="absolute top-4 left-4 bg-secondary text-white text-xs px-2 py-1 rounded-full">
              Best Seller
            </div>
          )}
          
          <button 
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          >
            <ShoppingBag className="w-5 h-5 text-primary" />
          </button>
        </div>
        
        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2">{product.shortDescription}</p>
        <p className="font-medium">${product.price.toFixed(2)}</p>
      </Link>
    </motion.div>
  );
};

export default ProductCard;