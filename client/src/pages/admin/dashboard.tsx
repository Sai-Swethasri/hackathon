import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, BookOpen, Briefcase, FileText, ArrowUpRight, TrendingUp } from "lucide-react";

const DATA = [
  { name: 'Mon', engagement: 40 },
  { name: 'Tue', engagement: 30 },
  { name: 'Wed', engagement: 20 },
  { name: 'Thu', engagement: 60 },
  { name: 'Fri', engagement: 80 },
  { name: 'Sat', engagement: 90 },
  { name: 'Sun', engagement: 75 },
];

export default function AdminDashboard() {
  const { lessons, projects, resources } = useStore();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of platform activity and content.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/lessons">
            <Button variant="outline">Manage Content</Button>
          </Link>
          <Button>Export Report</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground flex items-center text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Lessons</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons.length}</div>
            <p className="text-xs text-muted-foreground flex items-center text-muted-foreground">
              Across 4 categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground flex items-center text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" /> +5 new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources.length}</div>
            <p className="text-xs text-muted-foreground">
              Curated materials
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts & Quick Links */}
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>User Engagement</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="engagement" stroke="hsl(142, 76%, 36%)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/lessons">
              <Button variant="secondary" className="w-full justify-between h-12">
                Manage Lessons <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/projects">
              <Button variant="secondary" className="w-full justify-between h-12">
                Manage Projects <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/admin/resources">
              <Button variant="secondary" className="w-full justify-between h-12">
                Manage Resources <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
