import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, ChevronLeft, Globe, Shield, Star, Users, Leaf, Heart, 
  ArrowRight, Phone, Mail, MapPin, MessageCircle, Play, CheckCircle2,
  TrendingUp, Building2, Landmark, Briefcase, Factory, Zap, Tractor,
  ChevronDown, Facebook, Twitter, Linkedin, Share2, Maximize2, Eye,
  Sun, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  maturity: number;
  projectsCount: string;
  sectors: string[];
}

// --- Data ---
const VALUES = [
  { icon: Zap, title: "Innovation", desc: "Solutions créatives adaptées aux défis africains" },
  { icon: Shield, title: "Intégrité", desc: "Honnêteté, transparence et éthique dans toutes les relations" },
  { icon: Star, title: "Excellence", desc: "Engagement qualité sans compromis dans chaque projet" },
  { icon: Users, title: "Collaboration", desc: "Partenariats pour un impact durable" },
  { icon: Leaf, title: "Développement Durable", desc: "Pratiques commerciales bénéfiques aux générations futures" },
  { icon: Heart, title: "Responsabilité Sociale", desc: "Programmes de développement communautaire actifs" },
];

const PROJECTS: Project[] = [
  {
    id: 'multiplex',
    title: "Concept Multiplex",
    category: "Industrie & Services",
    description: "Médecine, Pharmacie, Industrie, Hôtellerie, Grande Distribution.",
    maturity: 98,
    projectsCount: "200+ projets",
    sectors: ["Santé", "Industrie", "Hôtellerie"]
  },
  {
    id: 'inov',
    title: "Concept I-Nov",
    category: "Industrie",
    description: "Industries Nouvelles d'Afrique — Industrie Générale.",
    maturity: 95,
    projectsCount: "50+ projets",
    sectors: ["Industrie Générale"]
  },
  {
    id: 'protv',
    title: "Concept Pro-TV",
    category: "Agro-Industrie",
    description: "Agriculture, Pastorale, Energie, Industrie.",
    maturity: 97,
    projectsCount: "300+ projets",
    sectors: ["Agriculture", "Energie"]
  },
  {
    id: 'goodfarm',
    title: "Concept Good Farm",
    category: "Energie & Agro",
    description: "Agro-industrie, Energie — Mise en place industrie sucrière + parc éolien.",
    maturity: 96,
    projectsCount: "100+ projets",
    sectors: ["Sucre", "Eolien"]
  },
  {
    id: 'rural',
    title: "Développement Rural",
    category: "Multi-sectoriel",
    description: "Mines, Agriculture, Energie, Sport, Social.",
    maturity: 90,
    projectsCount: "5 000+ projets",
    sectors: ["Mines", "Social"]
  },
  {
    id: 'banque',
    title: "Concept Banque-Télécom",
    category: "Finance & Tech",
    description: "Finance, Numérique, Technologies.",
    maturity: 95,
    projectsCount: "200+ projets",
    sectors: ["Finance", "Numérique"]
  }
];

const PARTNERS = [
  "Partner 1", "Partner 2", "Partner 3", "Partner 4", "Partner 5", "Partner 6",
  "Partner 7", "Partner 8", "Partner 9", "Partner 10", "Partner 11", "Partner 12",
  "Partner 13", "Partner 14", "Partner 15", "Partner 16", "Partner 17", "Partner 18"
];

const GALLERY_ITEMS = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000",
    videoId: "dQw4w9WgXcQ",
    title: "Infrastructure Durable",
    large: true
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1573164060897-425941c30241?auto=format&fit=crop&q=80&w=500",
    videoId: "jNQXAC9IVRw",
    title: "Réunion Stratégique"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=500",
    videoId: "LXb3EKWsInQ",
    title: "Collaboration Équipe"
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=500",
    videoId: "9No-FiEInLA",
    title: "Espace de Travail"
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=500",
    videoId: "ScMzIvxBSi4",
    title: "Innovation Technologique"
  }
];

