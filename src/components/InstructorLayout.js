import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, FileText, BarChart2, User,Bell, Layout } from 'lucide-react';

import { cn } from "../lib/utils.ts"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar.tsx"

const navItems = [
  { icon: Layout, label: 'Dashboard', path: '/instructor' },
  { icon: BookOpen, label: 'Course Management', path: '/instructor/courses' },
  { icon: FileText, label: 'Assignments & Exams', path: '/instructor/assignments' },
  { icon: BarChart2, label: 'Student Progress', path: '/instructor/progress' },
  { icon: Bell, label: 'Notifications', path: '/instructor/notifications' },
  { icon: User, label: 'Profile', path: '/instructor/profile' },
];

export default function InstructorLayout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-xl font-bold">Instructor Portal</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link to={item.path} className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 py-3">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">
                {navItems.find(item => item.path === location.pathname)?.label || 'Instructor Dashboard'}
              </h1>
              <div>{/* You can add user menu or notifications here */}</div>
            </div>
          </header>
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

