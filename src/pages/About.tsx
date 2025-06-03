import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <div className="aspect-video rounded-lg overflow-hidden mb-8">
              <img 
                src="https://images.pexels.com/photos/6157059/pexels-photo-6157059.jpeg" 
                alt="Our workshop" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At Honey & Bloom, our mission is to bring the purest, most delicious organic jams and honey to your table. We believe in preserving nature's sweetness while protecting our environment and supporting local communities.
            </p>
            
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold mb-2">Quality</h3>
                <p className="text-gray-600">Only the finest organic ingredients, carefully selected and expertly crafted.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold mb-2">Sustainability</h3>
                <p className="text-gray-600">Eco-friendly practices and packaging to protect our environment.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold mb-2">Community</h3>
                <p className="text-gray-600">Supporting local farmers and beekeepers in our community.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
            <p className="text-gray-600">
              We're committed to maintaining the highest standards of quality and sustainability in everything we do. From our careful ingredient selection to our traditional preservation methods, every jar represents our dedication to excellence.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;