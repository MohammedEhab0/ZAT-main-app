import * as React from "react";
import createBoy from "@/assets/images/createBoy.png";
import receiveBoy from "@/assets/images/receiveBoy.png";
import takeBoy from "@/assets/images/takeBoy.png";
import createBG from "@/assets/images/create-bg.png";
import receiveBG from "@/assets/images/receive-bg.png";
import takeBG from "@/assets/images/take-bg.png";
import arrowLeft from "@/assets/images/arrowLeft.png";
import arrowRight from "@/assets/images/arrowRight.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const steps = [
  {
    id: 1,
    title: "Create",
    description: "we help you fnd your purpose",
    bgColor: "bg-[#FB4ADF]",
    rotate: "-rotate-6",
    bgImage: createBG,
    boyImage: createBoy,
    animationRotate: "rotate-6",
  },
  {
    id: 2,
    title: "Take",
    description: "a personlized Assessment",
    bgColor: "bg-[#B1FF00]",
    rotate: "", // No initial rotate
    bgImage: takeBG,
    boyImage: takeBoy,
    animationRotate: "rotate-6",
  },
  {
    id: 3,
    title: "Receive",
    description: "Report insights",
    bgColor: "bg-[#FA1D2B]",
    rotate: "rotate-6",
    bgImage: receiveBG,
    boyImage: receiveBoy,
    animationRotate: "rotate-8",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="how-it-works mx-auto py-20">
      <div className="md:text-center text-justify">
        <h2 className="text-[#5300B3] text-4xl md:text-6xl font-bold py-2 pl-5">
          How It Works
        </h2>
        <div className="flex justify-evenly py-10 px-6 gap-5 items-center flex-wrap">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex items-center">
              {/* Arrow to the left of middle card */}
              {index === 1 && (
                <img
                  src={arrowLeft}
                  alt="Arrow Left"
                  className="w-36 hidden md:block mr-8"
                />
              )}

              <Card
                className={`transform transition-transform duration-300 ${
                  step.rotate
                } shadow-lg rounded-[2rem] flex flex-col justify-evenly items-center ${
                  step.bgColor
                } relative md:w-[16rem] md:h-[22rem] w-[12rem] h-[18rem] mx-2
                  ${step.animationRotate === "rotate-6" ? "hover:rotate-6" : ""}
                  ${step.animationRotate === "rotate-8" ? "hover:rotate-8" : ""}
                `}
              >
                <CardHeader className="pt-2 flex justify-evenly flex-col items-center text-center">
                  <div className="p-1 px-3 xl:text-4xl md:text-3xl text-xl bg-white rounded-full w-min text-[#5300B3] font-bold">
                    {step.id}
                  </div>
                  <h2 className="xl:text-4xl md:text-3xl text-xl font-bold text-black">
                    {step.title}
                  </h2>
                  <p className="xl:text-xl md:text-lg text-md leading-tight text-[#5300B3] font-semibold">
                    {step.description}
                  </p>
                </CardHeader>
                <CardContent
                  className="relative w-full h-full bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${step.bgImage})` }}
                >
                  <img
                    src={step.boyImage}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  />
                </CardContent>
              </Card>

              {/* Arrow to the right of middle card */}
              {index === 1 && (
                <img
                  src={arrowRight}
                  alt="Arrow Right"
                  className="w-36 -right-44 hidden md:block ml-6"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
