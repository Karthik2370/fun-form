import React, { useEffect, useState } from 'react';

const hackingLines = [
  '> Establishing secure connection...',
  '> Bypassing firewall...',
  '> Injecting payload...',
  '> Retrieving data...',
  '> Access Granted ✔️'
];

export default function HackingOverlay() {
  const [displayedLines, setDisplayedLines] = useState([]);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < hackingLines.length) {
        setDisplayedLines((prev) => [...prev, hackingLines[current]]);
        current++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-black text-green-400 font-mono p-8 z-50 text-sm animate-fadeIn overflow-hidden">
      <div className="max-w-xl mx-auto">
        {displayedLines.map((line, idx) => (
          <p key={idx} className="mb-1">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
