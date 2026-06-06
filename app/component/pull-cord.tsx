import { motion } from "framer-motion";
import { useDarkMode } from "~/hooks/useDarkMode";
import { useState } from "react";

export function PullCord() {
  const { theme, toggleTheme } = useDarkMode();
  const [isPulled, setIsPulled] = useState(false);

  return (
    <motion.div
      className="fixed top-0 right-5 flex flex-col items-center z-50 cursor-pointer"
      onPointerDown={() => setIsPulled(true)}
      onPointerUp={() => {
        setIsPulled(false);
        toggleTheme();
      }}
      onPointerLeave={() => setIsPulled(false)}
    >
      {/* The String */}
      <motion.div
        className="w-0.5 bg-[#f59e0b] dark:bg-slate-700 origin-top"
        style={{ height: 128 }}
        animate={{ height: isPulled ? 138 : 128 }}
        transition={{
          type: "spring",
          stiffness: isPulled ? 600 : 60,
          damping: isPulled ? 30 : 20,
          restDelta: 0.001,
        }}
      ></motion.div>

      {/* The Lamp Handle */}
      <motion.div
        // animate={{
        //   y: isPulled ? 0 : -5,
        // }}
        className="
        group w-10 h-16 rounded-xl flex flex-col items-center justify-center gap-1.5
        
        /* Background */
       bg-white dark:bg-slate-900
    
        /* Border */
        border-2 border-amber-200 dark:border-slate-700

        /* Ring */
        ring-1 ring-amber-50 dark:ring-slate-800
    
        /* Shadow */
        shadow-[0_10px_20px_-5px] shadow-amber-500/20
        dark:shadow-[0_10px_25px_-5px] dark:shadow-indigo-500/30

        /* Hover */
        hover:scale-105 transition-all duration-500 ease-in-out
        hover:shadow-[0_25px_50px_-12px] hover:shadow-amber-500/40
         dark:hover:shadow-[0_25px_50px_-12px] dark:hover:shadow-indigo-500/60
        "
      >
        <div className="absolute inset-0 rounded-full blur-xl hover:bg-amber-400 dark:hover:bg-indigo-500 opacity-0 group-hover:opacity-40 transition-opacity duration-700 ease-in-out"></div>
        {/* Icon Container */}
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-amber-500 dark:text-indigo-400 pointer-events-none"
        >
          {theme === "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </motion.div>
        <div className="w-1.5 h-3.5 rounded-full bg-amber-50 shadow-inner shadow-amber-700/25 border border-amber-200/50 dark:bg-indigo-500 dark:shadow-indigo-500/60 dark:border-indigo-400"></div>
      </motion.div>
    </motion.div>
  );
}
