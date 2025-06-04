import Hero2 from "@/assets/images/hero2.png";
import cHero from "@/assets/images/c-hero2.png";

export default function HeroSection() {
  return (
    <section className="w-full px-4 md:px-20 py-16 ">
      {/* Heading */}
      <div className="text-center md:text-left mb-10">
        <div className="space-y-2">
          <p className="text-xl md:text-2xl xl:text-4xl font-bold text-black">
            We don’t just help you pick a career,
          </p>
          <p className="text-xl md:text-2xl xl:text-4xl font-bold text-black">
            we help you find your purpose
          </p>
        </div>
      </div>

      {/* Row Content */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Text */}
        <div className="flex flex-col space-y-2 text-start font-bold text-[#5300B3] text-xs md:text-base xl:text-lg max-w-sm flex-1">
          <p>The first human-powered model</p>
          <p>that helps you discover your true</p>
          <p>self – developed by the community,</p>
          <p>for the community.</p>
        </div>

        {/* Center Image */}
        <div className="flex justify-center flex-1 ">
          <img
            src={Hero2}
            alt="Illustration representing a border hero"
            className="w-64 md:w-[20rem] xl:w-[28rem] object-contain transition-transform duration-600 hover:animate-shake"
          />
        </div>

        {/* Right Text */}
        <div
          className="flex flex-col text-center text-[.6rem] md:text-base font-semibold max-w-sm flex-1 bg-contain bg-center bg-no-repeat md:px-10 md:py-14 py-10 px-8 hover:animate-bounce"
          style={{ backgroundImage: `url(${cHero})` }}
        >
          <p>Your path is yours to draw.</p>
          <p>Let us help you find it.</p>
        </div>
      </div>
    </section>
  );
}
