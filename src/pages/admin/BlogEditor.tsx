import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Image, 
  Calendar,
  Clock,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: "",
    status: "draft",
    publishedAt: ""
  });

  const [saving, setSaving] = useState(false);

  const categories = ["Articles", "Poetry", "Literary Criticism"];

  useEffect(() => {
    if (!isNew) {
      // TODO: Fetch post data from Supabase
      // For now, load mock data
      const mockPost = {
        title: "The Power of Storytelling in Mental Health Advocacy",
        slug: "storytelling-mental-health-advocacy",
        category: "Articles",
        excerpt: "Exploring how narrative therapy and personal stories can transform our understanding of mental wellness and create pathways to healing...",
        content: `Mental health advocacy has found one of its most powerful tools in the art of storytelling. Through personal narratives, we break down barriers of stigma and create pathways to understanding and healing.

## The Human Connection

Stories have an unparalleled ability to connect us on a deeply human level. When someone shares their mental health journey, they create a bridge of empathy that statistics and clinical descriptions simply cannot match.

## Breaking Down Stigma

One of the most significant barriers to mental health support is the persistent stigma surrounding mental illness. Personal stories have the power to humanize these experiences.`,
        coverImage: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800&h=400&fit=crop",
        tags: "mental health, storytelling, advocacy, therapy",
        status: "published",
        publishedAt: "2024-01-15"
      };
      setFormData(mockPost);
    }
  }, [id, isNew]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate slug from title
    if (field === "title") {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSave = async (status: string = formData.status) => {
    setSaving(true);
    
    try {
      // TODO: Save to Supabase
      const postData = {
        ...formData,
        status,
        publishedAt: status === "published" ? (formData.publishedAt || new Date().toISOString()) : formData.publishedAt
      };
      
      console.log("Saving post:", postData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate("/admin/blog");
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    // TODO: Implement preview functionality
    window.open(`/blog/${formData.slug}`, '_blank');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/admin/blog")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Posts
            </Button>
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground">
                {isNew ? "New Post" : "Edit Post"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {isNew ? "Create a new blog post" : "Edit your blog post"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSave("draft")}
              disabled={saving}
            >
              Save Draft
            </Button>
            <Button
              onClick={() => handleSave("published")}
              disabled={saving}
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="literary-shadow">
              <CardHeader>
                <CardTitle className="font-heading">Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter post title..."
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="url-friendly-title"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    URL: /blog/{formData.slug || "post-url"}
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                    placeholder="Brief description of the post..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card className="literary-shadow">
              <CardHeader>
                <CardTitle className="font-heading">Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Write your post content here... (Supports Markdown)"
                  rows={20}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Supports Markdown formatting. Use ## for headings, **bold**, *italic*, etc.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Publishing */}
            <Card className="literary-shadow">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {formData.status === "scheduled" && (
                  <div>
                    <Label htmlFor="publishedAt">Publish Date</Label>
                    <Input
                      id="publishedAt"
                      type="datetime-local"
                      value={formData.publishedAt}
                      onChange={(e) => handleInputChange("publishedAt", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Categories & Tags */}
            <Card className="literary-shadow">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Categorization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    placeholder="tag1, tag2, tag3"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate tags with commas
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card className="literary-shadow">
              <CardHeader>
                <CardTitle className="font-heading text-lg">Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="coverImage">Image URL</Label>
                  <Input
                    id="coverImage"
                    value={formData.coverImage}
                    onChange={(e) => handleInputChange("coverImage", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="mt-1"
                  />
                </div>
                
                {formData.coverImage && (
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={formData.coverImage}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                <Button variant="outline" size="sm" className="w-full">
                  <Image className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogEditor;