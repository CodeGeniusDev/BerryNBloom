import React from 'react';
import { motion } from 'framer-motion';

const OurStory: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Our Story</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <img 
                  src="https://images.pexels.com/photos/5946083/pexels-photo-5946083.jpeg" 
                  alt="Our beginnings" 
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">The Beginning</h2>
                <p className="text-gray-600">
                  Founded in 2015, Honey & Bloom started as a small family operation with a simple dream: to create the purest, most delicious organic preserves while respecting nature's delicate balance.
                </p>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Our Journey</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0 font-bold">2015</div>
                  <div className="flex-grow">
                    <h3 className="font-bold mb-2">First Batch</h3>
                    <p className="text-gray-600">Started with our signature strawberry preserve recipe in a small kitchen.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0 font-bold">2017</div>
                  <div className="flex-grow">
                    <h3 className="font-bold mb-2">Growing Community</h3>
                    <p className="text-gray-600">Partnered with local organic farms and expanded our product line.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0 font-bold">2020</div>
                  <div className="flex-grow">
                    <h3 className="font-bold mb-2">Sustainability Focus</h3>
                    <p className="text-gray-600">Implemented eco-friendly packaging and zero-waste initiatives.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 flex-shrink-0 font-bold">2023</div>
                  <div className="flex-grow">
                    <h3 className="font-bold mb-2">National Recognition</h3>
                    <p className="text-gray-600">Awarded "Best Organic Preserve" at the National Food Awards.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Looking Forward</h2>
              <p className="text-gray-600 mb-6">
                As we continue to grow, our commitment to quality, sustainability, and community remains unchanged. We're excited to keep innovating while staying true to our artisanal roots.
              </p>
              <img 
                src="https://images.pexels.com/photos/8696141/pexels-photo-8696141.jpeg" 
                alt="Our future" 
                className="rounded-lg mx-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurStory;