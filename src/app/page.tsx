'use client';

import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCode, FaShieldAlt, FaUserTie, FaGraduationCap, FaBars, FaTimes } from 'react-icons/fa';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import dynamic from 'next/dynamic';
import { projects } from './data/projects';
import { motion, useScroll, useSpring } from 'framer-motion';

const FloatingElements = dynamic(() => import('./components/FloatingElements'), {
  ssr: false,
});

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.section-transition').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus('error');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Background elements */}
      <FloatingElements />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient hover:opacity-80 transition-opacity duration-300"
                >
                  rares-ionescu.dev
                </a>
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex gap-8">
                {['about', 'skills', 'projects', 'education', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors capitalize group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Navigation Menu */}
            <motion.div
              initial={false}
              animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {['about', 'skills', 'projects', 'education', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors capitalize"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900 z-0" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.08] dark:opacity-[0.12]" />
          <div className="absolute inset-0 bg-dots-pattern opacity-[0.05] dark:opacity-[0.08]" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6"
              >
                Hi, I&apos;m{" "}
                <span className="text-blue-600 dark:text-blue-400">Rares-Andrei Ionescu</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto"
              >
                A Computer Science student and Software Engineer passionate about building
                innovative solutions and creating impactful software.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors duration-300"
                >
                  Get in Touch
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
                >
                  View Projects
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A passionate software engineer with a focus on cybersecurity and innovative solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaGraduationCap className="text-2xl text-blue-600 dark:text-blue-400" />,
                  title: "Education",
                  description: "Computer Science student at University POLITEHNICA of Bucharest, specializing in Software Engineering and Cybersecurity.",
                  bgColor: "from-blue-500/10 to-blue-600/10",
                  borderColor: "border-blue-200 dark:border-blue-800"
                },
                {
                  icon: <FaCode className="text-2xl text-purple-600 dark:text-purple-400" />,
                  title: "Development",
                  description: "Full-stack developer with expertise in Rust, Python, and modern web technologies. Building secure and efficient applications.",
                  bgColor: "from-purple-500/10 to-purple-600/10",
                  borderColor: "border-purple-200 dark:border-purple-800"
                },
                {
                  icon: <FaShieldAlt className="text-2xl text-green-600 dark:text-green-400" />,
                  title: "Cybersecurity",
                  description: "Specialized in network security, penetration testing, and threat detection. Implementing robust security measures in applications.",
                  bgColor: "from-green-500/10 to-green-600/10",
                  borderColor: "border-green-200 dark:border-green-800"
                }
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`glass-effect rounded-xl p-6 hover-lift relative group border ${card.borderColor}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg inline-block mb-4">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{card.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Key Skills
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A comprehensive overview of my technical expertise and professional capabilities
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Technical Skills */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-effect rounded-xl p-6 hover-lift relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <FaCode className="text-2xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Technical Expertise</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
                    Core technical skills and technologies I&apos;ve mastered through hands-on development and continuous learning
                  </p>
                  <div className="space-y-8">
                    {[
                      { 
                        name: 'Programming Languages',
                        description: 'Core languages I use for development',
                        skills: [
                          { name: 'Rust', level: 90 },
                          { name: 'Python', level: 95 },
                          { name: 'TypeScript', level: 85 },
                          { name: 'C++', level: 80 },
                          { name: 'C#', level: 75 }
                        ]
                      },
                      { 
                        name: 'Web Development',
                        description: 'Modern web technologies and frameworks',
                        skills: [
                          { name: 'React', level: 90 },
                          { name: 'Next.js', level: 85 },
                          { name: 'Node.js', level: 80 },
                          { name: 'Tailwind CSS', level: 95 },
                          { name: 'REST APIs', level: 90 }
                        ]
                      },
                      { 
                        name: 'DevOps & Tools',
                        description: 'Development and deployment tools',
                        skills: [
                          { name: 'Git', level: 95 },
                          { name: 'Docker', level: 85 },
                          { name: 'Linux', level: 90 },
                          { name: 'CI/CD', level: 80 },
                          { name: 'AWS', level: 75 }
                        ]
                      },
                      { 
                        name: 'Databases',
                        description: 'Database technologies and management',
                        skills: [
                          { name: 'PostgreSQL', level: 85 },
                          { name: 'MongoDB', level: 80 },
                          { name: 'Redis', level: 75 },
                          { name: 'SQL', level: 90 }
                        ]
                      }
                    ].map((category, idx) => (
                      <div key={idx} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {category.name}
                          </h4>
                          <span className="text-xs text-gray-400 dark:text-gray-500">{category.description}</span>
                        </div>
                        <div className="space-y-2">
                          {category.skills.map((skill, skillIdx) => (
                            <div key={skillIdx} className="space-y-1">
                              <div className="flex justify-between items-center text-sm">
                                <span className="font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                                <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                              </div>
                              <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: skillIdx * 0.1 }}
                                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Professional Skills */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-effect rounded-xl p-6 hover-lift relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <FaUserTie className="text-2xl text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Professional Skills</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
                    Specialized expertise and soft skills developed through professional experience and continuous growth
                  </p>
                  <div className="space-y-8">
                    {[
                      { 
                        name: 'Cybersecurity',
                        description: 'Security analysis and protection',
                        skills: [
                          { name: 'Network Security', level: 90 },
                          { name: 'Penetration Testing', level: 85 },
                          { name: 'Security Analysis', level: 95 },
                          { name: 'Threat Detection', level: 90 }
                        ]
                      },
                      { 
                        name: 'AI & Machine Learning',
                        description: 'Advanced AI and ML techniques',
                        skills: [
                          { name: 'Neural Networks', level: 85 },
                          { name: 'Data Analysis', level: 90 },
                          { name: 'Pattern Recognition', level: 85 },
                          { name: 'Model Training', level: 80 }
                        ]
                      },
                      { 
                        name: 'Project Management',
                        description: 'Leadership and organization',
                        skills: [
                          { name: 'Agile Methodologies', level: 90 },
                          { name: 'Team Leadership', level: 85 },
                          { name: 'Problem Solving', level: 95 },
                          { name: 'Technical Documentation', level: 90 }
                        ]
                      },
                      { 
                        name: 'Soft Skills',
                        description: 'Interpersonal and communication',
                        skills: [
                          { name: 'Communication', level: 95 },
                          { name: 'Collaboration', level: 90 },
                          { name: 'Critical Thinking', level: 95 },
                          { name: 'Adaptability', level: 90 }
                        ]
                      }
                    ].map((category, idx) => (
                      <div key={idx} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {category.name}
                          </h4>
                          <span className="text-xs text-gray-400 dark:text-gray-500">{category.description}</span>
                        </div>
                        <div className="space-y-2">
                          {category.skills.map((skill, skillIdx) => (
                            <div key={skillIdx} className="space-y-1">
                              <div className="flex justify-between items-center text-sm">
                                <span className="font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                                <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                              </div>
                              <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: skillIdx * 0.1 }}
                                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 relative overflow-hidden bg-gray-50/50 dark:bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A selection of my most impactful and innovative projects
              </p>
            </motion.div>

            <div className="space-y-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <ProjectCard 
                    project={project} 
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {/* Education Section */}
        <section id="education" className="py-20 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Education
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                My academic journey and continuous learning path
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-effect rounded-xl p-6 hover-lift max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <FaGraduationCap className="text-2xl text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Academic Background</h3>
              </div>
              <div className="space-y-8">
                <div className="relative pl-6 border-l-2 border-purple-200 dark:border-purple-800">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 dark:bg-purple-400" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Bachelor&apos;s in Computer Science</h4>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">University POLITEHNICA of Bucharest</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">2022 - Present</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Specializing in Software Engineering and Cybersecurity. Relevant coursework includes:
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Network Security and Cryptography
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Software Architecture and Design
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Machine Learning and AI
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      Database Systems
                    </li>
                  </ul>
                </div>

                <div className="relative pl-6 border-l-2 border-purple-200 dark:border-purple-800">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 dark:bg-purple-400" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">High School Diploma</h4>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">Liceul Teoretic Ovidius</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">September 2018 - June 2022</p>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    <p>Specialization in Natural Sciences with German Bilingual Program. Graduated with honors.</p>
                    <p>Certified German language proficiency: Goethe-Zertifikat B1</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 relative overflow-hidden bg-gray-50/50 dark:bg-gray-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Get in Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Let&apos;s discuss how we can work together to create something amazing
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-effect rounded-xl p-6 hover-lift"
              >
                <div className="space-y-6">
                  {[
                    {
                      icon: <FaEnvelope className="text-xl text-blue-600 dark:text-blue-400" />,
                      title: "Email",
                      content: "ionescurarespfa@gmail.com",
                      link: "mailto:ionescurarespfa@gmail.com"
                    },
                    {
                      icon: <FaPhone className="text-xl text-purple-600 dark:text-purple-400" />,
                      title: "Phone",
                      content: "+40 742 170 100",
                      link: "tel:+40742170100"
                    },
                    {
                      icon: <FaMapMarkerAlt className="text-xl text-green-600 dark:text-green-400" />,
                      title: "Location",
                      content: "Bucharest, Romania",
                      link: "https://maps.google.com/?q=Bucharest,Romania"
                    },
                    {
                      icon: <FaLinkedin className="text-xl text-blue-600 dark:text-blue-400" />,
                      title: "LinkedIn",
                      content: "linkedin.com/in/rares-andrei-ionescu",
                      link: "https://linkedin.com/in/rares-andrei-ionescu"
                    },
                    {
                      icon: <FaGithub className="text-xl text-gray-600 dark:text-gray-400" />,
                      title: "GitHub",
                      content: "github.com/RaresI",
                      link: "https://github.com/RaresI"
                    }
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.title}</h3>
                        <p className="text-gray-900 dark:text-white font-medium">{item.content}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-effect rounded-xl p-6 hover-lift"
              >
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your message"
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={formStatus === 'submitting' ? undefined : { scale: 1.02 }}
                    whileTap={formStatus === 'submitting' ? undefined : { scale: 0.98 }}
                    disabled={formStatus === 'submitting'}
                    className={`w-full px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-300 ${
                      formStatus === 'submitting'
                        ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                        : formStatus === 'success'
                        ? 'bg-green-600 hover:bg-green-700'
                        : formStatus === 'error'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl'
                    } text-white`}
                  >
                    {formStatus === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : formStatus === 'success' ? (
                      'Message Sent!'
                    ) : formStatus === 'error' ? (
                      'Error Sending Message'
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Rares Andrei Ionescu. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
