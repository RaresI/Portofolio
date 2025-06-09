export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  challenges: string[];
  impact: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'cybersecurity-learning-platform',
    title: 'Cybersecurity Learning Platform',
    description: 'A comprehensive online platform for learning cybersecurity through interactive challenges, news, and resources.',
    longDescription: `A comprehensive online platform designed to help users learn cybersecurity through engaging and interactive challenges, up-to-date news, and valuable resources. Whether you're a beginner looking to build a strong foundation or an experienced professional aiming to sharpen your skills, this platform offers hands-on exercises, real-world scenarios, and curated content to enhance your knowledge in cybersecurity.

Key features include:
• Interactive cybersecurity challenges
• Real-time security news updates
• Comprehensive learning resources
• Progress tracking system
• Community features
• Practical exercises
• User-friendly interface

The platform is designed to be accessible to both beginners and experienced professionals, with a focus on practical, hands-on learning.`,
    technologies: [
      'HTML',
      'Java',
      'CSS',
      'Docker',
      'Spring Boot',
      'MySQL',
      'Bootstrap',
      'REST APIs'
    ],
    imageUrl: '/images/projects/cybersecurity-platform.jpg',
    githubUrl: 'https://github.com/GeorgePetre11/Cybersecurity-Learning-Platform-',
    demoUrl: 'https://www.figma.com/proto/fAb4UyeTNq6FQOJPMw3NzW/Cybersecurity-Education-Platform?node-id=0-1&t=nwra90OShjGZZH5H-1',
    challenges: [
      'Developed a comprehensive learning management system with interactive challenges',
      'Implemented secure user authentication and progress tracking',
      'Created an intuitive UI/UX design with Figma prototyping',
      'Integrated real-time news updates and resource management'
    ],
    impact: [
      'Created an accessible platform for cybersecurity education',
      'Implemented interactive learning features for better engagement',
      'Developed a scalable architecture for future expansion',
      'Established a foundation for community-driven learning'
    ],
    featured: true
  },
  {
    id: 'bestem-hackathon',
    title: 'BESTEM Hackathon - RetailX Dashboard',
    description: 'AI-powered dashboard web application for RetailX, an online retail store, developed during the BESTEM Hackathon.',
    longDescription: `A collaborative project developed during the BESTEM Hackathon, where our team participated in SAP's challenge to create an innovative solution for RetailX, an online retail store. The project focuses on solving supply management problems and improving cost efficiency through AI-powered analytics.

Key features include:
• AI-Powered Product Classification using GPT-3.5-turbo
• Interactive Manager's Dashboard for category-specific insights
• CEO's Dashboard for high-level overview and custom queries
• Real-time data processing and analytics
• Automated product categorization
• Dynamic data visualization
• Custom query capabilities

The application leverages OpenAI's GPT-3.5-turbo model to intelligently classify product descriptions into predefined categories, providing valuable insights for inventory management and sales optimization.

Project Resources:
• Demo Video: https://www.youtube.com/watch?v=tCe7t03SZtU
• Project Presentation: https://ctipub-my.sharepoint.com/:p:/g/personal/alberto_udrea0412_stud_fils_upb_ro/ETnv5tPfdIFMgNIsTHol4qUBP7ZXQ7ftHLlEHiqiHUJ5zw?rtime=OP-dZ1nZ3Eg`,
    technologies: [
      'Microsoft PowerBI',
      'Node.js',
      'React',
      'HTML',
      'CSS',
      'OpenAI API',
      'Python',
      'Excel',
      'JSON'
    ],
    imageUrl: '/images/projects/bestem-hackathon.jpg',
    githubUrl: 'https://github.com/RaresI/BESTEm_Hackathon',
    demoUrl: 'https://www.youtube.com/watch?v=tCe7t03SZtU',
    challenges: [
      'Implemented AI-powered product classification using GPT-3.5-turbo',
      'Created interactive dashboards for different user roles (Manager and CEO)',
      'Developed real-time data processing and visualization systems',
      'Integrated multiple data sources and formats (Excel, JSON)'
    ],
    impact: [
      'Improved product categorization accuracy through AI',
      'Enhanced decision-making with interactive dashboards',
      'Streamlined supply management processes',
      'Provided actionable insights for cost efficiency optimization'
    ],
    featured: true
  },
  {
    id: 'e-camp',
    title: 'E-Camp Platform',
    description: 'Web application for camp management and organization.',
    longDescription: `A comprehensive camp management platform designed to streamline the operations of summer camps and outdoor education programs.

The platform includes:
• User management system
• Activity scheduling
• Resource allocation
• Registration system
• Communication tools
• Reporting features
• Mobile responsiveness

This project demonstrates full-stack development skills and practical application of web technologies.`,
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Bootstrap',
      'REST APIs'
    ],
    imageUrl: '/images/projects/e-camp.jpg',
    githubUrl: 'https://github.com/RaresI/E_Camp',
    challenges: [
      'Implemented secure user authentication',
      'Created an efficient scheduling system',
      'Developed a responsive design for all devices',
      'Integrated various camp management features'
    ],
    impact: [
      'Streamlined camp management processes',
      'Improved communication between staff and participants',
      'Enhanced resource allocation efficiency',
      'Simplified registration and organization'
    ],
    featured: true
  },
  {
    id: 'cybersim',
    title: 'CyberSim - IoT Security Simulation',
    description: 'A cybersecurity simulation project that demonstrates sensor data manipulation in IoT systems using Raspberry Pi Pico W.',
    longDescription: `A sophisticated cybersecurity simulation project that investigates how attackers can manipulate sensor data in networked IoT-like systems. Using two Raspberry Pi Pico W devices connected over WiFi, it demonstrates real-world attack scenarios and defensive mechanisms in embedded systems.

Key features include:
• Real-time sensor data manipulation simulation
• Multiple attack vectors demonstration
• Defensive mechanisms implementation
• Physical environment monitoring
• Interactive attack selection
• Visual and audio feedback systems
• Comprehensive logging and monitoring

The project uses various sensors (temperature, humidity, distance, light) and actuators (LEDs, buzzer, motor) to create a realistic IoT environment where security vulnerabilities can be demonstrated and mitigated.`,
    technologies: [
      'Rust',
      'Raspberry Pi Pico W',
      'WiFi',
      'Embedded Systems',
      'IoT',
      'Cybersecurity',
      'ST7789 Display',
      'DHT11 Sensor',
      'HC-SR04 Sensor',
      'Embassy Framework'
    ],
    imageUrl: '/images/projects/cybersim.jpg',
    githubUrl: 'https://github.com/UPB-FILS-MA/project-RaresI',
    challenges: [
      'Implemented secure communication between Pico devices',
      'Developed sophisticated attack detection mechanisms',
      'Created a user-friendly interface for attack selection',
      'Integrated multiple sensors and actuators for realistic simulation'
    ],
    impact: [
      'Demonstrated real-world IoT security vulnerabilities',
      'Created an educational platform for cybersecurity concepts',
      'Implemented effective defensive mechanisms',
      'Provided hands-on experience with embedded systems security'
    ],
    featured: true
  },
  {
    id: 'crypto-fraud-detection',
    title: 'Crypto Fraud Detection System',
    description: 'AI-powered system for detecting fraudulent cryptocurrency wallet activity using neural networks and genetic algorithms.',
    longDescription: `An advanced academic research project focused on developing an AI system for detecting suspicious behavior in cryptocurrency wallets through sophisticated behavioral analysis. The system combines neural networks with genetic algorithms to achieve optimal detection accuracy.

Key features include:
• AI-powered behavioral analysis of wallet transactions
• Genetic algorithm optimization of neural network parameters
• Real-time transaction pattern analysis
• Multi-feature behavioral profiling
• High-performance binary classification
• Automated hyperparameter optimization
• Comprehensive evaluation metrics

Technical Implementation:
• Data Generation & Preprocessing:
  - Transaction frequency and volume analysis
  - Token diversity tracking
  - Time-based pattern analysis
  - Network depth evaluation
  - Structured feature extraction

• Neural Network Architecture:
  - Multi-layer perceptron (MLP) with ReLU activations
  - Binary classification output
  - Optimized through genetic algorithm
  - Adaptive learning capabilities

• Genetic Algorithm Optimization:
  - Automated hyperparameter tuning
  - Population-based evolution
  - Crossover and mutation operators
  - Fitness-based selection
  - 15% performance improvement over manual tuning

The system demonstrates the effectiveness of combining machine learning with evolutionary algorithms for real-world fraud detection applications.`,
    technologies: [
      'Python',
      'TensorFlow',
      'Keras',
      'NumPy',
      'pandas',
      'scikit-learn',
      'Matplotlib',
      'Jupyter Notebook',
      'Git',
      'Machine Learning',
      'Genetic Algorithms',
      'Neural Networks'
    ],
    imageUrl: '/images/projects/crypto-fraud.jpg',
    githubUrl: 'https://github.com/RaresI/Crypto-Fraud-Detection',
    challenges: [
      'Developed and implemented a custom genetic algorithm for neural network optimization',
      'Created a comprehensive data generation system for training and validation',
      'Achieved significant performance improvements through automated parameter tuning',
      'Implemented robust evaluation metrics for imbalanced datasets'
    ],
    impact: [
      'Achieved high accuracy in detecting fraudulent wallet behavior',
      'Demonstrated the effectiveness of AI in cryptocurrency fraud detection',
      'Established a foundation for real-time blockchain monitoring',
      'Created a scalable framework for future research and implementation'
    ],
    featured: true
  }
]; 