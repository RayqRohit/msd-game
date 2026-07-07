"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function BattingScreen() {
  const router = useRouter();
  const [runsLeft, setRunsLeft] = useState(14);
  const [ballsLeft, setBallsLeft] = useState(4);
  const [totalRunsScored, setTotalRunsScored] = useState(0);

  const [ballPosition, setBallPosition] = useState(50); // 0 to 100%
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const [result, setResult] = useState<{ title: string, type: 'perfect' | 'good' | 'miss', runsScored: number } | null>(null);
  const requestRef = useRef<number | null>(null);

  // Oscillate the ball
  useEffect(() => {
    if (!isPlaying) {
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
      return;
    }

    let lastTime = performance.now();
    let currentPos = ballPosition;
    let currentDir = direction;

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      // Calculate distance from center (50%)
      const distance = Math.abs(currentPos - 50);

      // Dynamic speed based on zone (pixels per ms)
      // Normalize distance from 0 (center) to 1 (edges, approx 42.5 distance)
      const normalizedDistance = Math.min(distance / 42.5, 1);

      // Use a cosine easing function for a buttery smooth speed transition
      // It will be 0.14 at the exact center, and smoothly decelerate to 0.04 at the edges
      const speedMultiplier = Math.cos(normalizedDistance * (Math.PI / 2));
      const speed = 0.04 + (0.10 * speedMultiplier);

      currentPos += currentDir * speed * deltaTime;

      if (currentPos >= 92.5) {
        currentPos = 92.5;
        currentDir = -1;
      } else if (currentPos <= 7.5) {
        currentPos = 7.5;
        currentDir = 1;
      }

      setBallPosition(currentPos);
      setDirection(currentDir);
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  const handleTap = () => {
    if (!isPlaying) return;
    setIsPlaying(false);

    // Calculate score based on how close position is to 50%
    const distance = Math.abs(ballPosition - 50);

    let hitResult: { title: string, type: 'perfect' | 'good' | 'miss', runsScored: number };

    // Green zone (approx center, 40% to 60%)
    if (distance <= 10) {
      hitResult = { title: "PERFECT TIMING!", type: 'perfect', runsScored: 6 };
    }
    // Blue zone (approx 20% to 40% and 60% to 80%)
    else if (distance <= 30) {
      hitResult = { title: "GOOD SHOT!", type: 'good', runsScored: 4 };
    }
    // Red zone (edges)
    else {
      hitResult = { title: "POOR TIMING", type: 'miss', runsScored: 2 };
    }

    setResult(hitResult);

    // Immediately update the display
    setRunsLeft(prev => Math.max(0, prev - hitResult.runsScored));
    setBallsLeft(prev => prev - 1);
    setTotalRunsScored(prev => prev + hitResult.runsScored);
  };

  const handleNextBall = () => {
    setResult(null);
    setBallPosition(50);
    setDirection(1);
    setIsPlaying(true);
  };

  return (
    <div className={styles.container} onClick={handleTap}>
      {/* Background Layer */}
      <div className={styles.background}>
        <Image
          src="/screen10-background.png"
          alt="Batting Background"
          fill
          priority
          unoptimized
          className={styles.bgImage}
        />
      </div>

      <main className={styles.main}>
        {/* Top Bar with Back Button and Over Counter */}
        <div className={styles.topBar}>
          <Link href="/question4" className={styles.backButton}>
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
            <span className={styles.overNumber}>8/8</span>
          </div>
        </div>

        {/* Action Badge */}
        <div className={styles.badge}>
          <span className={styles.starIcon}>★</span>
          Its your time to shine
          <span className={styles.starIcon}>★</span>
        </div>

        {/* Score Target */}
        <div className={styles.scoreContainer}>
          <div className={styles.runsText}>{runsLeft} RUNS</div>
          <div className={styles.ballsText}>IN {ballsLeft} BALLS</div>
        </div>

        {/* Timing Minigame */}
        <div className={styles.timingContainer}>
          <div className={styles.sliderBox}>
            <Image
              src="/screen10-launching-background.png"
              alt="Slider Background"
              fill
              className={styles.sliderBg}
              unoptimized
            />
            <div className={styles.gradientBar}>
              <div
                className={styles.ballThumb}
                style={{ left: `${ballPosition}%` }}
              >
                <Image
                  src="/screen10-ball.png"
                  alt="Timing Ball"
                  fill
                  unoptimized
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <div className={styles.tapInstruction}>
            TAP THE BALL ON PERFECT TIMING
          </div>
        </div>

        {/* Result Overlay */}
        {result && (
          <div className={styles.resultOverlay}>
            <div className={`${styles.resultTitle} ${styles[result.type]}`}>
              {result.title}
            </div>
            <div className={styles.resultRuns}>+{result.runsScored} RUNS</div>

            {runsLeft <= 0 ? (
              <button className={styles.nextButton} onClick={(e) => { 
                e.stopPropagation(); 
                localStorage.setItem('runs_scored', totalRunsScored.toString());
                router.push('/result'); 
              }}>FINISH</button>
            ) : ballsLeft === 0 ? (
              <button className={styles.nextButton} onClick={(e) => { e.stopPropagation(); window.location.reload(); }}>TRY AGAIN</button>
            ) : (
              <button className={styles.nextButton} onClick={(e) => { e.stopPropagation(); handleNextBall(); }}>NEXT BALL</button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
