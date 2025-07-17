
import { useState, useEffect } from "react";
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
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useContacts } from "@/hooks/useContacts";
import { useLiteraryWorks } from "@/hooks/useLiteraryWorks";

const AdminDashboard = () => {
  const { posts, loading: postsLoading } = useBlogPosts();
  const { contacts, loading: contactsLoading } = useContacts();
  const { works, loading: worksLoading } = useLiteraryWorks();

  // Calculate stats from real data
  const stats = {
    totalPosts: posts.length,
    totalWorks: works.length,
    totalContacts: contacts.length,
    monthlyViews: 1247, // This would come from analytics
    draftPosts: posts.filter(post => post.status === 'draft').length,
    publishedWorks: works.filter(work => work.status === 'published').length,
    totalDownloads: 456, // This would come from download tracking
    avgReadTime: "4.2 min" // This would be calculated from content
  };

  const monthlyProgress = {
    posts: Math.min((posts.length / 4) * 100, 100), // Assuming target of 4 posts per month
    works: Math.min((works.length / 3) * 100, 100), // Assuming target of 3 works per month
    engagement: 85 // This would come from analytics
  };

  // Get recent posts (last 3 published)
  const recentPosts = posts
    .filter(post => post.status === 'published')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);

  // Get recent contacts (last 3)
  const recentContacts = contacts
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (postsLoading || contactsLoading || worksLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

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
                <p className="text-xs text-muted-foreground">Total posts</p>
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
                <p className="text-xs text-muted-foreground">Total works</p>
              </div>
            </CardContent>
          </Card>

          <Card className="literary-shadow border-l-4 border-l-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
              <MessageSquare className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalContacts}</div>
              <div className="flex items-center mt-2">
                <Badge variant="destructive" className="text-xs mr-2">
                  {contacts.filter(c => c.status === 'unread').length} unread
                </Badge>
                <p className="text-xs text-muted-foreground">Total messages</p>
              </div>
            </CardContent>
          </Card>

          <Card className="literary-shadow border-l-4 border-l-muted-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalPosts + stats.totalWorks}</div>
              <div className="flex items-center mt-2">
                <p className="text-xs text-muted-foreground">Posts & Works Combined</p>
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
                Content Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Blog Posts</span>
                    <span>{Math.round(monthlyProgress.posts)}%</span>
                  </div>
                  <Progress value={monthlyProgress.posts} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Literary Works</span>
                    <span>{Math.round(monthlyProgress.works)}%</span>
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
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Published Posts</span>
                  <span className="text-sm font-medium">{posts.filter(p => p.status === 'published').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Draft Posts</span>
                  <span className="text-sm font-medium">{stats.draftPosts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Unread Messages</span>
                  <span className="text-sm font-medium text-red-500">{contacts.filter(c => c.status === 'unread').length}</span>
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
                  <span className="text-muted-foreground">{contacts.filter(c => c.status === 'unread').length} new messages</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">{posts.filter(p => p.status === 'published').length} posts published</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-muted-foreground">{stats.publishedWorks} works published</span>
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
                {recentPosts.length > 0 ? recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{post.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {post.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                    </div>
                    <Link to={`/admin/blog/${post.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No posts yet</p>
                    <Link to="/admin/blog/new">
                      <Button variant="outline" size="sm" className="mt-2">
                        Create First Post
                      </Button>
                    </Link>
                  </div>
                )}
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
                {recentContacts.length > 0 ? recentContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{contact.name}</h4>
                      <p className="text-xs text-muted-foreground truncate">{contact.subject || 'No subject'}</p>
                      <span className="text-xs text-muted-foreground flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(contact.created_at)}
                      </span>
                    </div>
                    <Link to={`/admin/contacts`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                )) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No messages yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
