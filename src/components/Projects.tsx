import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Scene3D from './Scene3D';

const Projects: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const projects = [
    {
      title: "3D Interactive Portfolio",
      description: "Immersive portfolio experience built with Three.js, featuring real-time 3D animations, particle systems, and interactive geometric shapes that respond to user input.",
      image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Three.js", "TypeScript", "Framer Motion", "WebGL"],
      github: "#",
      live: "#",
      featured: true
    },
    {
      title: "AI-Powered E-commerce",
      description: "Next-generation e-commerce platform with AI product recommendations, real-time inventory management, and seamless payment processing.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Next.js", "Stripe", "PostgreSQL", "OpenAI", "Tailwind CSS"],
      github: "#",
      live: "#",
      featured: false
    },
    {
      title: "Real-time Collaboration Hub",
      description: "Advanced collaboration platform with live document editing, video conferencing, and AI-powered meeting summaries for remote teams.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["React", "Node.js", "Socket.io", "WebRTC", "MongoDB"],
      github: "#",
      live: "#",
      featured: false
    },
    {
      title: "Blockchain Analytics Dashboard",
      description: "Comprehensive cryptocurrency analytics platform with real-time data visualization, portfolio tracking, and predictive market analysis.",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
      tech: ["Vue.js", "D3.js", "Web3", "Python", "FastAPI"],
      github: "#",
      live: "#",
      featured: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="relative py-20 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 overflow-hidden">
      <Scene3D section="projects" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative inline-block"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Featured{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
              <Sparkles className="absolute -top-4 -right-8 text-cyan-400 w-8 h-8 animate-spin" />
            </h2>
          </motion.div>
          
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            A curated collection of my most innovative work, showcasing creativity, 
            technical mastery, and cutting-edge solutions
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={projectVariants}
              whileHover={{ scale: 1.02, y: -10 }}
              className={`group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 ${
                project.featured ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full">
                  Featured
                </div>
              )}

              <div className={`${project.featured ? 'lg:flex' : ''}`}>
                {/* Image section */}
                <div className={`relative overflow-hidden ${project.featured ? 'lg:w-1/2' : ''}`}>
                  <motion.img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                  
                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <motion.a 
                      href={project.github}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:text-purple-400 transition-colors duration-300 border border-white/10"
                    >
                      <Github size={20} />
                    </motion.a>
                    <motion.a 
                      href={project.live}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full text-white hover:text-cyan-400 transition-colors duration-300 border border-white/10"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  </div>
                </div>
                
                {/* Content section */}
                <div className={`p-8 ${project.featured ? 'lg:w-1/2 lg:flex lg:flex-col lg:justify-center' : ''}`}>
                  <motion.h3
                    className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-500">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.1 + techIndex * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-4 py-2 text-sm bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-purple-300 rounded-full border border-purple-500/30 hover:border-purple-400 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;