"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../scenario/page.module.css";

const scenarios = [
  {
    id: 1,
    title: "THE MATCH SUDDENLY SLIPS AWAY. WHAT'S YOUR REACTION?",
    options: [
      { id: 'A', text: "Focus on the next ball", image: "/qbtn-a.png" },
      { id: 'B', text: "Change the tempo", image: "/qbtn-b.png" },
      { id: 'C', text: "Lift everyone's confidence", image: "/qbtn-c.png" },
      { id: 'D', text: "Find another way in", image: "/qbtn-d.png" }
    ]
  },
  {
    id: 2,
    title: "EVERYONE AROUND YOU STARTS PANICKING. HOW WOULD YOU GUIDE YOUR TEAMMATES?",
    options: [
      { id: 'A', text: "Stay silent and composed", image: "/qbtn-a.png" },
      { id: 'B', text: "Give clear instructions", image: "/qbtn-b.png" },
      { id: 'C', text: "Keep the mood light", image: "/qbtn-c.png" },
      { id: 'D', text: "Slow the game down", image: "/qbtn-d.png" }
    ]
  },
  {
    id: 3,
    title: "ONE OVER. ONE CHANCE. WHAT'S YOUR CALL?",
    options: [
      { id: 'A', text: "Gamble on an attacking move", image: "/qbtn-a.png" },
      { id: 'B', text: "Back your most reliable player", image: "/qbtn-b.png" },
      { id: 'C', text: "Change everything at the last minute", image: "/qbtn-c.png" },
      { id: 'D', text: "Trust the process till the end", image: "/qbtn-d.png" }
    ]
  }
];

export default function Scenario2Screen() {
  const [currentScenario, setCurrentScenario] = useState<typeof scenarios[0] | null>(null);

  useEffect(() => {
    // Select a random scenario on mount
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    setCurrentScenario(scenarios[randomIndex]);
  }, []);

  if (!currentScenario) {
    return null; // Or a loading spinner
  }

  return (
    <div className={styles.container}>
      {/* Background Layer */}
      <div className={styles.background}>
        <Image
          src="/screen5-background.png"
          alt="Stadium Background"
          fill
          priority
          unoptimized
          className={styles.bgImage}
        />
      </div>

      <main className={styles.main}>
        {/* Top Bar with Back Button and Over Counter */}
        <div className={styles.topBar}>
          <Link href="/catch" className={styles.backButton}>
            <Image
              src="/screen2-backbtn.svg"
              alt="Back"
              width={44}
              height={44}
              unoptimized
            />
          </Link>
          <div className={styles.overBadge}>
            <span className={styles.overText}>OVER</span>
            <span className={styles.overNumber}>1/16</span>
          </div>
        </div>

        {/* Decision Badge */}
        <div className={styles.decisionBadge}>
          <span className={styles.starIcon}>★</span>
          The Pressure Builds
          <span className={styles.starIcon}>★</span>
        </div>

        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={styles.titleLarge}>{currentScenario.title}</h1>
          <p className={styles.subtitle}>What will you do now?</p>
        </div>

        {/* Options Container */}
        <div className={styles.optionsContainer}>
          {currentScenario.options.map((option) => (
            <Link href="/throw" key={option.id} className={styles.optionCard}>
              <div className={styles.optionImageWrapper}>
                <Image
                  src={option.image}
                  alt={`Option ${option.id}`}
                  fill
                  unoptimized
                  className={styles.fullButtonImage}
                />
              </div>
              <span className={styles.optionTextOverlaid}>{option.text}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
