import React from "react";

/**
 * Friendly StudyPilot AI Robot SVG Illustration
 * Matches the friendly AI robot assistant aesthetic from the reference design.
 */
export const RobotIllustration = ({ className = "w-48 h-48", mood = "happy" }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse -z-10" />

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="robotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>

          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="glowEye" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Floating Ring / Halo */}
        <ellipse
          cx="100"
          cy="42"
          rx="32"
          ry="8"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          className="animate-spin origin-center"
          style={{ transformOrigin: "100px 42px" }}
          opacity="0.8"
        />

        {/* Antenna */}
        <line x1="100" y1="52" x2="100" y2="34" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="30" r="6" fill="#38BDF8" filter="url(#softGlow)" />

        {/* Head Shell */}
        <rect
          x="46"
          y="52"
          width="108"
          height="88"
          rx="26"
          fill="url(#robotBodyGrad)"
          stroke="#60A5FA"
          strokeWidth="2"
        />

        {/* Head Side Ear-Puffs / Headphones */}
        <rect x="36" y="74" width="10" height="34" rx="5" fill="#38BDF8" />
        <rect x="154" y="74" width="10" height="34" rx="5" fill="#38BDF8" />

        {/* Visor Screen */}
        <rect
          x="58"
          y="66"
          width="84"
          height="54"
          rx="16"
          fill="url(#visorGrad)"
          stroke="#1E293B"
          strokeWidth="2"
        />

        {/* Eyes (Expressive Glowing Cyan LEDs) */}
        {mood === "happy" ? (
          <>
            {/* Happy Curved Eyes */}
            <path
              d="M74 88 Q82 80 90 88"
              stroke="#38BDF8"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter="url(#softGlow)"
            />
            <path
              d="M110 88 Q118 80 126 88"
              stroke="#38BDF8"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter="url(#softGlow)"
            />
            {/* Friendly Smile Indicator */}
            <path
              d="M93 104 Q100 110 107 104"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </>
        ) : (
          <>
            <circle cx="82" cy="88" r="6" fill="url(#glowEye)" filter="url(#softGlow)" />
            <circle cx="118" cy="88" r="6" fill="url(#glowEye)" filter="url(#softGlow)" />
          </>
        )}

        {/* Blushing Cheeks */}
        <ellipse cx="69" cy="98" rx="4" ry="2" fill="#F43F5E" opacity="0.6" />
        <ellipse cx="131" cy="98" rx="4" ry="2" fill="#F43F5E" opacity="0.6" />

        {/* Neck */}
        <rect x="88" y="140" width="24" height="12" rx="3" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" />

        {/* Torso / Base Floating Pod */}
        <path
          d="M58 152 C58 148, 142 148, 142 152 L132 178 C130 184, 70 184, 68 178 Z"
          fill="url(#robotBodyGrad)"
          stroke="#60A5FA"
          strokeWidth="1.5"
        />

        {/* Chest Core Reactor */}
        <circle cx="100" cy="164" r="7" fill="#38BDF8" filter="url(#softGlow)" />
        <circle cx="100" cy="164" r="3" fill="#FFFFFF" />

        {/* Floating Thruster Rings */}
        <ellipse cx="100" cy="186" rx="20" ry="4" fill="#38BDF8" opacity="0.4" filter="url(#softGlow)" />
        <ellipse cx="100" cy="192" rx="10" ry="2" fill="#38BDF8" opacity="0.7" />
      </svg>
    </div>
  );
};
