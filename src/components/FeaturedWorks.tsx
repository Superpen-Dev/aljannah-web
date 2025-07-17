import React from "react";
import { ExternalLink, Download, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { usePublishedWorks } from "@/hooks/useLiteraryWorks";

const FeaturedWorks = () => {
  const { works, loading, refetch } = usePublishedWorks();
  
  // Refetch when component mounts to ensure fresh data
  React.useEffect(() => {
    refetch();
  }, [refetch]);
  
  // Get the latest 3 published works
  const featuredWorks = works.slice(0, 3);

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

        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg">Loading featured works...</div>
          </div>
        ) : featuredWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorks.map((work) => (
              <Card key={work.id} className="literary-shadow hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        {work.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                      <CardTitle className="font-heading text-xl">{work.title}</CardTitle>
                    </div>
                    <div className="text-primary">
                      {work.content && work.content.startsWith('http') ? 
                        <ExternalLink className="h-5 w-5" /> : 
                        <FileText className="h-5 w-5" />
                      }
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {work.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {work.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    {work.tags && work.tags.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {work.tags[0]}
                      </Badge>
                    )}
                    
                    {work.content && work.content.startsWith('http') ? (
                      <Button variant="outline" size="sm" asChild>
                        <a href={work.content} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/works/${work.id}`}>
                          <FileText className="h-4 w-4 mr-2" />
                          Read
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold mb-2">No works published yet</h3>
            <p className="text-muted-foreground">
              Check back soon for featured literary works.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild variant="elegant" size="lg">
            <Link to="/works">
              <BookOpen className="mr-2 h-5 w-5" />
              View All Works
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;