import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useLiteraryWorks } from "@/hooks/useLiteraryWorks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, FileText, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WorkEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { works, createWork, updateWork, loading } = useLiteraryWorks();
  
  const [formData, setFormData] = useState({
    title: "",
    type: "article" as "novel" | "short_story" | "poem" | "essay" | "article",
    description: "",
    content: "",
    cover_image: "",
    status: "draft" as "draft" | "published" | "archived",
    tags: "",
    published_at: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing && works.length > 0) {
      const work = works.find(w => w.id === id);
      if (work) {
        setFormData({
          title: work.title,
          type: work.type,
          description: work.description || "",
          content: work.content || "",
          cover_image: work.cover_image || "",
          status: work.status,
          tags: work.tags?.join(", ") || "",
          published_at: work.published_at ? work.published_at.split('T')[0] : ""
        });
      }
    }
  }, [id, works, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const workData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        published_at: formData.status === 'published' && formData.published_at 
          ? new Date(formData.published_at).toISOString() 
          : null
      };

      if (isEditing) {
        await updateWork(id!, workData);
        toast({
          title: "Success",
          description: "Work updated successfully"
        });
      } else {
        await createWork(workData);
        toast({
          title: "Success", 
          description: "Work created successfully"
        });
      }
      
      navigate("/admin/works");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-lg">Loading...</div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/admin/works")}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Works
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                {isEditing ? "Edit Work" : "Add New Work"}
              </h1>
              <p className="text-muted-foreground">
                {isEditing ? "Update your literary work" : "Create a new literary work"}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Work Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter work title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Brief description of the work"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      placeholder="Full content of the work or external link"
                      rows={12}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cover_image">Cover Image URL</Label>
                    <Input
                      id="cover_image"
                      value={formData.cover_image}
                      onChange={(e) => handleInputChange("cover_image", e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => handleInputChange("tags", e.target.value)}
                      placeholder="Enter tags separated by commas"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publishing Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={formData.type} onValueChange={(value: any) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="novel">Novel</SelectItem>
                        <SelectItem value="short_story">Short Story</SelectItem>
                        <SelectItem value="poem">Poem</SelectItem>
                        <SelectItem value="essay">Essay</SelectItem>
                        <SelectItem value="article">Article</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value: any) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.status === "published" && (
                    <div>
                      <Label htmlFor="published_at">Publication Date</Label>
                      <Input
                        id="published_at"
                        type="date"
                        value={formData.published_at}
                        onChange={(e) => handleInputChange("published_at", e.target.value)}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Saving..." : (isEditing ? "Update Work" : "Create Work")}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/admin/works")}
                  >
                    Cancel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default WorkEditor;