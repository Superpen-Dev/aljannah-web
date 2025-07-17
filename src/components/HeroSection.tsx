import { ArrowRight, Download, BookOpen, Award, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import profileImage from "@/assets/profile-image.jpg";

const HeroSection = () => {
  const achievements = [
    { icon: BookOpen, label: "15+ Published Works", description: "Across multiple genres" },
    { icon: Award, label: "Literary Excellence", description: "Recognition in academic circles" },
    { icon: Users, label: "Community Impact", description: "Advocating for mental health" },
    { icon: Target, label: "Social Focus", description: "Gender, culture, and identity" }
  ];

  const specializations = [
    "Social Work & Public Health",
    "African Literature & Culture", 
    "Mental Health Advocacy",
    "Gender Studies & Feminism",
    "Family Dynamics & Marriage",
    "Literary Criticism & Analysis"
  ];

  return (
    <section className="min-h-screen flex items-center justify-center gradient-hero">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-4">
                  Literary Professional & Social Work Specialist
                </Badge>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  AlJannah Adedamola Sanni
                  <span className="block text-2xl md:text-3xl lg:text-4xl text-primary font-medium mt-2">
                    (Umm Firdaus)
                  </span>
                </h1>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                A multifaceted writer, poetess, and literary critic with expertise in social work and public health. 
                I craft narratives that explore the intersections of culture, identity, mental health, and human resilience.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {specializations.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="elegant" size="lg">
                <Link to="/works">
                  Explore My Works
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="literary" size="lg">
                <Link to="/blog">
                  Read My Blog
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">
                  Get In Touch
                </Link>
              </Button>
            </div>

            {/* Achievement Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index} className="literary-shadow bg-background/50 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <Icon className="h-6 w-6 text-primary mx-auto mb-2" />
                      <h4 className="font-semibold text-sm text-foreground">{achievement.label}</h4>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden literary-shadow">
                <img
                  src={profileImage}
                  alt="AlJannah Adedamola Sanni"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;