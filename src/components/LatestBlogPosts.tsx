import React from "react";
import { Calendar, ArrowRight, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { usePublishedPosts } from "@/hooks/useBlogPosts";

const LatestBlogPosts = () => {
  const { posts, loading } = usePublishedPosts();
  
  // Get the latest 3 published posts
  const latestPosts = posts.slice(0, 3);

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not published';
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

        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg">Loading latest posts...</div>
          </div>
        ) : latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Card key={post.id} className="literary-shadow hover:shadow-lg transition-all duration-300 overflow-hidden group">
                {post.featured_image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    {post.tags && post.tags.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {post.tags[0]}
                      </Badge>
                    )}
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {calculateReadTime(post.content)}
                    </div>
                  </div>
                  
                  <CardTitle className="font-heading text-lg leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(post.published_at)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  )}
                  
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
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold mb-2">No blog posts yet</h3>
            <p className="text-muted-foreground">
              Check back soon for the latest insights and stories.
            </p>
          </div>
        )}

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