import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const careers = [
  {
    title: 'Production Specialist',
    department: 'Manufacturing',
    location: 'Meadowville, CA',
    type: 'Full-time',
    description: 'Join our production team and help create our artisanal jams and honey products using traditional methods and modern food safety standards.'
  },
  {
    title: 'Quality Control Manager',
    department: 'Quality Assurance',
    location: 'Meadowville, CA',
    type: 'Full-time',
    description: 'Ensure our products meet the highest standards of quality and safety while maintaining organic certification requirements.'
  },
  {
    title: 'Marketing Coordinator',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Help tell our story and grow our brand through digital marketing, social media, and community engagement.'
  },
  {
    title: 'Sales Representative',
    department: 'Sales',
    location: 'Various Locations',
    type: 'Full-time',
    description: 'Build relationships with retailers and represent our brand at farmers markets and food festivals.'
  }
];

const Careers: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-gray-600">
              We're always looking for passionate individuals who share our values and want to make a difference in sustainable food production.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-4">Why Join Us?</h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 mr-2 bg-primary rounded-full"></span>
                  <span>Work with organic, sustainable products</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 mr-2 bg-primary rounded-full"></span>
                  <span>Competitive salary and benefits</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 mr-2 bg-primary rounded-full"></span>
                  <span>Professional development opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 mr-2 bg-primary rounded-full"></span>
                  <span>Flexible work arrangements</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 mt-2 mr-2 bg-primary rounded-full"></span>
                  <span>Employee discount on products</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">Passion for Quality</h3>
                  <p className="text-gray-600">We take pride in creating exceptional products that bring joy to our customers.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Sustainability</h3>
                  <p className="text-gray-600">Environmental responsibility is at the heart of everything we do.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Innovation</h3>
                  <p className="text-gray-600">We encourage creative thinking and new approaches to traditional methods.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Community</h3>
                  <p className="text-gray-600">We support each other and our local communities.</p>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {careers.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {job.department}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {job.location}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{job.description}</p>
                <button className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Don't see the right position?</h2>
            <p className="text-gray-600 mb-6">
              We're always interested in meeting talented individuals. Send us your resume and let us know how you can contribute to our team.
            </p>
            <a 
              href="mailto:careers@honeyandbloom.com" 
              className="btn-primary inline-flex items-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Us Your Resume
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;