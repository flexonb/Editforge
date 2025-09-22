import React from 'react';
import { Home, Image, Music, Video, FileText, Palette, Download, Quote, Search, Code, Mic, Grid3X3, Sticker, Calculator, Camera, Hash, QrCode, Compass, Zap, Cpu, Globe, Calendar, Clock, Scissors, Type, Layers, Filter, Volume2, AudioWaveform as Waveform, FileVideo, ImageIcon, Crop, RotateCw, Sliders, Headphones, FileAudio, Maximize, Minimize, SkipBack, SkipForward, Database, Settings, Terminal, Smartphone, Wifi, X } from 'lucide-react';

interface SidebarProps {
  currentTool: string;
  onToolChange: (tool: string) => void;
  searchQuery: string;
  isOpen: boolean;
  onClose: () => void;
}

const tools = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, category: 'main', keywords: ['home', 'start', 'overview'] },
  
  // Editors
  { id: 'image-editor', name: 'Image Editor', icon: Image, category: 'editors', keywords: ['photo', 'picture', 'edit', 'filter', 'crop'] },
  { id: 'audio-editor', name: 'Audio Editor', icon: Music, category: 'editors', keywords: ['sound', 'music', 'audio', 'wave', 'trim'] },
  { id: 'video-editor', name: 'Video Editor', icon: Video, category: 'editors', keywords: ['video', 'movie', 'clip', 'trim', 'cut'] },
  { id: 'text-editor', name: 'Text Editor', icon: FileText, category: 'editors', keywords: ['text', 'markdown', 'document', 'write'] },
  { id: 'code-editor', name: 'Code Editor', icon: Code, category: 'editors', keywords: ['code', 'programming', 'javascript', 'html', 'css'] },
  { id: 'photo-grid', name: 'Photo Grid', icon: Grid3X3, category: 'editors', keywords: ['collage', 'grid', 'layout', 'photos'] },
  
  // Creative Tools
  { id: 'converter', name: 'File Converter', icon: Download, category: 'tools', keywords: ['convert', 'format', 'transform', 'export'] },
  { id: 'quote-generator', name: 'Quote Generator', icon: Quote, category: 'tools', keywords: ['quote', 'inspiration', 'wisdom', 'saying'] },
  { id: 'wiki-search', name: 'Wikipedia', icon: Search, category: 'tools', keywords: ['wiki', 'search', 'knowledge', 'encyclopedia'] },
  { id: 'lyrics-finder', name: 'Lyrics Finder', icon: Music, category: 'tools', keywords: ['lyrics', 'song', 'music', 'words'] },
  { id: 'script-runner', name: 'Script Runner', icon: Terminal, category: 'tools', keywords: ['code', 'javascript', 'script', 'run'] },
  { id: 'voice-recorder', name: 'Voice Recorder', icon: Mic, category: 'tools', keywords: ['voice', 'record', 'audio', 'microphone'] },
  { id: 'stickers', name: 'Stickers & Emojis', icon: Sticker, category: 'tools', keywords: ['sticker', 'emoji', 'emoticon', 'symbol'] },
  
  // Expert Tools
  { id: 'calculator', name: 'Calculator', icon: Calculator, category: 'expert', keywords: ['math', 'calculate', 'numbers', 'compute'] },
  { id: 'qr-generator', name: 'QR Generator', icon: QrCode, category: 'expert', keywords: ['qr', 'code', 'barcode', 'generate'] },
  { id: 'color-picker', name: 'Color Picker', icon: Palette, category: 'expert', keywords: ['color', 'picker', 'palette', 'hex'] },
  { id: 'hash-generator', name: 'Hash Generator', icon: Hash, category: 'expert', keywords: ['hash', 'md5', 'sha', 'encrypt'] },
  { id: 'password-generator', name: 'Password Generator', icon: Zap, category: 'expert', keywords: ['password', 'generate', 'secure', 'random'] },
  { id: 'base64-encoder', name: 'Base64 Encoder', icon: Code, category: 'expert', keywords: ['base64', 'encode', 'decode', 'convert'] },
  { id: 'json-formatter', name: 'JSON Formatter', icon: Cpu, category: 'expert', keywords: ['json', 'format', 'validate', 'pretty'] },
  { id: 'unit-converter', name: 'Unit Converter', icon: Compass, category: 'expert', keywords: ['unit', 'convert', 'measurement', 'metric'] },
  { id: 'timer-stopwatch', name: 'Timer & Stopwatch', icon: Clock, category: 'expert', keywords: ['timer', 'stopwatch', 'time', 'countdown'] },
  { id: 'calendar-widget', name: 'Calendar Widget', icon: Calendar, category: 'expert', keywords: ['calendar', 'date', 'schedule', 'events'] },
  { id: 'image-compressor', name: 'Image Compressor', icon: Minimize, category: 'expert', keywords: ['compress', 'optimize', 'reduce', ''] },
  { id: 'pdf-tools', name: 'PDF Tools', icon: FileText, category: 'expert', keywords: ['pdf', 'merge', 'split', 'extract'] },
  { id: 'screen-recorder', name: 'Screen Recorder', icon: Camera, category: 'expert', keywords: ['screen', 'record', 'capture', 'video'] },
  { id: 'audio-visualizer', name: 'Audio Visualizer', icon: Waveform, category: 'expert', keywords: ['visualize', 'spectrum', 'frequency', 'wave'] },
  { id: 'database-manager', name: 'Database Manager', icon: Database, category: 'expert', keywords: ['database', 'sql', 'table', 'data'] },
  { id: 'api-tester', name: 'API Tester', icon: Globe, category: 'expert', keywords: ['api', 'rest', 'http', 'request', 'test'] },
];

const categories = {
  main: 'Main',
  editors: 'Editors',
  tools: 'Creative Tools',
  expert: 'Expert Tools',
};

export function Sidebar({ currentTool, onToolChange, searchQuery, isOpen, onClose }: SidebarProps) {
  const filteredTools = tools.filter(tool => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.keywords.some(keyword => keyword.includes(query))
    );
  });

  const groupedTools = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  const handleToolClick = (toolId: string) => {
    onToolChange(toolId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar-responsive ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Mobile close button */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-responsive-lg font-semibold text-slate-900">Tools</h2>
          <button
            onClick={onClose}
            className="touch-target hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-responsive space-y-responsive">
          {Object.entries(groupedTools).map(([category, categoryTools]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 md:mb-3 px-1">
                {categories[category as keyof typeof categories]}
              </h3>
              <div className="space-y-1">
                {categoryTools.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = currentTool === tool.id;
                  
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleToolClick(tool.id)}
                      className={`w-full flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-2.5 rounded-lg text-left transition-all duration-200 group touch-target ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow-lg transform scale-105'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                      }`} />
                      <span className="text-responsive-sm font-medium truncate">{tool.name}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          
          {searchQuery && filteredTools.length === 0 && (
            <div className="text-center py-8">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <p className="text-responsive-sm text-slate-500">No tools found for "{searchQuery}"</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}