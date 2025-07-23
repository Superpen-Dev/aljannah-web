
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Download, ExternalLink, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LiteraryWork {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  type: string;
  cover_image: string | null;
  tags: string[] | null;
  published_at: string | null;
  created_at: string;
}

const WorkDetail = () => {
  const { slug } = useParams();
  const [work, setWork] = useState<LiteraryWork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWork = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('literary_works')
          .select('*')
          .eq('id', slug)
          .eq('status', 'published')
          .single();

        if (error) throw error;
        setWork(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, [slug]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading work...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !work) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Work not found</p>
            <Link to="/works">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Works
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/works">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Works
              </Button>
            </Link>
          </div>

          {/* Work Header */}
          <Card className="literary-shadow mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-6">
                {work.cover_image && (
                  <div className="md:w-1/3">
                    <img
                      src={work.cover_image}
                      alt={work.title}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <CardTitle className="font-heading text-3xl mb-4">
                    {work.title}
                  </CardTitle>
                  
                  {/* Author Name */}
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">AlJannah Adedamola Sanni</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {work.published_at 
                        ? new Date(work.published_at).toLocaleDateString()
                        : new Date(work.created_at).toLocaleDateString()
                      }
                    </div>
                    <Badge variant="secondary">{work.type}</Badge>
                  </div>
                  {work.description && (
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {work.description}
                    </p>
                  )}
                  {work.tags && work.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {work.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Work Content */}
          {work.content && (
            <Card className="literary-shadow">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Content</CardTitle>
              </CardHeader>
              <CardContent>
                {work.content.startsWith('http') ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      This work is available as an external link.
                    </p>
                    <Button asChild>
                      <a href={work.content} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open External Link
                      </a>
                    </Button>
                  </div>
                ) : work.content.includes('.pdf') ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      This work is available as a PDF document.
                    </p>
                    <Button asChild>
                      <a href={work.content} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <div 
                      className="whitespace-pre-wrap leading-relaxed text-foreground select-none"
                      style={{ 
                        lineHeight: '1.8',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none'
                      } as React.CSSProperties}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    >
                      {work.content}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons - Only show if content contains links/PDFs */}
          {work.content && (work.content.includes('http') || work.content.includes('.pdf')) && (
            <div className="mt-8 flex justify-center gap-4">
              {work.content.includes('http') && !work.content.includes('.pdf') && (
                <Button asChild>
                  <a 
                    href={work.content.match(/https?:\/\/[^\s]+/)?.[0]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View External Link
                  </a>
                </Button>
              )}
              {work.content.includes('.pdf') && (
                <Button variant="outline" asChild>
                  <a 
                    href={work.content.match(/[^\s]+\.pdf/)?.[0]} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;
