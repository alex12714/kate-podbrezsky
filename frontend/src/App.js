import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import CoachIntro from "./components/CoachIntro";
import CalendlySection from "./components/CalendlySection";
import CoachingSection from "./components/CoachingSection";
import ProcessSteps from "./components/ProcessSteps";
import AboutKate from "./components/AboutKate";
import Testimonials from "./components/Testimonials";
import PowerfulTools from "./components/PowerfulTools";
import NeurocoachingTools from "./components/NeurocoachingTools";
import FinalCTA from "./components/FinalCTA";
import ChatWidget from "./components/ChatWidget";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CoachIntro />
      <CalendlySection />
      <CoachingSection />
      <ProcessSteps />
      <AboutKate />
      <Testimonials />
      <PowerfulTools />
      <NeurocoachingTools />
      <FinalCTA />
      <ChatWidget />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
