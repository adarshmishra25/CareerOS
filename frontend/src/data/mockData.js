// Mock data for the CareerOS prototype
// All data is fictional and for demonstration purposes only

export const userData = {
  name: 'Adarsh Mishra',
  firstName: 'Adarsh',
  role: 'Computer Science Student',
  college: 'GL Bajaj Institute of Technology & Management',
  location: 'Greater Noida, India',
  email: 'adarsh.mishra@glbajaj.edu',
  initials: 'AM',
  careerScore: 78,
  profileCompletion: 92,
  about: 'Computer Science student focused on full-stack development, backend engineering and problem solving. Passionate about building scalable web applications using the MERN stack and exploring cloud technologies.',
  targetRole: 'Full Stack MERN Developer',
  targetIndustry: 'Software Engineering',
  education: {
    degree: 'B.Tech Computer Science',
    institution: 'GL Bajaj Institute of Technology & Management',
    years: '2024–2028',
    location: 'Greater Noida, India'
  },
  preferences: {
    targetRole: 'Full Stack MERN Developer',
    locations: ['Noida', 'Delhi', 'Bangalore', 'Remote'],
    jobTypes: ['Full-time', 'Internship'],
    salaryRange: '₹6–12 LPA'
  }
};

export const skillsData = {
  programming: [
    { name: 'JavaScript', level: 88, coursesCompleted: '6 / 7 Courses', status: 'Completed' },
    { name: 'HTML/CSS', level: 90, coursesCompleted: '5 / 5 Courses', status: 'Completed' },
    { name: 'TypeScript', level: 45, coursesCompleted: '2 / 5 Courses', status: 'In Progress' },
  ],
  frontend: [
    { name: 'React', level: 82, coursesCompleted: '7 / 8 Courses', status: 'Completed' },
    { name: 'React Router', level: 76, coursesCompleted: '3 / 4 Courses', status: 'Completed' },
    { name: 'Tailwind CSS', level: 80, coursesCompleted: '4 / 5 Courses', status: 'Completed' },
  ],
  backend: [
    { name: 'Node.js', level: 76, coursesCompleted: '5 / 6 Courses', status: 'In Progress' },
    { name: 'Express.js', level: 68, coursesCompleted: '3 / 5 Courses', status: 'In Progress' },
    { name: 'REST APIs', level: 82, coursesCompleted: '4 / 5 Courses', status: 'Completed' },
  ],
  database: [
    { name: 'MongoDB', level: 72, coursesCompleted: '4 / 6 Courses', status: 'In Progress' },
    { name: 'SQL', level: 70, coursesCompleted: '4 / 5 Courses', status: 'In Progress' },
  ],
  tools: [
    { name: 'Git', level: 88, coursesCompleted: '4 / 4 Courses', status: 'Completed' },
    { name: 'Docker', level: 42, coursesCompleted: '2 / 5 Courses', status: 'In Progress' },
    { name: 'AWS', level: 35, coursesCompleted: '1 / 4 Courses', status: 'Started' },
  ]
};

export const allSkills = [
  'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB',
  'HTML', 'CSS', 'SQL', 'Git', 'REST APIs'
];

export const strengths = ['JavaScript', 'React', 'Node.js', 'MongoDB'];
export const focusAreas = ['TypeScript', 'Docker', 'AWS', 'System Design'];

export const projects = [
  {
    id: 1,
    name: 'CareerOS',
    description: 'AI-powered career management platform for students and early-career professionals. Built with React, Node.js, Express.js and MongoDB.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    status: 'In Progress',
  },
  {
    id: 2,
    name: 'MarkVault',
    description: 'A modern bookmark manager with tag-based organization, full-text search and browser extension support.',
    tech: ['React', 'Node.js', 'MongoDB', 'Chrome API'],
    status: 'Completed',
  },
  {
    id: 3,
    name: 'Spotify Clone',
    description: 'Full-featured music streaming interface with playlist management, audio playback and responsive design.',
    tech: ['React', 'CSS', 'REST APIs', 'JavaScript'],
    status: 'Completed',
  }
];

