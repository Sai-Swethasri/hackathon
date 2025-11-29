import { useStore, Project } from "@/lib/store";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Users, Calendar, Signal, CheckCircle2, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProjectsPage() {
  const { projects, joinedProjects, joinProject } = useStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Eco Projects</h1>
          <p className="text-muted-foreground">Apply what you learn through real-world action.</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Join projects to make a real impact and track your results!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col hover:border-primary/50 transition-colors duration-300">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                  {project.difficulty}
                </Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" /> {project.participants} joined
                </div>
              </div>
              <CardTitle className="text-2xl">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-4 w-4" /> {project.duration}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Signal className="h-4 w-4" /> Impact: {project.impact}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t bg-muted/5">
              <Button 
                className="w-full" 
                onClick={() => setSelectedProject(project)}
                variant={joinedProjects.includes(project.id) ? "secondary" : "default"}
              >
                {joinedProjects.includes(project.id) ? "View Details" : "View Project & Join"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Project Details Sheet */}
      <Sheet open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-3xl font-heading">{selectedProject?.title}</SheetTitle>
            <SheetDescription className="text-lg">
              {selectedProject?.description}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="bg-primary/10 p-1 rounded text-primary text-xs">STEP 1</span> 
                Preparation
              </h3>
              <div className="bg-muted/30 p-4 rounded-xl border">
                <h4 className="font-medium mb-2">Materials Needed:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {selectedProject?.materials.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <span className="bg-primary/10 p-1 rounded text-primary text-xs">STEP 2</span> 
                Instructions
              </h3>
              <div className="space-y-4">
                {selectedProject?.instructions.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-center">
              <h4 className="font-bold text-green-800 mb-1">Expected Impact</h4>
              <p className="text-green-700">{selectedProject?.impact}</p>
            </div>
          </div>

          <SheetFooter className="mt-8">
            {selectedProject && !joinedProjects.includes(selectedProject.id) ? (
              <Button className="w-full h-12 text-lg" onClick={() => {
                joinProject(selectedProject.id);
                setSelectedProject(null);
              }}>
                Join this Project
              </Button>
            ) : (
              <Button className="w-full h-12 text-lg" variant="secondary" disabled>
                <CheckCircle2 className="mr-2 h-5 w-5" /> Joined
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
