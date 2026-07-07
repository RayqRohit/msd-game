"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function CatchScreen() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(10);
  const [runs, setRuns] = useState(0);
  const [catches, setCatches] = useState(0);
  const [ballPos, setBallPos] = useState({ top: 50, left: 50 });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            setTimeout(() => {
              router.push("/question3");
            }, 1500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, router]);

  const startGame = () => {
    if (!isPlaying && timeLeft === 10) {
      setIsPlaying(true);
      moveBall();
    }
  };

  const moveBall = () => {
    // Random position within 10% to 80% to keep it inside the box
    const randomTop = Math.floor(Math.random() * 70) + 10;
    const randomLeft = Math.floor(Math.random() * 70) + 10;
    setBallPos({ top: randomTop, left: randomLeft });
  };

  const handleBallClick = () => {
    if (!isPlaying) return;
    setRuns((prev) => prev + 2);
    setCatches((prev) => prev + 1);
    moveBall();
  };

  return (
    <div className={styles.container}>
      {/* Background Layer */}
      <div className={styles.background}>
        <Image 
          src="/screen6-background.png" 
          alt="Stadium Background"
          fill
          priority
          unoptimized
          className={styles.bgImage}
        />
      </div>

      {/* Background Overlay */}
      <div className={styles.overlayContainer}>
        <Image 
          src="/screen6-bg-overlay.png" 
          alt="Background Overlay"
          fill
          unoptimized
          className={styles.overlayImage}
        />
      </div>

      <main className={styles.main}>
        {/* Top Bar with Back Button and Over Counter */}
        <div className={styles.topBar}>
          <Link href="/scenario" className={styles.backButton}>
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

        {/* Catch Badge */}
        <div className={styles.badge}>
          <span className={styles.starIcon}>★</span>
          Catch the Opportunities!
          <span className={styles.starIcon}>★</span>
        </div>

        {/* Scoreboard */}
        <div className={styles.scoreboard}>
          <div className={styles.scoreBox}>
            <span className={styles.scoreLabel}>RUN</span>
            <span className={styles.scoreValue}>+{runs}</span>
          </div>
          
          <div className={styles.timeCircle}>
            <span className={styles.timeLabel}>TIME</span>
            <span className={styles.timeValue}>{timeLeft}</span>
            <span className={styles.timeUnit}>SEC</span>
          </div>
          
          <div className={styles.scoreBox}>
            <span className={styles.scoreLabel}>CATCH</span>
            <span className={styles.scoreValue}>{catches < 10 ? `0${catches}` : catches}</span>
          </div>
        </div>

        {/* Play Area */}
        <div className={styles.playAreaTransparent}>
          {isPlaying ? (
            <Image 
              src="/screen6-bowl.png" 
              alt="Cricket Ball"
              width={60}
              height={60}
              unoptimized
              className={styles.activeBall}
              style={{ top: `${ballPos.top}%`, left: `${ballPos.left}%` }}
              onClick={handleBallClick}
            />
          ) : timeLeft === 0 ? (
            <div className={styles.gameOverText}>Time's Up!</div>
          ) : (
            <div className={styles.startText}>Tap button below to start</div>
          )}
        </div>

        {/* Gloves placed absolutely at the bottom, overlapping playArea but behind catchButton */}
        <div className={styles.glovesContainer}>
          <Image 
            src="/screen6-gloves.png" 
            alt="Wicket Keeper Gloves"
            width={480}
            height={300}
            unoptimized
            className={styles.glovesImage}
          />
        </div>

        {/* Catch Button */}
        <button className={styles.catchButton} onClick={startGame} disabled={isPlaying || timeLeft === 0}>
          {isPlaying ? "PLAYING..." : timeLeft === 0 ? "GAME OVER" : "TAP ON BALL TO CATCH"}
        </button>
      </main>
    </div>
  );
}


