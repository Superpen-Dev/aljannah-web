import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Send, MapPin, Clock, Instagram, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with actual form handler
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["theartistlol9@gmail.com", "sannialjanat30@gmail.com"],
      description: "Reach out for collaborations, inquiries, or just to say hello"
    },
    {
      icon: Clock,
      title: "Response Time",
      details: ["Usually within 24-48 hours"],
      description: "I strive to respond to all messages promptly"
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Available for remote collaborations"],
      description: "Open to projects and opportunities worldwide"
    }
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/theartistlol9",
      icon: Instagram,
      description: "Follow my creative journey"
    },
    {
      name: "Facebook", 
      href: "https://facebook.com/aljannahsanni",
      icon: Facebook,
      description: "Connect and engage"
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/aljannah-sanni",
      icon: Linkedin,
      description: "Professional networking"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                Get In Touch
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                I'd love to hear from you! Whether you're interested in collaborating, 
                have questions about my work, or simply want to connect, feel free to reach out.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-2xl font-bold mb-4">Send Me a Message</h2>
                  <p className="text-muted-foreground">
                    Use the form below to send me a direct message. I'll get back to you as soon as possible.
                  </p>
                </div>

                <Card className="literary-shadow">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell me about your project, inquiry, or just say hello..."
                          rows={6}
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="elegant"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-2xl font-bold mb-4">Contact Information</h2>
                  <p className="text-muted-foreground">
                    Feel free to reach out through any of these channels. I'm always excited to 
                    connect with fellow writers, readers, and collaborators.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <Card key={index} className="literary-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-heading text-lg font-semibold">{info.title}</h3>
                              <div className="space-y-1">
                                {info.details.map((detail, detailIndex) => (
                                  <p key={detailIndex} className="text-foreground font-medium">
                                    {detail}
                                  </p>
                                ))}
                              </div>
                              <p className="text-muted-foreground text-sm">{info.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Social Media Links */}
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-semibold">Connect on Social Media</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Card key={link.name} className="literary-shadow hover:shadow-lg transition-shadow duration-300">
                          <CardContent className="p-4 text-center">
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block space-y-3 hover:text-primary transition-colors"
                            >
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                <Icon className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{link.name}</h4>
                                <p className="text-xs text-muted-foreground">{link.description}</p>
                              </div>
                            </a>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;