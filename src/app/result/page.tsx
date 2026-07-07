"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import html2canvas from "html2canvas";
import styles from "./page.module.css";

export default function Result() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [titleParts, setTitleParts] = useState(["THE GAME", "CHANGER"]);
  const [subtitle, setSubtitle] = useState("Creative, bold, thinks differently.");
  const [runs, setRuns] = useState("0");
  const [stats, setStats] = useState([
    { label: "Leadership", value: "0%" },
    { label: "Calmness", value: "0%" },
    { label: "Strategy", value: "0%" },
    { label: "Execution", value: "0%" },
    { label: "Innovation", value: "0%" },
    { label: "Teamwork", value: "0%" },
  ]);
  const downloadRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!downloadRef.current) return;
    setIsDownloading(true);
    
    // Wait for the UI to re-render without the buttons
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(downloadRef.current!, {
          useCORS: true,
          scale: 2,
          backgroundColor: "#0b1120",
        });
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "mission-possible-result.png";
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Failed to download image", err);
      } finally {
        setIsDownloading(false);
      }
    }, 100);
  };

  useEffect(() => {
    // Check localStorage for the user's details
    const storedName = localStorage.getItem("userName");
    const storedNumber = localStorage.getItem("userNumber");

    if (storedName) setName(storedName);
    if (storedNumber) setNumber(storedNumber);

    const storedRuns = localStorage.getItem("runs_scored");
    if (storedRuns) setRuns(storedRuns);

    // Calculate final stats
    const maxPossible = 16; // 4 questions x max 4 points
    const getStat = (key: string) => parseInt(localStorage.getItem(key) || "0", 10);
    
    const leadership = getStat("stats_L");
    const calmness = getStat("stats_C");
    const strategy = getStat("stats_S");
    const execution = getStat("stats_E");
    const innovation = getStat("stats_I");
    const teamwork = getStat("stats_T");

    const calcPercent = (val: number) => Math.min(100, Math.round((val / maxPossible) * 100));

    setStats([
      { label: "Leadership", value: `${calcPercent(leadership)}%` },
      { label: "Calmness", value: `${calcPercent(calmness)}%` },
      { label: "Strategy", value: `${calcPercent(strategy)}%` },
      { label: "Execution", value: `${calcPercent(execution)}%` },
      { label: "Innovation", value: `${calcPercent(innovation)}%` },
      { label: "Teamwork", value: `${calcPercent(teamwork)}%` },
    ]);

    // Determine Title based on highest combinations
    const scoreCombos = [
      { name: "THE\nCAPTAIN", score: leadership + teamwork, tie: leadership >= teamwork ? 1 : 0 },
      { name: "TEAM\nGUARDIAN", score: teamwork + leadership, tie: teamwork > leadership ? 1 : 0 },
      { name: "CAPTAIN\nCOOL", score: calmness + strategy, tie: 0 },
      { name: "THE\nFINISHER", score: execution + calmness, tie: 0 },
      { name: "THE\nANALYST", score: strategy + innovation, tie: 0 },
      { name: "THE GAME\nCHANGER", score: innovation + execution, tie: 0 }
    ];

    scoreCombos.sort((a, b) => {
      if (b.score === a.score) return b.tie - a.tie;
      return b.score - a.score;
    });

    const topTitle = scoreCombos[0].name;
    setTitleParts(topTitle.split('\n'));

    const descriptions: Record<string, string> = {
      "THE\nCAPTAIN": "Inspires others, leads from the front, naturally charismatic.",
      "TEAM\nGUARDIAN": "Always has the team's back, fosters unity, selfless.",
      "CAPTAIN\nCOOL": "Unflappable under pressure, steady hand, composed.",
      "THE\nFINISHER": "Steps up in the clutch, delivers when it matters most.",
      "THE\nANALYST": "Strategic thinker, data-driven, outsmarts the opposition.",
      "THE GAME\nCHANGER": "Creative, bold, thinks differently."
    };
    
    setSubtitle(descriptions[topTitle] || descriptions["THE GAME\nCHANGER"]);
  }, []);

  return (
    <div className={styles.container} ref={downloadRef}>
      {/* Background */}
      <div className={styles.background}>
        <Image
          src="/screen2-background-overlay.png"
          alt="Background"
          fill
          unoptimized
          className={styles.bgImage}
        />
      </div>

      <main className={styles.main}>
        {/* Header */}
        <div className={styles.header}>
          <Link href="/batting" className={styles.backButton}>
            <Image src="/screen2-backbtn.svg" alt="Back" width={24} height={24} />
          </Link>
          <div className={styles.topBadge}>
            MADE BY HUMANS, PLAYED BY HEROS
          </div>
        </div>

        {/* Content Box with Gold Glow */}
        <div className={styles.contentBox}>
          
          {/* Logo */}
          <div className={styles.logoContainer}>
            <Image
              src="/PU_MP_logo.svg"
              alt="Parul University | Mission Possible"
              width={260}
              height={60}
              unoptimized
              className={styles.puLogo}
            />
          </div>

          {/* Typography Section */}
          <div className={styles.typographySection}>
            <div className={styles.youAre}>YOU ARE</div>
            <div className={styles.gameChanger}>
              {titleParts[0]}<br/>{titleParts[1]}
            </div>
            <div className={styles.subtitle}>
              {subtitle}
            </div>
          </div>

          {/* Jersey */}
          <div className={styles.jerseyWrapper}>
            <Image
              src="/tshirt_yellow.png"
              alt="Jersey"
              width={420}
              height={500}
              priority
              unoptimized
              className={styles.jerseyImage}
            />
            <div className={styles.jerseyTextLayer}>
              <div className={styles.jerseyName}>
                {name || "CHAMPION"}
              </div>
              <div className={styles.jerseyNumber}>
                {number || "99"}
              </div>
            </div>
          </div>

          <div className={styles.statsCard}>
            
            <div className={styles.runsSection}>
              <div className={styles.runsLabel}>RUNS SCORED</div>
              <div className={styles.runsValue}>{runs}</div>
            </div>
            
            <div className={styles.divider}></div>

            <div className={styles.statsSection}>
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.statRow}>
                  <div className={styles.statLabel}>{stat.label}</div>
                  <div className={styles.statBarContainer}>
                    <div className={styles.statBar} style={{ width: stat.value }}></div>
                  </div>
                  <div className={styles.statValue}>{stat.value}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        {!isDownloading && (
          <>
            <div className={styles.actionButtons}>
              <button className={styles.downloadBtn} onClick={handleDownload}>DOWNLOAD RESULT</button>
              <button className={styles.playAgainBtn} onClick={() => router.push('/')}>PLAY AGAIN</button>
            </div>

            <div className={styles.footerText}>
              Download your results and share it on your story! Don&apos;t forget to tag us!
            </div>
          </>
        )}
      </main>
    </div>
  );
}
