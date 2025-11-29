import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, Link as LinkIcon, Download, ExternalLink, Info } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export default function ResourcesPage() {
  const { resources } = useStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'Video': return <Video className="h-5 w-5 text-red-500" />;
      case 'PDF': return <FileText className="h-5 w-5 text-orange-500" />;
      case 'Article': return <FileText className="h-5 w-5 text-blue-500" />;
      default: return <LinkIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-heading font-bold text-foreground">Sustainability Resources</h1>
        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
          <Info className="h-4 w-4 text-blue-800" />
          <AlertTitle>Guide</AlertTitle>
          <AlertDescription>
            Browse our curated collection of articles, videos, and documents to deepen your understanding.
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="p-2 bg-muted rounded-lg">
                {getIcon(resource.type)}
              </div>
              <Badge variant="outline">{resource.tag}</Badge>
            </CardHeader>
            <CardContent className="pt-4">
              <CardTitle className="mb-2 line-clamp-1">{resource.title}</CardTitle>
              <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-2 group" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  {resource.type === 'PDF' ? 'Download PDF' : 'Open Resource'}
                  {resource.type === 'PDF' ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
