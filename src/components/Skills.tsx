import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Scene3D from './Scene3D';

const Skills: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const skills = [
    { name: 'React / Next.js', level: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'TypeScript', level: 90, color: 'from-blue-600 to-blue-400' },
    { name: 'Three.js / WebGL', level: 88, color: 'from-purple-500 to-pink-500' },
    { name: 'Node.js / Express', level: 85, color: 'from-green-500 to-emerald-500' },
    { name: 'Python / Django', level: 82, color: 'from-yellow-500 to-orange-500' },
    { name: 'GraphQL / Apollo', level: 78, color: 'from-pink-500 to-rose-500' },
    { name: 'AWS / Docker', level: 80, color: 'from-orange-500 to-red-500' },
    { name: 'UI/UX Design', level: 85, color: 'from-purple-600 to-indigo-500' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" className="relative py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black overflow-hidden">
      <Scene3D section="skills" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Technical{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            A comprehensive arsenal of cutting-edge technologies and frameworks 
            I wield to build extraordinary digital experiences
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={skillVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl hover:border-purple-500/50 transition-all duration-500"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500">
                  {skill.name}
                </h3>
                <motion.span
                  className="text-purple-400 font-bold text-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                >
                  {skill.level}%
                </motion.span>
              </div>
              
              <div className="relative w-full bg-gray-700/50 rounded-full h-4 overflow-hidden backdrop-blur-sm">
                <motion.div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ 
                    duration: 1.5, 
                    delay: index * 0.1 + 0.8,
                    ease: "easeOut"
                  }}
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={inView ? { x: '100%' } : {}}
                    transition={{
                      duration: 1,
                      delay: index * 0.1 + 2,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>

              {/* Floating particles on hover */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce" />
              <div className="absolute bottom-6 left-6 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;