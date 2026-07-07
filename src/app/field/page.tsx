"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

type Fielder = {
  id: string;
  image: string;
  label: string;
  target: { x: number, y: number }; 
};

const FIELDERS: Fielder[] = [
  { id: 'keeper', image: '/screen9-keeper.png', label: 'Catch the Opportunities!', target: { x: 50, y: 70 } },
  { id: 'slip', image: '/screen9-slip.png', label: 'Slip', target: { x: 35, y: 70 } },
  { id: 'cover', image: '/screen--cover.png', label: 'Cover', target: { x: 20, y: 45 } },
  { id: 'longon', image: '/screen9-longon.png', label: 'Long ON', target: { x: 80, y: 20 } },
];

export default function FieldScreen() {
  const router = useRouter();
  const fieldRef = useRef<HTMLDivElement>(null);
  
  const [positions, setPositions] = useState<Record<string, { x: number, y: number }>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);
  const [placed, setPlaced] = useState<string[]>([]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(id);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, id: string) => {
    if (dragging !== id || !dragStart) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setPositions(prev => {
      const current = prev[id] || { x: 0, y: 0 };
      return {
        ...prev,
        [id]: {
          x: current.x + deltaX,
          y: current.y + deltaY
        }
      };
    });
    
    // Update start position for the next move event
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) {
      const fieldArea = fieldRef.current;
      if (fieldArea) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const rect = fieldArea.getBoundingClientRect();
        
        const fielder = FIELDERS.find(f => f.id === dragging)!;
        const targetX = rect.left + (rect.width * (fielder.target.x / 100));
        const targetY = rect.top + (rect.height * (fielder.target.y / 100));
        
        const dist = Math.hypot(mouseX - targetX, mouseY - targetY);
        
        if (dist < 80) { // Snap radius
          setPlaced(prev => [...prev, dragging]);
        }
      }

      setPositions(prev => ({ ...prev, [dragging]: { x: 0, y: 0 } }));

      e.currentTarget.releasePointerCapture(e.pointerId);
      setDragging(null);
      setDragStart(null);
    }
  };

  const allPlaced = placed.length === FIELDERS.length;

  return (
    <div className={styles.container}>
      {/* Background Layer */}
      <div className={styles.background}>
        <Image 
          src="/Screen 21.png" 
          alt="Cricket Field Background"
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

        {/* Action Badge */}
        <div className={styles.badge}>
          <span className={styles.starIcon}>★</span>
          Set your Field!
          <span className={styles.starIcon}>★</span>
        </div>

        {/* Field Area for Dragging */}
        <div className={styles.fieldArea} ref={fieldRef}>
          
          {/* Target Zones */}
          {FIELDERS.map((f) => (
            <div 
              key={`target-${f.id}`}
              className={styles.targetZone}
              style={{ left: `${f.target.x}%`, top: `${f.target.y}%` }}
            />
          ))}

          {/* Placed Fielders */}
          {FIELDERS.map((f) => placed.includes(f.id) && (
            <div 
              key={`placed-${f.id}`}
              className={styles.fielderPlaced}
              style={{ left: `${f.target.x}%`, top: `${f.target.y}%` }}
            >
              <div className={styles.fielderImageWrapper}>
                <Image src={f.image} alt={f.label} width={95} height={95} style={{ height: 'auto', width: '20vw', maxWidth: '95px' }} unoptimized draggable={false} />
              </div>
            </div>
          ))}

          {/* Container for initial layout of fielders */}
          <div style={{ position: 'absolute', bottom: '116px', left: 0, width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', zIndex: 20 }}>
            {FIELDERS.map((f) => {
              const isPlaced = placed.includes(f.id);
              return (
                <div 
                  key={f.id}
                  className={`${styles.fielder} ${dragging === f.id ? styles.dragging : ''}`}
                  style={{ 
                    transform: `translate3d(${positions[f.id]?.x || 0}px, ${positions[f.id]?.y || 0}px, 0)`,
                    position: 'relative',
                    opacity: isPlaced ? 0 : 1,
                    pointerEvents: isPlaced ? 'none' : 'auto',
                    transition: dragging === f.id ? 'none' : 'transform 0.3s ease-out'
                  }}
                  onPointerDown={(e) => handlePointerDown(e, f.id)}
                  onPointerMove={(e) => handlePointerMove(e, f.id)}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  <div className={styles.fielderImageWrapper}>
                    <Image 
                      src={f.image} 
                      alt={f.label} 
                      width={95}
                      height={95}
                      style={{ height: 'auto', width: '20vw', maxWidth: '95px' }}
                      unoptimized 
                      draggable={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Confirm Button */}
          <button 
            className={styles.confirmButton}
            onClick={() => {
              if (allPlaced) {
                router.push('/question');
              }
            }}
            style={{ 
              opacity: allPlaced ? 1 : 0.6,
              filter: allPlaced ? 'none' : 'grayscale(0.5)'
            }}
          >
            {allPlaced ? "ALL SET! NEXT" : "DRAG FIELDERS TO THEIR POSITION"}
          </button>
        </div>
      </main>
    </div>
  );
}
