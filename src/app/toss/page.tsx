"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function TossScreen() {
  const [isFlipping, setIsFlipping] = useState(false);
  const router = useRouter();

  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    
    // Wait for the 2 second animation to complete before navigating
    setTimeout(() => {
      router.push('/decision');
    }, 2000);
  };

  return (
    <div className={styles.container}>
      {/* Background Layer */}
      <div className={styles.background}>
        <Image 
          src="/screen3-background.png" 
          alt="Stadium Pitch Background"
          fill
          priority
          unoptimized
          className={styles.bgImage}
        />
      </div>

      <main className={styles.main}>
        {/* Back Button */}
        <Link href="/jersey" className={styles.backButton}>
          <Image 
            src="/screen2-backbtn.png" 
            alt="Back" 
            width={44} 
            height={44} 
            unoptimized
          />
        </Link>

        {/* Top Header */}
        <header className={styles.header}>
          <h1 className={styles.titleLarge}>TOSS TIME</h1>
          <p className={styles.subtitle}>Let&apos;s Play!</p>
        </header>

        {/* Coin Area */}
        <div className={styles.coinWrapper}>
          <Image 
            src="/screen3-coin1.png" 
            alt="Coin"
            width={600}
            height={600}
            priority
            unoptimized
            className={`${styles.coinImage} ${isFlipping ? styles.flipping : ''}`}
          />
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <button onClick={handleFlip} className={styles.flipButton} disabled={isFlipping}>
            {isFlipping ? 'FLIPPING...' : 'FLIP THE COIN'}
          </button>
        </div>
      </main>
    </div>
  );
}