export const jobsData = [
  {
    id: 1,
    title: 'Junior MERN Developer',
    company: 'TechNova Solutions',
    location: 'Noida, India',
    salary: '₹6–10 LPA',
    experience: '0–2 years',
    type: 'Full-time',
    skills: ['React', 'Node.js', 'MongoDB', 'Express.js'],
    match: 94,
    posted: '2 days ago',
    platform: 'LinkedIn',
    applyUrl: 'https://www.linkedin.com/jobs',
    description: 'We are looking for a passionate Junior MERN Developer to join our growing team. You will work on building and maintaining web applications using MongoDB, Express.js, React and Node.js.',
    responsibilities: [
      'Develop and maintain full-stack web applications using the MERN stack',
      'Collaborate with UI/UX designers to implement responsive designs',
      'Write clean, maintainable and well-tested code',
      'Participate in code reviews and sprint planning',
      'Debug and resolve technical issues across the stack'
    ],
    whyRecommended: 'Your React and JavaScript skills are a strong match. This role aligns well with your target of becoming a Full Stack MERN Developer.'
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'PixelCraft Studios',
    location: 'Bangalore, India',
    salary: '₹5–8 LPA',
    experience: '0–1 years',
    type: 'Full-time',
    skills: ['React', 'JavaScript', 'CSS', 'TypeScript'],
    match: 88,
    posted: '3 days ago',
    platform: 'Naukri',
    applyUrl: 'https://www.naukri.com',
    description: 'Join our creative team as a Frontend Developer. You will be responsible for building beautiful, performant user interfaces for our suite of design tools.',
    responsibilities: [
      'Build responsive and accessible user interfaces using React',
      'Implement pixel-perfect designs from Figma mockups',
      'Optimize application performance and bundle size',
      'Write unit and integration tests',
      'Contribute to our component library'
    ],
    whyRecommended: 'Your strong React and CSS skills make you a great candidate. This would strengthen your frontend expertise.'
  },
  {
    id: 3,
    title: 'Backend Developer',
    company: 'DataStream Inc.',
    location: 'Delhi, India',
    salary: '₹7–12 LPA',
    experience: '1–3 years',
    type: 'Full-time',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    match: 76,
    posted: '5 days ago',
    platform: 'Indeed',
    applyUrl: 'https://www.indeed.co.in',
    description: 'We need a Backend Developer to help build scalable APIs and microservices. You will work with our engineering team on high-traffic applications.',
    responsibilities: [
      'Design and implement RESTful APIs using Node.js and Express',
      'Manage MongoDB databases and optimize queries',
      'Implement authentication and authorization',
      'Write comprehensive API documentation',
      'Monitor and improve application performance'
    ],
    whyRecommended: 'This role would help you strengthen your backend skills, which is a focus area in your career plan.'
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'CloudSphere Technologies',
    location: 'Remote',
    salary: '₹8–14 LPA',
    experience: '1–2 years',
    type: 'Full-time',
    skills: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS'],
    match: 72,
    posted: '1 day ago',
    platform: 'LinkedIn',
    applyUrl: 'https://www.linkedin.com/jobs',
    description: 'Looking for a Full Stack Developer who can work across the entire application stack. Experience with cloud deployment is a plus.',
    responsibilities: [
      'Build end-to-end features from database to frontend',
      'Deploy and manage applications on AWS',
      'Implement CI/CD pipelines',
      'Mentor junior developers',
      'Participate in architectural decisions'
    ],
    whyRecommended: 'Great match for your MERN skills. Learning Docker and AWS would make you an even stronger candidate.'
  },
  {
    id: 5,
    title: 'Software Engineer Intern',
    company: 'InnovateLabs',
    location: 'Noida, India',
    salary: '₹25K–40K/month',
    experience: '0 years',
    type: 'Internship',
    skills: ['JavaScript', 'React', 'Node.js', 'Git'],
    match: 91,
    posted: '1 day ago',
    platform: 'Internshala',
    applyUrl: 'https://internshala.com',
    description: 'Join our internship program and work on real-world projects alongside experienced engineers. Great opportunity for students looking to gain industry experience.',
    responsibilities: [
      'Work on production features under mentor guidance',
      'Learn software development best practices',
      'Participate in daily standups and sprint ceremonies',
      'Write documentation for your contributions',
      'Present your work in monthly demo sessions'
    ],
    whyRecommended: 'Perfect entry-level opportunity that matches your current skill level. Great way to gain industry experience.'
  },
  {
    id: 6,
    title: 'MERN Stack Intern',
    company: 'StartupHub',
    location: 'Gurugram, India',
    salary: '₹20K–35K/month',
    experience: '0 years',
    type: 'Internship',
    skills: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    match: 93,
    posted: '4 days ago',
    platform: 'Internshala',
    applyUrl: 'https://internshala.com',
    description: 'Fast-paced startup looking for MERN Stack interns. You will ship features from day one and learn what it takes to build a product from scratch.',
    responsibilities: [
      'Build features using the MERN stack',
      'Work directly with the CTO on product development',
      'Implement user feedback quickly',
      'Deploy features to production',
      'Help maintain code quality standards'
    ],
    whyRecommended: 'Directly aligned with your MERN stack skills. Startup experience would be valuable for your career growth.'
  },
  {
    id: 7,
    title: 'React Developer',
    company: 'FinEdge Solutions',
    location: 'Bangalore, India',
    salary: '₹6–9 LPA',
    experience: '0–2 years',
    type: 'Full-time',
    skills: ['React', 'Redux', 'TypeScript', 'REST APIs'],
    match: 80,
    posted: '6 days ago',
    platform: 'Naukri',
    applyUrl: 'https://www.naukri.com',
    description: 'Build cutting-edge fintech interfaces with React. We are building the next generation of financial tools for small businesses.',
    responsibilities: [
      'Develop complex financial dashboards',
      'Implement real-time data visualization',
      'Ensure security compliance in frontend',
      'Optimize rendering performance',
      'Work with the design team on UX improvements'
    ],
    whyRecommended: 'Your React expertise is well-suited. This role would also help you learn TypeScript.'
  },
  {
    id: 8,
    title: 'Junior Web Developer',
    company: 'WebWorks Agency',
    location: 'Delhi, India',
    salary: '₹4–7 LPA',
    experience: '0–1 years',
    type: 'Full-time',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    match: 86,
    posted: '1 week ago',
    platform: 'Indeed',
    applyUrl: 'https://www.indeed.co.in',
    description: 'Digital agency looking for a Junior Web Developer to work on client websites and web applications. Diverse projects across multiple industries.',
    responsibilities: [
      'Build responsive websites for clients',
      'Maintain existing web applications',
      'Implement SEO best practices',
      'Create interactive prototypes',
      'Support senior developers on complex projects'
    ],
    whyRecommended: 'Good entry-level position that leverages your core web development skills.'
  }
];

