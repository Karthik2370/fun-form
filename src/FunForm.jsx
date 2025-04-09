import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import HackingOverlay from './HackingOverlay';

export default function FunForm() {
  const [username, setUsername] = useState('');
  const [submittedUsername, setSubmittedUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showAccessMessage, setShowAccessMessage] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef(null);

  const isFormValid = username.trim() && password.trim();

  useEffect(() => {
    if (isFormValid) {
      controls.start({ x: 0, y: 0 });
    }
  }, [username, password, isFormValid, controls]);

  const moveButton = async () => {
    const container = containerRef.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const maxX = containerRect.width - 160;
      const maxY = containerRect.height - 60;

      const randomX = Math.random() * (maxX / 2) * (Math.random() > 0.5 ? 1 : -1);
      const randomY = Math.random() * (maxY / 2) * (Math.random() > 0.5 ? 1 : -1);

      await controls.start({
        x: randomX,
        y: randomY,
        transition: {
          type: 'spring',
          stiffness: 600,
          damping: 12,
          mass: 0.12,
        },
      });
    }
  };

  const handleMouseMove = () => {
    if (!isFormValid) {
      moveButton();
      setShowWarning(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setShowWarning(true);
      return;
    }

    setSubmittedUsername(username); // Save before clearing
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      setShowAccessMessage(true);
      setShowWarning(false);
      setUsername('');
      setPassword('');
    }, 6000);
  };

  return (
    <>
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-40">
          <HackingOverlay />
        </div>
      )}

      <div className="min-h-screen w-screen overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center px-4 font-mono relative">
        <div
          ref={containerRef}
          className="relative bg-zinc-900/80 border border-cyan-500 shadow-[0_0_40px_#0ff3] backdrop-blur-xl rounded-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md z-10"
        >
          <div className="flex justify-center mb-4">
            <div className="text-cyan-400 text-4xl sm:text-5xl drop-shadow-glow">💠</div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-cyan-400 tracking-wider glitch-on-hover">
            Hacker Form Challenge
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 text-center mb-6">
            Outsmart the button. Fill the form. Submit your destiny.
          </p>

          <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              placeholder="Username"
              autoComplete="off"
              className="w-full px-4 py-2 sm:py-3 rounded bg-black/60 text-white border border-cyan-400 placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setShowWarning(false);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              className="w-full px-4 py-2 sm:py-3 rounded bg-black/60 text-white border border-cyan-400 placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setShowWarning(false);
              }}
            />

            <div className="relative h-20 flex justify-center items-center mt-6">
              <motion.button
                type="submit"
                onMouseEnter={handleMouseMove}
                onMouseMove={handleMouseMove}
                animate={controls}
                className={`absolute px-5 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-md transition-all duration-300 tracking-wider select-none glitch-on-hover ${
                  isFormValid
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-md cursor-pointer'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit
              </motion.button>
            </div>
          </form>

          {showWarning && (
            <p className="text-xs text-red-400 text-center mt-4 animate-pulse-fast">
              ⚠️ Fill both fields to proceed, Agent.
            </p>
          )}

          <p className="text-[10px] sm:text-xs text-center text-cyan-300 mt-6">
            Glitch the Matrix. Crack the code. Submit the form.
          </p>
        </div>

        <div className="absolute bottom-3 right-4 text-[10px] sm:text-xs text-cyan-600 opacity-70">
          © Built by Karthik Nambiar
        </div>

        {showAccessMessage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-zinc-900 border border-cyan-400 p-6 rounded-lg text-center shadow-[0_0_40px_#0ff5] max-w-sm w-[90%]">
              <h2 className="text-cyan-400 text-xl sm:text-2xl font-bold mb-2">✅ Access Granted</h2>
              <p className="text-white mb-4 text-sm sm:text-base">
                Welcome,{' '}
                <span className="text-cyan-300 font-semibold">
                  {submittedUsername || 'Anonymous Agent'}
                </span>
              </p>
              <button
                onClick={() => setShowAccessMessage(false)}
                className="mt-2 px-4 py-2 bg-cyan-500 text-black font-semibold rounded hover:bg-cyan-400 transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
