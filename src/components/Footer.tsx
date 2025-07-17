import { Instagram, Facebook, Linkedin, Mail, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/theartistlol9",
      icon: Instagram,
    },
    {
      name: "Facebook", 
      href: "https://facebook.com/aljannahsanni",
      icon: Facebook,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/aljannah-sanni",
      icon: Linkedin,
    },
    {
      name: "Email",
      href: "mailto:theartistlol9@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">AlJannah Adedamola Sanni</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Multifaceted writer, poetess, and literary critic specializing in fiction, 
              non-fiction, and academic writing across diverse themes including family, 
              gender, mental health, and African society.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2">
              <Link 
                to="/about" 
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
              >
                About Me
              </Link>
              <Link 
                to="/works" 
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
              >
                My Works
              </Link>
              <Link 
                to="/blog" 
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Connect With Me</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
                    aria-label={link.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm flex items-center justify-center gap-1">
            © {currentYear} AlJannah Adedamola Sanni. Made with 
            <Heart className="h-4 w-4 text-red-400" fill="currentColor" />
            for the love of literature.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;