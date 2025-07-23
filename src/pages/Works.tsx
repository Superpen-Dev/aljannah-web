
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, Filter, Download, ExternalLink, BookOpen, FileText, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePublishedWorks } from "@/hooks/useLiteraryWorks";

const Works = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const { works, loading } = usePublishedWorks();

  const types = ["all", "novel", "short_story", "poem", "essay", "article"];

  const filteredWorks = works.filter(work => {
    const matchesSearch = work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (work.description && work.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || work.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Content protection effects
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for copying, printing, and screenshots
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl+C, Ctrl+A, Ctrl+S, Ctrl+P, Ctrl+Shift+I, F12, Print Screen
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'a' || e.key === 's' || e.key === 'p')) ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        e.key === 'F12' ||
        e.key === 'PrintScreen'
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Disable text selection
    const disableSelection = () => {
      const bodyStyle = document.body.style as any;
      bodyStyle.userSelect = 'none';
      bodyStyle.webkitUserSelect = 'none';
      bodyStyle.MozUserSelect = 'none';
      bodyStyle.msUserSelect = 'none';
    };

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    disableSelection();

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      const bodyStyle = document.body.style as any;
      bodyStyle.userSelect = '';
      bodyStyle.webkitUserSelect = '';
      bodyStyle.MozUserSelect = '';
      bodyStyle.msUserSelect = '';
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-8">
              <div className="space-y-6">
                <Badge variant="secondary" className="mb-4">
                  Digital Literary Portfolio
                </Badge>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                  My Literary Works
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  A comprehensive collection of my writings spanning fiction, poetry, academic research, 
                  and literary criticism. Each piece reflects my journey as a writer exploring the 
                  depths of human experience and social understanding.
                </p>
                
                {/* Author Credit */}
                <div className="flex items-center justify-center gap-2 text-lg font-medium text-primary">
                  <User className="h-5 w-5" />
                  <span>AlJannah Adedamola Sanni</span>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center space-y-2">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{works.length}</div>
                  <div className="text-sm text-muted-foreground">Published Works</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{new Set(works.map(w => w.type)).size}</div>
                  <div className="text-sm text-muted-foreground">Types</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{works.filter(w => w.tags && w.tags.length > 0).length}</div>
                  <div className="text-sm text-muted-foreground">Tagged Works</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{works.filter(w => w.content && w.content.startsWith('http')).length}</div>
                  <div className="text-sm text-muted-foreground">External Links</div>
                </div>
              </div>
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
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
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
            {loading ? (
              <div className="text-center py-12">
                <div className="text-lg">Loading works...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredWorks.map((work) => (
                  <Card key={work.id} className="literary-shadow hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <Badge variant="secondary" className="text-xs">
                            {work.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                          <CardTitle className="font-heading text-xl">{work.title}</CardTitle>
                          
                          {/* Author Name */}
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>AlJannah Adedamola Sanni</span>
                          </div>
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
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Published: {formatDate(work.published_at)}</span>
                        </div>
                        
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

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
