import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Background Image Layer */}
      <div className={styles.background}>
        <Image 
          src="/Screen1-bg.png" 
          alt="Stadium background"
          fill
          priority
          className={styles.bgImage}
        />
      </div>

      {/* Main Content Layer */}
      <main className={styles.main}>
        {/* Top Header */}
        <header className={styles.header}>
          <Image 
            src="/parul-logo.svg" 
            alt="Parul University"
            width={200}
            height={60}
            className={styles.logo}
          />
        </header>

        {/* Hero Image */}
        <div className={styles.heroWrapper}>
          <Image 
            src="/screen1-hero.png" 
            alt="Mission Possible Hero"
            width={600}
            height={800}
            priority
            unoptimized
            className={styles.heroImage}
          />
          <Image 
            src="/screen1-tagline.svg" 
            alt="Mission Possible The Game"
            width={500}
            height={300}
            unoptimized
            className={styles.missionPossibleText}
          />
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.bottomBgWrapper}>
            <Image 
              src="/screen1-downside-black-bg.png" 
              alt="Bottom Background"
              fill
              className={styles.bottomBgImage}
            />
          </div>
          <div className={styles.bottomContent}>
            <p className={styles.tagline}>
              Play, Score & Discover your inner inspiring mindset
            </p>
            <Link href="/jersey" className={styles.startButton}>
              START CHALLENGE
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