const PHOTO_ITEMS = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    title: "Siège Social",
    category: "Architecture"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
    title: "Équipe THS",
    category: "Corporate"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    title: "Projet Infrastructure",
    category: "Industrie"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200",
    title: "Réunion Partenaires",
    category: "Business"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
    title: "Atelier Technique",
    category: "Innovation"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
    title: "Espace Collaboratif",
    category: "Design"
  }
];

// --- Components ---

const Navbar = ({ isDarkMode, toggleTheme }: { isDarkMode: boolean, toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Valeurs', href: '#values' },
    { name: 'Projets', href: '#projects' },
    { name: 'Partenaires', href: '#partners' },
    { name: 'Vidéos', href: '#gallery' },
    { name: 'Photos', href: '#photos' },
    { name: 'À Propos', href: '#about' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-primary shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-ths-navy rounded-lg flex items-center justify-center text-white font-bold text-xl">T</div>
          <span className={`font-display font-bold text-xl tracking-tight ${isScrolled ? 'text-ths-navy dark:text-white' : 'text-white'}`}>
            TODAY <span className="text-ths-red">HOLDING</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`font-medium transition-colors hover:text-ths-gold ${isScrolled ? 'text-text-primary' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${isScrolled ? 'bg-slate-100 dark:bg-slate-800 text-ths-navy dark:text-ths-gold' : 'bg-white/10 text-white hover:bg-white/20'}`}
            title={isDarkMode ? "Passer au mode clair" : "Passer au mode sombre"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a href="#contact" className="btn-red !py-2 !px-6 text-sm">Nous Contacter</a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${isScrolled ? 'bg-slate-100 dark:bg-slate-800 text-ths-navy dark:text-ths-gold' : 'bg-white/10 text-white'}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className={isScrolled ? 'text-text-primary' : 'text-white'} /> : <Menu className={isScrolled ? 'text-text-primary' : 'text-white'} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-bg-primary shadow-xl py-6 px-6 flex flex-col gap-4 lg:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-text-primary font-semibold text-lg border-b border-slate-100 dark:border-slate-800 pb-2"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="btn-red text-center">Nous Contacter</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e01a?auto=format&fit=crop&q=80&w=2070" 
          alt="Business Africa" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-ths-navy/95 via-ths-navy/80 to-ths-blue-dark/40"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-accent text-ths-gold uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm font-bold mb-4">Today Holding Society</h2>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-[1.1] md:leading-tight">
            Partenaires d'Excellence <br className="hidden sm:block" /> en <span className="text-ths-gold italic">Afrique</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Conception, Maturation et Financement de Projets stratégiques pour le développement du continent.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#projects" className="btn-red w-full sm:w-auto flex items-center justify-center gap-2">
              Découvrir nos projets <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-outline w-full sm:w-auto !border-white !text-white hover:!bg-white hover:!text-ths-navy">
              Nous contacter
            </a>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 md:mt-16 text-ths-gold/80 italic text-base md:text-lg font-display px-4"
          >
            "Ce n'est pas l'argent qui fait le projet, c'est le projet qui fait l'argent."
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hidden sm:block">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

const Values = () => {
  return (
    <section id="values" className="py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-subtitle">Engagement & Éthique</span>
          <h2 className="section-title">Nos Valeurs Fondamentales</h2>
          <p className="max-w-2xl mx-auto text-text-primary">
            Nous bâtissons l'avenir de l'Afrique sur des piliers solides de transparence, d'innovation et de responsabilité sociale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map((val, idx) => (
            <motion.div 
              key={val.title}
              whileHover={{ y: -10 }}
              className="bg-card-bg p-8 rounded-2xl shadow-sm border border-card-border transition-all hover:shadow-xl group"
            >
              <div className="w-14 h-14 bg-ths-navy/5 dark:bg-white/5 rounded-xl flex items-center justify-center text-ths-navy dark:text-ths-gold mb-6 group-hover:bg-ths-navy dark:group-hover:bg-ths-gold group-hover:text-white dark:group-hover:text-ths-navy transition-colors">
                <val.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-text-primary dark:text-white mb-3">{val.title}</h3>
              <p className="text-text-primary leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
              alt="RSE Team" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="section-subtitle">Impact Social</span>
            <h2 className="text-3xl font-display font-bold text-ths-blue-custom mb-6">Notre Responsabilité Sociétale (RSE)</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-ths-green/10 text-ths-green rounded-full flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-lg mb-1">Développement Local</h4>
                  <p className="text-text-primary">Formation professionnelle, soutien aux entrepreneurs locaux et partenariats éducatifs structurants.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-ths-green/10 text-ths-green rounded-full flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary text-lg mb-1">Environnement</h4>
                  <p className="text-text-primary">Études d'impact rigoureuses, promotion des énergies renouvelables et gestion durable des déchets.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Industrie', 'Agro-Industrie', 'Finance & Tech', 'Multi-sectoriel'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category.includes(filter) || p.category === filter);

  return (
    <section id="projects" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="section-subtitle">Portefeuille Stratégique</span>
            <h2 className="section-title">Nos Projets d'Excellence</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === cat ? 'bg-ths-blue-custom text-white' : 'bg-bg-secondary text-text-secondary hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={project.id}
                className="group bg-card-bg rounded-2xl overflow-hidden border border-card-border shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-ths-blue-custom/10 text-ths-blue-custom text-xs font-bold rounded-full uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-ths-red-custom-2 font-accent font-bold">{project.projectsCount}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-ths-blue-custom mb-4 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-primary mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span className="text-text-primary uppercase tracking-tighter opacity-70">Maturité du Concept</span>
                      <span className="text-ths-red-custom-2">{project.maturity}%</span>
                    </div>
                    <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${project.maturity}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-ths-red-custom-2"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.sectors.map(s => (
                      <span key={s} className="text-[10px] font-bold text-ths-blue-custom border border-ths-blue-custom/20 bg-ths-blue-custom/5 px-2 py-1 rounded uppercase">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stats Counter */}
        <div className="mt-24 bg-ths-navy dark:bg-ths-blue-dark rounded-3xl p-12 text-white grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-accent font-bold text-ths-gold mb-2">15+</div>
            <div className="text-sm uppercase tracking-widest text-white/70">Concepts Innovants</div>
          </div>
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-accent font-bold text-ths-gold mb-2">8000+</div>
            <div className="text-sm uppercase tracking-widest text-white/70">Projets Prévus</div>
          </div>
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-accent font-bold text-ths-gold mb-2">100+</div>
            <div className="text-sm uppercase tracking-widest text-white/70">Milliards USD Est.</div>
          </div>
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-accent font-bold text-ths-gold mb-2">18</div>
            <div className="text-sm uppercase tracking-widest text-white/70">Partenaires</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  return (
    <section id="partners" className="py-24 bg-bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-subtitle">Réseau Mondial</span>
          <h2 className="section-title">Nos Partenaires Stratégiques</h2>
          <p className="max-w-2xl mx-auto text-text-primary">
            Un écosystème de confiance composé d'institutions financières, de partenaires techniques et de bailleurs de fonds internationaux.
          </p>
        </div>

        <div className="relative">
          {/* Infinite Scroll Simulation */}
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {PARTNERS.map((p, i) => (
              <div key={i} className="flex-shrink-0 w-48 h-24 bg-card-bg rounded-xl shadow-sm border border-card-border flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all cursor-pointer">
                <span className="text-text-primary opacity-80 font-bold text-sm uppercase">{p}</span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {PARTNERS.map((p, i) => (
              <div key={`dup-${i}`} className="flex-shrink-0 w-48 h-24 bg-card-bg rounded-xl shadow-sm border border-card-border flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all cursor-pointer">
                <span className="text-text-primary opacity-80 font-bold text-sm uppercase">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

const VideoModal = ({ isOpen, onClose, videoId }: { isOpen: boolean, onClose: () => void, videoId: string }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/40 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/20 group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Gallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const shareOnSocial = (e: React.MouseEvent, platform: string, videoId: string) => {
    e.stopPropagation();
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <section id="gallery" className="py-24 bg-bg-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-subtitle">Immersion</span>
          <h2 className="section-title">Galerie & Vidéos</h2>
          <p className="max-w-2xl mx-auto text-text-primary">
            Découvrez nos réalisations et nos concepts à travers notre sélection de vidéos et d'images.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedVideo(item.videoId)}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer ${
                item.large ? 'col-span-2 row-span-2 h-full' : 'h-48'
              }`}
            >
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-white/80 dark:bg-ths-navy/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-ths-navy/10 dark:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-ths-navy dark:text-white border border-ths-navy/20 dark:border-white/30 group-hover:scale-110 transition-transform duration-500">
                  <Play size={item.large ? 48 : 32} fill="currentColor" />
                </div>
                {item.large && (
                  <span className="text-text-primary dark:text-white font-display font-bold text-xl tracking-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                  </span>
                )}
                
                {/* Share Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 delay-100">
                  <button 
                    onClick={(e) => shareOnSocial(e, 'facebook', item.videoId)}
                    className="w-8 h-8 bg-ths-navy/10 dark:bg-white/10 hover:bg-ths-navy/20 dark:hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-ths-navy dark:text-white border border-ths-navy/20 dark:border-white/20 transition-colors"
                    title="Partager sur Facebook"
                  >
                    <Facebook size={14} />
                  </button>
                  <button 
                    onClick={(e) => shareOnSocial(e, 'twitter', item.videoId)}
                    className="w-8 h-8 bg-ths-navy/10 dark:bg-white/10 hover:bg-ths-navy/20 dark:hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-ths-navy dark:text-white border border-ths-navy/20 dark:border-white/20 transition-colors"
                    title="Partager sur Twitter"
                  >
                    <Twitter size={14} />
                  </button>
                  <button 
                    onClick={(e) => shareOnSocial(e, 'linkedin', item.videoId)}
                    className="w-8 h-8 bg-ths-navy/10 dark:bg-white/10 hover:bg-ths-navy/20 dark:hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-ths-navy dark:text-white border border-ths-navy/20 dark:border-white/20 transition-colors"
                    title="Partager sur LinkedIn"
                  >
                    <Linkedin size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <VideoModal 
        isOpen={!!selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
        videoId={selectedVideo || ''} 
      />
    </section>
  );
};

const PhotoModal = ({ 
  isOpen, 
  onClose, 
  imageUrl, 
  title,
  onNext,
  onPrev
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  imageUrl: string, 
  title: string,
  onNext: () => void,
  onPrev: () => void
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-5xl w-full max-h-[90vh] bg-card-bg rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all backdrop-blur-md border border-white/20 group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/30 text-white rounded-full transition-all backdrop-blur-md border border-white/20 group"
            >
              <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 hover:bg-white/30 text-white rounded-full transition-all backdrop-blur-md border border-white/20 group"
            >
              <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="relative aspect-video md:aspect-auto md:h-[80vh] flex items-center justify-center bg-black">
              <img src={imageUrl} alt={title} className="max-w-full max-h-full object-contain" />
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PhotoGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % PHOTO_ITEMS.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + PHOTO_ITEMS.length) % PHOTO_ITEMS.length);
    }
  };

  const selectedPhoto = selectedIndex !== null ? PHOTO_ITEMS[selectedIndex] : null;

  return (
    <section id="photos" className="py-24 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-subtitle">Portfolio Visuel</span>
          <h2 className="section-title">Galerie Photos</h2>
          <p className="max-w-2xl mx-auto text-text-primary">
            Une immersion visuelle dans l'univers de Today Holding Society et nos projets à travers le continent.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {PHOTO_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedIndex(index)}
              className="relative group overflow-hidden rounded-3xl cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-white/90 dark:bg-ths-blue-dark/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-ths-gold text-xs font-bold uppercase tracking-widest mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="text-text-primary dark:text-white font-display font-bold text-2xl mb-4">
                    {item.title}
                  </h3>
                  <div className="w-12 h-12 bg-ths-navy/10 dark:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-ths-navy dark:text-white border border-ths-navy/20 dark:border-white/30">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <PhotoModal 
        isOpen={selectedIndex !== null} 
        onClose={() => setSelectedIndex(null)} 
        imageUrl={selectedPhoto?.url || ''} 
        title={selectedPhoto?.title || ''}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-ths-navy dark:bg-ths-blue-dark text-white overflow-hidden relative transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <Landmark className="absolute -top-20 -left-20 w-96 h-96" />
        <Globe className="absolute -bottom-20 -right-20 w-96 h-96" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-subtitle !text-ths-gold">Notre Histoire</span>
            <h2 className="section-title !text-white">Today Holding Society</h2>
            <div className="space-y-6 text-white/80 text-lg leading-relaxed">
              <p>
                Fondée en 2022 à Yaoundé, THS est née d'une vision audacieuse : transformer le potentiel économique de l'Afrique centrale en réalités industrielles et sociales tangibles.
              </p>
              <p>
                En tant qu'intermédiaire stratégique, nous assurons la maturation complète des projets, de la conception technique à la levée de fonds, en passant par l'exécution et l'exploitation.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="border-l-2 border-ths-gold pl-4">
                  <h4 className="font-bold text-white text-xl">Mission</h4>
                  <p className="text-sm">Maturation de projets et recherche de partenariats stratégiques.</p>
                </div>
                <div className="border-l-2 border-ths-gold pl-4">
                  <h4 className="font-bold text-white text-xl">Vision</h4>
                  <p className="text-sm">Créer un écosystème économique intégré et durable.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-display font-bold mb-8 text-ths-gold">Chiffres Stratégiques</h3>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-ths-gold/20 rounded-2xl flex items-center justify-center text-ths-gold">
                    <Users size={32} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">20 000+</div>
                    <div className="text-white/60 text-sm uppercase tracking-widest">Emplois en vision</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-ths-gold/20 rounded-2xl flex items-center justify-center text-ths-gold">
                    <Globe size={32} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">5+ Pays</div>
                    <div className="text-white/60 text-sm uppercase tracking-widest">Présence Afrique Centrale</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-ths-gold/20 rounded-2xl flex items-center justify-center text-ths-gold">
                    <Landmark size={32} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">2022</div>
                    <div className="text-white/60 text-sm uppercase tracking-widest">Année de Fondation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-bg-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="section-subtitle">Contactez-nous</span>
            <h2 className="section-title">Prêt à bâtir l'avenir ?</h2>
            <p className="text-text-secondary mb-10 text-lg">
              Nos experts sont à votre disposition pour discuter de vos projets d'investissement ou de vos besoins en ingénierie de projet.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-ths-navy/5 dark:bg-white/5 text-ths-navy dark:text-ths-gold rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary mb-1">Siège Social</h4>
                  <p className="text-text-secondary">Yaoundé — Bastos, derrière l'Ambassade de Chine, Immeuble Résidences NOKAY 17, Étage 1, Porte B</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-ths-navy/5 dark:bg-white/5 text-ths-navy dark:text-ths-gold rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary mb-1">Téléphone</h4>
                  <p className="text-text-secondary">+237 674 028 128 / +237 699 016 379</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-ths-navy/5 dark:bg-white/5 text-ths-navy dark:text-ths-gold rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary mb-1">Email</h4>
                  <p className="text-text-secondary">contact@todayholdingsociety.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-2xl overflow-hidden h-64 shadow-inner border border-border-color">
              {/* Placeholder for Google Maps */}
              <div className="w-full h-full bg-bg-secondary flex items-center justify-center text-text-secondary">
                <div className="text-center">
                  <MapPin size={48} className="mx-auto mb-2 opacity-20" />
                  <p className="text-sm font-semibold">Google Maps Integration</p>
                  <p className="text-xs">Yaoundé - Bastos</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary p-10 rounded-3xl border border-border-color shadow-xl">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-primary uppercase tracking-wider">Nom Complet</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-border-color bg-bg-primary text-text-primary focus:ring-2 focus:ring-ths-gold outline-none transition-all" placeholder="Jean Dupont" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-primary uppercase tracking-wider">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-border-color bg-bg-primary text-text-primary focus:ring-2 focus:ring-ths-gold outline-none transition-all" placeholder="jean@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-primary uppercase tracking-wider">Sujet</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-border-color bg-bg-primary text-text-primary focus:ring-2 focus:ring-ths-gold outline-none transition-all" placeholder="Investissement / Partenariat" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-primary uppercase tracking-wider">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-border-color bg-bg-primary text-text-primary focus:ring-2 focus:ring-ths-gold outline-none transition-all" placeholder="Votre message ici..."></textarea>
              </div>
              <button type="submit" className="w-full btn-red !rounded-xl py-4 flex items-center justify-center gap-2">
                Envoyer ma demande <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-black text-white pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-ths-gold rounded-lg flex items-center justify-center text-ths-navy font-bold text-xl">T</div>
              <span className="font-display font-bold text-xl tracking-tight">
                TODAY <span className="text-ths-red">HOLDING</span>
              </span>
            </div>
            <p className="text-white/60 mb-6">
              Société de holding et d'ingénierie de projets basée au Cameroun, moteur du développement économique en Afrique centrale.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-ths-gold hover:text-ths-navy rounded-lg flex items-center justify-center transition-all duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-ths-gold hover:text-ths-navy rounded-lg flex items-center justify-center transition-all duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-ths-gold hover:text-ths-navy rounded-lg flex items-center justify-center transition-all duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-ths-gold">Liens Rapides</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#home" className="hover:text-ths-gold transition-colors">Accueil</a></li>
              <li><a href="#values" className="hover:text-ths-gold transition-colors">Nos Valeurs</a></li>
              <li><a href="#projects" className="hover:text-ths-gold transition-colors">Nos Projets</a></li>
              <li><a href="#about" className="hover:text-ths-gold transition-colors">À Propos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-ths-gold">Secteurs</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-ths-gold transition-colors">Agro-industrie</a></li>
              <li><a href="#" className="hover:text-ths-gold transition-colors">Énergie & Mines</a></li>
              <li><a href="#" className="hover:text-ths-gold transition-colors">Finance & Tech</a></li>
              <li><a href="#" className="hover:text-ths-gold transition-colors">Industrie</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-ths-gold">Newsletter</h4>
            <p className="text-white/60 mb-4 text-sm">Restez informé de nos derniers concepts et opportunités.</p>
            <div className="flex gap-2">
              <input type="email" className="bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-ths-gold w-full" placeholder="Votre email" />
              <button className="bg-ths-gold text-ths-navy p-2 rounded-lg hover:bg-white transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm">
            © 2026 Today Holding Society. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-white/40">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/237674028128" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group"
  >
    <MessageCircle size={32} />
    <span className="absolute right-full mr-4 bg-white text-slate-800 px-4 py-2 rounded-lg shadow-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
      Besoin d'aide ?
    </span>
  </a>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="relative bg-bg-primary text-text-primary transition-colors duration-300">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Hero />
      <Values />
      <Projects />
      <Partners />
      <Gallery />
      <PhotoGallery />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
