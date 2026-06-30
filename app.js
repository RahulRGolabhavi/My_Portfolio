const { useState, useEffect, useRef } = React;

// Custom hook for scroll animation
const useScrollReveal = () => {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    return ref;
};

const RevealOnScroll = ({ children, className = '' }) => {
    const ref = useScrollReveal();
    return (
        <div ref={ref} className={`fade-in ${className}`}>
            {children}
        </div>
    );
};

// --- COMPONENTS ---

const getSkillIcon = (skillName) => {
    const devicon = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;
    const simpleicon = (name, color) => `https://cdn.simpleicons.org/${name}/${color}`;

    const iconMap = {
        "HTML5": { type: 'img', src: devicon("html5") },
        "HTML/CSS": { type: 'img', src: devicon("html5") },
        "CSS3": { type: 'img', src: devicon("css3") },
        "JavaScript": { type: 'img', src: devicon("javascript") },
        "React": { type: 'img', src: devicon("react") },
        "Java": { type: 'img', src: devicon("java") },
        "Spring Boot": { type: 'img', src: devicon("spring") },
        "RESTful APIs": { type: 'img', src: simpleicon("postman", "FF6C37") },
        "REST APIs": { type: 'img', src: simpleicon("postman", "FF6C37") },
        "MySQL": { type: 'img', src: devicon("mysql") },
        "Data Structures": { type: 'icon', class: "fa-solid fa-cubes", color: "#6366f1" },
        "Algorithm": { type: 'icon', class: "fa-solid fa-code-branch", color: "#a855f7" },
        "OOPS": { type: 'icon', class: "fa-solid fa-object-group", color: "#ec4899" },
        "Git": { type: 'img', src: devicon("git") },
        "GitHub": { type: 'icon', class: "fa-brands fa-github", color: "var(--text-main)" },
        "Postman": { type: 'img', src: simpleicon("postman", "FF6C37") },
        "Figma": { type: 'img', src: devicon("figma") },
        "ChatGPT": { type: 'img', src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/ChatGPT-Logo.svg/1280px-ChatGPT-Logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail" },
        "Gemini": { type: 'img', src: simpleicon("googlegemini", "8E75B2") },
        "Claude": { type: 'img', src: "https://cdn.worldvectorlogo.com/logos/claude-logo.svg" },
        "GitHub Copilot": { type: 'icon', class: "fa-solid fa-robot", color: "var(--text-main)" },
        "IoT": { type: 'icon', class: "fa-solid fa-wifi", color: "#0ea5e9" },
        "Machine Learning": { type: 'icon', class: "fa-solid fa-network-wired", color: "#8b5cf6" },
        "Python": { type: 'img', src: devicon("python") },
        "Sensors": { type: 'icon', class: "fa-solid fa-satellite-dish", color: "#10b981" }
    };
    return iconMap[skillName] || { type: 'icon', class: "fa-solid fa-check", color: "var(--primary)" };
};

const SkillTag = ({ skill, style = {} }) => {
    const iconData = getSkillIcon(skill);
    return (
        <span className="skill-tag" style={style}>
            {iconData.type === 'img' ? (
                <img src={iconData.src} alt={skill} className="skill-icon-img" width="18" height="18" loading="lazy" />
            ) : (
                <i className={`${iconData.class} skill-icon-i`} style={{ color: iconData.color }}></i>
            )}
            {skill}
        </span>
    );
};

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={scrolled ? 'scrolled' : ''}>
            <div className="container nav-container">
                <div className="nav-logo" onClick={scrollToTop}>
                    <img src="https://wsrv.nl/?url=i.pinimg.com/736x/a3/dd/21/a3dd212965b4d0a0d9abc1004b524c69.jpg&w=100&output=webp" alt="Logo" width="40" height="40" />
                </div>

                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                    <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                </button>

                <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
                    <li><a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a></li>
                    <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
                    <li><a href="#education" onClick={() => setMenuOpen(false)}>Education</a></li>
                    <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
                    <li className="mobile-only">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                            <span style={{ color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: '500' }}>Theme Preference</span>
                            <div className="theme-switch-wrapper" style={{ margin: 0 }} onClick={toggleTheme} role="button" aria-label="Toggle theme">
                                <div className={`theme-switch ${isDarkMode ? 'dark' : 'light'}`}>
                                    <div className="theme-knob">
                                        <i className={`fa-solid ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="mobile-only">
                        <a href="https://drive.google.com/file/d/1Tdc3S2m_D35fR_YZAOz5EgMADDOlj8Kb/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                            <i className="fa-solid fa-download" style={{ marginRight: '8px' }}></i>
                            Resume
                        </a>
                    </li>
                </ul>
                <div className="nav-actions" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="theme-switch-wrapper" onClick={toggleTheme} title="Toggle theme" role="button" aria-label="Toggle theme">
                        <div className={`theme-switch ${isDarkMode ? 'dark' : 'light'}`}>
                            <div className="theme-knob">
                                <i className={`fa-solid ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}></i>
                            </div>
                        </div>
                    </div>
                    <a href="https://drive.google.com/file/d/1Tdc3S2m_D35fR_YZAOz5EgMADDOlj8Kb/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        <i className="fa-solid fa-download" style={{ marginRight: '8px' }}></i>
                        Resume
                    </a>
                </div>
            </div>
        </nav>
    );
};

