import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Works from "./pages/Works";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import BlogManager from "./pages/admin/BlogManager";
import BlogEditor from "./pages/admin/BlogEditor";
import WorksManager from "./pages/admin/WorksManager";
import ContactsManager from "./pages/admin/ContactsManager";
import AdminSettings from "./pages/admin/Settings";
import WorkEditor from "./pages/admin/WorkEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/works" element={<Works />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute><BlogManager /></ProtectedRoute>} />
            <Route path="/admin/blog/:id/edit" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
            <Route path="/admin/blog/new" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
            <Route path="/admin/works" element={<ProtectedRoute><WorksManager /></ProtectedRoute>} />
            <Route path="/admin/works/:id/edit" element={<ProtectedRoute><WorkEditor /></ProtectedRoute>} />
            <Route path="/admin/works/new" element={<ProtectedRoute><WorkEditor /></ProtectedRoute>} />
            <Route path="/admin/contacts" element={<ProtectedRoute><ContactsManager /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
