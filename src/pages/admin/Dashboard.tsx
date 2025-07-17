import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Calendar,
  Eye,
  Edit,
  Plus,
  Activity,
  Clock,
  Target,
  BarChart3,
  Download,
  Share2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const AdminDashboard = () => {
  // Mock data - will be replaced with Supabase
  const stats = {
    totalPosts: 6,
    totalWorks: 12,
    totalContacts: 23,
    monthlyViews: 1247,
    draftPosts: 3,
    publishedWorks: 9,
    totalDownloads: 456,
    avgReadTime: "4.2 min"
  };

  const monthlyProgress = {
    posts: 75, // 3 out of 4 planned posts
    works: 60, // 2 out of 3 planned works
    engagement: 85 // Engagement target
  };

  const recentPosts = [
    { id: 1, title: "The Power of Storytelling in Mental Health Advocacy", status: "published", date: "2024-01-15", views: 142 },
    { id: 2, title: "African Feminism Through Literary Lens", status: "published", date: "2024-01-10", views: 89 },
    { id: 3, title: "Whispers of Home", status: "published", date: "2024-01-05", views: 76 },
  ];

  const recentContacts = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", date: "2024-01-20", subject: "Collaboration Inquiry" },
    { id: 2, name: "Michael Chen", email: "michael@example.com", date: "2024-01-19", subject: "Interview Request" },
    { id: 3, name: "Aisha Okonkwo", email: "aisha@example.com", date: "2024-01-18", subject: "Workshop Invitation" },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back! Here's what's happening with your content.
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Link to="/admin/blog/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </Link>
            <Link to="/admin/works/new">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Work
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="literary-shadow border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
              <FileText className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalPosts}</div>
              <div className="flex items-center mt-2">
                <Badge variant="secondary" className="text-xs mr-2">
                  {stats.draftPosts} drafts
                </Badge>
                <p className="text-xs text-muted-foreground">+2 this month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="literary-shadow border-l-4 border-l-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Literary Works</CardTitle>
              <BookOpen className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalWorks}</div>
              <div className="flex items-center mt-2">
                <Badge variant="outline" className="text-xs mr-2">
                  {stats.publishedWorks} published
                </Badge>
                <p className="text-xs text-muted-foreground">+1 this month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="literary-shadow border-l-4 border-l-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Engagement</CardTitle>
              <Activity className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.monthlyViews}</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <p className="text-xs text-green-500">+15% this month</p>
              </div>
            </CardContent>
          </Card>

          <Card className="literary-shadow border-l-4 border-l-muted-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalDownloads}</div>
              <div className="flex items-center mt-2">
                <p className="text-xs text-muted-foreground">Avg. {stats.avgReadTime} read time</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="literary-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4" />
                Monthly Content Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Blog Posts</span>
                    <span>{monthlyProgress.posts}%</span>
                  </div>
                  <Progress value={monthlyProgress.posts} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>New Works</span>
                    <span>{monthlyProgress.works}%</span>
                  </div>
                  <Progress value={monthlyProgress.works} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="literary-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Engagement Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Page Views</span>
                  <span className="text-sm font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Unique Visitors</span>
                  <span className="text-sm font-medium">892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Bounce Rate</span>
                  <span className="text-sm font-medium text-green-500">35%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="literary-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">5 new messages</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">2 posts published</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-muted-foreground">1 work uploaded</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <Card className="literary-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-heading text-lg">Recent Posts</CardTitle>
              <Link to="/admin/blog">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{post.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {post.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.date)}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views}
                        </span>
                      </div>
                    </div>
                    <Link to={`/admin/blog/${post.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Contacts */}
          <Card className="literary-shadow">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-heading text-lg">Recent Contacts</CardTitle>
              <Link to="/admin/contacts">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{contact.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">{contact.subject}</p>
                      <span className="text-xs text-muted-foreground flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(contact.date)}
                      </span>
                    </div>
                    <Link to={`/admin/contacts/${contact.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;