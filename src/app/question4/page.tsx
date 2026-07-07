"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../question/page.module.css";

const QUESTIONS = [
  {
    id: 1,
    lines: ["A TEAMMATE MAKES THE", "SAME MISTAKE TWICE.", "WHAT WOULD YOU DO?"],
    options: [
      { text: "Encourage them", points: { L: 3, C: 3, S: 1, E: 1, I: 1, T: 4 } },
      { text: "Give them responsibility", points: { L: 4, C: 2, S: 2, E: 2, I: 1, T: 3 } },
      { text: "Leave them alone for now", points: { L: 1, C: 2, S: 1, E: 2, I: 2, T: 1 } },
      { text: "Help them improve", points: { L: 3, C: 3, S: 3, E: 3, I: 1, T: 4 } }
    ]
  },
  {
    id: 2,
    lines: ["A STAR PLAYER IS", "HAVING AN OFF DAY.", "WHAT WOULD YOU ADVICE THEM?"],
    options: [
      { text: "Keep backing them", points: { L: 3, C: 3, S: 1, E: 1, I: 1, T: 4 } },
      { text: "Replace them, no matter who they are", points: { L: 2, C: 1, S: 3, E: 4, I: 1, T: 1 } },
      { text: "Reduce the pressure on them", points: { L: 2, C: 4, S: 2, E: 1, I: 1, T: 3 } },
      { text: "Let them prove themselves", points: { L: 4, C: 3, S: 2, E: 2, I: 2, T: 2 } }
    ]
  },
  {
    id: 3,
    lines: ["YOUR TEAMMATE WANTS", "TO TAKE A RISKY SHOT.", "WOULD YOU APPROVE?"],
    options: [
      { text: "Back them", points: { L: 3, C: 2, S: 1, E: 2, I: 2, T: 4 } },
      { text: "Suggest a safer option", points: { L: 2, C: 4, S: 3, E: 2, I: 1, T: 2 } },
      { text: "Ask what they're thinking", points: { L: 3, C: 3, S: 4, E: 1, I: 2, T: 3 } },
      { text: "Let them decide", points: { L: 1, C: 2, S: 1, E: 2, I: 4, T: 2 } }
    ]
  }
];

export default function Question4Screen() {
  const router = useRouter();
  const [question, setQuestion] = useState(QUESTIONS[0]);

  useEffect(() => {
    // Pick a random question when component mounts
    const randomQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setQuestion(randomQ);
  }, []);

  const handleOptionClick = (index: number) => {
    // Save points to localStorage
    const selectedPoints = question.options[index].points as Record<string, number>;
    const addPoints = (key: string, val: number) => {
      const current = parseInt(localStorage.getItem(key) || "0", 10);
      localStorage.setItem(key, (current + val).toString());
    };

    addPoints("stats_L", selectedPoints.L);
    addPoints("stats_C", selectedPoints.C);
    addPoints("stats_S", selectedPoints.S);
    addPoints("stats_E", selectedPoints.E);
    addPoints("stats_I", selectedPoints.I);
    addPoints("stats_T", selectedPoints.T);

    // Navigate to field screen
    router.push("/field");
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
          <Link href="/throw" className={styles.backButton}>
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
            <span className={styles.overNumber}>5/8</span>
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
                <span className={styles.optionText}>{opt.text}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
