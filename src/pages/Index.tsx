import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import bgHero from "@/assets/images/bgHero.png";
import heroMan from "@/assets/images/heroMan.png";
export default function Index() {
  return (
    <div className=" min-h-screen ">
      <Navigation />

      {/* Hero Section */}
      <section
        className=" hero pt-32 pb-20 px-4"
        style={{ backgroundImage: `url(${bgHero})` }}
      >
        <div className="container mx-auto text-center flex flex-col items-center">
          <img src={heroMan} alt="heroMan" className="w-5/6 " />

          <Link to="/register">
            <Button size="lg" className="gap-2">
              Start Your Journey <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="how-it-works py-20 px-4 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Step 1: Sign Up</h3>
              <p className="text-neutral-500">
                Create an account to access our platform and start your journey.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Step 2: Take the Quiz</h3>
              <p className="text-neutral-500">
                Complete our AI-powered assessment to discover your strengths.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Step 3: Get Guidance</h3>
              <p className="text-neutral-500">
                Receive personalized career recommendations based on your
                results.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About Us Section */}
      <section className="about-us py-20 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About Us</h2>
          <p className="text-lg text-neutral-500 max-w-3xl mx-auto">
            At SkillQuest, we are dedicated to helping individuals unlock their
            full potential. Our platform combines cutting-edge AI technology
            with expert insights to provide personalized career guidance and
            skill assessments.
          </p>
        </div>
      </section>
      {/* Features Section */}
      <section className="Assessment py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl bg-secondary">
              <h3 className="text-2xl font-bold mb-4">Skill Assessment</h3>
              <p className="text-neutral-500 mb-6">
                Evaluate your competencies through targeted questions across
                various skill levels. Get detailed insights into your strengths.
              </p>
              <Link to="/register">
                <Button variant="secondary">Learn More</Button>
              </Link>
            </div>
            <div className="p-8 rounded-2xl bg-secondary">
              <h3 className="text-2xl font-bold mb-4">AI Career Coach</h3>
              <p className="text-neutral-500 mb-6">
                Receive personalized career guidance based on your assessment
                results. Let AI help you make informed decisions.
              </p>
              <Link to="/register">
                <Button variant="secondary">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Us Section */}
      <section className="contact-us py-20 px-4 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Contact Us</h2>
          <p className="text-lg text-neutral-500 max-w-3xl mx-auto mb-8">
            Have questions or need assistance? Reach out to us, and we’ll be
            happy to help!
          </p>
          <Link to="/contact">
            <Button size="lg" className="gap-2">
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500">
              © 2025 SkillQuest. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-neutral-500 hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link to="/about" className="text-neutral-500 hover:text-primary">
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-neutral-500 hover:text-primary"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
