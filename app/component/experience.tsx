const roles = [
  {
    company: "FoodPanda",
    role: "Data Analyst Intern",
    period: "Dec 2025 – Feb 2026",
    tech: ["Python", "Machine Learning", "SQL", "Tableau", "Git"],
    description: [
      "Built an XGBoost fraud detection model that achieved an 81% F1 score by identifying high-risk customers from historical refund dispute data. Combined SQL-based data extraction, feature engineering and exploratory analysis to uncover behavioural patterns, while addressing severe class imbalance using SMOTE and class weighting techniques.",
    ],
  },
  {
    company: "Women4STEM",
    role: "Data Analyst Volunteer",
    period: "Sep 2025 – Present",
    tech: ["Data Integration", "Power BI", "Python", "R"],
    description: [
      "Developed a data pipeline using Microsoft Fabric to automate the ingestion of Zoom, Humanitix and survey data, saving over 3 hours of manual work each week. Designed a Power BI engagement dashboard for tracking participant outcomes and conducted retrospective analysis to support planning for future programs.",
    ],
  },
];

export function ExperienceContent() {
  return (
    <div className="space-y-12 max-w-2xl" style={{ color: "#a67c52" }}>
      {roles.map((job, idx) => (
        <div key={idx}>
          <h3 className="text-xl font-bold dark:text-slate-100">
            {job.role} | {job.company}
          </h3>
          <p className="text-sm opacity-70 mb-3 italic">{job.period}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {job.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-[10px] uppercase tracking-wider bg-[#a67c52]/10 rounded-full font-bold"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed opacity-90 dark:text-slate-300">
            {job.description}
          </p>
        </div>
      ))}

      <a
        href="/Cassandra_LEE_resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="inline-block px-8 py-3 rounded-2xl border border-[#a67c52] text-[#a67c52] hover:bg-[#a67c52] hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-xs"
      >
        View Full Resume
      </a>
    </div>
  );
}
