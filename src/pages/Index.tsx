"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import bgHero from "@/assets/images/bgHero.png";
import Man from "@/assets/images/man.png";
import yhero from "@/assets/images/y-hero.png";
import create from "@/assets/images/create.png";
import receive from "@/assets/images/receive.png";
import take from "@/assets/images/Take.png";
import arrowLeft from "@/assets/images/arrowLeft.png";
import arrowRight from "@/assets/images/arrowRight.png";
import bgHowItWork from "@/assets/images/bg-howItWork.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Index() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Carousel */}
      <Carousel
        opts={{ align: "start", loop: true }}
        orientation={window.innerWidth < 840 ? "vertical" : "horizontal"} // Horizontal for medium and above, vertical for small screens
        plugins={[plugin.current]}
        className="h-fit"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselPrevious className=" left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300 text-[#5300B3] hover:text-[#5300B3]" />

        <CarouselContent className="  my-9  ">
          {/* Hero Section */}
          <CarouselItem className="  ">
            <section
              className="hero mt-9  px-4 my-auto bg-cover"
              style={{ backgroundImage: `url(${bgHero})` }}
            >
              <div className="container  text-center  flex-col items-center justify-around">
                <div className="container mx-auto  flex justify-center items-center">
                  <Link className="" to="/register">
                    <img src={yhero} alt="y-bg" className="relative  w-full " />
                  </Link>

                  <img src={Man} alt="heroMan" className="absolute  w-3/5" />
                </div>
              </div>
            </section>
          </CarouselItem>

          {/* How It Works Section */}
          <CarouselItem className=" my-3 h-full w-full">
            <section className="how-it-works pt-[4rem] ">
              <div className="container  text-center ">
                <h2 className="bg-[#5300B3] text-[#FFF200] text-3xl md:text-6xl font-bold  py-4">
                  How It Works
                </h2>
                <div
                  className="grid grid-cols-5 md:grid-cols-5 bg-cover bg-center py-4"
                  style={{ backgroundImage: `url(${bgHowItWork})` }}
                >
                  <img src={create} alt="Create Account" className="w-4/5" />
                  <img src={arrowLeft} alt="Arrow Left" className="w-2/5" />
                  <img src={take} alt="Take Quiz" className="w-4/5" />
                  <img src={arrowRight} alt="Arrow Right" className="w-2/5" />
                  <img src={receive} alt="Receive Results" className="w-4/5" />
                </div>
              </div>
            </section>
          </CarouselItem>

          {/* About Us Section */}
          <CarouselItem className="about">
            <section className="about py-20 px-4 bg-white m-3">
              <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  About Us
                </h2>
                <p className="text-lg text-neutral-500 max-w-3xl mx-auto">
                  At SkillQuest, we are dedicated to helping individuals unlock
                  their full potential. Our platform combines cutting-edge AI
                  technology with expert insights to provide personalized career
                  guidance and skill assessments.
                </p>
              </div>
            </section>
          </CarouselItem>

          {/* Features Section */}
          <CarouselItem className="assessment">
            <section className="Assessment py-20 px-4 bg-white m-3">
              <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="p-8 rounded-2xl bg-secondary">
                    <h3 className="text-2xl font-bold mb-4">
                      Skill Assessment
                    </h3>
                    <p className="text-neutral-500 mb-6">
                      Evaluate your competencies through targeted questions
                      across various skill levels. Get detailed insights into
                      your strengths.
                    </p>
                    <Link to="/register">
                      <Button variant="secondary">Learn More</Button>
                    </Link>
                  </div>
                  <div className="p-8 rounded-2xl bg-secondary">
                    <h3 className="text-2xl font-bold mb-4">AI Career Coach</h3>
                    <p className="text-neutral-500 mb-6">
                      Receive personalized career guidance based on your
                      assessment results. Let AI help you make informed
                      decisions.
                    </p>
                    <Link to="/register">
                      <Button variant="secondary">Learn More</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </CarouselItem>

          {/* Contact Us Section */}
          <CarouselItem className="contact">
            <section className="contact-us py-20 px-4 bg-gray-100 m-3">
              <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  Contact Us
                </h2>
                <p className="text-lg text-neutral-500 max-w-3xl mx-auto mb-8">
                  Have questions or need assistance? Reach out to us, and we’ll
                  be happy to help!
                </p>
                <Link to="/contact">
                  <Button size="lg" className="gap-2">
                    Get in Touch <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </section>
          </CarouselItem>
        </CarouselContent>

        {/* Carousel Controls */}

        <CarouselNext className="border-spacing-1   right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-200 text-[#5300B3] p-2 rounded-full shadow-md hover:bg-gray-300 hover:text-[#5300B3]" />
      </Carousel>
    </div>
  );
}
