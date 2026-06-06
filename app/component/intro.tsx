import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "../component/icon";
import { PortfolioContent } from "./portfolio";
import { TechStackContent } from "./tech-stack";

export function Intro() {
  const textToType = "hello world!";
  const [displayedText, setDisplayedText] = useState("");
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("about");

  // Handle Terminal Typing Effect & Trigger Curtain Slide Up
  useEffect(() => {
    let index = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText(textToType.slice(0, index + 1));
      index++;

      if (index >= textToType.length) {
        clearInterval(interval);

        // Wait 1.5 seconds after "hello world!" finishes typing, then pull the curtain up
        const curtainTimeout = setTimeout(() => {
          setIsIntroComplete(true);
        }, 1000);

        return () => clearTimeout(curtainTimeout);
      }
    }, 140);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none transition-colors duration-500 bg-[#fcfaf7] dark:bg-slate-950">
      {/* ================= PHASE 1: THE INTRO CURTAIN ================= */}
      <AnimatePresence>
        {!isIntroComplete && (
          <motion.div
            key="intro-curtain"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            // Added transition-colors and dark classes here:
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 bg-[#fcfaf7] dark:bg-slate-950"
          >
            <div className="flex items-center tracking-tight font-mono font-bold text-5xl md:text-7xl lg:text-8xl">
              {/* Swapped inline styles for text-current or responsive dark classes */}
              <span className="text-[#a67c52] dark:text-amber-400 transition-colors duration-500">
                {displayedText}
              </span>

              {/* The terminal cursor color matches the dark mode variant too */}
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="ml-3 h-[1.1em] w-[0.5em] bg-[#f2eee8] dark:bg-slate-800 transition-colors duration-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Landing Page*/}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isIntroComplete ? 1 : 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mx-auto grid h-full w-full max-w-5xl grid-cols-1 gap-8 px-8 items-center md:grid-cols-[1fr_2.5fr] lg:px-16 text-[#a67c52] dark:text-slate-200 transition-colors duration-500"
      >
        {/* Left Container */}
        <div className="relative flex flex-col h-fit justify-center">
          {/* Navigation Tabs */}
          <nav className="flex flex-col space-y-6">
            {["about", "tech stack", "portfolio", "resume"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="group flex items-center text-left focus:outline-none uppercase tracking-widest text-xs font-bold transition-all duration-300 dark:text-current cursor-pointer"
                  style={{ color: "#a67c52" }}
                >
                  {/* Sliding Line Indicator */}
                  <span
                    // The line still reacts beautifully (w-6 -> w-9 -> w-12), but its opacity stays locked
                    className={`h-[1px] transition-all duration-300 ease-out mr-4 ${
                      isActive
                        ? "w-12 opacity-100 bg-[#a67c52] dark:bg-slate-200"
                        : "w-6 opacity-35 group-hover:w-9 bg-[#a67c52]/60 dark:bg-slate-400"
                    }`}
                    style={{
                      backgroundColor: isActive ? "#a67c52" : undefined,
                    }}
                  />

                  {/* Tab Text */}
                  <span
                    className={`transition-all duration-300 ease-in-out ${
                      isActive
                        ? "opacity-100 tracking-widest text-[#a67c52] dark:text-slate-100"
                        : "opacity-60 text-[#a67c52]/90 dark:text-slate-400"
                    }`}
                    style={{
                      color: isActive ? "#a67c52" : undefined,
                    }}
                  >
                    {tab}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Social Icons */}
          <div
            className="absolute top-full left-2 mt-8 flex items-center space-x-6 dark:text-current"
            style={{ color: "#a67c52" }}
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Right Column */}
        {/* Right Column */}
        <div className="flex flex-col h-fit justify-center max-w-full md:pl-8 w-full">
          <AnimatePresence mode="wait">
            {activeTab === "about" && (
              <motion.div
                key="about-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-4 text-left"
                style={{ color: "#a67c52" }}
              >
                <h1 className="text-4xl md:text-5xl font-sans tracking-tight font-bold dark:text-slate-100">
                  Hi, I am Cassandra.
                </h1>
                <p className="text-lg md:text-xl font-normal leading-relaxed opacity-90 dark:text-slate-300">
                  I like working with data, and making fun things with code.
                </p>
              </motion.div>
            )}

            {/* Tech stack content */}
            {activeTab === "tech stack" && (
              <motion.div
                key="tech-stack-workspace"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <TechStackContent />
              </motion.div>
            )}

            {/* LOAD THE NEW SCROLLABLE PROJECTS ELEMENT */}
            {activeTab === "portfolio" && (
              <motion.div
                key="portfolio-workspace"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-[130%]"
              >
                <PortfolioContent />
              </motion.div>
            )}

            {/* Keep your generic layout fallback tabs placeholder frames safely updated below */}
            {activeTab !== "about" && activeTab !== "portfolio" && (
              <motion.div
                key="fallback-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="text-sm italic opacity-40 font-mono dark:text-slate-400"
                style={{ color: "#a67c52" }}
              >
                //{activeTab} content frame container...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
}
