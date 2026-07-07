"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const QUESTIONS = [
  {
    id: 1,
    lines: ["A TEAMMATE MAKES THE", "SAME MISTAKE TWICE.", "WHAT WOULD YOU DO?"],
    options: [
      "Encourage them",
      "Give them responsibility",
      "Leave them alone for now",
      "Help them improve"
    ]
  },
  {
    id: 2,
    lines: ["A STAR PLAYER IS", "HAVING AN OFF DAY.", "WHAT WOULD YOU ADVICE THEM?"],
    options: [
      "Keep backing them",
      "Replace them, no matter who they are",
      "Reduce the pressure on them",
      "Let them prove themselves"
    ]
  },
  {
    id: 3,
    lines: ["YOUR TEAMMATE WANTS", "TO TAKE A RISKY SHOT.", "WOULD YOU APPROVE?"],
    options: [
      "Back them",
      "Suggest a safer option",
      "Ask what they're thinking",
      "Let them decide"
    ]
  }
];

export default function QuestionScreen() {
  const router = useRouter();
  const [question, setQuestion] = useState(QUESTIONS[0]);

  useEffect(() => {
    // Pick a random question when component mounts
    const randomQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setQuestion(randomQ);
  }, []);

  const handleOptionClick = (index: number) => {
    // For now, after selecting an option, we can redirect back to scenario or the next part of the game
    router.push("/scenario2"); 
  };

  return (
    <div className={styles.container}>
      {/* Background Layer */}
      <div className={styles.background}>
        <Image 
          src="/screen1-bg.png" 
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
          <Link href="/scenario2" className={styles.backButton}>
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
            <span className={styles.badgeText}>Leadership & emotional intelligence</span>
            <span className={styles.starIcon}>★</span>
          </div>

          <h1 className={styles.questionTitle}>
            {question.lines.map((line, i) => (
              <div key={i} className={styles.lineWrapper}>
                <span className={styles.questionLine}>{line}</span>
              </div>
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
                <div className={styles.hexagonWrapper}>
                  <div className={styles.hexagon}>
                    <span className={styles.hexagonText}>
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                </div>
                <span className={styles.optionText}>{opt}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