// --- Terminal Card Component ---
const TerminalCard = () => {
    const cardRef = useRef(null);
    const codeSnippet =
        `public class Experience {

    String current = "Training @ Tap Academy";
    String previous = "Developer @ UST";
    // Back End
    String[] backend = { "Java", "Spring Boot", "REST APIs" };
    
    // Front End
    String[] frontend = { "React", "HTML5", "CSS3", "JavaScript" };
    
    // Database
    String[] database = { "MySQL" };
    boolean openToWork = true;

    public void engineerSolutions() {
        while (requirements.evolve()) {
            architectSystems();
            optimizePerformance();
            deliverValue();
        }
    }
}`;

    const [typedCode, setTypedCode] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(50);

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, typingSpeed);
        return () => clearInterval(ticker);
    }, [typedCode, isDeleting, typingSpeed]);

    const tick = () => {
        let updatedText = isDeleting
            ? codeSnippet.substring(0, typedCode.length - 1)
            : codeSnippet.substring(0, typedCode.length + 1);

        setTypedCode(updatedText);

        if (isDeleting) {
            setTypingSpeed(15); // Fast delete
        } else {
            setTypingSpeed(40); // Normal typing
        }

        if (!isDeleting && updatedText === codeSnippet) {
            setIsDeleting(true);
            setTypingSpeed(3500); // Long pause when fully typed
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setTypingSpeed(1000); // Pause before starting again
        }
    };

    // Syntax highlighting for the typed code
    const highlightJava = (code) => {
        return code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\b(public|class|private|return|new|boolean|true|false|void|int|double)\b/g, '<span class=\'terminal-keyword\'>$1</span>')
            .replace(/(\bString\b|String\[\]|\bExperience\b)/g, '<span class=\'terminal-function\'>$1</span>')
            .replace(/("[^"]*")/g, '<span class=\'terminal-string\'>$1</span>')
            .replace(/(@\w+)/g, '<span style=\'color: #fbbf24\'>$1</span>')
            .replace(/([{}()])/g, '<span class=\'terminal-bracket\'>$1</span>')
            .replace(/(\/\/.*)/g, '<span class=\'terminal-comment\'>$1</span>');
    };

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    return (
        <div className="terminal-perspective">
            <div
                className="terminal-card"
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="terminal-header">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                    <span className="terminal-title">Experience.java</span>
                </div>
                <div className="terminal-body">
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        <code dangerouslySetInnerHTML={{ __html: highlightJava(typedCode) }} />
                        <span className="terminal-cursor"></span>
                    </pre>
                </div>
            </div>
        </div>
    );
};

