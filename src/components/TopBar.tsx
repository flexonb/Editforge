import React, { useState } from 'react';
import { Search, Zap, User, Sparkles, Menu, X } from 'lucide-react';

interface TopBarProps {
  onSearch: (query: string) => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function TopBar({ onSearch, onToggleSidebar, sidebarOpen }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className="nav-responsive shadow-lg relative z-50">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-responsive">
          {/* Mobile menu button */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden touch-target bg-gradient-to-r from-purple-500 to-teal-500 rounded-xl shadow-lg hover:scale-105 transition-transform"
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {sidebarOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex touch-target bg-gradient-to-r from-purple-500 to-teal-500 rounded-xl shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 sm:gap-2">
                <h1 className="text-responsive-lg sm:text-responsive-xl md:text-responsive-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
                  EditForge Pro
                </h1>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 animate-pulse" />
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
                <span>Crafted with ❤️ by</span>
                <span className="font-semibold text-purple-600">Flexon</span>
              </div>
            </div>
          </div>
          
          {/* Feature badges - responsive visibility */}
          <div className="hidden xl:flex items-center gap-2 text-xs">
            <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full font-medium shadow-sm">
              ✨ Offline Ready
            </span>
            <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full font-medium shadow-sm">
              🚀 No API Required
            </span>
            <span className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full font-medium shadow-sm">
              🔒 100% Private
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Responsive search input */}
          <div className="relative">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search tools..."
              className="input-responsive pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 w-24 xs:w-32 sm:w-48 md:w-64 bg-white/80 backdrop-blur-sm border border-white/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
              aria-label="Search tools"
            />
          </div>

          {/* Bolt.new Badge - responsive sizing */}
          <a
            href="https://bolt.new/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 hover:scale-105 transition-transform duration-200 touch-target"
            title="Made with Bolt.new"
            aria-label="Made with Bolt.new"
          >
            <img
              src="/black_circle_360x360.png"
              alt="Made with Bolt.new"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </header>
  );
}