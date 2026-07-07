"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function DecisionScreen() {
  return (
    <div className={styles.container}>
      {/* Background Layer */}
      <div className={styles.background}>
        <Image
          src="/screen4-backgorund.png"
          alt="Stadium Pitch Background"
          fill
          priority
          unoptimized
          className={styles.bgImage}
        />
      </div>

      <main className={styles.main}>
        {/* Back Button */}
        <Link href="/toss" className={styles.backButton}>
          <Image
            src="/screen2-backbtn.svg"
            alt="Back"
            width={44}
            height={44}
            unoptimized
          />
        </Link>

        {/* Top Header */}
        <header className={styles.header}>
          <h1 className={styles.titleLarge}>YOU WON</h1>
          <p className={styles.subtitle}>the Toss!</p>
        </header>

        {/* Coin Area */}
        <div className={styles.coinWrapper}>
          <Image
            src="/screen4-coin2.png"
            alt="Mission Possible Coin"
            width={280}
            height={280}
            priority
            unoptimized
            className={styles.coinImage}
          />
        </div>

        {/* Call Badge */}
        <div className={styles.callBadge}>
          <span className={styles.starIcon}>★</span>
          <span className={styles.callText}>What&apos;s your call?</span>
          <span className={styles.starIcon}>★</span>
        </div>

        {/* Cards Section */}
        <div className={styles.cardsContainer}>
          <Link href="/question2" className={styles.card}>
            <Image
              src="/screen4-batting.png"
              alt="Batting"
              width={220}
              height={300}
              unoptimized
              className={styles.cardImage}
            />
          </Link>

          <div className={styles.orBadgeWrapper}>
            <Image
              src="/screen4-or.png"
              alt="Or"
              width={60}
              height={60}
              unoptimized
              className={styles.orImage}
            />
          </div>

          <Link href="/question2" className={styles.card}>
            <Image
              src="/screen4-bowling.png"
              alt="Bowling"
              width={220}
              height={300}
              unoptimized
              className={styles.cardImage}
            />
          </Link>
        </div>
      </main>
    </div>
  );
}
