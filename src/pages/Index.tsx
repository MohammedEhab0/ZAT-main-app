
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Unlock Your Professional Potential
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto mb-8">
            Discover your unique skills and get personalized career guidance with our AI-powered assessment platform.
          </p>
          <Link to="/register">
            <Button size="lg" className="gap-2">
              Start Your Journey <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl bg-secondary">
              <h3 className="text-2xl font-bold mb-4">Skill Assessment</h3>
              <p className="text-neutral-500 mb-6">
                Evaluate your competencies through targeted questions across various skill levels. Get detailed insights into your strengths.
              </p>
              <Link to="/register">
                <Button variant="secondary">Learn More</Button>
              </Link>
            </div>
            <div className="p-8 rounded-2xl bg-secondary">
              <h3 className="text-2xl font-bold mb-4">AI Career Coach</h3>
              <p className="text-neutral-500 mb-6">
                Receive personalized career guidance based on your assessment results. Let AI help you make informed decisions.
              </p>
              <Link to="/register">
                <Button variant="secondary">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500">© 2025 SkillQuest. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-neutral-500 hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-neutral-500 hover:text-primary">
                About Us
              </Link>
              <Link to="/contact" className="text-neutral-500 hover:text-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
