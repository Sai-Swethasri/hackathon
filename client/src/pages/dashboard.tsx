import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Trophy, Zap, Droplets, Info, ArrowRight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "wouter";

export default function Dashboard() {
  const { user, lessons, completedLessons } = useStore();

  if (!user) return <div className="p-8 text-center">Please log in to view your dashboard.</div>;

  const userProgress = (completedLessons.length / Math.max(lessons.length, 1)) * 100;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Hi, {user.name}! 👋</h1>
          <p className="text-muted-foreground">Ready to make a positive impact today?</p>
        </div>
        
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Info className="h-4 w-4" /> Dashboard Guide
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Your Eco-Dashboard</h4>
              <p className="text-sm text-muted-foreground">
                Track your learning progress, monitor your personal eco-goals, and see your latest achievements here.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Progress Card */}
        <Card className="md:col-span-2 border-none shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" /> 
              Learning Journey
            </CardTitle>
            <CardDescription>You've completed {completedLessons.length} out of {lessons.length} available lessons.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span>Overall Progress</span>
                <span>{Math.round(userProgress)}%</span>
              </div>
              <Progress value={userProgress} className="h-3" />
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Next Recommended Lesson:</h4>
              {lessons.find(l => !completedLessons.includes(l.id)) ? (
                <div className="bg-white p-4 rounded-xl border flex justify-between items-center">
                  <div>
                    <p className="font-medium">{lessons.find(l => !completedLessons.includes(l.id))?.title}</p>
                    <p className="text-sm text-muted-foreground">{lessons.find(l => !completedLessons.includes(l.id))?.duration} • {lessons.find(l => !completedLessons.includes(l.id))?.difficulty}</p>
                  </div>
                  <Link href="/lessons">
                    <Button size="sm">Start</Button>
                  </Link>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">You're all caught up! Great job! 🎉</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Eco-Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Your Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Eco Points</p>
                  <p className="font-bold text-xl">{user.stats.ecoPoints}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Reduce Plastic</span>
                  <span>70%</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Save Electricity</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges & Recent Activity */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Badges & Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {user.badges.map((badge, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/30">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white shadow-sm">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium text-center">{badge}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2 p-3 opacity-50 grayscale">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                   <Trophy className="h-6 w-6 text-gray-400" />
                </div>
                <span className="text-xs font-medium text-center">Locked</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="mt-1 bg-blue-100 p-1.5 rounded-full h-fit">
                  <Droplets className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Joined "Water Conservation" Project</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-green-100 p-1.5 rounded-full h-fit">
                  <Leaf className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Completed "Zero Waste 101"</p>
                  <p className="text-xs text-muted-foreground">5 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