export const applicationsData = [
  {
    id: 1,
    company: 'TechNova Solutions',
    role: 'MERN Developer',
    date: 'Aug 18',
    status: 'Applied',
    nextStep: 'Awaiting response'
  },
  {
    id: 2,
    company: 'CloudSphere',
    role: 'Full Stack Developer',
    date: 'Aug 15',
    status: 'Interview',
    nextStep: 'Technical round on Aug 22'
  },
  {
    id: 3,
    company: 'InnovateLabs',
    role: 'Software Engineer Intern',
    date: 'Aug 12',
    status: 'Shortlisted',
    nextStep: 'HR screening scheduled'
  },
  {
    id: 4,
    company: 'PixelCraft Studios',
    role: 'Frontend Developer',
    date: 'Aug 10',
    status: 'Applied',
    nextStep: 'Awaiting response'
  },
  {
    id: 5,
    company: 'DataStream Inc.',
    role: 'Backend Developer',
    date: 'Aug 08',
    status: 'Rejected',
    nextStep: '-'
  },
  {
    id: 6,
    company: 'StartupHub',
    role: 'MERN Stack Intern',
    date: 'Aug 06',
    status: 'Shortlisted',
    nextStep: 'Coding assessment due Aug 20'
  },
  {
    id: 7,
    company: 'FinEdge Solutions',
    role: 'React Developer',
    date: 'Aug 04',
    status: 'Interview',
    nextStep: 'Final round on Aug 25'
  },
  {
    id: 8,
    company: 'WebWorks Agency',
    role: 'Junior Web Developer',
    date: 'Aug 02',
    status: 'Applied',
    nextStep: 'Awaiting response'
  },
  {
    id: 9,
    company: 'CodeCraft Labs',
    role: 'Full Stack Intern',
    date: 'Jul 30',
    status: 'Offer',
    nextStep: 'Offer letter received'
  },
  {
    id: 10,
    company: 'NexGen IT',
    role: 'React Developer',
    date: 'Jul 28',
    status: 'Rejected',
    nextStep: '-'
  },
  {
    id: 11,
    company: 'AppForge',
    role: 'Frontend Intern',
    date: 'Jul 25',
    status: 'Shortlisted',
    nextStep: 'Technical assessment'
  },
  {
    id: 12,
    company: 'BuildRight Tech',
    role: 'Software Developer',
    date: 'Jul 22',
    status: 'Interview',
    nextStep: 'System design round'
  }
];

