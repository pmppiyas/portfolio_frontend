'use client';

import { useState } from 'react';
import Sidebar, { DashboardTab } from './Sidebar';
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './DashboardOverview';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  FolderGit2,
  BookOpen,
  Plus,
  Search,
  Trash2,
  Edit,
  Eye,
  ExternalLink,
  Shield,
  Server,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import ProjectsView from './ProjectsView';
import BlogsView from './BlogsView';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Dynamic Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content Area */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Sticky Dashboard Header */}
        <DashboardHeader
          activeTab={activeTab}
          setIsMobileOpen={setIsMobileOpen}
          isCollapsed={isCollapsed}
        />

        {/* Dynamic Viewport Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <DashboardOverview onNavigateTab={setActiveTab} />
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && <ProjectsView />}

          {/* BLOGS TAB */}
          {activeTab === 'blogs' && <BlogsView />}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="space-y-6 font-mono">
              <div>
                <h2
                  className="text-xl font-black text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-orbitron), sans-serif' }}
                >
                  SYSTEM // TELEMETRY_CONFIG
                </h2>
                <p className="text-xs text-gray-400">
                  Manage environment parameters, cookies, and system cache.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-950/80 border-white/10 rounded-2xl shadow-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                    <Server size={16} className="text-cyan-400" />
                    <span className="font-bold text-sm text-white">
                      ENVIRONMENT_METRICS
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-gray-400">
                    <div className="flex justify-between p-2 rounded-lg bg-black/40">
                      <span>NEXT_PUBLIC_BACKEND_URL</span>
                      <span className="text-cyan-300">Active</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-black/40">
                      <span>MIDDLEWARE_PROTECTION</span>
                      <span className="text-green-400">Edge Guard Active</span>
                    </div>
                    <div className="flex justify-between p-2 rounded-lg bg-black/40">
                      <span>SESSION_STORAGE</span>
                      <span className="text-white">
                        Cookie (portfolio_admin_user)
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gray-950/80 border-white/10 rounded-2xl shadow-xl p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                    <Shield size={16} className="text-purple-400" />
                    <span className="font-bold text-sm text-white">
                      QUICK_DISPATCH_COMMANDS
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <Button
                      onClick={() =>
                        toast.success('Application cache purged successfully.')
                      }
                      variant="outline"
                      className="w-full justify-between text-xs h-10 border-white/10 hover:border-cyan-400 text-gray-300 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <RefreshCw size={14} className="text-cyan-400" />
                        <span>PURGE_EDGE_CACHE</span>
                      </span>
                      <span>[ EXECUTE ]</span>
                    </Button>

                    <Button
                      onClick={() => {
                        logout();
                        toast.info('Session terminated.');
                        window.location.href = '/login';
                      }}
                      variant="destructive"
                      className="w-full justify-between text-xs h-10 bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <LogOut size={14} />
                        <span>TERMINATE_SESSION // LOGOUT</span>
                      </span>
                      <span>[ QUIT ]</span>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
