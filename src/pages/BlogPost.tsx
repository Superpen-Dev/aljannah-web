import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - will be replaced with Supabase
  const mockPosts = [
    {
      id: 1,
      title: "The Power of Storytelling in Mental Health Advocacy",
      content: `<div class="prose prose-lg max-w-none">
        <p class="lead">Mental health advocacy has found one of its most powerful tools in the art of storytelling. Through personal narratives, we break down barriers of stigma and create pathways to understanding and healing.</p>
        
        <h2>The Human Connection</h2>
        <p>Stories have an unparalleled ability to connect us on a deeply human level. When someone shares their mental health journey, they create a bridge of empathy that statistics and clinical descriptions simply cannot match. This connection is vital in a field where isolation and misunderstanding often compound the challenges individuals face.</p>
        
        <blockquote>
          <p>"The story you tell yourself about yourself is the most important story you'll ever tell." - Unknown</p>
        </blockquote>
        
        <h2>Breaking Down Stigma</h2>
        <p>One of the most significant barriers to mental health support is the persistent stigma surrounding mental illness. Personal stories have the power to humanize these experiences, showing that mental health challenges can affect anyone and that seeking help is a sign of strength, not weakness.</p>
        
        <h3>The Role of Narrative Therapy</h3>
        <p>Narrative therapy, developed by Michael White and David Epston, operates on the principle that we are the authors of our own stories. By helping individuals externalize their problems and re-author their narratives, we can facilitate healing and growth.</p>
        
        <h2>Creating Safe Spaces</h2>
        <p>Storytelling in mental health advocacy also involves creating safe spaces where individuals feel comfortable sharing their experiences. These spaces, whether physical or digital, must be characterized by:</p>
        <ul>
          <li>Non-judgmental listening</li>
          <li>Confidentiality and respect</li>
          <li>Cultural sensitivity</li>
          <li>Professional support when needed</li>
        </ul>
        
        <h2>The Ripple Effect</h2>
        <p>When one person shares their story, it often encourages others to share theirs. This creates a ripple effect that can transform communities and change the conversation around mental health. Each story shared is a step toward a more understanding and supportive society.</p>
        
        <p>As we continue to advocate for mental health awareness, let us remember the power of our stories. They are not just accounts of our experiences—they are tools for healing, bridges to understanding, and catalysts for change.</p>
      </div>`,
      category: "Articles",
      publishedAt: "2024-01-15",
      readTime: "5 min read",
      slug: "storytelling-mental-health-advocacy",
      coverImage: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800&h=400&fit=crop",
      excerpt: "Exploring how narrative therapy and personal stories can transform our understanding of mental wellness and create pathways to healing..."
    },
    {
      id: 2,
      title: "African Feminism Through Literary Lens",
      content: `<div class="prose prose-lg max-w-none">
        <p class="lead">Contemporary African literature serves as a powerful medium for examining and redefining feminist discourse within the African context, challenging both traditional patriarchal structures and Western feminist paradigms.</p>
        
        <h2>Redefining Feminism in African Context</h2>
        <p>African feminism differs significantly from its Western counterpart, addressing unique cultural, social, and economic realities faced by African women. Through literature, African women writers have carved out spaces to explore these complexities while honoring their cultural heritage.</p>
        
        <h3>Key Themes in African Feminist Literature</h3>
        <ul>
          <li>Motherhood and its multifaceted meanings</li>
          <li>Economic independence and empowerment</li>
          <li>Colonial legacy and its impact on gender roles</li>
          <li>Traditional vs. modern value systems</li>
          <li>Community solidarity among women</li>
        </ul>
        
        <h2>Notable Voices</h2>
        <p>Writers like Chimamanda Ngozi Adichie, Buchi Emecheta, and Ama Ata Aidoo have pioneered conversations about African women's experiences, creating nuanced portrayals that resist simplistic categorizations.</p>
        
        <blockquote>
          <p>"The problem with stereotypes is not that they are untrue, but that they are incomplete." - Chimamanda Ngozi Adichie</p>
        </blockquote>
        
        <h2>Literary Techniques and Narrative Strategies</h2>
        <p>African feminist writers employ various literary techniques to challenge dominant narratives and present alternative perspectives on womanhood and society.</p>
      </div>`,
      category: "Literary Criticism",
      publishedAt: "2024-01-10",
      readTime: "8 min read",
      slug: "african-feminism-literary-lens",
      coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
      excerpt: "A critical examination of how contemporary African literature challenges and redefines feminist discourse in the modern era..."
    },
    {
      id: 3,
      title: "Whispers of Home",
      content: `<div class="prose prose-lg max-w-none">
        <div class="text-center mb-8">
          <p class="text-sm text-muted-foreground mb-4">A poem about diaspora, belonging, and the eternal search for home</p>
        </div>
        
        <div class="space-y-6 font-serif text-lg leading-relaxed">
          <div class="stanza">
            <p>In foreign lands where familiar sounds</p>
            <p>Echo only in dreams,</p>
            <p>I carry within my chest</p>
            <p>The weight of unnamed longing.</p>
          </div>
          
          <div class="stanza">
            <p>Mother's laughter lives</p>
            <p>In the corners of my mouth,</p>
            <p>While father's wisdom</p>
            <p>Settles in my bones like dust</p>
            <p>From red earth roads.</p>
          </div>
          
          <div class="stanza">
            <p>Home is not a place</p>
            <p>But a frequency—</p>
            <p>The particular way sunlight</p>
            <p>Filters through palm fronds,</p>
            <p>The rhythm of rain on zinc roofs,</p>
            <p>The taste of pepper soup</p>
            <p>On Sunday afternoons.</p>
          </div>
          
          <div class="stanza">
            <p>Here, I am both</p>
            <p>Visitor and resident,</p>
            <p>Carrying two passports</p>
            <p>But claiming citizenship</p>
            <p>In the borderlands</p>
            <p>Between who I was</p>
            <p>And who I am becoming.</p>
          </div>
          
          <div class="stanza">
            <p>In crowded subway cars</p>
            <p>I hear whispers of home—</p>
            <p>Sometimes in accented English,</p>
            <p>Sometimes in languages</p>
            <p>That taste like honey</p>
            <p>On homesick tongues.</p>
          </div>
          
          <div class="stanza">
            <p>We are all immigrants</p>
            <p>In the country of time,</p>
            <p>Carrying stories</p>
            <p>In the softness of our palms,</p>
            <p>Building bridges</p>
            <p>From memory to possibility.</p>
          </div>
          
          <div class="stanza">
            <p>And perhaps this is enough—</p>
            <p>To carry home within us</p>
            <p>Like a secret prayer,</p>
            <p>To plant seeds of belonging</p>
            <p>Wherever our feet</p>
            <p>Learn to call ground.</p>
          </div>
        </div>
        
        <div class="mt-12 pt-8 border-t">
          <p class="text-sm text-muted-foreground italic">
            This poem explores themes of diaspora, cultural identity, and the complex relationship between physical and emotional homes. It reflects on how immigrants carry their heritage while adapting to new environments.
          </p>
        </div>
      </div>`,
      category: "Poetry",
      publishedAt: "2024-01-05",
      readTime: "2 min read",
      slug: "whispers-of-home",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      excerpt: "A poem about diaspora, belonging, and the eternal search for home in foreign lands. An exploration of identity and place..."
    }
  ];

  useEffect(() => {
    // Simulate loading and find post by slug
    const timer = setTimeout(() => {
      const foundPost = mockPosts.find(p => p.slug === slug);
      setPost(foundPost);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = window.location.href;
  const shareTitle = post?.title || "Blog Post";

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} - ${shareUrl}`)}`
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-16 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/4 mb-8"></div>
                <div className="h-64 bg-muted rounded mb-8"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                  <div className="h-4 bg-muted rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-16 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
              
              <div className="space-y-4">
                <Badge variant="secondary">{post.category}</Badge>
                <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video overflow-hidden rounded-lg literary-shadow">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <article 
                    className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-foreground prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:border-l-4 prose-blockquote:bg-muted/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r prose-li:text-foreground prose-strong:text-foreground"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    {/* Share Section */}
                    <div className="bg-muted/30 rounded-lg p-6">
                      <h3 className="font-heading text-lg font-semibold mb-4 flex items-center">
                        <Share2 className="h-5 w-5 mr-2" />
                        Share This Post
                      </h3>
                      <div className="space-y-3">
                        <a
                          href={shareLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Facebook className="h-4 w-4 mr-2" />
                          Facebook
                        </a>
                        <a
                          href={shareLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Twitter className="h-4 w-4 mr-2" />
                          Twitter
                        </a>
                        <a
                          href={shareLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </a>
                        <a
                          href={shareLinks.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          WhatsApp
                        </a>
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="bg-muted/30 rounded-lg p-6">
                      <h3 className="font-heading text-lg font-semibold mb-4">About the Author</h3>
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          AlJannah Adedamola Sanni (Umm Firdaus) is a multifaceted writer, poetess, and literary critic specializing in African literature, social work, and mental health advocacy.
                        </p>
                        <Link to="/about" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                          Read full bio →
                        </Link>
                      </div>
                    </div>
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

export default BlogPost;