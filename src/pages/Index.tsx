// src/pages/Index.tsx
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Navigation from "@/components/Navigation";

import bgHero from "@/assets/images/bgHero.png";
import bgHowItWork from "@/assets/images/bg-howItWork.png";
import bgAboutUS from "@/assets/images/aboutUs-bg.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Static Section Components
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorkSection";
import StoryUsSection from "@/components/sections/StoryUsSection";
import FeaturesSection from "@/components/sections/FeaturSection";

// Lazy Loaded Components
const HeroSection2 = React.lazy(
  () => import("@/components/sections/HeroSection2")
);
const Login = React.lazy(() => import("@/pages/Login"));
const Register = React.lazy(() => import("@/pages/Register"));

export default function Index() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [isLargeScreen, setIsLargeScreen] = React.useState(
    window.innerWidth >= 900
  );

  // --- NEW: State to control the active tab ---
  const [activeTab, setActiveTab] = React.useState("register"); // Default to 'register' tab

  React.useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- NEW: Function to switch to login tab after successful registration ---
  const handleRegistrationSuccess = () => {
    setActiveTab("login");
    // Optionally scroll to the tabs section if it's not visible
    document
      .getElementById("register-login-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navigation />

      <Carousel
        opts={{ align: "start", loop: true }}
        orientation="horizontal"
        plugins={[plugin.current]}
        className="h-fit"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselPrevious
          aria-label="Previous Slide"
          className="left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 text-[#5300B3] hover:text-[#5300B3] animate-bounce"
        />

        <CarouselContent>
          <CarouselItem
            id="hero1"
            className="flex items-center w-full"
            style={{
              backgroundImage: `url(${bgHero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <HeroSection />
          </CarouselItem>

          <CarouselItem
            id="hero2"
            className="flex items-center pb-5"
            style={{
              backgroundImage: `url(${bgHero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <React.Suspense fallback={<div>Loading...</div>}>
              <HeroSection2 />
            </React.Suspense>
          </CarouselItem>
        </CarouselContent>

        <CarouselNext
          aria-label="Next Slide"
          className="right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 text-[#5300B3] hover:text-[#5300B3] animate-bounce"
        />
      </Carousel>

      <div
        id="story-us"
        className="bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${bgAboutUS})` }}
      >
        <StoryUsSection />
      </div>

      <div
        id="how-it-works"
        className="bg-fixed bg-center bg-cover "
        style={{ backgroundImage: `url(${bgHowItWork})` }}
      >
        <HowItWorksSection />
      </div>

      <div
        id="features"
        className="bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${bgAboutUS})` }}
      >
        <div
          id="features"
          className="bg-fixed bg-center bg-cover"
          style={{ backgroundImage: `url(${bgAboutUS})` }}
        >
          <FeaturesSection />
        </div>
      </div>

      {/* Login/Register Tabs Section */}
      <Tabs
        id="register-login-section" // Added specific ID for easier scrolling
        value={activeTab} // Control the active tab with state
        onValueChange={setActiveTab} // Update state when tab changes
        className="bg-cover bg-center py-10 bg-fixed"
        style={{ backgroundImage: `url(${bgAboutUS})` }}
      >
        <TabsList className="container max-w-xs grid grid-cols-2 content-center mx-auto rounded-full backdrop-blur-lg border-2 border-white shadow-2xl mt-10">
          <TabsTrigger
            value="login"
            className="rounded-full p-2 data-[state=active]:text-white data-[state=active]:bg-[#5300B3] data-[state=active]:shadow-lg"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="rounded-full data-[state=active]:text-white data-[state=active]:bg-[#5300B3] data-[state=active]:shadow-lg"
          >
            Register
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <React.Suspense fallback={<div>Loading...</div>}>
            <Login /> {/* Login component */}
          </React.Suspense>
        </TabsContent>

        <TabsContent value="register">
          <React.Suspense fallback={<div>Loading...</div>}>
            {/* Pass the handleRegistrationSuccess function to the Register component */}
            <Register onRegistrationSuccess={handleRegistrationSuccess} />
          </React.Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
