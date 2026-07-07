"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const QUESTIONS = [
  {
    id: 1,
    lines: ["YOU SPOT A WEAKNESS", "IN THE OPPOSITION THAT", "NO ONE ELSE HAS", "NOTICED."],
    options: [
      "Exploit it immediately",
      "Keep it to yourself until the right moment.",
      "Tell the captain and plan together",
      "Wait to see if it happens again"
    ]
  },
  {
    id: 2,
    lines: ["YOU'RE CONVINCED", "YOUR IDEA WILL WORK,", "BUT EVERYONE", "DISAGREES"],
    options: [
      "Go ahead with it anyway",
      "Hear everyone out before deciding",
      "Drop the idea and support the team",
      "Blend your idea with theirs"
    ]
  },
  {
    id: 3,
    lines: ["A RISKY MOVE COULD", "WIN THE MATCH. WOULD", "YOU TAKE YOUR", "CHANCES?"],
    options: [
      "Take it",
      "Calculate it first",
      "Wait for the right moment",
      "Create a different opportunity"
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
    router.push("/batting"); 
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
          <Link href="/field" className={styles.backButton}>
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
            <span className={styles.badgeText}>Instinct or Plan?</span>
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
