import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "../component/icon";
import { PortfolioContent } from "./portfolio";
import { TechStackContent } from "./tech-stack";
import { useSearchParams } from "react-router";
import { ExperienceContent } from "./experience";

export function Intro() {
  const textToType = "hello world!";
  const [displayedText, setDisplayedText] = useState("");

  // Safe fallback initial state for SSR
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Search Params hook
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the '?tab=' value from the URL. If it's empty, default straight to "about"
  const activeTab = searchParams.get("tab") || "about";

  // Check sessionStorage ONLY after mounting on the client browser
  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("introPlayed") === "true";
    if (hasPlayed) {
      setIsIntroComplete(true);
    }
  }, []);

  // Terminal Typing Effect & Curtain Slide Up Logic
  useEffect(() => {
    if (isIntroComplete) return;

    let index = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText(textToType.slice(0, index + 1));
      index++;

      if (index >= textToType.length) {
        clearInterval(interval);

        const curtainTimeout = setTimeout(() => {
          sessionStorage.setItem("introPlayed", "true");
          setIsIntroComplete(true);
        }, 1000);

        return () => clearTimeout(curtainTimeout);
      }
    }, 140);

    return () => clearInterval(interval);
  }, [isIntroComplete]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Define navigation structure u
  const tabs = [
    { id: "about", label: "about" },
    { id: "tech-stack", label: "tech stack" },
    { id: "portfolio", label: "portfolio" },
    { id: "experience", label: "experience" },
  ];

  return (
    <div className="relative h-screen w-screen overflow-hidden select-none transition-colors duration-500 bg-[#fcfaf7] dark:bg-slate-950">
      {/*Intro curtain */}
      <AnimatePresence>
        {!isIntroComplete && (
          <motion.div
            key="intro-curtain"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 bg-[#fcfaf7] dark:bg-slate-950"
          >
            <div className="flex items-center tracking-tight font-mono font-bold text-5xl md:text-7xl lg:text-8xl">
              <span className="text-[#a67c52] dark:text-amber-400 transition-colors duration-500">
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-block ml-1 h-[1.1em] w-[0.5em] bg-[#f2eee8] dark:bg-slate-800 align-middle"
                />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MOBILE ONLY --- */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isIntroComplete ? 1 : 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="md:hidden fixed top-6 left-6 z-[80]"
      >
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block h-[1.5px] w-6 bg-[#a67c52] dark:bg-slate-300 origin-center"
          />

          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block h-[1.5px] w-6 bg-[#a67c52] dark:bg-slate-300"
          />

          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block h-[1.5px] w-6 bg-[#a67c52] dark:bg-slate-300 origin-center"
          />
        </button>
      </motion.div>

      {/* Social icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isIntroComplete ? 1 : 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="md:hidden fixed top-8 right-15 z-[60] flex items-center gap-5"
        style={{ color: "#a67c52" }}
      >
        <a
          href="https://github.com/cassandra-l"
          target="_blank"
          rel="noreferrer"
          className="opacity-60 hover:opacity-100 transition-opacity duration-200"
        >
          <Github size={20} />
        </a>

        <a
          href="https://www.linkedin.com/in/cassandra-lzc/"
          target="_blank"
          rel="noreferrer"
          className="opacity-60 hover:opacity-100 transition-opacity duration-200"
        >
          <Linkedin size={20} />
        </a>

        <a
          href="mailto:zhicheng1224@gmail.com"
          className="opacity-60 hover:opacity-100 transition-opacity duration-200"
        >
          <Mail size={20} />
        </a>
      </motion.div>

      {/* Slide-in drawer + backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-[40] bg-black/40"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
              className="md:hidden fixed top-0 left-0 h-full z-[70] flex flex-col justify-center px-10 bg-[#fcfaf7] dark:bg-slate-950"
              style={{ width: "66.666%" }}
            >
              <nav className="flex flex-col space-y-8">
                {tabs.map(({ id, label }) => {
                  const isActive = activeTab === id;
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        if (id === "about") {
                          setSearchParams({});
                        } else {
                          setSearchParams({ tab: id });
                        }
                        setMenuOpen(false);
                      }}
                      className="group flex items-center text-left uppercase tracking-widest text-xs font-bold transition-all duration-300 focus:outline-none cursor-pointer"
                      style={{ color: "#a67c52" }}
                    >
                      <span
                        className={`h-[1px] transition-all duration-300 ease-out mr-4 ${
                          isActive
                            ? "w-12 opacity-100 bg-[#a67c52] dark:bg-slate-200"
                            : "w-6 opacity-35 group-hover:w-9 bg-[#a67c52]/60 dark:bg-slate-400"
                        }`}
                      />
                      <span
                        className={`transition-all duration-300 ease-in-out ${
                          isActive
                            ? "opacity-100 tracking-widest text-[#a67c52] dark:text-slate-100"
                            : "opacity-60 text-[#a67c52]/90 dark:text-slate-400"
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main page */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isIntroComplete ? 1 : 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid h-full w-full max-w-6xl grid-cols-1 gap-8 px-8 items-center md:grid-cols-[1fr_2.5fr] lg:pl-16 pr-20 text-[#a67c52] dark:text-slate-200 transition-colors duration-500 ml-0 md:ml-[max(2rem,calc((100vw-64rem)/2))]"
      >
        {/* Left Container */}
        <div className="relative hidden md:flex flex-col h-fit justify-center">
          <nav className="flex flex-col space-y-6">
            {tabs.map(({ id, label }) => {
              const isActive = activeTab === id;

              return (
                <button
                  key={id}
                  onClick={() => {
                    if (id === "about") {
                      setSearchParams({});
                    } else {
                      setSearchParams({ tab: id });
                    }
                  }}
                  className="group flex items-center text-left uppercase tracking-widest text-xs font-bold transition-all duration-300 focus:outline-none cursor-pointer"
                  style={{ color: "#a67c52" }}
                >
                  <span
                    className={`h-[1px] transition-all duration-300 ease-out mr-4 ${
                      isActive
                        ? "w-12 opacity-100 bg-[#a67c52] dark:bg-slate-200"
                        : "w-6 opacity-35 group-hover:w-9 bg-[#a67c52]/60 dark:bg-slate-400"
                    }`}
                  />

                  <span
                    className={`transition-all duration-300 ease-in-out ${
                      isActive
                        ? "opacity-100 tracking-widest text-[#a67c52] dark:text-slate-100"
                        : "opacity-60 text-[#a67c52]/90 dark:text-slate-400"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Social Icons — desktop  */}
          <div
            className="absolute top-full left-2 mt-8 flex items-center space-x-6 dark:text-current"
            style={{ color: "#a67c52" }}
          >
            <a
              href="https://github.com/cassandra-l"
              target="_blank"
              rel="noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/cassandra-lzc/"
              target="_blank"
              rel="noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:zhicheng1224@gmail.com"
              className="opacity-60 hover:opacity-100 transition-opacity duration-200"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Right Column Workspace */}
        <div className="flex flex-col justify-center max-w-full md:pl-8 w-full h-[75vh]">
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

            {activeTab === "tech-stack" && (
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

            {activeTab === "portfolio" && (
              <motion.div
                key="portfolio-workspace"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-[110%]"
              >
                <PortfolioContent />
              </motion.div>
            )}

            {activeTab === "experience" && (
              <motion.div
                key="experience-workspace"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full md:h-auto h-full overflow-y-auto"
              >
                <ExperienceContent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.main>
    </div>
  );
}
