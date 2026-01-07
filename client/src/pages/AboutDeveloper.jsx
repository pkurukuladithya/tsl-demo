import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Github,
  Phone,
  ArrowRight,
  Code,
  Cpu,
  Smartphone,
  Eye,
  Award,
  Briefcase,
  GraduationCap
} from "lucide-react";
import profileImage from "../assets/new.jpg";

const personalInfo = {
  name: "Praveena Kurukuladithya",
  title: "Computer Systems Engineer",
  tagline:
    "Building reliable products across full-stack, AI/ML, and hardware-driven IoT. I blend software, electronics, and empathy to create experiences that feel effortless.",
  location: "Colombo, Sri Lanka"
};

const highlights = [
  { label: "Role", value: personalInfo.title },
  { label: "Focus", value: "Full-stack, AI/ML, IoT, and human-centered solutions" },
  { label: "Location", value: personalInfo.location }
];

const skills = [
  { icon: <Code className="w-5 h-5" />, title: "Full-stack", items: ["React", "Node.js", "Express", "MongoDB", "Spring Boot"] },
  { icon: <Smartphone className="w-5 h-5" />, title: "Mobile & Cross-platform", items: ["Flutter", "Kotlin", "Android", "API integration"] },
  { icon: <Cpu className="w-5 h-5" />, title: "IoT & Embedded", items: ["ESP32/Arduino", "Blynk", "Sensor networks", "Prototyping"] },
  { icon: <Eye className="w-5 h-5" />, title: "Vision & AI", items: ["OpenCV", "Python", "Gesture/eye-lid recognition", "Object tracking"] }
];

const quickSkills = [
  "AI/ML experiments",
  "Electronics + IoT",
  "React & Vite",
  "REST & JSON APIs",
  "Rapid prototyping"
];

const projects = [
  {
    name: "Block Me Messenger",
    link: "https://github.com/pkurukuladithya/Block_Me_Messenger",
    desc: "Real-time chat app with Django + DRF + Channels, session-based auth, and MongoDB for chat history.",
    tags: ["Python", "Django", "WebSockets", "MongoDB"],
    gradient: "from-amber-400/20 to-orange-500/20"
  },
  {
    name: "Protect Heart",
    link: "https://github.com/pkurukuladithya/Protect_Heart",
    desc: "ML-powered heart disease risk predictor with Flask + MySQL backend and red-themed UIs in Flask, Angular, and Flutter.",
    tags: ["AI/ML", "Flask", "MySQL", "Angular", "Flutter"],
    gradient: "from-rose-400/20 to-red-500/20"
  },
  {
    name: "Ghost Finder",
    link: "https://github.com/pkurukuladithya/Ghost-Finder",
    desc: "Flask + YOLOv8 web app that watches a live camera stream and overlays counts/boxes for detected people in view.",
    tags: ["Computer Vision", "YOLOv8", "Python", "Flask"],
    gradient: "from-blue-400/20 to-indigo-500/20"
  },
  {
    name: "Cache SIM",
    link: "https://github.com/pkurukuladithya/Cache_SIM",
    desc: "Interactive Python/Streamlit simulator comparing cache policies (LRU/FIFO/Random), hit/miss ratios, and AMAT for random/seq traces.",
    tags: ["Python", "Streamlit", "Systems", "Simulation"],
    gradient: "from-teal-400/20 to-cyan-500/20"
  },
  {
    name: "Smart Switch IoT Cloud",
    link: "https://github.com/pkurukuladithya/smart_switch_IOT_cloud",
    desc: "Cloud IoT relay controller: HiveMQ MQTT gateway (Python GUI/CLI) to Arduino, drives 4 relays; Arduino sketch listens for relay commands.",
    tags: ["IoT", "MQTT", "Arduino", "Python"],
    gradient: "from-purple-400/20 to-pink-500/20"
  }
];