export const applicationStats = {
  total: 12,
  applied: 3,
  shortlisted: 3,
  interview: 3,
  offer: 1,
  rejected: 2
};

export const roadmapData = [
  { id: 1, name: 'HTML & CSS', status: 'completed', time: '4 weeks', difficulty: 'Beginner', skills: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox', 'Grid'] },
  { id: 2, name: 'JavaScript', status: 'completed', time: '6 weeks', difficulty: 'Beginner', skills: ['ES6+', 'DOM', 'Async/Await', 'Closures', 'Promises'] },
  { id: 3, name: 'Git & GitHub', status: 'completed', time: '2 weeks', difficulty: 'Beginner', skills: ['Version Control', 'Branching', 'Pull Requests', 'Collaboration'] },
  { id: 4, name: 'React', status: 'completed', time: '6 weeks', difficulty: 'Intermediate', skills: ['Components', 'Hooks', 'State', 'Props', 'JSX'] },
  { id: 5, name: 'React Router', status: 'completed', time: '1 week', difficulty: 'Intermediate', skills: ['Routing', 'Navigation', 'URL Params', 'Protected Routes'] },
  { id: 6, name: 'Node.js', status: 'current', time: '4 weeks', difficulty: 'Intermediate', skills: ['Event Loop', 'Modules', 'File System', 'Streams'] },
  { id: 7, name: 'Express.js', status: 'current', time: '3 weeks', difficulty: 'Intermediate', skills: ['Routing', 'Middleware', 'Error Handling', 'MVC'] },
  { id: 8, name: 'MongoDB', status: 'upcoming', time: '3 weeks', difficulty: 'Intermediate', skills: ['CRUD', 'Mongoose', 'Aggregation', 'Indexing'] },
  { id: 9, name: 'REST APIs', status: 'upcoming', time: '2 weeks', difficulty: 'Intermediate', skills: ['API Design', 'CRUD Endpoints', 'Validation', 'Documentation'] },
  { id: 10, name: 'Authentication', status: 'upcoming', time: '2 weeks', difficulty: 'Intermediate', skills: ['JWT', 'OAuth', 'Sessions', 'Password Hashing'] },
  { id: 11, name: 'TypeScript', status: 'upcoming', time: '4 weeks', difficulty: 'Intermediate', skills: ['Types', 'Interfaces', 'Generics', 'Type Guards'] },
  { id: 12, name: 'Docker', status: 'upcoming', time: '2 weeks', difficulty: 'Advanced', skills: ['Containers', 'Images', 'Docker Compose', 'Volumes'] },
  { id: 13, name: 'AWS', status: 'upcoming', time: '3 weeks', difficulty: 'Advanced', skills: ['EC2', 'S3', 'Lambda', 'CloudFront'] },
  { id: 14, name: 'System Design', status: 'upcoming', time: '4 weeks', difficulty: 'Advanced', skills: ['Scalability', 'Caching', 'Load Balancing', 'Microservices'] },
];

export const careerGoals = [
  {
    id: 1,
    title: 'Become a Full Stack MERN Developer',
    target: 'June 2027',
    progress: 72,
    isMain: true,
    milestones: [
      { text: 'Master JavaScript', done: true },
      { text: 'Build React projects', done: true },
      { text: 'Learn Node.js', done: true },
      { text: 'Learn Express.js', done: true },
      { text: 'Learn MongoDB', done: true },
      { text: 'Learn TypeScript', done: false },
      { text: 'Learn Docker', done: false },
      { text: 'Learn AWS', done: false },
    ]
  },
  {
    id: 2,
    title: 'Get a software internship',
    target: 'December 2026',
    progress: 60,
    isMain: false,
    milestones: []
  },
  {
    id: 3,
    title: 'Build 3 production-ready projects',
    target: 'March 2027',
    progress: 66,
    isMain: false,
    milestones: []
  },
  {
    id: 4,
    title: 'Solve 500 DSA problems',
    target: 'June 2027',
    progress: 63,
    isMain: false,
    milestones: []
  },
  {
    id: 5,
    title: 'Improve resume',
    target: 'September 2026',
    progress: 90,
    isMain: false,
    milestones: []
  }
];

export const resumeData = {
  score: 86,
  breakdown: [
    { label: 'ATS Compatibility', score: 91 },
    { label: 'Skills', score: 84 },
    { label: 'Impact', score: 82 },
    { label: 'Formatting', score: 95 },
  ],
  suggestions: [
    'Add measurable results to your project descriptions.',
    'Highlight your backend development experience.',
    'Include GitHub links for technical projects.',
    'Add relevant MERN technologies to your skills section.'
  ]
};

export const notificationsData = [
  {
    id: 1,
    message: 'Your Career Score increased by 4%.',
    time: '2 hours ago',
    type: 'green',
    icon: 'trending-up'
  },
  {
    id: 2,
    message: '3 new jobs match your profile.',
    time: '4 hours ago',
    type: 'blue',
    icon: 'briefcase'
  },
  {
    id: 3,
    message: 'Your application at CloudSphere moved to Interview.',
    time: '1 day ago',
    type: 'green',
    icon: 'check-circle'
  },
  {
    id: 4,
    message: 'Your roadmap milestone Node.js is 62% complete.',
    time: '2 days ago',
    type: 'orange',
    icon: 'map'
  }
];

export const aiSuggestedPrompts = [
  'Am I ready for a MERN internship?',
  'What should I learn next?',
  'Which jobs match my skills?',
  'How can I improve my resume?',
  'Create a learning plan for me.'
];

export const skillGapAnalysis = [
  { skill: 'Docker', priority: 'HIGH' },
  { skill: 'AWS', priority: 'HIGH' },
  { skill: 'System Design', priority: 'MEDIUM' },
  { skill: 'TypeScript', priority: 'MEDIUM' },
  { skill: 'Advanced React', priority: 'LOW' },
];
