import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  ExternalLink,
  FileText,
  MoreHorizontal,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const WorksManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterGenre, setFilterGenre] = useState("all");

  // Mock data - will be replaced with Supabase
  const works = [
    {
      id: 1,
      title: "Echoes of Resilience: A Collection",
      type: "Poetry",
      genre: "Contemporary Poetry",
      format: "PDF",
      description: "A compilation of poems exploring themes of strength, identity, and healing through personal narratives.",
      topic: "Mental Health, Identity",
      downloadCount: 45,
      createdAt: "2024-01-10",
      fileUrl: "/sample-poetry.pdf",
      featured: true
    },
    {
      id: 2,
      title: "Gender Dynamics in African Literature",
      type: "Academic",
      genre: "Literary Criticism",
      format: "PDF",
      description: "A comprehensive analysis of gender representation in contemporary West African literature.",
      topic: "Gender Studies, African Literature",
      downloadCount: 32,
      createdAt: "2024-01-05",
      fileUrl: "/academic-paper.pdf",
      featured: false
    },
    {
      id: 3,
      title: "The Silent Voices",
      type: "Fiction",
      genre: "Short Story",
      format: "PDF",
      description: "A short story exploring mental health themes within African family dynamics.",
      topic: "Mental Health, Family",
      downloadCount: 28,
      createdAt: "2023-12-20",
      fileUrl: "/short-story.pdf",
      featured: true
    },
    {
      id: 4,
      title: "Published Article: Marriage and Mental Health",
      type: "Articles",
      genre: "Academic Article",
      format: "External Link",
      description: "Published research on the intersection of marital relationships and psychological wellbeing.",
      topic: "Marriage, Mental Health",
      downloadCount: 0,
      createdAt: "2023-12-15",
      fileUrl: "https://example-journal.com/article-123",
      featured: false
    },
    {
      id: 5,
      title: "Narrative Therapy Techniques",
      type: "Academic",
      genre: "Research Paper",
      format: "PDF",
      description: "Exploring the application of narrative therapy in social work practice.",
      topic: "Therapy, Social Work",
      downloadCount: 19,
      createdAt: "2023-11-30",
      fileUrl: "/research-paper.pdf",
      featured: false
    }
  ];

  const types = ["all", "Fiction", "Poetry", "Academic", "Articles"];
  const genres = ["all", "Contemporary Poetry", "Literary Criticism", "Short Story", "Academic Article", "Research Paper"];

  const filteredWorks = works.filter(work => {
    const matchesSearch = work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         work.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || work.type === filterType;
    const matchesGenre = filterGenre === "all" || work.genre === filterGenre;
    
    return matchesSearch && matchesType && matchesGenre;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Fiction': return 'default';
      case 'Poetry': return 'secondary';
      case 'Academic': return 'outline';
      case 'Articles': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleDelete = (id: number) => {
    // TODO: Implement delete with Supabase
    console.log("Deleting work:", id);
  };

  const handleToggleFeatured = (id: number) => {
    // TODO: Implement featured toggle with Supabase
    console.log("Toggling featured status for work:", id);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Works</h1>
            <p className="text-muted-foreground mt-2">
              Manage your literary works and publications
            </p>
          </div>
          <Link to="/admin/works/new">
            <Button className="mt-4 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Work
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="literary-shadow">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search works..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="md:w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type === "all" ? "All Types" : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterGenre} onValueChange={setFilterGenre}>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre === "all" ? "All Genres" : genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Works List */}
        <div className="grid gap-6">
          {filteredWorks.map((work) => (
            <Card key={work.id} className="literary-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    {work.format === "PDF" ? (
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    ) : (
                      <ExternalLink className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-heading text-lg font-semibold text-foreground leading-tight">
                            {work.title}
                          </h3>
                          {work.featured && (
                            <Badge variant="default" className="text-xs">Featured</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-2">
                          {work.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Topic: {work.topic}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2 md:mt-0 md:ml-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => window.open(work.fileUrl, '_blank')}>
                              {work.format === "PDF" ? (
                                <>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </>
                              ) : (
                                <>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View External
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/works/${work.id}/edit`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleFeatured(work.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              {work.featured ? "Remove from Featured" : "Add to Featured"}
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Work</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{work.title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(work.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <Badge variant={getTypeColor(work.type)}>
                        {work.type}
                      </Badge>
                      <Badge variant="outline">
                        {work.genre}
                      </Badge>
                      <Badge variant="secondary">
                        {work.format}
                      </Badge>
                      <div className="flex items-center text-muted-foreground">
                        <Download className="h-3 w-3 mr-1" />
                        {work.downloadCount} downloads
                      </div>
                      <div className="text-muted-foreground">
                        Added {formatDate(work.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <Card className="literary-shadow">
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2">No works found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || filterType !== "all" || filterGenre !== "all"
                  ? "Try adjusting your search or filters."
                  : "Get started by adding your first work."
                }
              </p>
              <Link to="/admin/works/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Work
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default WorksManager;