const timeline = [
  { period: "2025 - Present", detail: "Exec committee @ CSE Student Committee - SLIIT", icon: <Award className="w-4 h-4" /> },
  { period: "2024 - Present", detail: "BSc (Hons) Computer Systems Engineering - SLIIT", icon: <GraduationCap className="w-4 h-4" /> },
  { period: "2024", detail: "Batch representative for Department of CSE", icon: <Briefcase className="w-4 h-4" /> },
  { period: "2022", detail: "GCE A/L (Physical Science) - 3 credits in Combined Maths, Physics, Chemistry", icon: <GraduationCap className="w-4 h-4" /> }
];

const snapshot = [
  "Executive Committee Member @ CSE Student Committee - bridging students and faculty.",
  "Comfortable hopping between design sprints and firmware debugging sessions.",
  "Values clarity, thoughtful documentation, and collaborative builds.",
  "Curious about AI/ML for meaningful automation and decision support.",
  "Hands-on with sensors, relays, and microcontrollers to bring ideas into the physical world."
];

function AboutDeveloper() {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -left-16 top-6 h-64 w-64 rounded-full bg-gradient-to-br from-amber-500/20 via-orange-400/15 to-transparent blur-[90px] sm:-left-24 sm:top-10 sm:h-96 sm:w-96 sm:blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500/15 via-purple-400/10 to-transparent blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />
        <div className="absolute left-1/2 bottom-0 h-72 w-72 rounded-full bg-gradient-to-t from-cyan-400/10 to-transparent blur-[100px] sm:h-96 sm:w-96 sm:blur-[120px]" />
      </div>

      <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3 sm:px-6">
          <Link
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent hover:brightness-110 sm:text-2xl"
          >
            Back to TSL
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#home" className="text-white/60 hover:text-white transition-colors">Home</a>
            <a href="#about" className="text-white/60 hover:text-white transition-colors">About</a>
            <a href="#portfolio" className="text-amber-400 font-medium">Portfolio</a>
            <a href="#contact" className="text-white/60 hover:text-white transition-colors">Contact</a>
          </div>
          <a
            href="mailto:kurukuladithyapraveena@gmail.com"
            className="bg-gradient-to-r from-amber-400 to-orange-500 text-black px-4 py-2 rounded-full text-xs font-semibold hover:shadow-lg hover:shadow-amber-500/30 transition-all sm:px-6 sm:text-sm"
          >
            Contact me
          </a>
        </div>
      </nav>

      <section id="home" className="section-anchor relative pt-16 pb-12 px-4 sm:px-6 md:pt-20 md:pb-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-white/60 text-sm uppercase tracking-widest">Hello,</p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              I'm
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
              <br />
              Computer Systems Engineer
            </h1>
            <p className="text-white/70 text-base leading-relaxed max-w-xl sm:text-lg">
              {personalInfo.tagline}
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              {quickSkills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 sm:px-4 sm:py-2 sm:text-sm">
                  {skill}
                </span>
              ))}
            </div>
            <a
              href="mailto:kurukuladithyapraveena@gmail.com"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black px-6 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-amber-500/40 transition-all group mt-6 sm:px-8 sm:py-4"
            >
              <Mail className="w-5 h-5" />
              Hire me
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-orange-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>

              <div className="relative aspect-square rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                <img
                  src={profileImage}
                  alt="Praveena Kurukuladithya"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl text-center sm:left-auto sm:-right-4 sm:translate-x-0 sm:text-left">
                <p className="text-amber-400 font-semibold text-lg">Praveena</p>
                <p className="text-white/80 text-sm font-medium">{personalInfo.name}</p>
                <p className="text-white/50 text-xs mt-1">Computer Systems Engineer - AI/ML - IoT & electronics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-anchor relative py-16 px-4 bg-zinc-900/30 sm:px-6 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-white/60 mb-4">About me</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Human-centered <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Computer Systems Engineer</span>
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
              I design and ship solutions that balance usability with performance, from resilient APIs and AI/ML features to sensor-powered prototypes that make everyday life smoother.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {highlights.map((item) => (
              <div key={item.label} className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-amber-400/30 transition-all">
                <p className="text-xs uppercase tracking-widest text-white/60 mb-2">{item.label}</p>
                <p className="text-white font-semibold text-lg">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Snapshot
            </h3>
            <ul className="space-y-4">
              {snapshot.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/80 leading-relaxed">
                  <span className="text-amber-400 mt-1">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h4 className="text-xl font-semibold mb-6">Journey</h4>
              <div className="space-y-6">
                {timeline.map((item) => (
                  <div key={item.period} className="flex items-start gap-4 group">
                    <div className="mt-1 p-2 rounded-lg bg-amber-400/10 text-amber-400 group-hover:bg-amber-400/20 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{item.period}</p>
                      <p className="text-sm text-white/75">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Capabilities</h2>
            <p className="text-white/60">Full-stack development, IoT solutions, and human-centered design</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((group) => (
              <div key={group.title} className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 hover:border-amber-400/30 hover:bg-zinc-900/70 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 group-hover:bg-amber-400/20 transition-colors">
                    {group.icon}
                  </div>
                  <h4 className="font-semibold text-white">{group.title}</h4>
                </div>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-white/70 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-amber-400/50"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section-anchor py-16 px-4 bg-zinc-900/30 sm:px-6 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Portfolio</p>
              <h2 className="text-3xl sm:text-4xl font-bold">What I build</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 sm:px-4 sm:py-2 sm:text-sm">UI + UX</span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 sm:px-4 sm:py-2 sm:text-sm">System design</span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/80 sm:px-4 sm:py-2 sm:text-sm">Data integrations</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <div
                key={project.name}
                onMouseEnter={() => setHoveredProject(idx)}
                onMouseLeave={() => setHoveredProject(null)}
                className={`relative group rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br ${project.gradient} hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl`}
              >
                <div className="absolute inset-0 bg-zinc-900/85 backdrop-blur-sm"></div>
                <div className="relative z-10 p-6 h-full flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-3">Case study</span>
                  <h4 className="text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors">{project.name}</h4>
                  <p className="text-white/70 text-sm leading-relaxed mb-4 flex-grow">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-amber-200 hover:text-amber-100"
                    >
                      View on GitHub
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
                {hoveredProject === idx && <div className="absolute inset-0 bg-white/5" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-anchor py-16 px-4 sm:px-6 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Let's connect</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Open to internships, collaborations, and projects that blend software, hardware, and thoughtful design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="mailto:kurukuladithyapraveena@gmail.com"
              className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 rounded-2xl p-5 hover:border-amber-400/50 hover:bg-zinc-900 transition-all group"
            >
              <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span className="text-sm group-hover:text-amber-400 transition-colors truncate">kurukuladithyapraveena@gmail.com</span>
            </a>
            <a
              href="mailto:it23689862@my.sliit.lk"
              className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 rounded-2xl p-5 hover:border-amber-400/50 hover:bg-zinc-900 transition-all group"
            >
              <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span className="text-sm group-hover:text-amber-400 transition-colors truncate">it23689862@my.sliit.lk</span>
            </a>
            <a
              href="https://github.com/pkurukuladithya"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 rounded-2xl p-5 hover:border-amber-400/50 hover:bg-zinc-900 transition-all group"
            >
              <Github className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span className="text-sm group-hover:text-amber-400 transition-colors truncate">github.com/pkurukuladithya</span>
            </a>
            <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 rounded-2xl p-5">
              <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span className="text-sm">+94 763521561</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center text-white/40 text-sm">
          <p>Copyright 2025 {personalInfo.name}. Building thoughtful technology.</p>
        </div>
      </footer>
    </div>
  );
}

export default AboutDeveloper;
