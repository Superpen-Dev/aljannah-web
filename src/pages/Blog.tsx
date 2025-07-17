import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Search, Calendar, Clock, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Mock data - will be replaced with actual data from backend
  const blogPosts = [
    {
      id: 1,
      title: "The Power of Storytelling in Mental Health Advocacy",
      excerpt: "Exploring how narrative therapy and personal stories can transform our understanding of mental wellness and create pathways to healing...",
      category: "Articles",
      publishedAt: "2024-01-15",
      readTime: "5 min read",
      slug: "storytelling-mental-health-advocacy",
      coverImage: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "African Feminism Through Literary Lens",
      excerpt: "A critical examination of how contemporary African literature challenges and redefines feminist discourse in the modern era...",
      category: "Literary Criticism",
      publishedAt: "2024-01-10",
      readTime: "8 min read",
      slug: "african-feminism-literary-lens",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Whispers of Home",
      excerpt: "A poem about diaspora, belonging, and the eternal search for home in foreign lands. An exploration of identity and place...",
      category: "Poetry",
      publishedAt: "2024-01-05",
      readTime: "2 min read",
      slug: "whispers-of-home",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Marriage and Mental Health: A Social Work Perspective",
      excerpt: "Understanding the intersection of marital relationships and psychological wellbeing through evidence-based practice...",
      category: "Articles",
      publishedAt: "2023-12-28",
      readTime: "7 min read",
      slug: "marriage-mental-health-social-work",
      coverImage: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "The Rhythm of Resilience",
      excerpt: "A collection of verses celebrating the strength found in vulnerability and the beauty of human perseverance...",
      category: "Poetry",
      publishedAt: "2023-12-20",
      readTime: "3 min read",
      slug: "rhythm-of-resilience",
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Deconstructing Gender Roles in West African Literature",
      excerpt: "An analytical review of how modern West African authors challenge traditional gender expectations through their narratives...",
      category: "Literary Criticism",
      publishedAt: "2023-12-15",
      readTime: "10 min read",
      slug: "gender-roles-west-african-literature",
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
    }
  ];

  const categories = ["all", "Articles", "Poetry", "Literary Criticism"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || post.category === filterCategory;
    
    return matchesSearch && matchesCategory;
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
                Blog
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Thoughts, insights, and creative expressions on literature, society, mental health, 
                and the human experience. Join me on this journey of exploration through words.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-12 bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="literary-shadow hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <CardTitle className="font-heading text-lg leading-tight group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(post.publishedAt)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or category filter to find what you're looking for.
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

export default Blog;