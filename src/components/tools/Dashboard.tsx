import React from 'react';
import { 
  Zap, Shield, Wifi, Download, Users, Star,
  TrendingUp, Clock, Files, Palette, User, Sparkles,
  Code, Music, Video, FileText, Grid3X3, Calculator,
  Globe, Camera, Database, Terminal, Layers, Filter,
  ArrowRight, Play, Heart, Award, Rocket, Crown
} from 'lucide-react';

interface DashboardProps {
  onToolChange?: (tool: string) => void;
}

function Dashboard({ onToolChange }: DashboardProps) {
  const stats = [
    { label: 'Tools Available', value: '27+', icon: Zap, color: 'purple', gradient: 'from-purple-500 to-purple-600' },
    { label: 'Files Processed', value: '0', icon: Files, color: 'teal', gradient: 'from-teal-500 to-teal-600' },
    { label: 'Time Saved', value: '0min', icon: Clock, color: 'amber', gradient: 'from-amber-500 to-amber-600' },
    { label: 'Projects Created', value: '0', icon: Palette, color: 'rose', gradient: 'from-rose-500 to-rose-600' },
  ];

  const features = [
    {
      title: 'Complete Privacy',
      description: 'All processing happens locally in your browser. No data ever leaves your device.',
      icon: Shield,
      gradient: 'from-green-500 to-emerald-500',
      highlight: 'Zero Data Collection'
    },
    {
      title: 'Works Offline',
      description: 'No internet required after initial load. Create anywhere, anytime.',
      icon: Wifi,
      gradient: 'from-blue-500 to-cyan-500',
      highlight: 'Offline First'
    },
    {
      title: 'No Installation',
      description: 'Runs directly in your browser. No downloads, no setup, just create.',
      icon: Download,
      gradient: 'from-purple-500 to-pink-500',
      highlight: 'Zero Setup'
    },
    {
      title: 'Open Source',
      description: 'Completely transparent and community-driven. Fork, modify, improve.',
      icon: Users,
      gradient: 'from-orange-500 to-red-500',
      highlight: 'Community Driven'
    },
  ];

  const toolCategories = [
    {
      name: 'Editors',
      icon: Code,
      count: 6,
      tools: [
        { name: 'Image Editor', id: 'image-editor' },
        { name: 'Audio Editor', id: 'audio-editor' },
        { name: 'Video Editor', id: 'video-editor' },
        { name: 'Text Editor', id: 'text-editor' },
        { name: 'Code Editor', id: 'code-editor' },
        { name: 'Photo Grid', id: 'photo-grid' }
      ],
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100'
    },
    {
      name: 'Creative Tools',
      icon: Palette,
      count: 7,
      tools: [
        { name: 'File Converter', id: 'converter' },
        { name: 'Quote Generator', id: 'quote-generator' },
        { name: 'Wikipedia', id: 'wiki-search' },
        { name: 'Lyrics Finder', id: 'lyrics-finder' },
        { name: 'Script Runner', id: 'script-runner' },
        { name: 'Voice Recorder', id: 'voice-recorder' },
        { name: 'Stickers', id: 'stickers' }
      ],
      gradient: 'from-teal-500 to-teal-600',
      bgGradient: 'from-teal-50 to-teal-100'
    },
    {
      name: 'Expert Tools',
      icon: Terminal,
      count: 14,
      tools: [
        { name: 'Calculator', id: 'calculator' },
        { name: 'QR Generator', id: 'qr-generator' },
        { name: 'Color Picker', id: 'color-picker' },
        { name: 'Hash Generator', id: 'hash-generator' },
        { name: 'Password Generator', id: 'password-generator' },
        { name: 'Base64 Encoder', id: 'base64-encoder' },
        { name: 'JSON Formatter', id: 'json-formatter' },
        { name: 'Unit Converter', id: 'unit-converter' },
        { name: 'Timer & Stopwatch', id: 'timer-stopwatch' },
        { name: 'Calendar Widget', id: 'calendar-widget' },
        { name: 'Image Compressor', id: 'image-compressor' },
        { name: 'PDF Tools', id: 'pdf-tools' },
        { name: 'Screen Recorder', id: 'screen-recorder' },
        { name: 'Audio Visualizer', id: 'audio-visualizer' }
      ],
      gradient: 'from-amber-500 to-amber-600',
      bgGradient: 'from-amber-50 to-amber-100'
    }
  ];

  const quickActions = [
    { name: 'Start Editing', icon: Play, action: 'image-editor', gradient: 'from-purple-500 to-purple-600' },
    { name: 'Create Code', icon: Code, action: 'code-editor', gradient: 'from-blue-500 to-blue-600' },
    { name: 'Convert Files', icon: Download, action: 'converter', gradient: 'from-teal-500 to-teal-600' },
    { name: 'Generate QR', icon: Camera, action: 'qr-generator', gradient: 'from-amber-500 to-amber-600' }
  ];

  const handleToolClick = (toolId: string) => {
    if (onToolChange) {
      onToolChange(toolId);
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-white via-purple-50/30 to-teal-50/30">
      <div className="container-responsive space-y-responsive">
        {/* Hero Section - Responsive */}
        <div className="relative">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse gpu-accelerated"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse gpu-accelerated"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse gpu-accelerated"></div>
          </div>
          
          <div className="relative card-responsive">
            <div className="text-center space-y-responsive">
              <div className="inline-flex items-center gap-3 px-responsive py-3 bg-gradient-to-r from-purple-100/80 to-teal-100/80 backdrop-blur-sm rounded-full border border-white/30">
                <Crown className="w-5 h-5 text-purple-600" />
                <span className="text-responsive-sm font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                  Welcome to EditForge Pro
                </span>
                <Sparkles className="w-5 h-5 text-teal-600 animate-pulse" />
              </div>
              
              <div className="space-y-responsive">
                <h1 className="heading-responsive-1 font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                  Your Complete
                  <br />
                  <span className="relative">
                    Creative Suite
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full"></div>
                  </span>
                </h1>
                
                <p className="text-responsive-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Edit images, audio, video, and documents. Convert files, generate content, and run scripts - 
                  all without external dependencies or API keys. <span className="font-semibold text-purple-600">Completely free and private.</span>
                </p>
              </div>
              
              {/* Flexon Credit */}
              <div className="flex items-center justify-center gap-3 text-slate-500 flex-wrap">
                <span className="text-responsive-sm">Crafted with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="text-responsive-sm">by</span>
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-teal-100 rounded-full">
                  <User className="w-4 h-4 text-purple-600" />
                  <span className="font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">Flexon</span>
                </div>
              </div>

              {/* Quick Actions - Responsive Grid */}
              <div className="grid-responsive-sm pt-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleToolClick(action.action)}
                      className={`btn-primary group flex items-center gap-2 ${action.gradient} hover:shadow-xl`}
                    >
                      <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span className="font-medium">{action.name}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid - Responsive */}
        <div className="grid-responsive-sm">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="card-responsive group"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="heading-responsive-3 font-bold text-slate-900">
                        {stat.value}
                      </p>
                      <p className="text-responsive-sm text-slate-600 font-medium">
                        {stat.label}
                      </p>
                    </div>
                    <div className={`touch-target rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Animated Progress Bar */}
                  <div className="mt-4 w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tool Categories - Responsive */}
        <div className="space-y-responsive">
          <div className="text-center space-y-2">
            <h2 className="heading-responsive-2 font-bold text-slate-900">Explore Our Tools</h2>
            <p className="text-responsive-lg text-slate-600">Discover powerful tools organized by category</p>
          </div>
          
          <div className="grid-responsive">
            {toolCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className={`card-responsive group bg-gradient-to-br ${category.bgGradient}`}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`touch-target rounded-xl bg-gradient-to-r ${category.gradient} shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="heading-responsive-3 font-bold text-slate-900">{category.count}</div>
                        <div className="text-responsive-sm text-slate-600">Tools</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-responsive-xl font-bold text-slate-900 mb-2">{category.name}</h3>
                      <div className="space-y-1">
                        {category.tools.slice(0, 4).map((tool, toolIndex) => (
                          <button
                            key={toolIndex}
                            onClick={() => handleToolClick(tool.id)}
                            className="w-full text-left text-responsive-sm text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-2 py-1 px-2 rounded hover:bg-white/50 touch-target"
                          >
                            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                            <span>{tool.name}</span>
                          </button>
                        ))}
                        {category.tools.length > 4 && (
                          <div className="text-responsive-sm text-slate-500 italic px-2">
                            +{category.tools.length - 4} more tools...
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleToolClick(category.tools[0].id)}
                      className={`btn-primary w-full bg-gradient-to-r ${category.gradient} hover:shadow-lg`}
                    >
                      Explore {category.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Features Grid - Responsive */}
        <div className="space-y-responsive">
          <div className="text-center space-y-2">
            <h2 className="heading-responsive-2 font-bold text-slate-900">Why Choose EditForge Pro?</h2>
            <p className="text-responsive-lg text-slate-600">Built with privacy, performance, and user experience in mind</p>
          </div>
          
          <div className="grid-responsive">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card-responsive group"
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl`}></div>
                  
                  <div className="relative space-y-4">
                    <div className="flex items-start gap-4">
                      <div className={`touch-target bg-gradient-to-r ${feature.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-responsive-xl font-bold text-slate-900">
                            {feature.title}
                          </h3>
                          <span className={`px-2 py-1 bg-gradient-to-r ${feature.gradient} text-white text-xs font-bold rounded-full`}>
                            {feature.highlight}
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-responsive-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Feature Benefits */}
                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-2 text-responsive-sm text-slate-500 flex-wrap">
                        <Award className="w-4 h-4" />
                        <span>Industry Leading</span>
                        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                        <span>Always Free</span>
                        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                        <span>No Limits</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action - Responsive */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-teal-500 rounded-3xl blur-xl opacity-20"></div>
          <div className="relative bg-gradient-to-r from-purple-500 to-teal-500 rounded-3xl p-responsive text-white shadow-2xl">
            <div className="text-center space-y-responsive">
              <div className="space-y-4">
                <h2 className="heading-responsive-2 font-bold">Ready to Create Something Amazing?</h2>
                <p className="text-purple-100 max-w-3xl mx-auto text-responsive-lg leading-relaxed">
                  Choose a tool from the sidebar to get started, or drag and drop files directly into any editor. 
                  Your creative journey begins with a single click.
                </p>
              </div>
              
              <div className="flex-responsive justify-center">
                <div className="flex items-center gap-2 px-responsive py-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium text-responsive-sm">No Sign-up Required</span>
                </div>
                <div className="flex items-center gap-2 px-responsive py-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                  <Rocket className="w-5 h-5" />
                  <span className="font-medium text-responsive-sm">Instant Access</span>
                </div>
                <div className="flex items-center gap-2 px-responsive py-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium text-responsive-sm">100% Private</span>
                </div>
                <div className="flex items-center gap-2 px-responsive py-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium text-responsive-sm">Always Free</span>
                </div>
              </div>
              
              <div className="pt-4">
                <button 
                  onClick={() => handleToolClick('image-editor')}
                  className="group px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-responsive-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl touch-target"
                >
                  <span className="flex items-center gap-2">
                    <span>Start Creating Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats - Responsive */}
        <div className="text-center space-y-4 py-8">
          <div className="flex justify-center items-center gap-8 text-responsive-sm text-slate-500 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>All Systems Operational</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Last Updated: Just Now</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Built for Creators</span>
            </div>
          </div>
          
          <div className="text-xs text-slate-400">
            EditForge Pro v2.0 - The most advanced browser-based creative suite
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;