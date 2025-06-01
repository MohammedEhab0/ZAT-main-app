import Hero1 from "@/assets/images/hero1.png";
import cHero from "@/assets/images/c-Hero.png";

export default function HeroSection() {
  return (
    <section className=" flex flex-col md:flex-row items-center justify-around  px-4 md:px-10 py-10 lg:py-6 w-full  ">
      {/* Left Text */}
      <div className="  flex flex-col space-y-14 text-center lg:text-start font-bold max-w-lg w-full ">
        <div>
          <p className="text-xl md:text-3xl xl:text-5xl leading-tight">
            Lost in the search for
          </p>
          <p className="text-xl md:text-3xl xl:text-5xl leading-tight">
            WHAT’S NEXT?
          </p>
        </div>
        <div className="space-y-1 text-black text-sm md:text-base font-semibold">
          <p>Feel like everyone expects you to</p>
          <p>have it all figured out, but you</p>
          <p>don’t know what to do</p>
          <p>with your life?</p>
        </div>
      </div>

      {/* Center Image */}
      <div className="flex justify-center w-full">
        <img
          src={Hero1}
          alt="Illustration representing the hero section"
          className="w-60 md:w-[30rem] xl:w-[70rem] "
        />
      </div>

      {/* Right Text */}
      <div className="  flex flex-col items-center lg:items-start space-y-14 text-center lg:text-start max-w-md w-full">
        <div className="text-[#5300B3] font-semibold">
          <p className="text-sm md:text-2xl xl:text-3xl">Same.</p>
          <p className="text-sm md:text-2xl xl:text-3xl">We’ve been there!</p>
        </div>
        <div
          className="text-[0.6rem] md:text-sm text-black font-semibold py-8 px-10 md:px-12 bg-contain bg-center bg-no-repeat text-center"
          style={{ backgroundImage: `url(${cHero})` }}
        >
          <p>You’re not broken.</p>
          <p>The system is. And</p>
          <p>we are here to</p>
          <p>change that</p>
        </div>
      </div>
    </section>
  );
}
