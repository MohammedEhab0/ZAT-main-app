import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import nnn from "@/assets/images/nnnn.png";
import kkk from "@/assets/images/kkkk.png";
import bgred from "@/assets/images/bg-co.png";
import bgblue from "@/assets/images/bg-blue.png";

// Reusable FeatureCard
const FeatureCard = ({
  title,
  imgSrc,
  bgColor,
  btnColor,
  bgImage,
  rotate,
  animationRotate,
}: {
  title: string;
  imgSrc: string;
  bgColor: string;
  btnColor: string;
  bgImage: string;
  rotate: string;
  animationRotate: string;
}) => (
  <Card
    className={`transform transition-transform duration-300 ${rotate} flex flex-col justify-center items-center p-4 ${bgColor} shadow-lg rounded-[2.5rem] md:rounded-[3rem] relative md:w-[21rem] md:h-[30rem] w-[14rem] h-[20rem] my-5 shrink-0
      ${animationRotate === "rotate-6" ? "hover:rotate-6" : ""}
      ${animationRotate === "rotate-0" ? "hover:rotate-0" : ""}
      ${animationRotate === "rotate-3" ? "hover:rotate-3" : ""}
      ${animationRotate === "-rotate-3" ? "hover:-rotate-3" : ""}
    `}
  >
    <div className="border-2 border-black rounded-[2rem] h-full w-full flex flex-col justify-between">
      <CardHeader className="text-center">
        <h2 className="xl:text-5xl md:text-4xl text-xl font-bold text-white">
          {title}
        </h2>
      </CardHeader>
      <CardContent
        className="relative w-full h-full bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <img
          src={imgSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
      </CardContent>
      <CardFooter className="flex justify-center my-5">
        <a href="#register">
          <Button
            className={`rounded-full ${btnColor} text-[#5300B3] text-sm md:text-3xl border-2 border-black hover:bg-[#5300B3] hover:text-white absolute bottom-6 left-1/2 transform -translate-x-1/2 md:py-6 py-3`}
          >
            Start Now
          </Button>
        </a>
      </CardFooter>
    </div>
  </Card>
);

// Main FeaturesSection
export default function FeaturesSection() {
  return (
    <section className="py-10 w-full">
      <div className="flex flex-wrap gap-6 justify-evenly items-center px-4">
        <FeatureCard
          animationRotate="rotate-6"
          rotate="-rotate-3"
          title="ZAT Journey"
          imgSrc={kkk}
          bgColor="bg-[#FA1D2B]"
          btnColor="bg-[#B1FF00]"
          bgImage={bgred}
        />
        <FeatureCard
          animationRotate="rotate-0" // This was 'rotate-0'
          rotate="rotate-3"
          title="ZAT Coaching"
          imgSrc={nnn}
          bgColor="bg-[#006FD6]"
          btnColor="bg-[#FFF200]"
          bgImage={bgblue}
        />
      </div>
    </section>
  );
}
