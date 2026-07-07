"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../question/page.module.css";

const QUESTIONS = [
  {
    id: 1,
    lines: ["THE MATCH SUDDENLY", "SLIPS AWAY. WHAT'S", "YOUR REACTION?"],
    options: [
      "Focus on the next ball",
      "Change the tempo",
      "Lift everyone's confidence",
      "Find another way in"
    ]
  },
  {
    id: 2,
    lines: ["EVERYONE AROUND YOU", "STARTS PANICKING.", "HOW WOULD YOU GUIDE", "YOUR TEAMMATES?"],
    options: [
      "Stay silent and composed",
      "Give clear instructions",
      "Keep the mood light",
      "Slow the game down"
    ]
  },
  {
    id: 3,
    lines: ["ONE OVER. ONE CHANCE.", "WHAT'S YOUR CALL?"],
    options: [
      "Gamble on an attacking move",
      "Back your most reliable player",
      "Change everything at the last minute",
      "Trust the process till the end"
    ]
  }
];

export default function Question3Screen() {
  const router = useRouter();
  const [question, setQuestion] = useState(QUESTIONS[0]);

  useEffect(() => {
    // Pick a random question when component mounts
    const randomQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setQuestion(randomQ);
  }, []);

  const handleOptionClick = (index: number) => {
    // Navigate to throw screen
    router.push("/throw"); 
  };

  return (
    <div className={styles.container}>
      {/* Background Layer */}
      <div className={styles.background}>
        <Image 
          src="/questions-background.png" 
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

        <div className={styles.contentWrapper}>
          {/* Action Badge */}
          <div className={styles.leadershipBadge}>
            <span className={styles.starIcon}>★</span>
            <span className={styles.badgeText}>The Pressure Builds</span>
            <span className={styles.starIcon}>★</span>
          </div>

          <h1 className={styles.questionTitle}>
            {question.lines.map((line, i) => (
              <span key={i} className={styles.questionLine}>{line}</span>
            ))}
          </h1>

          <p className={styles.promptText}>
            What will you do now?
          </p>

          <div className={styles.optionsContainer}>
            {question.options.map((opt, i) => (
              <div 
                key={i} 
                className={styles.optionButton}
                onClick={() => handleOptionClick(i)}
              >
                <Image 
                  src={`/qbtn-${String.fromCharCode(97 + i)}.png`} 
                  alt={`Option ${String.fromCharCode(65 + i)}`}
                  fill
                  className={styles.optionBg}
                  unoptimized
                  draggable={false}
                />
                <span className={styles.optionText}>{opt}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
