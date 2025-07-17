import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Calendar,
  Mail,
  MessageSquare,
  Reply,
  Archive,
  MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const ContactsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState("");

  // Mock data - will be replaced with Supabase
  const contacts = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      subject: "Collaboration Inquiry",
      message: "Hello AlJannah, I'm a fellow writer and social worker, and I'm interested in collaborating on a project about mental health awareness in African communities. Your work on narrative therapy resonates deeply with my own research. Would you be open to discussing this further?",
      status: "unread",
      createdAt: "2024-01-20T10:30:00Z",
      replied: false
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@universitypress.edu",
      subject: "Interview Request",
      message: "Dear Ms. Sanni, I'm a journalist with University Press writing an article about the intersection of social work and creative writing. Your unique perspective as both a literary critic and social worker would be invaluable to our readers. Would you be available for a brief interview?",
      status: "read",
      createdAt: "2024-01-19T14:45:00Z",
      replied: true
    },
    {
      id: 3,
      name: "Aisha Okonkwo",
      email: "aisha.okonkwo@literaryconf.org",
      subject: "Workshop Invitation",
      message: "Greetings! We're organizing the African Literature and Mental Health Conference 2024, and we would love to invite you as a keynote speaker. Your work on storytelling in mental health advocacy would be perfect for our audience of writers, therapists, and educators.",
      status: "read",
      createdAt: "2024-01-18T09:15:00Z",
      replied: false
    },
    {
      id: 4,
      name: "Dr. James Morrison",
      email: "j.morrison@mentalhealth.org",
      subject: "Research Collaboration",
      message: "Hello, I'm a researcher at the Institute for Mental Health Studies. I came across your work on narrative therapy and would like to explore potential collaboration opportunities for our upcoming research project on culturally-sensitive therapeutic approaches.",
      status: "archived",
      createdAt: "2024-01-15T16:20:00Z",
      replied: true
    },
    {
      id: 5,
      name: "Emma Williams",
      email: "emma.w@publishinghouse.com",
      subject: "Publishing Inquiry",
      message: "Dear AlJannah, I'm an editor at Literary Voices Publishing. We're currently seeking diverse voices for our upcoming anthology on contemporary African poetry. Your work caught our attention, and we'd love to discuss including some of your pieces.",
      status: "unread",
      createdAt: "2024-01-12T11:30:00Z",
      replied: false
    }
  ];

  const statuses = ["all", "unread", "read", "archived"];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || contact.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'destructive';
      case 'read': return 'default';
      case 'archived': return 'secondary';
      default: return 'secondary';
    }
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    // TODO: Update status in Supabase
    console.log("Updating status for contact:", id, "to:", newStatus);
  };

  const handleDelete = (id: number) => {
    // TODO: Delete contact in Supabase
    console.log("Deleting contact:", id);
  };

  const handleReply = (contact: any) => {
    // TODO: Send reply email
    const mailtoLink = `mailto:${contact.email}?subject=Re: ${contact.subject}&body=${encodeURIComponent(replyMessage)}`;
    window.open(mailtoLink, '_blank');
    setReplyMessage("");
    setSelectedContact(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Contact Messages</h1>
            <p className="text-muted-foreground mt-2">
              Manage and respond to contact form submissions
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Badge variant="destructive">
              {contacts.filter(c => c.status === 'unread').length} Unread
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <Card className="literary-shadow">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contacts List */}
        <div className="grid gap-4">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className={`literary-shadow transition-all hover:shadow-lg ${contact.status === 'unread' ? 'border-primary/50' : ''}`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-heading text-lg font-semibold text-foreground">
                            {contact.subject}
                          </h3>
                          <Badge variant={getStatusColor(contact.status)} className="text-xs">
                            {contact.status}
                          </Badge>
                          {contact.replied && (
                            <Badge variant="outline" className="text-xs">
                              Replied
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {contact.name} ({contact.email})
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(contact.createdAt)}
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                          {contact.message}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2 md:mt-0 md:ml-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="font-heading">
                                {contact.subject}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Mail className="h-3 w-3 mr-1" />
                                  {contact.name} ({contact.email})
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {formatDate(contact.createdAt)}
                                </div>
                              </div>
                              <div className="bg-muted/30 p-4 rounded-lg">
                                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                                  {contact.message}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  onClick={() => {
                                    setSelectedContact(contact);
                                    setReplyMessage(`Dear ${contact.name},\n\nThank you for reaching out. `);
                                  }}
                                >
                                  <Reply className="h-4 w-4 mr-2" />
                                  Reply
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => handleStatusChange(contact.id, contact.status === 'unread' ? 'read' : 'unread')}
                                >
                                  Mark as {contact.status === 'unread' ? 'Read' : 'Unread'}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusChange(contact.id, 'read')}>
                              <Eye className="h-4 w-4 mr-2" />
                              Mark as Read
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(contact.id, 'archived')}>
                              <Archive className="h-4 w-4 mr-2" />
                              Archive
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
                                  <AlertDialogTitle>Delete Message</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this message from {contact.name}? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(contact.id)}
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
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reply Dialog */}
        {selectedContact && (
          <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-heading">
                  Reply to {selectedContact.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Subject: Re: {selectedContact.subject}
                </div>
                <Textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Write your reply..."
                  rows={8}
                  className="resize-none"
                />
                <div className="flex gap-2">
                  <Button onClick={() => handleReply(selectedContact)}>
                    <Reply className="h-4 w-4 mr-2" />
                    Send Reply
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedContact(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {filteredContacts.length === 0 && (
          <Card className="literary-shadow">
            <CardContent className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold mb-2">No messages found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filters."
                  : "No contact messages yet. When visitors use your contact form, they'll appear here."
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default ContactsManager;