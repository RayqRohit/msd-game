"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function JerseyScreen() {
  const [name, setName] = useState("FEARLESS");
  const [number, setNumber] = useState("07");

  useEffect(() => {
    // Clear previous game data on fresh start
    ["stats_L", "stats_C", "stats_S", "stats_E", "stats_I", "stats_T", "runs_scored"].forEach(k => localStorage.removeItem(k));
  }, []);

  useEffect(() => {
    if (name) localStorage.setItem("userName", name);
  }, [name]);

  useEffect(() => {
    if (number) localStorage.setItem("userNumber", number);
  }, [number]);

  return (
    <div className={styles.container}>
      {/* Background Layer */}
      <div className={styles.background}>
        <Image
          src="/Screen2-bg.png"
          alt="Stadium background"
          fill
          priority
          unoptimized
          className={styles.bgImage}
        />
        <Image
          src="/screen2-background-overlay.png"
          alt="Background Overlay"
          fill
          unoptimized
          className={styles.bgImage}
        />
      </div>

      <main className={styles.main}>
        {/* Back Button */}
        <Link href="/" className={styles.backButton}>
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
          <h2 className={styles.titleSmall}>CREATE YOUR</h2>
          <h1 className={styles.titleLarge}>JERSEY</h1>
          <p className={styles.subtitle}>
            Your name, Your number. Your identity on the field.
          </p>
        </header>

        {/* Jersey Area */}
        <div className={styles.jerseyWrapper}>
          <Image
            src="/tshirt_blue.png"
            alt="Jersey"
            width={400}
            height={500}
            priority
            unoptimized
            className={styles.jerseyImage}
          />
          {/* Dynamic Text on Jersey */}
          <div className={styles.jerseyTextLayer}>
            {/* <Image
              src="/screen2-parul-logo.png"
              alt="Parul University"
              width={60}
              height={30}
              unoptimized
              className={styles.jerseyParulLogo}
            /> */}
            <div className={styles.jerseyName}>
              {name || "YOUR NAME"}
            </div>
            <div className={styles.jerseyNumber}>
              {number || "00"}
            </div>
            {/* <Image
              src="/screen2-sign.png"
              alt="Signature"
              width={60}
              height={40}
              unoptimized
              className={styles.jerseySign}
            /> */}
          </div>
        </div>

        {/* Form Inputs & Button */}
        <div className={styles.formSection}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.inputField}
              placeholder="YOUR NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={12}
            />
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.inputField}
              placeholder="#LUCKY NO."
              value={number}
              onChange={(e) => setNumber(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={2}
            />
            <span className={styles.inputHint}>no. from 1-99</span>
          </div>

          <Link href="/toss" className={styles.enterButton}>
            ENTER STADIUM
          </Link>
        </div>
      </main>
    </div>
  );
}
