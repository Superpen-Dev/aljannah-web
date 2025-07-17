import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Download, ExternalLink } from "lucide-react";
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
                    />
                  </div>
                )}
                <div className="flex-1">
                  <CardTitle className="font-heading text-3xl mb-4">
                    {work.title}
                  </CardTitle>
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
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="whitespace-pre-wrap leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: work.content.replace(/\n/g, '<br>') }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            {work.content?.includes('http') && (
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
            {work.content?.includes('.pdf') && (
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
        </div>
      </div>
    </div>
  );
};

export default WorkDetail;