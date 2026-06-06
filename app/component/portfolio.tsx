import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS_DATA } from "~/data/portfolio";

export function PortfolioContent() {
  const [activeFilter, setActiveFilter] = useState<"all" | "web dev" | "data">(
    "all",
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  // Filter the project array based on selected sub-tab
  const filteredProjects = PROJECTS_DATA.filter(
    (project) => activeFilter === "all" || project.category === activeFilter,
  );

  // Monitor scroll height to show/hide the "Scroll Down" indicator cue dynamically
  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const hasMoreToScroll = el.scrollHeight > el.clientHeight;
      const isNearBottom =
        el.scrollHeight - el.scrollTop <= el.clientHeight + 20;
      setShowScrollIndicator(hasMoreToScroll && !isNearBottom);
    }
  };

  useEffect(() => {
    checkScrollability();
    // Re-check whenever window dimensions scale
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [filteredProjects]);

  return (
    <div className="flex flex-col h-[75vh] w-full relative">
      {/* 1. FILTER CONTROLS */}
      <div className="flex items-center space-x-6 mb-6 pb-2 border-b border-[#a67c52]/10 dark:border-slate-800">
        {(["all", "web dev", "data"] as const).map((filter) => {
          const isSelected = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`relative text-xs uppercase tracking-widest font-bold focus:outline-none transition-colors duration-300 cursor-pointer py-1 ${
                isSelected ? "text-current" : "opacity-40 hover:opacity-80"
              }`}
            >
              <span className="relative z-10">{filter}</span>
              {isSelected && (
                <motion.div
                  layoutId="filterActiveLine"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#a67c52] dark:bg-slate-200"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. SCROLLABLE CONTAINERS GRID */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollability}
        className="flex-1 overflow-y-auto pr-2 space-y-8 scrollbar-thin scrollbar-thumb-amber-700/20"
        style={{ scrollBehavior: "smooth" }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              // The Slide up animation settings from the screen bottom
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.08, // Staggered fluid stack effect
              }}
              // Rectangle Container styling matching image_104a63.jpg framing
              className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden group border border-[#a67c52]/10 dark:border-slate-800 bg-white dark:bg-slate-900/40 shadow-sm"
            >
              {/* Card Image Display */}
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-20 font-mono text-xs">
                    // Placeholder framework card
                  </div>
                )}
                {/* Premium Dark Gradient scrim to keep typography highly legible over any image background */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
              </div>

              {/* Text Meta Content Overlay */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                <span className="text-[10px] tracking-widest font-mono uppercase opacity-60 mb-2">
                  // {project.category}
                </span>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight max-w-md mb-4 text-white">
                  {project.title}
                </h3>

                {/* Interactive Anchor Action Tag mimicking the choice button design */}
                <div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-slate-950 font-medium text-xs rounded-full shadow-md hover:bg-slate-100 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Go to project
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. FLOATING SCROLL CUE INDICATOR */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 right-4 pointer-events-none flex items-center space-x-2 bg-white/90 dark:bg-slate-950/90 text-slate-900 dark:text-slate-100 px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-lg border border-slate-200/50 dark:border-slate-800"
          >
            <span>Scroll to see more</span>
            <motion.svg
              animate={{ y: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
