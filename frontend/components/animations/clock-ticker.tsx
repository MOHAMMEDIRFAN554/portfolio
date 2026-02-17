'use client';

import { useEffect, useRef } from 'react';
import { createTimeline, stagger } from 'animejs';

export function ClockTicker() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const tl = createTimeline({
            loop: true,
        });

        // In v4, direction might be set per animation or alternate is achieved differently
        tl.add('.tick', {
            y: '-=6',
            duration: 50,
        }, stagger(10))
            .add('.ticker', {
                rotate: 360,
                duration: 1920,
            }, '<');

        return () => {
            tl.pause();
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-32 h-32 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="ticker absolute inset-0 border-2 border-dashed border-primary/30 rounded-full" />
            <div className="flex gap-1 items-end h-8">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="tick w-1 h-4 bg-primary/50 rounded-full" />
                ))}
            </div>
        </div>
    );
}
