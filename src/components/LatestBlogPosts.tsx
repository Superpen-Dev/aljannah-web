import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const LatestBlogPosts = () => {
  // Mock data - will be replaced with actual data from backend
  const blogPosts = [
    {
      id: 1,
      title: "The Power of Storytelling in Mental Health Advocacy",
      excerpt: "Exploring how narrative therapy and personal stories can transform our understanding of mental wellness...",
      category: "Articles",
      publishedAt: "2024-01-15",
      readTime: "5 min read",
      slug: "storytelling-mental-health-advocacy",
      coverImage: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "African Feminism Through Literary Lens",
      excerpt: "A critical examination of how contemporary African literature challenges and redefines feminist discourse...",
      category: "Literary Criticism",
      publishedAt: "2024-01-10",
      readTime: "8 min read",
      slug: "african-feminism-literary-lens",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Whispers of Home",
      excerpt: "A poem about diaspora, belonging, and the eternal search for home in foreign lands...",
      category: "Poetry",
      publishedAt: "2024-01-05",
      readTime: "2 min read",
      slug: "whispers-of-home",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Latest from the Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, insights, and creative expressions on literature, society, and the human experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
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
                  {post.title}
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

        <div className="text-center mt-12">
          <Button asChild variant="literary" size="lg">
            <Link to="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPosts;