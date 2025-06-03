import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products, getProductsByCategory } from '../data/products';

const Products: React.FC = () => {
  const [category, setCategory] = useState<'all' | 'jam' | 'honey'>('all');
  
  const filteredProducts = category === 'all' 
    ? products 
    : getProductsByCategory(category);

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-2">Our Products</h1>
        <p className="text-gray-600 mb-8">
          Discover our collection of artisanal jams and honey
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          <CategoryButton 
            label="All Products" 
            isActive={category === 'all'} 
            onClick={() => setCategory('all')} 
          />
          <CategoryButton 
            label="Jams" 
            isActive={category === 'jam'} 
            onClick={() => setCategory('jam')} 
          />
          <CategoryButton 
            label="Honey" 
            isActive={category === 'honey'} 
            onClick={() => setCategory('honey')} 
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CategoryButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors ${
        isActive 
          ? 'bg-primary text-white' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

export default Products;