import React from "react";
import HeroSection from "./HeroSection";
import Navbar from "../../components/Navbar";
import Benefits from "./Benefits";
import Reviews from "./Reviews";
import Pricing from "../Pricing";

const Home: React.FC = () => {
  return (
    <div>
      {/* Navbar & Hero Section  */}
      <div className=" relative">
        <div className="flex flex-col md:flex-row  justify-between">
          <div className="md:w-8/12 h-[580px] md:h-[80vh] lg:h-[90vh] xl:h-[100vh]"></div>
          <div className="md:w-4/12 bg-violet-50 h-[420px] md:h-[80vh] lg:h-[90vh] xl:h-[100vh]"></div>
        </div>
        <div className=" absolute h-screen top-0 left-0 right-0">
          <div className=" w-full h-full">
            <Navbar />
            <HeroSection />
          </div>
        </div>
      </div>
      {/* Benefits Section  */}
      <Benefits />
      <Pricing />
      <Reviews />
      <div className=" h-screen">P</div>
    </div>
  );
};

export default Home;
