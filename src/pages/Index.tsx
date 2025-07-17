import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedWorks from "@/components/FeaturedWorks";
import LatestBlogPosts from "@/components/LatestBlogPosts";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedWorks />
        <LatestBlogPosts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