const Hero = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const roles = ["Full Stack Developer", "Java Developer"];

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, typingSpeed);
        return () => clearInterval(ticker);
    }, [text, isDeleting]);

    const tick = () => {
        let i = loopNum % roles.length;
        let fullRole = roles[i];
        let updatedText = isDeleting ? fullRole.substring(0, text.length - 1) : fullRole.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) setTypingSpeed(50);
        else setTypingSpeed(100);

        if (!isDeleting && updatedText === fullRole) {
            setIsDeleting(true);
            setTypingSpeed(2000);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setTypingSpeed(200);
        }
    };

    return (
        <section className="hero" id="home">
            <div className="container hero-content">
                <RevealOnScroll className="hero-text">
                    <div className="hero-avatar">
                        <img
                            src="https://wsrv.nl/?url=image2url.com/r2/default/images/1773586051047-1ce33ab6-3eb5-42db-8da8-6ab856fe175b.png&w=400&output=webp"
                            alt="Rahul R Golabhavi"
                            width="200"
                            height="200"
                            fetchpriority="high"
                        />
                    </div>
                    <h3 className="hero-name">Hi, I'm Rahul R Golabhavi</h3>
                    <h1>
                        Building <span className="text-gradient">Efficient</span> & <span className="text-gradient">Scalable</span> Software
                    </h1>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', height: '30px', color: 'var(--secondary)' }}>
                        I am a {text}<span style={{ borderRight: '2px solid var(--secondary)', animation: 'blink 1s infinite' }}></span>
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <a href="#contact" className="btn btn-primary">Get In Touch</a>
                        <a href="#projects" className="btn btn-outline">View Work</a>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll>
                    <TerminalCard />
                </RevealOnScroll>
            </div>
        </section>
    );
};

const About = () => {
    return (
        <section id="about">
            <div className="container">
                <RevealOnScroll>
                    <h2 className="section-title">About <span className="text-gradient">Me</span></h2>
                </RevealOnScroll>

                <div className="about-grid">
                    <RevealOnScroll className="about-text">
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <h3>My Journey</h3>
                            <p>I am a Computer Science graduate with practical experience in building full-stack web applications using Java and the Spring Boot ecosystem. My primary focus is backend development, where I design scalable RESTful APIs, manage application logic, and build reliable server-side systems.</p>
                            <p>Graduating with an 8.0 CGPA from Sri Sairam College of Engineering, I developed a robust foundation in OOP, data structures, and backend architecture.</p>
                            <p>During my tenure at UST, I contributed to ServeEase—a full-stack service marketplace. I implemented vital booking systems, provider management modules, and administrative controls, heavily integrating RESTful APIs to ensure rapid, reliable communication between the complex frontend and the backend.</p>
                            <p>I am currently refining my expertise at Tap Academy, mastering advanced paradigms in Core Java, Spring Boot, MySQL, and responsive frontend design to build production-grade web solutions.</p>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll>
                        <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                            <h3>Quick Info</h3>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)', width: '20px' }}></i>
                                    <span>Bangalore, Karnataka, India</span>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <i className="fa-solid fa-envelope" style={{ color: 'var(--primary)', width: '20px' }}></i>
                                    <span>rahulgolabhavi@gmail.com</span>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <i className="fa-solid fa-briefcase" style={{ color: 'var(--primary)', width: '20px' }}></i>
                                    <span>Open for Opportunities</span>
                                </li>
                            </ul>
                        </div>

                        <div className="stats-grid">
                            <div className="glass-card stat-card">
                                <div className="stat-number">1+</div>
                                <div className="stat-label">Years Committed</div>
                            </div>
                            <div className="glass-card stat-card">
                                <div className="stat-number">2+</div>
                                <div className="stat-label">Projects Built</div>
                            </div>
                            <div className="glass-card stat-card">
                                <div className="stat-number">100%</div>
                                <div className="stat-label">Dedication</div>
                            </div>
                            <div className="glass-card stat-card">
                                <div className="stat-number">∞</div>
                                <div className="stat-label">Passion</div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};

