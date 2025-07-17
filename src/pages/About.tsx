import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GraduationCap, BookOpen, Heart, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import profileImage from "@/assets/profile-image.jpg";

const About = () => {
  const education = [
    {
      degree: "M.Sc. in Social Work",
      specialization: "Public Health Specialization",
      icon: GraduationCap,
    },
    {
      degree: "B.Sc. in Social Work",
      specialization: "Social Development",
      icon: GraduationCap,
    },
    {
      degree: "HND in Sociology",
      specialization: "Social Research",
      icon: GraduationCap,
    },
  ];

  const specializations = [
    {
      title: "Genres",
      items: ["Nonfiction", "Fiction", "Poetry", "Literary Criticism"],
      icon: BookOpen,
    },
    {
      title: "Topics",
      items: [
        "Marriage & Family",
        "Gender & Identity", 
        "Feminism",
        "Mental Health",
        "African Society",
        "Religion & Culture",
        "Social & Behavioral Sciences"
      ],
      icon: Heart,
    },
  ];

  const coursework = [
    "Sociology", "Psychology", "Public Health", "Biostatistics", 
    "Epidemiology", "Social Work Practice", "Community Development"
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                  About Me
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Discover the journey of a passionate writer bridging the worlds of literature, 
                  social work, and human understanding through the power of words.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden literary-shadow">
                  <img
                    src={profileImage}
                    alt="AlJannah Adedamola Sanni"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Biography Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="font-heading text-3xl font-bold text-center mb-12">My Story</h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  I am AlJannah Adedamola Sanni (Umm Firdaus), a multifaceted writer whose pen 
                  traverses the realms of fiction, poetry, literary criticism, and academic discourse. 
                  My journey as a writer is deeply intertwined with my academic background in social 
                  work and my passion for exploring the human condition through narrative.
                </p>
                
                <p className="text-muted-foreground leading-relaxed text-lg">
                  With a Master's degree in Social Work specializing in Public Health, I bring a 
                  unique perspective to my literary works that bridges the gap between academic 
                  rigor and creative expression. My writing often explores themes of marriage, 
                  family dynamics, gender identity, mental health, and the rich tapestry of 
                  African society and culture.
                </p>
                
                <p className="text-muted-foreground leading-relaxed text-lg">
                  As a novice scenarist and literary hermeneut, I am passionate about interpreting 
                  and creating narratives that resonate with contemporary social issues while 
                  honoring traditional storytelling methods. My work spans multiple genres and 
                  maintains a flexible tone that adapts to the needs of each piece, whether it 
                  be a contemplative poem, a critical essay, or an engaging work of fiction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">Educational Background</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {education.map((edu, index) => {
                const Icon = edu.icon;
                return (
                  <Card key={index} className="literary-shadow text-center">
                    <CardContent className="p-6 space-y-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-heading text-lg font-semibold">{edu.degree}</h3>
                      <p className="text-muted-foreground text-sm">{edu.specialization}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-12 max-w-2xl mx-auto">
              <h3 className="font-heading text-xl font-semibold text-center mb-6">Relevant Coursework</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {coursework.map((course, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Specializations Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold text-center mb-12">Writing Specializations</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {specializations.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <Card key={index} className="literary-shadow">
                    <CardContent className="p-8 space-y-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-heading text-xl font-semibold">{spec.title}</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {spec.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="px-3 py-2 bg-secondary rounded-lg text-sm text-center"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;