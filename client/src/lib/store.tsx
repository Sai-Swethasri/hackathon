import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Types
export type UserRole = 'guest' | 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  avatar?: string;
  stats: {
    projectsStarted: number;
    lessonsCompleted: number;
    ecoPoints: number;
  };
  badges: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string; // e.g. "10 min"
  content: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g. "7 days"
  difficulty: 'Easy' | 'Medium' | 'Hard';
  impact: string;
  instructions: string[];
  materials: string[];
  participants: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'Article' | 'Video' | 'PDF' | 'Link';
  url: string;
  tag: string;
}

interface StoreContextType {
  user: User | null;
  login: (username: string, role: UserRole) => void;
  logout: () => void;
  
  lessons: Lesson[];
  addLesson: (lesson: Omit<Lesson, 'id'>) => void;
  removeLesson: (id: string) => void;
  
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  removeProject: (id: string) => void;
  
  resources: Resource[];
  addResource: (resource: Omit<Resource, 'id'>) => void;
  removeResource: (id: string) => void;

  // User Progress
  completedLessons: string[]; // IDs
  joinedProjects: string[]; // IDs
  markLessonComplete: (id: string) => void;
  joinProject: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial Mock Data
const INITIAL_LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Introduction to Renewable Energy',
    description: 'Learn the basics of solar, wind, and hydro power.',
    category: 'Renewable Energy',
    difficulty: 'Beginner',
    duration: '15 min',
    content: 'Renewable energy is energy from sources that are naturally replenishing but flow-limited...',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Zero Waste Living 101',
    description: 'Simple steps to reduce your daily waste footprint.',
    category: 'Waste Reduction',
    difficulty: 'Beginner',
    duration: '10 min',
    content: 'The 5 Rs of Zero Waste: Refuse, Reduce, Reuse, Recycle, Rot...',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    title: 'Urban Gardening Basics',
    description: 'Grow your own food even in small spaces.',
    category: 'Eco-friendly Lifestyle',
    difficulty: 'Intermediate',
    duration: '20 min',
    content: 'You do not need a big backyard to grow food. Balconies and windowsills work great...',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80'
  }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Plastic-Free Week Challenge',
    description: 'Attempt to go one full week without buying single-use plastics.',
    duration: '7 Days',
    difficulty: 'Medium',
    impact: 'Save ~15 plastic items',
    instructions: ['Audit your current plastic use', 'Prepare reusable alternatives', 'Track your progress daily'],
    materials: ['Reusable bag', 'Water bottle', 'Food containers'],
    participants: 124
  },
  {
    id: '2',
    title: 'Campus Energy Audit',
    description: 'Identify energy wastage in your school or home.',
    duration: '2 Days',
    difficulty: 'Easy',
    impact: 'Potential 10% energy savings',
    instructions: ['Walk through rooms', 'Check for drafts', 'Note electronics left on standby'],
    materials: ['Notepad', 'Checklist'],
    participants: 45
  }
];

const INITIAL_RESOURCES: Resource[] = [
  {
    id: '1',
    title: 'Global Climate Report 2024',
    description: 'Summary of the latest findings on climate change.',
    type: 'PDF',
    url: '#',
    tag: 'Advanced'
  },
  {
    id: '2',
    title: '10 Ways to Save Water',
    description: 'Quick tips for water conservation at home.',
    type: 'Article',
    url: '#',
    tag: 'Beginner'
  }
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>(INITIAL_LESSONS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [joinedProjects, setJoinedProjects] = useState<string[]>([]);

  const login = (username: string, role: UserRole) => {
    setUser({
      id: 'u1',
      name: role === 'admin' ? 'Admin User' : 'Alex Green',
      username,
      role,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      stats: {
        projectsStarted: 2,
        lessonsCompleted: 5,
        ecoPoints: 350
      },
      badges: ['Eco-Starter', 'Water Saver']
    });
    toast({
      title: `Welcome back, ${username}!`,
      description: `Logged in as ${role}.`,
    });
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  const addLesson = (lesson: Omit<Lesson, 'id'>) => {
    const newLesson = { ...lesson, id: Math.random().toString(36).substr(2, 9) };
    setLessons([...lessons, newLesson]);
    toast({ title: "Lesson Added", description: lesson.title });
  };

  const removeLesson = (id: string) => {
    setLessons(lessons.filter(l => l.id !== id));
    toast({ title: "Lesson Removed", variant: "destructive" });
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Math.random().toString(36).substr(2, 9) };
    setProjects([...projects, newProject]);
    toast({ title: "Project Added", description: project.title });
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    toast({ title: "Project Removed", variant: "destructive" });
  };

  const addResource = (resource: Omit<Resource, 'id'>) => {
    const newResource = { ...resource, id: Math.random().toString(36).substr(2, 9) };
    setResources([...resources, newResource]);
    toast({ title: "Resource Added", description: resource.title });
  };

  const removeResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
    toast({ title: "Resource Removed", variant: "destructive" });
  };

  const markLessonComplete = (id: string) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons([...completedLessons, id]);
      toast({ title: "Lesson Completed!", description: "+50 Eco Points" });
    }
  };

  const joinProject = (id: string) => {
    if (!joinedProjects.includes(id)) {
      setJoinedProjects([...joinedProjects, id]);
      toast({ title: "Project Joined!", description: "Let's make an impact." });
    }
  };

  return (
    <StoreContext.Provider value={{
      user, login, logout,
      lessons, addLesson, removeLesson,
      projects, addProject, removeProject,
      resources, addResource, removeResource,
      completedLessons, markLessonComplete,
      joinedProjects, joinProject
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