const Skills = () => {
    const skillCategories = [
        {
            title: "Frontend Development",
            icon: "fa-code",
            skills: ["HTML5", "CSS3", "JavaScript"]
        },
        {
            title: "Backend Development",
            icon: "fa-server",
            skills: ["Java", "Spring Boot", "RESTful APIs"]
        },
        {
            title: "Database",
            icon: "fa-database",
            skills: ["MySQL"]
        },
        {
            title: "Core Concepts",
            icon: "fa-layer-group",
            skills: ["Data Structures", "Algorithm", "OOPS"]
        },
        {
            title: "Tools",
            icon: "fa-wrench",
            skills: ["Git", "GitHub", "Postman", "Figma"]
        },
        {
            title: "AI",
            icon: "fa-robot",
            skills: ["ChatGPT", "Gemini", "Claude", "GitHub Copilot"]
        }
    ];

    const handleCardMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleCardMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.transform = 'rotateX(0) rotateY(0) translateY(0) scale3d(1, 1, 1)';
    };

    return (
        <section id="skills" style={{ background: 'rgba(255,255,255,0.01)' }}>
            <div className="container">
                <RevealOnScroll>
                    <h2 className="section-title">Technical <span className="text-gradient">Skills</span></h2>
                </RevealOnScroll>

                <div className="skills-container">
                    {skillCategories.map((cat, idx) => (
                        <RevealOnScroll key={idx}>
                            <div
                                className="glass-card skill-category"
                                onMouseMove={handleCardMouseMove}
                                onMouseLeave={handleCardMouseLeave}
                            >
                                <h3><i className={`fa-solid ${cat.icon}`}></i> {cat.title}</h3>
                                <div className="skill-tags">
                                    {cat.skills.map((skill, sIdx) => (
                                        <SkillTag key={sIdx} skill={skill} />
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Projects = () => {
    const projects = [
        {
            title: "ServeEase - Service Marketplace",
            category: "Full Stack Web Platform",
            description: "Developed a comprehensive full-stack service marketplace at UST. Implemented a robust booking engine, a sophisticated service provider management module, and specialized administrative controls. Engineered and integrated RESTful APIs to guarantee smooth, secure communication between frontend components and backend logic, greatly enhancing platform reliability.",
            tech: ["Java", "Spring Boot", "MySQL", "REST APIs", "HTML/CSS"]
        },
        {
            title: "IoT Foot Pressure Monitoring",
            category: "Hardware + ML System",
            description: "Designed smart footwear for diabetic patients aimed at tracking foot pressure distributions. Utilized flex sensors and machine learning algorithms to identify irregular pressure zones. Programmatically generated dynamic visual reports from real-time data to assist healthcare professionals in early intervention.",
            tech: ["IoT", "Machine Learning", "Python", "Sensors"],
            award: "Best Project Award @ CarpeDiem '24"
        }
    ];

    return (
        <section id="projects">
            <div className="container">
                <RevealOnScroll>
                    <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
                </RevealOnScroll>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '2rem' }}>
                    {projects.map((project, idx) => (
                        <RevealOnScroll key={idx}>
                            <div className="glass-card project-card">
                                <div className="project-content">
                                    <span className="project-category">{project.category}</span>
                                    <h3 className="project-title">{project.title}</h3>

                                    {project.award && (
                                        <div style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--accent)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', marginBottom: '1rem', display: 'inline-block', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
                                            <i className="fa-solid fa-trophy" style={{ marginRight: '5px' }}></i>
                                            {project.award}
                                        </div>
                                    )}

                                    <p className="project-desc">{project.description}</p>

                                    <div className="skill-tags" style={{ marginBottom: '1.5rem', marginTop: 'auto' }}>
                                        {project.tech.map((t, i) => (
                                            <SkillTag key={i} skill={t} style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem' }} />
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Education = () => {
    const [lineHeight, setLineHeight] = useState(0);
    const timelineRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;
            const rect = timelineRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const start = windowHeight * 0.7;
            let progress = (start - rect.top) / rect.height;
            progress = Math.max(0, Math.min(1, progress));
            setLineHeight(progress * 100);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="education" style={{ background: 'rgba(255,255,255,0.01)' }}>
            <div className="container">
                <RevealOnScroll>
                    <h2 className="section-title">Education & <span className="text-gradient">Experience</span></h2>
                </RevealOnScroll>

                <div className="timeline" ref={timelineRef}>
                    <div className="timeline-progress" style={{ height: `${lineHeight}%` }}></div>
                    <RevealOnScroll>
                        <div className="timeline-item">
                            <div className="glass-card timeline-content">
                                <div className="timeline-date">Current</div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Java Full Stack Development Trainee</h3>
                                <div style={{ color: 'var(--primary)', marginBottom: '1rem', fontWeight: '500' }}>Tap Academy</div>
                                <p style={{ color: 'var(--text-muted)' }}>Expanding expertise in Core Java, Spring Boot, MySQL, CSS, and HTML. Focused on deploying production-level architectures, understanding intricate scalable web logic, and mastering rigorous backend engineering best practices.</p>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll>
                        <div className="timeline-item">
                            <div className="glass-card timeline-content">
                                <div className="timeline-date">Previous Role</div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Software Developer</h3>
                                <div style={{ color: 'var(--primary)', marginBottom: '1rem', fontWeight: '500' }}>UST</div>
                                <p style={{ color: 'var(--text-muted)' }}>Contributed heavily to "ServeEase," a comprehensive service marketplace. Designed and shipped features crossing user reservations, provider analytics, and core admin dashboards seamlessly united via RESTful architectures.</p>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll>
                        <div className="timeline-item">
                            <div className="glass-card timeline-content">
                                <div className="timeline-date">Graduated 2024</div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>B.E in Computer Science</h3>
                                <div style={{ color: 'var(--primary)', marginBottom: '1rem', fontWeight: '500' }}>Sri Sairam College of Engineering | CGPA: 8.0</div>
                                <ul style={{ color: 'var(--text-muted)', marginLeft: '1.2rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li>Received the <strong>Best Project Award</strong> for AI/ML IoT integration at CarpeDiem '24.</li>
                                    <li>Organized and conducted AR/VR immersive technology workshops to elevate technical literacy among peers.</li>
                                </ul>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    const [result, setResult] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult("Sending...");
        const formData = new FormData(e.target);

        // Add your Web3Forms access key here.
        // Request it at: https://web3forms.com/
        formData.append("access_key", "7b6f0f5c-8a2c-49bd-b685-2bc423d9f757");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully!");
            e.target.reset();
            setTimeout(() => setResult(""), 5000);
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <section id="contact">
            <div className="container">
                <RevealOnScroll>
                    <h2 className="section-title">Let's <span className="text-gradient">Work Together!</span></h2>
                </RevealOnScroll>

                <RevealOnScroll>
                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/rahul-r-golabhavi/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                        <a href="https://github.com/RahulRGolabhavi" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a href="mailto:rahulgolabhavi@gmail.com" className="social-link" aria-label="Email">
                            <i className="fa-solid fa-envelope"></i>
                        </a>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll>
                    <div className="glass-card contact-content" style={{ padding: '3rem' }}>
                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label htmlFor="contact-name">Name</label>
                                    <input type="text" id="contact-name" name="name" className="form-control" required placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="contact-email">Email</label>
                                    <input type="email" id="contact-email" name="email" className="form-control" required placeholder="john@example.com" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-subject">Subject</label>
                                <input type="text" id="contact-subject" name="subject" className="form-control" required placeholder="Opportunity Collaboration" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact-message">Message</label>
                                <textarea id="contact-message" name="message" className="form-control" required placeholder="Tell me about your project..."></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>Send Message</button>
                            {result && <p style={{ textAlign: 'center', color: result.includes("Error") ? 'var(--accent)' : 'var(--secondary)' }}>{result}</p>}
                        </form>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <h2 style={{ fontFamily: 'Google Sans', fontSize: '2.2rem', marginBottom: '1rem', letterSpacing: '2px' }}>
                    RAHUL R GOLABHAVI
                </h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    Building Intelligent, Scalable, and Impactful Software for the Future
                </p>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} Rahul R Golabhavi. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('portfolio-theme');
        return saved ? saved === 'dark' : true;
    });

    useEffect(() => {
        localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
        if (isDarkMode) {
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            {/* Ambient Glow Effects */}
            <div className="glow-container">
                <div className="glow-circle glow-1"></div>
                <div className="glow-circle glow-2"></div>
                <div className="glow-circle glow-3"></div>
            </div>

            {/* Header */}
            <header>
                <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                <Hero />
            </header>

            {/* Main Body */}
            <main>
                <About />
                <Skills />
                <Projects />
                <Education />
                <Contact />
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
