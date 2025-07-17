import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, Filter, Download, ExternalLink, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Works = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("all");
  const [filterTopic, setFilterTopic] = useState("all");

  // Mock data - will be replaced with actual data from backend
  const works = [
    {
      id: 1,
      title: "Echoes of the Heart",
      type: "Fiction",
      genre: "Romance/Drama",
      topic: "Marriage & Family",
      description: "A compelling narrative exploring the complexities of modern relationships and the resilience of the human spirit in the face of adversity.",
      format: "PDF",
      downloadUrl: "#",
      publishedDate: "2024-01-15",
      pages: 245
    },
    {
      id: 2,
      title: "Voices from the Margin",
      type: "Academic",
      genre: "Social Work Research",
      topic: "Social Sciences",
      description: "An insightful analysis of marginalized communities and their journey toward social empowerment through community-based interventions.",
      format: "External Link",
      externalUrl: "#",
      publishedDate: "2023-11-20",
      pages: null
    },
    {
      id: 3,
      title: "Silent Strength",
      type: "Poetry",
      genre: "Contemporary Poetry",
      topic: "Gender & Identity",
      description: "A collection of verses celebrating the quiet resilience of women in African society and their untold stories of strength.",
      format: "PDF",
      downloadUrl: "#",
      publishedDate: "2024-02-10",
      pages: 78
    },
    {
      id: 4,
      title: "Mental Health in Modern Africa",
      type: "Article",
      genre: "Public Health",
      topic: "Mental Health",
      description: "A comprehensive examination of mental health challenges and opportunities in contemporary African communities.",
      format: "External Link",
      externalUrl: "#",
      publishedDate: "2023-12-05",
      pages: null
    },
    {
      id: 5,
      title: "The Feminist Lens",
      type: "Literary Criticism",
      genre: "Critical Essays",
      topic: "Feminism",
      description: "Critical essays examining feminist themes in contemporary African literature and their sociocultural implications.",
      format: "PDF",
      downloadUrl: "#",
      publishedDate: "2024-01-30",
      pages: 156
    },
    {
      id: 6,
      title: "Threads of Culture",
      type: "Nonfiction",
      genre: "Cultural Studies",
      topic: "Culture",
      description: "An exploration of how cultural traditions evolve and adapt in modern society while maintaining their essence.",
      format: "PDF",
      downloadUrl: "#",
      publishedDate: "2023-10-15",
      pages: 198
    }
  ];

  const genres = ["all", "Romance/Drama", "Social Work Research", "Contemporary Poetry", "Public Health", "Critical Essays", "Cultural Studies"];
  const topics = ["all", "Marriage & Family", "Social Sciences", "Gender & Identity", "Mental Health", "Feminism", "Culture"];

  const filteredWorks = works.filter(work => {
    const matchesSearch = work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === "all" || work.genre === filterGenre;
    const matchesTopic = filterTopic === "all" || work.topic === filterTopic;
    
    return matchesSearch && matchesGenre && matchesTopic;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                My Literary Works
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A comprehensive collection of my writings spanning fiction, poetry, academic research, 
                and literary criticism. Each piece reflects my journey as a writer exploring the 
                depths of human experience and social understanding.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-12 bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search works..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterGenre} onValueChange={setFilterGenre}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre === "all" ? "All Genres" : genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterTopic} onValueChange={setFilterTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic === "all" ? "All Topics" : topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterGenre("all");
                  setFilterTopic("all");
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </section>

        {/* Works Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWorks.map((work) => (
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
                        {work.format === "PDF" ? 
                          <FileText className="h-5 w-5" /> : 
                          <ExternalLink className="h-5 w-5" />
                        }
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
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Published: {formatDate(work.publishedDate)}</span>
                        {work.pages && <span>{work.pages} pages</span>}
                      </div>
                      
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredWorks.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">No works found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Works;