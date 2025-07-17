import { ExternalLink, Download, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeaturedWorks = () => {
  // Mock data - will be replaced with actual data from backend
  const featuredWorks = [
    {
      id: 1,
      title: "Echoes of the Heart",
      type: "Fiction",
      genre: "Romance/Drama",
      description: "A compelling narrative exploring the complexities of modern relationships and the resilience of the human spirit.",
      format: "PDF",
      downloadUrl: "#",
      topic: "Marriage & Family"
    },
    {
      id: 2,
      title: "Voices from the Margin",
      type: "Academic",
      genre: "Social Work Research",
      description: "An insightful analysis of marginalized communities and their journey toward social empowerment.",
      format: "External Link",
      externalUrl: "#",
      topic: "Social Sciences"
    },
    {
      id: 3,
      title: "Silent Strength",
      type: "Poetry",
      genre: "Contemporary Poetry",
      description: "A collection of verses celebrating the quiet resilience of women in African society.",
      format: "PDF",
      downloadUrl: "#",
      topic: "Gender & Identity"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Featured Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a selection of my most impactful writings across fiction, poetry, and academic research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredWorks.map((work) => (
            <Card key={work.id} className="literary-shadow hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      {work.type}
                    </Badge>
                    <CardTitle className="font-heading text-xl">{work.title}</CardTitle>
                  </div>
                  <div className="text-primary">
                    {work.format === "PDF" ? <FileText className="h-5 w-5" /> : <ExternalLink className="h-5 w-5" />}
                  </div>
                </div>
                <CardDescription className="text-sm font-medium text-primary">
                  {work.genre}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {work.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {work.topic}
                  </Badge>
                  
                  {work.format === "PDF" ? (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="elegant" size="lg">
            <a href="/works">
              <BookOpen className="mr-2 h-5 w-5" />
              View All Works
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;