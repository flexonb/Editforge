import React, { useState, useRef } from 'react';
import {
  User, Briefcase, Code2, Mail, Github, Linkedin, Twitter,
  Globe, Plus, Trash2, Eye, Edit3, Download, Sparkles,
  ExternalLink, ChevronDown, ChevronUp,
  Phone, MapPin, Award, BookOpen, Heart
} from 'lucide-react';

/* ─────────────── Types ─────────────── */
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
}

interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: string;
}

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  twitter: string;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  accentColor: string;
  darkMode: boolean;
}

/* ─────────────── Helpers ─────────────── */
const uid = () => crypto.randomUUID();

const defaultData: PortfolioData = {
  name: 'Alex Johnson',
  title: 'Full-Stack Developer & UI Designer',
  bio: 'Passionate developer crafting beautiful, performant web experiences. I turn complex problems into elegant solutions with clean code and pixel-perfect design.',
  avatar: '',
  location: 'San Francisco, CA',
  email: 'alex@example.com',
  phone: '+1 (555) 123-4567',
  website: 'https://alexjohnson.dev',
  github: 'alexjohnson',
  linkedin: 'alexjohnson',
  twitter: 'alexjohnsondev',
  accentColor: '#8B5CF6',
  darkMode: false,
  projects: [
    {
      id: uid(),
      title: 'E-Commerce Platform',
      description: 'A modern, full-featured e-commerce platform built with React, Node.js, and Stripe for payments.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: 'https://example.com',
      github: 'https://github.com/example',
    },
    {
      id: uid(),
      title: 'AI Dashboard',
      description: 'Real-time analytics dashboard powered by machine learning for predictive business insights.',
      tags: ['Python', 'TensorFlow', 'D3.js', 'FastAPI'],
      link: 'https://example.com',
      github: 'https://github.com/example',
    },
    {
      id: uid(),
      title: 'Mobile Fitness App',
      description: 'Cross-platform fitness tracker with personalized workout plans and progress visualization.',
      tags: ['React Native', 'Expo', 'Firebase'],
      link: 'https://example.com',
      github: 'https://github.com/example',
    },
  ],
  skills: [
    { id: uid(), name: 'React / TypeScript', level: 92, category: 'Frontend' },
    { id: uid(), name: 'Node.js / Express', level: 85, category: 'Backend' },
    { id: uid(), name: 'UI / UX Design', level: 78, category: 'Design' },
    { id: uid(), name: 'Python / FastAPI', level: 72, category: 'Backend' },
    { id: uid(), name: 'Docker / Kubernetes', level: 65, category: 'DevOps' },
    { id: uid(), name: 'PostgreSQL / MongoDB', level: 80, category: 'Database' },
  ],
  experience: [
    {
      id: uid(),
      role: 'Senior Frontend Engineer',
      company: 'TechCorp Inc.',
      period: '2022 – Present',
      description: 'Led the redesign of the core product, improving user engagement by 40%. Mentored 5 junior developers.',
    },
    {
      id: uid(),
      role: 'Full-Stack Developer',
      company: 'StartupXYZ',
      period: '2020 – 2022',
      description: 'Built and shipped 3 full-stack features from scratch. Reduced API response times by 60%.',
    },
    {
      id: uid(),
      role: 'Junior Web Developer',
      company: 'Agency Creative',
      period: '2018 – 2020',
      description: 'Developed responsive websites for 20+ clients across various industries.',
    },
  ],
};

const accentPresets = [
  '#8B5CF6', '#14B8A6', '#F59E0B', '#EF4444',
  '#3B82F6', '#10B981', '#EC4899', '#6366F1',
];

const skillCategories = ['Frontend', 'Backend', 'Design', 'DevOps', 'Database', 'Other'];

/* ─────────────── Sub-components ─────────────── */

function TagInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState('');

  const add = () => {
    const v = input.trim();
    if (v && !tags.includes(v)) {
      onChange([...tags, v]);
    }
    setInput('');
  };

  const remove = (t: string) => onChange(tags.filter(x => x !== t));

  return (
    <div>
      <div className="flex flex-wrap gap-1 mb-2">
        {tags.map(t => (
          <span
            key={t}
            className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700"
          >
            {t}
            <button onClick={() => remove(t)} className="hover:text-red-500">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Add tag…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
        />
        <button
          onClick={add}
          className="px-3 py-1.5 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600"
        >
          Add
        </button>
      </div>
    </div>
  );
}

/* ─────────────── PREVIEW ─────────────── */

function PortfolioPreview({ data }: { data: PortfolioData }) {
  const accent = data.accentColor;
  const dark = data.darkMode;

  const bg = dark ? '#0F172A' : '#FFFFFF';
  const cardBg = dark ? '#1E293B' : '#F8FAFC';
  const textPrimary = dark ? '#F1F5F9' : '#0F172A';
  const textSecondary = dark ? '#94A3B8' : '#64748B';
  const border = dark ? '#334155' : '#E2E8F0';

  const initials = data.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const skillGroups = skillCategories.reduce<Record<string, Skill[]>>((acc, cat) => {
    const s = data.skills.filter(sk => sk.category === cat);
    if (s.length) acc[cat] = s;
    return acc;
  }, {});

  return (
    <div
      style={{ background: bg, color: textPrimary, fontFamily: "'Segoe UI', system-ui, sans-serif" }}
      className="w-full rounded-2xl overflow-hidden shadow-2xl text-sm"
    >
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${accent}22 0%, ${accent}44 100%)`,
          borderBottom: `1px solid ${border}`,
        }}
        className="px-8 py-12 relative overflow-hidden"
      >
        {/* Decorative blobs */}
        <div
          style={{ background: accent, opacity: 0.12, borderRadius: '50%', filter: 'blur(60px)' }}
          className="absolute -top-10 -right-10 w-48 h-48 pointer-events-none"
        />
        <div
          style={{ background: accent, opacity: 0.08, borderRadius: '50%', filter: 'blur(80px)' }}
          className="absolute -bottom-10 -left-10 w-56 h-56 pointer-events-none"
        />

        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)` }}
          >
            {data.avatar ? (
              <img src={data.avatar} alt={data.name} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              initials
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold mb-1" style={{ color: textPrimary }}>{data.name}</h1>
            <p className="text-base font-medium mb-3" style={{ color: accent }}>{data.title}</p>
            <p className="text-sm leading-relaxed mb-4 max-w-xl" style={{ color: textSecondary }}>{data.bio}</p>

            {/* Contact badges */}
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {data.location && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs" style={{ background: `${accent}22`, color: accent }}>
                  <MapPin className="w-3 h-3" /> {data.location}
                </span>
              )}
              {data.email && (
                <a href={`mailto:${data.email}`} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs" style={{ background: `${accent}22`, color: accent }}>
                  <Mail className="w-3 h-3" /> {data.email}
                </a>
              )}
              {data.website && (
                <a href={data.website} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs" style={{ background: `${accent}22`, color: accent }}>
                  <Globe className="w-3 h-3" /> Website
                </a>
              )}
              {data.github && (
                <a href={`https://github.com/${data.github}`} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs" style={{ background: `${accent}22`, color: accent }}>
                  <Github className="w-3 h-3" /> {data.github}
                </a>
              )}
              {data.linkedin && (
                <a href={`https://linkedin.com/in/${data.linkedin}`} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs" style={{ background: `${accent}22`, color: accent }}>
                  <Linkedin className="w-3 h-3" /> LinkedIn
                </a>
              )}
              {data.twitter && (
                <a href={`https://twitter.com/${data.twitter}`} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs" style={{ background: `${accent}22`, color: accent }}>
                  <Twitter className="w-3 h-3" /> @{data.twitter}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-8">

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: textPrimary }}>
              <span style={{ background: `${accent}22`, color: accent }} className="p-1.5 rounded-lg"><Briefcase className="w-4 h-4" /></span>
              Projects
            </h2>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))' }}>
              {data.projects.map(p => (
                <div
                  key={p.id}
                  className="rounded-xl p-4 border transition-all duration-300 hover:shadow-md"
                  style={{ background: cardBg, borderColor: border }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm" style={{ color: textPrimary }}>{p.title}</h3>
                    <div className="flex gap-1 ml-2 flex-shrink-0">
                      {p.github && (
                        <a href={p.github} className="p-1 rounded hover:opacity-70" style={{ color: textSecondary }}>
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {p.link && (
                        <a href={p.link} className="p-1 rounded hover:opacity-70" style={{ color: accent }}>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed mb-3" style={{ color: textSecondary }}>{p.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 text-xs rounded-full font-medium" style={{ background: `${accent}22`, color: accent }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: textPrimary }}>
              <span style={{ background: `${accent}22`, color: accent }} className="p-1.5 rounded-lg"><Code2 className="w-4 h-4" /></span>
              Skills
            </h2>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))' }}>
              {Object.entries(skillGroups).map(([cat, skills]) => (
                <div key={cat} className="rounded-xl p-4 border" style={{ background: cardBg, borderColor: border }}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: accent }}>{cat}</h3>
                  <div className="space-y-3">
                    {skills.map(s => (
                      <div key={s.id}>
                        <div className="flex justify-between text-xs mb-1" style={{ color: textSecondary }}>
                          <span style={{ color: textPrimary }}>{s.name}</span>
                          <span>{s.level}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${accent}22` }}>
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${s.level}%`, background: `linear-gradient(90deg, ${accent}, ${accent}bb)` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: textPrimary }}>
              <span style={{ background: `${accent}22`, color: accent }} className="p-1.5 rounded-lg"><Award className="w-4 h-4" /></span>
              Experience
            </h2>
            <div className="relative pl-6">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 rounded-full" style={{ background: `${accent}44` }} />
              <div className="space-y-5">
                {data.experience.map((exp, i) => (
                  <div key={exp.id} className="relative">
                    <div
                      className="absolute -left-[18px] top-1 w-3 h-3 rounded-full border-2"
                      style={{ background: i === 0 ? accent : cardBg, borderColor: accent }}
                    />
                    <div className="rounded-xl p-4 border ml-2" style={{ background: cardBg, borderColor: border }}>
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <span className="font-semibold text-sm" style={{ color: textPrimary }}>{exp.role}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${accent}22`, color: accent }}>{exp.period}</span>
                      </div>
                      <p className="text-xs font-medium mb-2" style={{ color: accent }}>{exp.company}</p>
                      <p className="text-xs leading-relaxed" style={{ color: textSecondary }}>{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>

      {/* Footer */}
      <div
        className="px-6 py-4 text-center text-xs"
        style={{ borderTop: `1px solid ${border}`, color: textSecondary }}
      >
        Built with <Heart className="inline w-3 h-3 mx-0.5" style={{ color: accent }} fill={accent} /> using EditForge Portfolio Builder
      </div>
    </div>
  );
}

/* ─────────────── EDITOR PANEL ─────────────── */

type Section = 'profile' | 'projects' | 'skills' | 'experience' | 'style';

const sectionMeta: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'experience', label: 'Experience', icon: BookOpen },
  { id: 'style', label: 'Style', icon: Sparkles },
];

export function PortfolioBuilder() {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [activeSection, setActiveSection] = useState<Section>('profile');
  const [previewMode, setPreviewMode] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) =>
    setData(d => ({ ...d, [key]: value }));

  /* ── Projects ── */
  const addProject = () =>
    setData(d => ({
      ...d,
      projects: [
        ...d.projects,
        { id: uid(), title: 'New Project', description: '', tags: [], link: '', github: '' },
      ],
    }));

  const updateProject = (id: string, patch: Partial<Project>) =>
    setData(d => ({ ...d, projects: d.projects.map(p => (p.id === id ? { ...p, ...patch } : p)) }));

  const removeProject = (id: string) =>
    setData(d => ({ ...d, projects: d.projects.filter(p => p.id !== id) }));

  /* ── Skills ── */
  const addSkill = () =>
    setData(d => ({
      ...d,
      skills: [...d.skills, { id: uid(), name: 'New Skill', level: 50, category: 'Frontend' }],
    }));

  const updateSkill = (id: string, patch: Partial<Skill>) =>
    setData(d => ({ ...d, skills: d.skills.map(s => (s.id === id ? { ...s, ...patch } : s)) }));

  const removeSkill = (id: string) =>
    setData(d => ({ ...d, skills: d.skills.filter(s => s.id !== id) }));

  /* ── Experience ── */
  const addExperience = () =>
    setData(d => ({
      ...d,
      experience: [
        ...d.experience,
        { id: uid(), role: 'New Role', company: '', period: '', description: '' },
      ],
    }));

  const updateExperience = (id: string, patch: Partial<Experience>) =>
    setData(d => ({ ...d, experience: d.experience.map(e => (e.id === id ? { ...e, ...patch } : e)) }));

  const removeExperience = (id: string) =>
    setData(d => ({ ...d, experience: d.experience.filter(e => e.id !== id) }));

  /* ── Export HTML ── */
  const exportHTML = () => {
    const previewEl = previewRef.current;
    if (!previewEl) return;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${data.name} — Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>body{margin:0;background:#f1f5f9}</style>
</head>
<body class="p-4 sm:p-8">
  <div class="max-w-4xl mx-auto">
    ${previewEl.innerHTML}
  </div>
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${data.name.replace(/\s+/g, '_')}_portfolio.html`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  /* ── Shared field helper (only for string-valued keys) ── */
  type StringKeys = { [K in keyof PortfolioData]: PortfolioData[K] extends string ? K : never }[keyof PortfolioData];

  const field = (
    label: string,
    key: StringKeys,
    placeholder = '',
    icon?: React.ElementType,
  ) => {
    const Icon = icon;
    return (
      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</label>
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          )}
          <input
            className={`w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition ${Icon ? 'pl-9' : ''}`}
            placeholder={placeholder}
            value={data[key]}
            onChange={e => set(key, e.target.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 via-purple-50/30 to-teal-50/30">

      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur border-b border-slate-200 gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-teal-500 text-white shadow">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 leading-tight text-sm">Portfolio Builder</h1>
            <p className="text-xs text-slate-500">Create your stunning portfolio</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewMode(p => !p)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${previewMode ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-slate-600 border-slate-300 hover:border-purple-400'}`}
          >
            {previewMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={exportHTML}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow hover:shadow-md transition-all hover:scale-105"
          >
            <Download className="w-3.5 h-3.5" />
            Export HTML
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      {previewMode ? (
        /* Full preview */
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div ref={previewRef} className="max-w-4xl mx-auto">
            <PortfolioPreview data={data} />
          </div>
        </div>
      ) : (
        /* Split: editor + live preview */
        <div className="flex-1 flex overflow-hidden">

          {/* Left editor panel */}
          <div className="w-full lg:w-[420px] flex-shrink-0 flex flex-col border-r border-slate-200 bg-white/60 overflow-hidden">

            {/* Section tabs */}
            <div className="flex overflow-x-auto border-b border-slate-200 bg-white/80">
              {sectionMeta.map(s => {
                const Icon = s.icon;
                const active = activeSection === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                      active
                        ? 'border-purple-500 text-purple-600 bg-purple-50/50'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {s.label}
                  </button>
                );
              })}
            </div>

            {/* Section content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">

              {/* ──── PROFILE ──── */}
              {activeSection === 'profile' && (
                <>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Personal Info</p>
                  {field('Full Name', 'name', 'Your Name', User)}
                  {field('Professional Title', 'title', 'e.g. Full-Stack Developer')}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Bio</label>
                    <textarea
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                      rows={4}
                      placeholder="Write a short bio…"
                      value={data.bio}
                      onChange={e => set('bio', e.target.value)}
                    />
                  </div>
                  {field('Location', 'location', 'City, Country', MapPin)}
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider pt-2">Contact</p>
                  {field('Email', 'email', 'you@example.com', Mail)}
                  {field('Phone', 'phone', '+1 (555) 000-0000', Phone)}
                  {field('Website', 'website', 'https://yoursite.com', Globe)}
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider pt-2">Social</p>
                  {field('GitHub Username', 'github', 'username', Github)}
                  {field('LinkedIn Username', 'linkedin', 'username', Linkedin)}
                  {field('Twitter/X Username', 'twitter', 'username', Twitter)}
                </>
              )}

              {/* ──── PROJECTS ──── */}
              {activeSection === 'projects' && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Projects ({data.projects.length})</p>
                    <button
                      onClick={addProject}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>

                  {data.projects.map((p, i) => (
                    <ProjectCard
                      key={p.id}
                      project={p}
                      index={i}
                      onUpdate={patch => updateProject(p.id, patch)}
                      onRemove={() => removeProject(p.id)}
                    />
                  ))}

                  {data.projects.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <Briefcase className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="text-xs">No projects yet. Add one!</p>
                    </div>
                  )}
                </>
              )}

              {/* ──── SKILLS ──── */}
              {activeSection === 'skills' && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Skills ({data.skills.length})</p>
                    <button
                      onClick={addSkill}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>

                  {data.skills.map(s => (
                    <div key={s.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                      <div className="flex gap-2 items-center">
                        <input
                          className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                          placeholder="Skill name"
                          value={s.name}
                          onChange={e => updateSkill(s.id, { name: e.target.value })}
                        />
                        <button onClick={() => removeSkill(s.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          className="flex-1 px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                          value={s.category}
                          onChange={e => updateSkill(s.id, { category: e.target.value })}
                        >
                          {skillCategories.map(c => <option key={c}>{c}</option>)}
                        </select>
                        <span className="text-xs font-medium text-slate-600 w-8 text-right">{s.level}%</span>
                      </div>
                      <div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={s.level}
                          onChange={e => updateSkill(s.id, { level: Number(e.target.value) })}
                          className="slider w-full"
                        />
                      </div>
                    </div>
                  ))}

                  {data.skills.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <Code2 className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="text-xs">No skills yet. Add one!</p>
                    </div>
                  )}
                </>
              )}

              {/* ──── EXPERIENCE ──── */}
              {activeSection === 'experience' && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Experience ({data.experience.length})</p>
                    <button
                      onClick={addExperience}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                    >
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>

                  {data.experience.map((exp, i) => (
                    <ExperienceCard
                      key={exp.id}
                      exp={exp}
                      index={i}
                      onUpdate={patch => updateExperience(exp.id, patch)}
                      onRemove={() => removeExperience(exp.id)}
                    />
                  ))}

                  {data.experience.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="text-xs">No experience yet. Add one!</p>
                    </div>
                  )}
                </>
              )}

              {/* ──── STYLE ──── */}
              {activeSection === 'style' && (
                <>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Accent Color</p>
                  <div className="flex flex-wrap gap-2">
                    {accentPresets.map(color => (
                      <button
                        key={color}
                        onClick={() => set('accentColor', color)}
                        style={{ background: color }}
                        className={`w-8 h-8 rounded-full shadow transition-all hover:scale-110 ${
                          data.accentColor === color ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : ''
                        }`}
                      />
                    ))}
                    <input
                      type="color"
                      value={data.accentColor}
                      onChange={e => set('accentColor', e.target.value)}
                      className="w-8 h-8 rounded-full cursor-pointer border-2 border-slate-200"
                      title="Custom color"
                    />
                  </div>

                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider pt-2">Theme</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => set('darkMode', false)}
                      className={`flex-1 py-3 rounded-xl border-2 transition text-xs font-medium flex items-center justify-center gap-1.5 ${!data.darkMode ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      ☀️ Light
                    </button>
                    <button
                      onClick={() => set('darkMode', true)}
                      className={`flex-1 py-3 rounded-xl border-2 transition text-xs font-medium flex items-center justify-center gap-1.5 ${data.darkMode ? 'border-purple-500 bg-slate-800 text-white' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                      🌙 Dark
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider pt-2">Avatar / Profile Picture URL</p>
                  <input
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="https://…"
                    value={data.avatar}
                    onChange={e => set('avatar', e.target.value)}
                  />
                  {data.avatar && (
                    <img
                      src={data.avatar}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 mt-1"
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right live preview (hidden on small screens) */}
          <div className="hidden lg:flex flex-1 overflow-auto bg-slate-100/80 p-6">
            <div ref={previewRef} className="w-full max-w-3xl mx-auto">
              <PortfolioPreview data={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────── ProjectCard ─────────────── */
function ProjectCard({
  project,
  index,
  onUpdate,
  onRemove,
}: {
  project: Project;
  index: number;
  onUpdate: (patch: Partial<Project>) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div
        className="flex items-center justify-between px-3 py-2.5 cursor-pointer hover:bg-slate-50 transition"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-sm font-medium text-slate-700 truncate">{project.title || 'Untitled'}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={e => { e.stopPropagation(); onRemove(); }}
            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </div>

      {open && (
        <div className="p-3 space-y-2 border-t border-slate-100">
          <input
            className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Project title"
            value={project.title}
            onChange={e => onUpdate({ title: e.target.value })}
          />
          <textarea
            className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            rows={3}
            placeholder="Description"
            value={project.description}
            onChange={e => onUpdate({ description: e.target.value })}
          />
          <input
            className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Live URL"
            value={project.link}
            onChange={e => onUpdate({ link: e.target.value })}
          />
          <input
            className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="GitHub URL"
            value={project.github}
            onChange={e => onUpdate({ github: e.target.value })}
          />
          <TagInput tags={project.tags} onChange={tags => onUpdate({ tags })} />
        </div>
      )}
    </div>
  );
}

/* ─────────────── ExperienceCard ─────────────── */
function ExperienceCard({
  exp,
  index,
  onUpdate,
  onRemove,
}: {
  exp: Experience;
  index: number;
  onUpdate: (patch: Partial<Experience>) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div
        className="flex items-center justify-between px-3 py-2.5 cursor-pointer hover:bg-slate-50 transition"
        onClick={() => setOpen(o => !o)}
      >
        <div className="min-w-0">
          <span className="text-sm font-medium text-slate-700 truncate block">{exp.role || 'New Role'}</span>
          {exp.company && <span className="text-xs text-slate-400 truncate block">{exp.company}</span>}
        </div>
        <div className="flex items-center gap-1 ml-2 flex-shrink-0">
          <button
            onClick={e => { e.stopPropagation(); onRemove(); }}
            className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </div>

      {open && (
        <div className="p-3 space-y-2 border-t border-slate-100">
          <input
            className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Job title / Role"
            value={exp.role}
            onChange={e => onUpdate({ role: e.target.value })}
          />
          <input
            className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Company name"
            value={exp.company}
            onChange={e => onUpdate({ company: e.target.value })}
          />
          <input
            className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Period (e.g. 2022 – Present)"
            value={exp.period}
            onChange={e => onUpdate({ period: e.target.value })}
          />
          <textarea
            className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            rows={3}
            placeholder="Description of your responsibilities and achievements"
            value={exp.description}
            onChange={e => onUpdate({ description: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
