import { ArrowRight, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import profileImage from "@/assets/profile-image.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center gradient-hero">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                AlJannah Adedamola Sanni
                <span className="block text-2xl md:text-3xl lg:text-4xl text-primary font-medium mt-2">
                  (Umm Firdaus)
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Story writer, novice scenarist, poetess, literary critic, literary hermeneut, 
                and article writer crafting narratives that explore the depths of human experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="elegant" size="lg">
                <Link to="/works">
                  Explore My Works
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="literary" size="lg">
                <Link to="/about">
                  About Me
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Fiction & Non-fiction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Poetry & Literary Criticism</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Academic Writing</span>
              </div>
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