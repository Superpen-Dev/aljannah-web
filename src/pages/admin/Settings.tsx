import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { 
  User, 
  Mail, 
  Lock, 
  Globe, 
  Bell, 
  Shield, 
  Database,
  Palette,
  Upload,
  Save,
  Eye,
  EyeOff
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminSettings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Profile Settings
    displayName: "AlJannah Adedamola Sanni",
    email: "theartistlol9@gmail.com",
    secondaryEmail: "sannialjanat30@gmail.com",
    bio: "Multifaceted writer, poetess, and literary critic specializing in fiction, non-fiction, and academic writing across diverse themes including family, gender, mental health, and African society.",
    
    // Website Settings
    siteTitle: "AlJannah Adedamola Sanni - Writer & Literary Critic",
    siteDescription: "Professional website of AlJannah Adedamola Sanni, featuring literary works, blog posts, and insights on social work, mental health, and African literature.",
    
    // Social Media
    instagram: "https://instagram.com/theartistlol9",
    facebook: "https://facebook.com/aljannahsanni",
    linkedin: "https://linkedin.com/in/aljannah-sanni",
    
    // Notification Settings
    emailNotifications: true,
    blogCommentNotifications: true,
    contactFormNotifications: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    
    // Content Settings
    postsPerPage: 9,
    worksPerPage: 12,
    enableComments: true,
    moderateComments: true,
    
    // SEO Settings
    enableSEO: true,
    enableSitemap: true,
    enableAnalytics: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // TODO: Implement Supabase save
    console.log("Saving settings:", settings);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account, website, and application preferences.
            </p>
          </div>
          <Button onClick={handleSave} className="mt-4 md:mt-0">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Account */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your personal information and profile details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/src/assets/profile-image.jpg" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={settings.displayName}
                      onChange={(e) => handleSettingChange("displayName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Primary Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleSettingChange("email", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryEmail">Secondary Email</Label>
                  <Input
                    id="secondaryEmail"
                    type="email"
                    value={settings.secondaryEmail}
                    onChange={(e) => handleSettingChange("secondaryEmail", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={settings.bio}
                    onChange={(e) => handleSettingChange("bio", e.target.value)}
                    placeholder="Tell people about yourself..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Website Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Website Settings
                </CardTitle>
                <CardDescription>
                  Configure your website's basic information and SEO settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input
                    id="siteTitle"
                    value={settings.siteTitle}
                    onChange={(e) => handleSettingChange("siteTitle", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    rows={3}
                    value={settings.siteDescription}
                    onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Social Media Links</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={settings.instagram}
                        onChange={(e) => handleSettingChange("instagram", e.target.value)}
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={settings.facebook}
                        onChange={(e) => handleSettingChange("facebook", e.target.value)}
                        placeholder="https://facebook.com/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={settings.linkedin}
                        onChange={(e) => handleSettingChange("linkedin", e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Privacy
                </CardTitle>
                <CardDescription>
                  Manage your account security and privacy preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Settings */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      General email updates
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Blog Comments</Label>
                    <p className="text-xs text-muted-foreground">
                      New comment notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.blogCommentNotifications}
                    onCheckedChange={(checked) => handleSettingChange("blogCommentNotifications", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Contact Form</Label>
                    <p className="text-xs text-muted-foreground">
                      New contact submissions
                    </p>
                  </div>
                  <Switch
                    checked={settings.contactFormNotifications}
                    onCheckedChange={(checked) => handleSettingChange("contactFormNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Content Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="postsPerPage">Posts Per Page</Label>
                  <Input
                    id="postsPerPage"
                    type="number"
                    value={settings.postsPerPage}
                    onChange={(e) => handleSettingChange("postsPerPage", parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="worksPerPage">Works Per Page</Label>
                  <Input
                    id="worksPerPage"
                    type="number"
                    value={settings.worksPerPage}
                    onChange={(e) => handleSettingChange("worksPerPage", parseInt(e.target.value))}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Enable Comments</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow blog comments
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableComments}
                    onCheckedChange={(checked) => handleSettingChange("enableComments", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Moderate Comments</Label>
                    <p className="text-xs text-muted-foreground">
                      Review before publishing
                    </p>
                  </div>
                  <Switch
                    checked={settings.moderateComments}
                    onCheckedChange={(checked) => handleSettingChange("moderateComments", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backup</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Auto-enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Update</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;