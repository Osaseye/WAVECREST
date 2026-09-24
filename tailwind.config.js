/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wave: {
          // Deep Canvas Mode
          void: "#020B1C",
          surface: "#06132D",
          card: "#0B1E45",
          border: "rgba(8, 215, 255, 0.12)",
          
          // Light Canvas Mode
          light: "#F5F8FF",
          lightSurface: "#FFFFFF",
          lightCard: "#EDF3FC",
          lightBorder: "rgba(8, 120, 255, 0.12)",

          // Core Logo Ribbons
          cyan: "#08D7FF",       // Outer crest highlight & edge energy
          blue: "#0878FF",       // Electric primary blue
          deep: "#143DFF",       // Secondary deep blue twist
          royal: "#0047C7",      // Base anchor blue
          accent: "#2FE4FF",     // Supernova glow accent
        },
      },
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        'glow-cyan': '0 0 40px -10px rgba(8, 215, 255, 0.35)',
        'glow-blue': '0 0 40px -10px rgba(8, 120, 255, 0.45)',
        'glow-soft': '0 20px 40px -15px rgba(2, 11, 28, 0.08)',
        'card-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
        'card-light': '0 10px 30px -5px rgba(8, 120, 255, 0.06)',
      },
      animation: {
        'wave-drift': 'waveDrift 12s ease-in-out infinite alternate',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        waveDrift: {
          '0%': { transform: 'translateY(0px) rotate(0deg) scale(1)' },
          '100%': { transform: 'translateY(-15px) rotate(1.5deg) scale(1.02)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
      },
    },
  },
  plugins: [],
}

