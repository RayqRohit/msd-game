"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type BallPosition = 'left' | 'center' | 'right';
type BallPathMap = Partial<Record<BallPosition, BallPosition>>;

export default function ThrowScreen() {
  const router = useRouter();
  const [thrownBalls, setThrownBalls] = useState<BallPathMap>({});
  const [vanishedBalls, setVanishedBalls] = useState<BallPosition[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const [swipeStart, setSwipeStart] = useState<{ x: number; y: number; ball: BallPosition } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, ball: BallPosition) => {
    // If already thrown or vanished, ignore
    if (thrownBalls[ball] || vanishedBalls.includes(ball)) return;

    // Capture pointer so we can track the drag even if it leaves the ball's boundaries
    e.currentTarget.setPointerCapture(e.pointerId);
    setSwipeStart({ x: e.clientX, y: e.clientY, ball });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>, ball: BallPosition) => {
    if (!swipeStart || swipeStart.ball !== ball) return;

    e.currentTarget.releasePointerCapture(e.pointerId);

    const deltaX = e.clientX - swipeStart.x;
    const deltaY = e.clientY - swipeStart.y;

    setSwipeStart(null);

    let isThrow = false;
    let isHit = false;

    // Check if it was a swipe up
    if (deltaY < -40) {
      isThrow = true;
      // Skill-based swipe: if horizontal drift is less than half the vertical distance, it's a direct hit.
      isHit = Math.abs(deltaX) < Math.abs(deltaY) * 0.5;
    }
    // Check if it was a tap (very little movement)
    else if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      isThrow = true;
      // Luck-based tap: random chance to hit or miss (50/50)
      isHit = Math.random() > 0.5;
    }

    if (isThrow) {
      const path = isHit ? 'center' : (Math.random() > 0.5 ? 'left' : 'right');

      setThrownBalls((prev) => ({ ...prev, [ball]: path }));
      setResult(null); // Clear previous result instantly

      // Animate for 800ms then show result
      setTimeout(() => {
        if (isHit) {
          setResult("+6 RUNS! DIRECT HIT!");
        } else {
          setResult("MISS! 0\nRUNS");
        }

        // Hide result and vanish the ball after 1.5 seconds
        setTimeout(() => {
          setResult(null);
          setVanishedBalls((prev) => [...prev, ball]);
        }, 1500);
      }, 800);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Layer */}
      <div className={styles.background}>
        <Image
          src="/screen8-background.png"
          alt="Stadium Background with Stumps"
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
            <span className={styles.overNumber}>4/8</span>
          </div>
        </div>

        {/* Action Badge */}
        <div className={styles.badge}>
          <span className={styles.starIcon}>★</span>
          Swipe up to throw!
          <span className={styles.starIcon}>★</span>
        </div>

        {/* Pitch Area */}
        <div className={styles.pitchArea}>

          <div className={styles.arrowsContainer}>
            <Image src="/screen8-leftside-arrow.png" alt="Left Arrow" width={40} height={120} className={styles.arrowLeft} unoptimized />
            <Image src="/screen8-straight-arrow.png" alt="Straight Arrow" width={20} height={140} className={styles.arrowCenter} unoptimized />
            <Image src="/screen8-rightside-arrow.png" alt="Right Arrow" width={40} height={120} className={styles.arrowRight} unoptimized />
          </div>

          <div className={styles.ballsContainer}>
            <div
              className={`${styles.ballWrapper} ${styles.ballLeft} ${thrownBalls['left'] ? (thrownBalls['left'] === 'center' ? styles.thrownCenter : styles.thrownLeft) + ' ' + styles.thrown : ''} ${vanishedBalls.includes('left') ? styles.vanished : ''}`}
              onPointerDown={(e) => handlePointerDown(e, 'left')}
              onPointerUp={(e) => handlePointerUp(e, 'left')}
            >
              <Image src="/screen6-bowl.png" alt="Cricket Ball Left" width={70} height={70} unoptimized draggable={false} />
            </div>

            <div
              className={`${styles.ballWrapper} ${styles.ballCenter} ${thrownBalls['center'] ? (thrownBalls['center'] === 'center' ? styles.thrownCenter : styles.thrownLeft) + ' ' + styles.thrown : ''} ${vanishedBalls.includes('center') ? styles.vanished : ''}`}
              onPointerDown={(e) => handlePointerDown(e, 'center')}
              onPointerUp={(e) => handlePointerUp(e, 'center')}
            >
              <Image src="/screen6-bowl.png" alt="Cricket Ball Center" width={70} height={70} unoptimized draggable={false} />
            </div>

            <div
              className={`${styles.ballWrapper} ${styles.ballRight} ${thrownBalls['right'] ? (thrownBalls['right'] === 'center' ? styles.thrownCenter : styles.thrownRight) + ' ' + styles.thrown : ''} ${vanishedBalls.includes('right') ? styles.vanished : ''}`}
              onPointerDown={(e) => handlePointerDown(e, 'right')}
              onPointerUp={(e) => handlePointerUp(e, 'right')}
            >
              <Image src="/screen6-bowl.png" alt="Cricket Ball Right" width={70} height={70} unoptimized draggable={false} />
            </div>
          </div>

          {result && (
            <div className={styles.resultMessage}>
              {result.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}

          {/* Throw Button */}
          <button
            className={styles.throwButton}
            onClick={() => {
              if (Object.keys(thrownBalls).length === 3) {
                router.push('/question4');
                return;
              }

              // Find next unthrown ball
              const nextBall = !thrownBalls['center'] ? 'center' : !thrownBalls['left'] ? 'left' : !thrownBalls['right'] ? 'right' : null;
              if (nextBall) {
                // Button click counts as a tap (random chance)
                const isHit = Math.random() > 0.5;
                const path = isHit ? 'center' : (Math.random() > 0.5 ? 'left' : 'right');

                setThrownBalls((prev) => ({ ...prev, [nextBall]: path }));
                setResult(null);

                setTimeout(() => {
                  if (isHit) {
                    setResult("+6 RUNS! DIRECT HIT!");
                  } else {
                    setResult("MISS! 0\nRUNS");
                  }

                  setTimeout(() => {
                    setResult(null);
                    setVanishedBalls((prev) => [...prev, nextBall]);
                  }, 1500);
                }, 800);
              }
            }}
          >
            {Object.keys(thrownBalls).length === 3 ? "SET YOUR FIELD" : "THROW BALL TO STUMPS"}
          </button>
        </div>
      </main>
    </div>
  );
}
