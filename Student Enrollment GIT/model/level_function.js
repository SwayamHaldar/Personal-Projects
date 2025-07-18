import React, { useState } from "react";

export default function LevelTracker() {
  const LEVELS = ["Basic", "Beginner", "Intermediate", "Hard", "Practical"];

  // React state map: key = subject name, value = level index (0 to 4)
  const [progressMap, setProgressMap] = useState({
    Acoustics: Acoustics_level,
    Astronomy: Astronomy_level,
    AstroPhysics: AstroPhysics_level,
    Biology: Biology_level,
    Biophysics: BoiPhy_level,
    "BOOM! A Thermonuclear Guide": Thermodynamic_level,
    Botany: Botany_level,
    "CHAPTER Knowledge: Salamanders": Chapters_level,
    Chemistry: Chemistry_level,
    Computer: Computer_level,
    Geology: Geology_level,
    Maths: Maths_level,
    Physics: Physics_level,
    Pottery: Pottery_level,
    Pshycoanalysis: Pshycoanalysis_level,
    "Resonate Theory": Resonance_level,
    Science: Science_level,
    "Wave Theory": Wave_theory_level,
  });

  // Function to level up a subject
  const advanceLevel = (subject) => {
    setProgressMap((prevMap) => {
      const currentLevel = prevMap[subject] ?? 0;
      const nextLevel = Math.min(currentLevel + 1, LEVELS.length - 1);
      return {
        ...prevMap,
        [subject]: nextLevel,
      };
    });
  };

  return (
    <div>
      {Object.entries(progressMap).map(([subject, level]) => (
        <div key={subject}>
          <strong>{subject}</strong>: {LEVELS[level]}
          <button onClick={() => advanceLevel(subject)}>Level Up</button>
        </div>
      ))}
    </div>
  );
}
