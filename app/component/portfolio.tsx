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
  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (activeFilter === "all") return true;
    return project.category.includes(activeFilter as "web dev" | "data");
  });

  // Monitor scroll height to show/hide the scroll indicator
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
      {/* Filter */}
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

      {/* Container Card */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollability}
        className="flex-1 overflow-y-auto pr-2 space-y-8 scrollbar-thin scrollbar-thumb-amber-700/20"
        style={{ scrollBehavior: "smooth" }}
      >
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.4 },
                layout: { type: "spring", stiffness: 100, damping: 25 },
              }}
              className="relative w-full min-h-[300px] rounded-xl overflow-hidden group border border-[#a67c52]/10 dark:border-slate-800 bg-white dark:bg-slate-900/40"
            >
              <a
                href={project.link}
                className="block w-full h-full cursor-pointer"
              >
                {/* Card Image */}
                <div className="absolute inset-0 w-full h-full bg-slate-900">
                  <img
                    src={project.image}
                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 dark:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Meta data */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <div className="mb-4">
                    <span className="text-[10px] tracking-widest font-mono uppercase opacity-70 block mb-1 ">
                      // {project.category.join(" // ")}
                    </span>
                    {/* Title and Subtitle */}
                    <h3 className="text-2xl font-bold tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm opacity-80 mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech?.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-white/10 text-[9px] font-mono border border-white/10 backdrop-blur-2xl"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div>
                    <a
                      href={project.link}
                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#f2eee8] text-[#a67c52] text-xs font-bold rounded-full transition-all group"
                    >
                      <span>Go to project</span>
                      <span className="ml-2 inline-block transition-transform duration-300 origin-left group-hover:scale-x-150">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 right-4 pointer-events-none flex items-center space-x-2 bg-white/80  dark:border-slate-800 dark:bg-slate-950/90 px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest shadow-lg "
          >
            <span className=" text-[#a67c52] backdrop-blur-3xl">
              Scroll to see more
            </span>
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
              stroke="#a67c52"
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
