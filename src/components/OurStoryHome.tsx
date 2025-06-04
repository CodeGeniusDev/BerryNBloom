import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function OurStory() {
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Child animation for images and text
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Secondary image animation
  const secondaryImageVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
    },
  };

  // Badge animation
  const badgeVariants = {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    visible: {
      opacity: 1,
      rotate: -3,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", type: "spring", stiffness: 100, delay: 0.4 },
    },
  };

  // Button hover animation
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <section className="container mx-auto px-4 py-8 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Images */}
          <div className="relative">
            <motion.div
              className="rounded-2xl overflow-hidden shadow-xl"
              variants={childVariants}
            >
              <img
                src="/images/ourstory-honey.jpg"
                alt="Baking ingredients"
                className="w-full h-[300px] md:h-[500px] object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
              variants={secondaryImageVariants}
            >
              <img
                src="/images/orangeJam.jpg"
                alt="Fresh pasta"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -top-4 -left-4 md:-top-6 md:-left-6 bg-primary text-white py-2 px-4 md:py-3 md:px-6 rounded-lg bg-burgundy-600 shadow-2xl transform -rotate-3 z-10 text-sm md:text-base"
              variants={badgeVariants}
            >
              Est. 2018
            </motion.div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6 md:space-y-8">
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              variants={childVariants}
            >
              Our Sweet Story
            </motion.h2>

            <div className="space-y-4 md:space-y-6 text-textColor">
              <motion.p
                className="max-w-lg text-gray-600 text-sm md:text-base"
                variants={childVariants}
                transition={{ delay: 0.2 }}
              >
                Founded in 2018, we began as a small family kitchen operation
                with a passion for creating delicious desserts that bring joy to
                people's lives.
              </motion.p>
              <motion.p
                className="max-w-lg text-gray-600 text-sm md:text-base"
                variants={childVariants}
                transition={{ delay: 0.3 }}
              >
                What started as a hobby quickly blossomed into a beloved brand
                known for quality ingredients, exceptional taste, and a
                commitment to creating memorable sweet experiences for our
                customers.
              </motion.p>
            </div>

            {/* Mission and Promise Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
              <motion.div
                className="bg-secondary/30 p-4 md:p-6 rounded-xl"
                variants={childVariants}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-textColor mb-2">
                  Our Mission
                </h3>
                <p className="text-sm md:text-base text-textColor">
                  To create moments of joy through delicious, handcrafted
                  desserts.
                </p>
              </motion.div>
              <motion.div
                className="bg-secondary/30 p-4 md:p-6 rounded-xl"
                variants={childVariants}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-lg md:text-xl font-bold text-textColor mb-2">
                  Our Promise
                </h3>
                <p className="text-sm md:text-base text-textColor">
                  Quality ingredients, authentic recipes, and exceptional
                  service.
                </p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div variants={childVariants} transition={{ delay: 0.6 }}>
              <Link
                to="/our-story"
                className="inline-flex items-center px-4 py-2 md:px-6 md:py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-colors duration-300 w-full md:w-auto text-center"
              >
                <motion.span variants={buttonVariants} whileHover="hover">
                  <div className="flex items-center justify-center">
                    Read Our Full Story
                    <ChevronRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                  </div>
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default OurStory;