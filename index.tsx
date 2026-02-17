import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Github, 
  Youtube,
  Linkedin, 
  Twitter, 
  Mail, 
  Menu, 
  X, 
  ArrowRight, 
  Download, 
  ExternalLink, 
  Code2, 
  Palette, 
  Terminal, 
  Database,
  Cpu,
  Globe,
  MapPin,
  Phone,
  Facebook,
  Video,
  Smartphone
} from 'lucide-react';

// --- Types ---
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
}

// --- Hooks ---
const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, we can stop observing if we only want the animation once
        if (elementRef.current) observer.unobserve(elementRef.current);
      }
    }, { threshold: 0.1, ...options });

    if (elementRef.current) observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [options]);

  return { elementRef, isVisible };
};

// --- Components ---

const Reveal: React.FC<RevealProps> = ({ children, delay = 0 }) => {
  const { elementRef, isVisible } = useIntersectionObserver();
  
  return (
    <div 
      ref={elementRef} 
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-heading font-bold tracking-tighter text-white hover:text-primary transition-colors">
          MAHBUB<span className="text-primary">.DEV</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="#contact"
            className="px-5 py-2 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-medium text-sm"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-200 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full glass-nav border-t border-white/5 transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0'}`}>
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-slate-300 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="inline-block text-center mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="order-2 md:order-1 text-center md:text-left">
          <Reveal>
            <div className="hidden md:inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Web, App & IoT Solutions
            </div>
          </Reveal>
          
          <Reveal delay={100}>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight mb-6">
              Building <span className="text-gradient">Intelligent</span> <br />
              Digital Solutions.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex md:hidden justify-center mb-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Web, App & IoT Solutions
              </div>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed">
              Hello, I'm Mahbub a passionate developer and creative professional who builds intelligent digital solutions — from websites and Android apps to AI-powered tools.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href="#projects" 
                className="px-8 py-4 rounded-full bg-white text-dark font-bold hover:bg-slate-200 transition-colors flex items-center group"
              >
                View Projects
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 rounded-full border border-slate-700 text-white font-medium hover:border-white hover:bg-white/5 transition-all"
              >
                Contact Me
              </a>
            </div>
          </Reveal>
          
          <Reveal delay={400}>
            <div className="mt-12 flex items-center space-x-6 text-slate-500">
              <span className="text-sm font-mono">Tech Stack:</span>
              <div className="flex space-x-4">
                <Globe size={24} className="hover:text-primary transition-colors" />
                <Smartphone size={24} className="hover:text-primary transition-colors" />
                <Cpu size={24} className="hover:text-primary transition-colors" />
                <Video size={24} className="hover:text-primary transition-colors" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="order-1 md:order-2 hidden lg:flex justify-center">
           {/* Code Block representation */}
           <Reveal delay={200}>
             <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full opacity-20 blur-3xl animate-pulse"></div>
                <div className="relative z-10 w-full h-full glass-card rounded-2xl p-6 transform rotate-3 hover:rotate-0 transition-all duration-500 border-t border-l border-white/10 shadow-2xl">
                  <div className="h-full w-full bg-dark/50 rounded-xl overflow-hidden relative">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-slate-800 flex items-center px-4 space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="p-6 pt-12 text-slate-300 font-mono text-sm">
                        <p><span className="text-secondary">const</span> <span className="text-blue-400">mahbub</span> = <span className="text-yellow-300">{`{`}</span></p>
                        <p className="pl-4">role: <span className="text-green-400">'WordPress Developer'</span>,</p>
                        <p className="pl-4">focus: [<span className="text-green-400">'WordPress'</span>, <span className="text-green-400">'Android'</span>, <span className="text-green-400">'IoT'</span>],</p>
                        <p className="pl-4">passion: <span className="text-green-400">'Innovation'</span>,</p>
                        <p className="pl-4">status: <span className="text-secondary">OPEN_TO_WORK</span></p>
                        <p><span className="text-yellow-300">{`}`}</span>;</p>
                        <br/>
                        <p className="animate-pulse"><span className="text-blue-400">console</span>.log(<span className="text-green-400">"Let's Build!"</span>);</p>
                    </div>
                  </div>
                </div>
             </div>
           </Reveal>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '18+', label: 'Projects Done' },
    { number: '16+', label: 'Happy Clients' },
  ];

  return (
    <section id="about" className="py-20 bg-dark-lighter/30 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl transform rotate-6 opacity-30 blur-lg"></div>
              <img 
                src="mdmahbuburrahman-photo.jpg" 
                alt="MD Mahbubur Rahman" 
                className="relative z-10 w-full rounded-2xl shadow-xl hover:scale-[1.02] transition-all duration-500 object-cover h-[500px]"
              />
            </div>
          </Reveal>

          <div>
            <Reveal delay={100}>
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2 text-center md:text-left">About Me</h2>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6 text-center md:text-left">
                Creator & <br />
                <span className="text-gradient">Tech Enthusiast</span>
              </h3>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-slate-400 leading-relaxed mb-6">
                Hi, I'm Mahbubur Rahman a Computer Science student who turned real world problem into the digital solution. It started with repairing phones, then grew into building websites, developing apps, and creating AI tools. Nothing was forced every new challenge pulled me forward naturally, and I look at every new problem with a digital solution.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Along the way, I founded Avo Edu Global, volunteered with Purnota Foundation, and competed in some of the national innovation competitions where I solved real world problems. I'm still learning every single day but that's exactly what keeps me moving forward.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <h4 className="text-3xl font-bold text-white">{stat.number}</h4>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex justify-center md:justify-start">
                <a 
                  href="MD-Mahbubur-Rahman-WordPress-Developer-2026.pdf" 
                  className="inline-flex items-center space-x-2 text-white border-b border-primary pb-1 hover:text-primary transition-colors"
                >
                  <span>Download CV</span>
                  <Download size={18} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Web Development",
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      skills: ["Platforms: WordPress, Shopify, WooCommerce", "Web Technologies: HTML, CSS, JavaScript (Basics)", "Customization: Elementor Theme Customization, Plugin Integration", "Optimization: Website Speed & SEO Optimization, Responsive Design", "Hosting & Setup: Web Hosting, Domain Configuration, AWS Cloud."]
    },
    {
      title: "UI/UX & Graphic Design",
      icon: <Smartphone className="w-6 h-6 text-green-400" />,
      skills: ["Design Tools: Figma, Adobe XD, Adobe Photoshop, Adobe Illustrator, Adobe Firefly, Nano Banana", "Specializations: UI/UX Design, Wireframing, Prototyping Social Media Branding", "Branding: Logo Design, Social Media Content Design, QR/Card Design, T-Shirt Design"]
    },
    {
      title: "Programming & Data Base",
      icon: <Database className="w-6 h-6 text-pink-400" />,
      skills: ["Languages: Python, C/C++", "Version control: Git & GitHub", "Database: MySQL", "AI & ML: TensorFlow, Scikit-learn", "Data Tools: Pandas, NumPy, Matplotlib", "Deployment: Streamlit, Heroku", "Integration: REST API Integration, Data Visualization"]
    },
    {
      title: "Digital Marketing & SEO",
      icon: <Palette className="w-6 h-6 text-yellow-400" />,
      skills: ["Search Optimization: Google & Ai SEO", "Advertising Platforms: Google Ads, Meta Ads, TikTok Ads", "Campaigns: Social Media Campaign Management, Content Strategy, and Marketing Analytics"]
    },
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden scroll-mt-28">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">My Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Skills & Technologies
            </h3>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="glass-card p-6 rounded-2xl hover:bg-white/5 transition-all duration-300 h-full group">
                <div className="w-12 h-12 rounded-lg bg-dark-lighter flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{category.title}</h4>
                <ul className="space-y-2">
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center text-slate-400 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2 group-hover:bg-primary transition-colors"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Air 13X",
      category: "Ai & Data Science",
      // keep one remote fallback image but prefer local images placed in /img/air13x/
      //image: "/img/air13x/cover.jpg",
      images: [
        "/img/air13x/appview.png",
        "/img/air13x/aiolymiad.png",

      ],
      // (manual slides removed)
      // YouTube embed (Freeview) - responsive iframe will use this src
      video: "https://www.youtube.com/embed/ToQgvpcB8O8?si=Yqn9FjPxofoYk1kJ&controls=0",
      description: "AI-powered air quality analyzer & health advisory app developed using Python and hosted on Streamlit Cloud. Provides real-time AQI insights and personalized health recommendations based on user location. Selected as the 17th place from 893+ projects nationwide for the Dhaka finals, and presented to leading computer scientists, including Prof. Dr. Syed Akhter Hossain.",
      tech: ["Python", "Streamlit", "AI & ML", "API", "Data Visualization", "Web App", "UI & UX Design"],
      links: { demo: "https://air13x.streamlit.app/", code: "#" }
    },
    {
      title: "Avo Edu Global",
      category: "Study Abroad Agency",
      images: [
        "/img/avoedu/avoeducover.png",
        "/img/avoedu/avoeduwebproject.png",
      ],
      description: "Founded and led an educational consultancy providing end-to-end university application services for USA and Finland admissions. Led a 3-member web development team delivering WordPress website solutions for educational institutions, overseeing projects from concept to live deployment. Managed business operations, client relationships, and service quality while ensuring high satisfaction across all departments.",
      tech: ["WordPress With Elementor", "SEO", "UI & UX Design", "Digital marketing", "Project Manager","Counselor","CRM Management", "Visa Processing", "DET, IELTS, SAT & GRE Prep"],
      links: { demo: "#", code: "#" }
    },
    {
      title: "Food Delivery Robot",
      category: "IoT & Robotics",
      images: [
        "/img/FoodDelivery/foodwin.png",
        "/img/FoodDelivery/fooddev.png",
      ],
      description: "I led my team in developing a Food Delivery Robot, achieving success at both national and regional levels. In the national-level ASSET Competition, we placed in the 3rd place among 48+ projects, earning a certificate and 17,000 Taka in prize money. I presented the project to Education Minister Mohibul Hasan Chowdhury Nowfel. At the regional college level, we secured first place among 285+ projects, winning 7,500 Taka.",
      tech: ["Arduino", "C++", "Hardware", "Android Application"],
      links: { demo: "#", code: "#" }
    },
    {
      title: "Purnota Foundation",
      category: "Non-Profit",
      images: [
        "/img/PurnotaFoundation/pd2.png",
        "/img/PurnotaFoundation/pd1.png",
      ],
      description: "Managed website content, edited promotional videos, and supported fundraising campaigns. Contributed to charitable projects including tube well construction 15+ wells and food distribution 250+ families.",
      tech: ["WordPress Dev", "Video Editor"],
      links: { demo: "#", code: "#" }
    }
  ];

  // Removed manual slides/lightbox state and helpers (not used anymore)

  // active media index per project (images + optional video treated as one media list)
  const [activeMedia, setActiveMedia] = useState<number[]>(projects.map(() => 0));
  const prevMedia = (pIdx: number) => {
    setActiveMedia(prev => {
      const next = [...prev];
      const mediaCount = ((projects[pIdx].images?.length || 0) + (projects[pIdx].video ? 1 : 0)) || 1;
      next[pIdx] = (next[pIdx] - 1 + mediaCount) % mediaCount;
      return next;
    });
  };
  const nextMedia = (pIdx: number) => {
    setActiveMedia(prev => {
      const next = [...prev];
      const mediaCount = ((projects[pIdx].images?.length || 0) + (projects[pIdx].video ? 1 : 0)) || 1;
      next[pIdx] = (next[pIdx] + 1) % mediaCount;
      return next;
    });
  };
  const setMediaIndex = (pIdx: number, idx: number) => setActiveMedia(prev => {
    const next = [...prev]; next[pIdx] = idx; return next;
  });

  return (
    <section id="projects" className="py-20 bg-dark-lighter/30 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row text-center md:text-left justify-center md:justify-between items-center md:items-end mb-16">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Portfolio</h2>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white">
                Selected Works
              </h3>
            </div>
            <a href="#" className="hidden md:flex items-center text-slate-400 hover:text-white transition-colors mt-4 md:mt-0">
              View All Projects <ArrowRight size={16} className="ml-2" />
            </a>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <Reveal key={idx} delay={idx * 150}>
              <div className="group rounded-2xl overflow-hidden bg-dark border border-white/5 relative h-full">
                {/* Combined media carousel: images + optional YouTube video */}
                <div>
                  {(() => {
                    // Make video first, then images
                    const mediaList: string[] = [ ...(project.video ? [project.video] : []), ...(project.images || []) ];
                    const currentIdx = activeMedia[idx] ?? 0;
                    const isVideo = project.video && currentIdx === 0;
                    return (
                      <div className="relative">
                        <div className="relative overflow-hidden aspect-video">
                          {isVideo ? (
                            <iframe
                              src={project.video}
                              title={project.title + " demo"}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          ) : (
                            <img
                              src={mediaList[currentIdx]}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          )}

                          <button onClick={() => prevMedia(idx)} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/40 text-white">‹</button>
                          <button onClick={() => nextMedia(idx)} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 hover:bg-black/40 text-white">›</button>
                          <div className="absolute left-3 bottom-3 z-20 px-2 py-1 bg-black/40 text-xs text-white rounded">{currentIdx + 1}/{mediaList.length}</div>
                        </div>

                        {/* thumbnails for each media (video thumbnail first if present) */}
                        <div className="mt-3 px-6 flex items-center gap-2">
                          {mediaList.map((m, mIdx) => {
                            const isVideoThumb = project.video && mIdx === 0;
                            let thumbSrc = m;
                            if (isVideoThumb) {
                              // derive YouTube id for a thumbnail
                              const match = (project.video || '').match(/(?:embed\/|v=)([\w-_-]{11})/);
                              const id = match ? match[1] : '';
                              thumbSrc = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
                            }
                            return (
                              <button key={mIdx} onClick={() => setMediaIndex(idx, mIdx)} className={`rounded overflow-hidden border ${activeMedia[idx] === mIdx ? 'ring-2 ring-primary' : 'border-white/5'}`}>
                                <img src={thumbSrc} alt={`thumb-${mIdx + 1}`} className="w-20 h-12 object-cover" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{project.category}</span>
                  </div>
                  {project.links?.demo && project.links.demo !== '#' ? (
                    <a href={project.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mb-2 group/title hover:text-primary transition-colors">
                      <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{project.title}</h4>
                      <ExternalLink size={20} className="text-slate-400 group-hover/title:text-primary transition-colors" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2 mb-2">
                      <h4 className="text-2xl font-bold text-white">{project.title}</h4>
                    </div>
                  )}
                  <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  {/* <div className="mt-4 px-6 flex gap-3">
                    {project.links?.demo && (
                      <a href={project.links.demo} target="_blank" rel="noreferrer" className="inline-flex items-center px-3 py-2 bg-white/5 text-slate-200 rounded-md font-semibold hover:bg-white/10">
                        Live URL
                      </a>
                    )}
                  </div> */}
                  {/* {project.images && project.images.length > 1 && (
                    <div className="mt-4 px-6 flex items-center gap-2">
                      {project.images.slice(1).map((thumb: string, tIdx: number) => (
                        <img key={tIdx} src={thumb} alt={`${project.title} ${tIdx + 2}`} className="w-20 h-12 object-cover rounded-md border border-white/5" />
                      ))}
                    </div>
                  )} */}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <a href="#" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
            View All Projects <ArrowRight size={16} className="ml-2" />
          </a>
        </div>
        {/* manual slides/lightbox removed */}
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <Reveal>
          <div className="glass-card rounded-3xl p-12 border border-primary/20 bg-gradient-to-b from-dark-lighter to-dark relative overflow-hidden">
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
             
             <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
               Have a project in mind?
             </h2>
             <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
               I'm available for freelance work and open to new opportunities. Whether it's web development, app creation, or video editing, let's create something amazing.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4">
               <a 
                 href="#contact" 
                 className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold hover:shadow-lg hover:shadow-primary/25 transition-all transform hover:-translate-y-1"
               >
                 Let's Talk
               </a>
               <a 
                 href="MD-Mahbubur-Rahman-WordPress-Developer-2026.pdf" 
                 className="px-8 py-4 rounded-full bg-dark-lighter border border-slate-700 text-white font-medium hover:bg-white hover:text-dark transition-all flex items-center justify-center"
               >
                 <Download size={18} className="mr-2" /> Download CV
               </a>
             </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-dark-lighter/30 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Get In Touch</h2>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white">
              Contact Me
            </h3>
          </div>
        </Reveal>

        <div className="flex flex-col md:grid md:grid-cols-2 gap-12">
          <Reveal delay={200}>
            <form className="glass-card p-8 rounded-2xl border-t border-white/10 order-2 md:order-2" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-dark/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-dark/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <label htmlFor="subject" className="text-sm font-medium text-slate-300">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-dark/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Inquiry"
                />
              </div>

              <div className="space-y-2 mb-6">
                <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-dark/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                Send Message
              </button>
            </form>
          </Reveal>

          <Reveal delay={100}>
            <div className="order-3 md:order-1">
              <h4 className="text-2xl font-bold text-white mb-6">Let's Chat.</h4>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Every great digital product starts with a conversation. Tell me your idea no matter how big or small and let's figure out how to make it happen together.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Email</h5>
                    <a href="mailto:mail.mdmahbuburrahman@gmail.com" className="text-slate-400 hover:text-primary transition-colors break-all">mail.mdmahbuburrahman@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Phone</h5>
                    <a href="tel:+8801644274016" className="text-slate-400 hover:text-primary transition-colors">+8801644-274016</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 className="text-white font-medium">Location</h5>
                    <p className="text-slate-400">Bashundhara R/A, Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h5 className="text-white font-medium mb-4">Follow Me</h5>
                <div className="flex space-x-4">
                  <a href="https://github.com/mahbubtechsavvy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
                    <Github size={18} />
                  </a>
                  <a href="https://linkedin.com/in/mdmahbuburrahman" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
                    <Linkedin size={18} />
                  </a>
                  <a href="https://facebook.com/mdmahbuburrahman" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
                    <Facebook size={18} />
                  </a>
                  <a href="https://youtube.com/@mahbubtechsavvy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
                    <Youtube size={18} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 bg-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-xl font-heading font-bold text-white">
            MAHBUB<span className="text-primary">.DEV</span>githubgithub
          </span>
        </div>
        <div className="text-slate-500 text-sm text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} MD Mahbubur Rahman. All rights reserved.</p>
          <p className="mt-1">Designed & Built with ❤️</p>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="font-sans antialiased text-slate-200 selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);