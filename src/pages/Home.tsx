import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../data/products';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-primary/10 to-white">
        <div className="container-custom grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Nature's Sweetness, <br />
              <span className="text-primary">Purely Preserved</span>
            </h1>
            <p className="text-lg mb-8 text-gray-600 max-w-lg">
              Artisanal organic jams and honey, crafted with love using traditional methods and the finest ingredients.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="btn-primary">
                Shop Now
              </Link>
              <Link to="/products" className="flex items-center text-textColor hover:text-primary transition-colors">
                Explore Our Collection <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <img 
              src="/images/cherry-jam.jpg" 
              alt="Organic cherry jam" 
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-white py-3 px-6 rounded-lg bg-burgundy-600 shadow-2xl transform rotate-3 z-10">
              <p className="font-medium text-xl text-white">100% Organic</p>
              <p className="text-medium text-white">Ethically sourced ingredients</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="page-section bg-white">
        <div className="container-custom">
          <h2 className="section-title">Our Featured Products</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="page-section bg-secondary/10">
        <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <img 
              src="/images/orange-jam.jpg" 
              alt="Organic orange jam" 
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Crafted with Care</h2>
            <p className="mb-4 text-gray-600">
              At Honey & Bloom, we believe in preserving nature's sweetness in its purest form. Every jar of jam and honey is carefully crafted using traditional methods that have been passed down through generations.
            </p>
            <p className="mb-6 text-gray-600">
              We source only the finest organic ingredients, working directly with local farmers who share our commitment to sustainable and ethical practices.
            </p>
            <Link to="/products" className="btn-secondary">
              Discover Our Story
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="page-section bg-white">
        <div className="container-custom">
          <h2 className="section-title">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="The strawberry jam is absolutely divine! It tastes just like the ones my grandmother used to make."
              author="Emily R."
            />
            <TestimonialCard 
              quote="I've tried many organic honeys, but Honey & Bloom's wildflower honey is truly exceptional. So pure and flavorful!"
              author="Michael T."
            />
            <TestimonialCard 
              quote="Their mixed berry jam has become a breakfast staple in our house. My kids love it and I love that it's organic."
              author="Sarah L."
            />
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-12 bg-primary/10">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Subscribe to receive updates on new products, special offers, and seasonal recipes.
          </p>
          
          <form className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-2 rounded-l-md border-y border-l border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
            <button 
              type="submit" 
              className="bg-primary text-white px-6 py-2 rounded-r-md font-medium hover:bg-primary/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 p-6 rounded-lg"
    >
      <p className="text-gray-600 mb-4 italic">"{quote}"</p>
      <p className="font-medium">— {author}</p>
    </motion.div>
  );
};

export default Home;