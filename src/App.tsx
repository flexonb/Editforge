import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainWorkspace } from './components/MainWorkspace';
import { TopBar } from './components/TopBar';
import { EditorProvider } from './context/EditorContext';

function App() {
  const [currentTool, setCurrentTool] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <EditorProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 transition-all duration-500 overflow-x-hidden">
        <TopBar 
          onSearch={setSearchQuery} 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
          <Sidebar 
            currentTool={currentTool} 
            onToolChange={setCurrentTool}
            searchQuery={searchQuery}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <MainWorkspace 
            currentTool={currentTool} 
            onToolChange={setCurrentTool}
          />
        </div>
        
        {/* Enhanced background effects with better performance */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 gpu-accelerated">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse will-change-transform"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse will-change-transform"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse will-change-transform"></div>
        </div>
      </div>
    </EditorProvider>
  );
}

export default App;