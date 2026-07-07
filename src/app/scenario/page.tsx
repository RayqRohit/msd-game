"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const scenarios = [
  {
    id: 1,
    title: "YOUR TEAM ASKS YOU TO DECIDE THE MATCH APPROACH.",
    options: [
      { id: 'A', text: "Go all in from the start", image: "/qbtn-a.png" },
      { id: 'B', text: "Read the game before attacking", image: "/qbtn-b.png" },
      { id: 'C', text: "Back the team's strengths", image: "/qbtn-c.png" },
      { id: 'D', text: "Keep everyone guessing", image: "/qbtn-d.png" }
    ]
  },
  {
    id: 2,
    title: "THE OPPOSITION CHANGES THEIR LINEUP AT THE LAST MINUTE.",
    options: [
      { id: 'A', text: "Stick to your original plan", image: "/qbtn-a.png" },
      { id: 'B', text: "Change your strategy too", image: "/qbtn-b.png" },
      { id: 'C', text: "Wait and observe first", image: "/qbtn-c.png" },
      { id: 'D', text: "Trust your instincts", image: "/qbtn-d.png" }
    ]
  },
  {
    id: 3,
    title: "YOU GET ONE CHANCE TO MAKE THE FIRST MOVE.",
    options: [
      { id: 'A', text: "Take the biggest risk while everyone is playing safe", image: "/qbtn-a.png" },
      { id: 'B', text: "Play the move nobody sees coming", image: "/qbtn-b.png" },
      { id: 'C', text: "Trust the plan you've prepared", image: "/qbtn-c.png" },
      { id: 'D', text: "Read the situation before acting", image: "/qbtn-d.png" }
    ]
  }
];

export default function ScenarioScreen() {
  const [currentScenario, setCurrentScenario] = useState(scenarios[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Pick a random scenario on mount
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    setCurrentScenario(randomScenario);
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering the random content until mounted
  if (!mounted) return null;

  return (
    <div className={styles.container}>
      {/* Background Layer */}
      <div className={styles.background}>
        <Image 
          src="/screen5-background.png" 
          alt="Night Stadium Background"
          fill
          priority
          unoptimized
          className={styles.bgImage}
        />
      </div>

      <main className={styles.main}>
        {/* Top Bar with Back Button and Over Counter */}
        <div className={styles.topBar}>
          <Link href="/decision" className={styles.backButton}>
            <Image 
              src="/screen2-backbtn.png" 
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
          Decision-making style
          <span className={styles.starIcon}>★</span>
        </div>

        {/* Header Section */}
        <header className={styles.header}>
          <h1 className={styles.titleLarge}>{currentScenario.title}</h1>
          <p className={styles.subtitle}>What will you do now?</p>
        </header>

        {/* Options Container */}
        <div className={styles.optionsContainer}>
          {currentScenario.options.map((option) => (
            <Link href="/catch" key={option.id} className={styles.optionCard}>
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
