"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../question/page.module.css";

const QUESTIONS = [
  {
    id: 1,
    lines: ["YOUR TEAM ASKS YOU", "TO DECIDE THE MATCH", "APPROACH."],
    options: [
      "Go all in from the start",
      "Read the game before attacking",
      "Back the team's strengths",
      "Keep everyone guessing"
    ]
  },
  {
    id: 2,
    lines: ["THE OPPOSITION", "CHANGES THEIR LINEUP", "AT THE LAST MINUTE."],
    options: [
      "Stick to your original plan",
      "Change your strategy too",
      "Wait and observe first",
      "Trust your instincts"
    ]
  },
  {
    id: 3,
    lines: ["YOU GET ONE CHANCE", "TO MAKE THE FIRST", "MOVE."],
    options: [
      "Take the biggest risk while everyone is playing safe",
      "Play the move nobody sees coming",
      "Trust the plan you've prepared",
      "Read the situation before acting"
    ]
  }
];

export default function Question2Screen() {
  const router = useRouter();
  const [question, setQuestion] = useState(QUESTIONS[0]);

  useEffect(() => {
    // Pick a random question when component mounts
    const randomQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setQuestion(randomQ);
  }, []);

  const handleOptionClick = (index: number) => {
    // Navigate to catch screen
    router.push("/catch"); 
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

        <div className={styles.contentWrapper}>
          {/* Action Badge */}
          <div className={styles.leadershipBadge}>
            <span className={styles.starIcon}>★</span>
            <span className={styles.badgeText}>Decision-making style</span>
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
