import { useStore, Lesson } from "@/lib/store";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Clock, BarChart, PlayCircle, CheckCircle, Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function LessonsPage() {
  const { lessons, completedLessons, markLessonComplete } = useStore();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Renewable Energy", "Waste Reduction", "Eco-friendly Lifestyle"];
  
  const filteredLessons = activeCategory === "All" 
    ? lessons 
    : lessons.filter(l => l.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Interactive Lessons</h1>
          <p className="text-muted-foreground">Expand your knowledge about sustainability.</p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Info className="h-4 w-4 mr-2" />
              How it works
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="text-sm">
              Browse lessons by category, click "Start Lesson" to learn, and complete them to earn Eco Points!
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Tabs defaultValue="All" className="w-full" onValueChange={setActiveCategory}>
        <TabsList className="w-full md:w-auto h-auto flex-wrap justify-start bg-transparent p-0 gap-2">
          {categories.map(cat => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-white px-4 py-2 rounded-full"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <Card key={lesson.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-none shadow-md">
            <div className="aspect-video w-full overflow-hidden relative">
              <img 
                src={lesson.image || "https://images.unsplash.com/photo-1497436072909-60f360e1d4b0?auto=format&fit=crop&w=800&q=80"} 
                alt={lesson.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={lesson.difficulty === 'Beginner' ? 'secondary' : 'default'} className="shadow-sm backdrop-blur-md bg-white/90 text-foreground">
                  {lesson.difficulty}
                </Badge>
              </div>
              {completedLessons.includes(lesson.id) && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-white text-green-600 px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                    <CheckCircle className="h-5 w-5" /> Completed
                  </div>
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <div className="text-xs font-medium text-muted-foreground mb-1">{lesson.category}</div>
              <CardTitle className="line-clamp-1 text-xl">{lesson.title}</CardTitle>
              <CardDescription className="line-clamp-2">{lesson.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-4 flex justify-between items-center border-t bg-muted/10">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" /> {lesson.duration}
              </div>
              <Button onClick={() => setSelectedLesson(lesson)} size="sm" className={completedLessons.includes(lesson.id) ? "bg-muted-foreground" : ""}>
                {completedLessons.includes(lesson.id) ? "Review" : "Start Lesson"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Lesson Detail Dialog */}
      <Dialog open={!!selectedLesson} onOpenChange={(open) => !open && setSelectedLesson(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{selectedLesson?.category}</Badge>
              <Badge>{selectedLesson?.difficulty}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {selectedLesson?.duration}</span>
            </div>
            <DialogTitle className="text-3xl font-heading mb-4">{selectedLesson?.title}</DialogTitle>
            <DialogDescription className="text-lg">
              {selectedLesson?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6 space-y-6">
            <div className="prose max-w-none text-foreground">
              <p className="leading-relaxed">{selectedLesson?.content}</p>
              <p className="leading-relaxed mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-2">Key Takeaways</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Understanding the core concepts of sustainability</li>
                <li>Practical applications in daily life</li>
                <li>Impact on the global ecosystem</li>
              </ul>
            </div>

            <div className="bg-muted p-6 rounded-xl border-l-4 border-primary">
              <h4 className="font-bold flex items-center gap-2 mb-2">
                <Info className="h-5 w-5 text-primary" />
                Did you know?
              </h4>
              <p className="text-sm">
                Switching to renewable energy could reduce global carbon emissions by up to 70% by 2050. Small changes add up to big impacts!
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedLesson(null)}>Close</Button>
            <Button onClick={() => {
              if(selectedLesson) markLessonComplete(selectedLesson.id);
              setSelectedLesson(null);
            }}>
              Mark as Completed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
