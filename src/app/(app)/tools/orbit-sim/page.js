'use client';

import { useState } from 'react';
import OrbitSimulation from '@/components/effects/OrbitSimulation';

export default function StandaloneOrbitSimPage() {
  const [semiMajorAxis, setSemiMajorAxis] = useState(1.0);
  const [eccentricity, setEccentricity] = useState(0.016);
  const [mass, setMass] = useState(1.0);

  // Compute live Telemetry values based on orbital mechanics
  const velocity = (29.78 / Math.sqrt(semiMajorAxis)).toFixed(2);
  const period = (365.25 * Math.sqrt(Math.pow(semiMajorAxis, 3) / mass)).toFixed(2);

  const handlePresetHohmann = () => {
    setSemiMajorAxis(1.26);
    setEccentricity(0.207);
    setMass(1.0);
  };

  const handlePresetLagrange = () => {
    setSemiMajorAxis(1.01);
    setEccentricity(0.0);
    setMass(1.0);
  };

  return (
    <div className="relative h-[680px] min-h-[550px] w-full overflow-hidden rounded-2xl border border-white/10 glass-panel shadow-2xl">
      {/* Fullscreen Three.js 3D Orbit Simulation Scene */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <OrbitSimulation semiMajorAxis={semiMajorAxis} eccentricity={eccentricity} mass={mass} />
      </div>

      {/* Top Right Floating Panel: Orbital Parameters (Matching Screenshot 3) */}
      <div className="absolute top-4 right-4 z-20 w-full max-w-sm">
        <div className="glass-panel-2 rounded-2xl p-5 border border-white/20 shadow-2xl backdrop-blur-3xl flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h2 className="font-headline-md text-headline-md font-bold text-white">
              Orbital Parameters
            </h2>
            <span className="material-symbols-outlined text-on-surface-variant text-lg">tune</span>
          </div>

          {/* Slider 1: Semi-major Axis */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-code-md text-xs">
              <span className="text-on-surface-variant">Semi-major Axis (a)</span>
              <span className="text-white font-bold">{semiMajorAxis.toFixed(2)} AU</span>
            </div>
            <input
              type="range"
              min="0.3"
              max="3.0"
              step="0.01"
              value={semiMajorAxis}
              onChange={(e) => setSemiMajorAxis(parseFloat(e.target.value))}
              className="w-full accent-secondary cursor-pointer h-1.5 bg-surface-bright rounded-lg"
            />
          </div>

          {/* Slider 2: Eccentricity */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-code-md text-xs">
              <span className="text-on-surface-variant">Eccentricity (e)</span>
              <span className="text-white font-bold">{eccentricity.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="0.8"
              step="0.005"
              value={eccentricity}
              onChange={(e) => setEccentricity(parseFloat(e.target.value))}
              className="w-full accent-secondary cursor-pointer h-1.5 bg-surface-bright rounded-lg"
            />
          </div>

          {/* Slider 3: Mass */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between font-code-md text-xs">
              <span className="text-on-surface-variant">Mass (M)</span>
              <span className="text-white font-bold">{mass.toFixed(1)} M☉</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={mass}
              onChange={(e) => setMass(parseFloat(e.target.value))}
              className="w-full accent-secondary cursor-pointer h-1.5 bg-surface-bright rounded-lg"
            />
          </div>

          {/* Maneuver Presets Buttons */}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <span className="font-code-md text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
              MANEUVER PRESETS
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePresetHohmann}
                className="flex-1 py-2 px-3 rounded-xl border border-white/20 text-white font-code-md text-xs font-bold hover:bg-white/10 transition-all cursor-pointer text-center truncate"
              >
                Hohmann Transfer
              </button>
              <button
                onClick={handlePresetLagrange}
                className="flex-1 py-2 px-3 rounded-xl border border-white/20 text-white font-code-md text-xs font-bold hover:bg-white/10 transition-all cursor-pointer text-center truncate"
              >
                Lagrange Points
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Right Floating Telemetry Card (Matching Screenshot 3) */}
      <div className="absolute top-80 right-4 z-20 w-full max-w-sm mt-4">
        <div className="glass-panel rounded-2xl p-4 border border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col gap-3">
          <div className="flex items-center gap-2 text-tertiary">
            <span className="material-symbols-outlined text-sm animate-pulse">cell_tower</span>
            <span className="font-code-md text-xs font-bold uppercase tracking-wider">
              TELEMETRY
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Velocity */}
            <div className="bg-surface-container-lowest/80 p-3 rounded-xl border border-white/10 flex flex-col gap-1">
              <span className="font-code-md text-[10px] text-on-surface-variant">Velocity</span>
              <span className="font-code-md text-body-lg font-bold text-white">
                {velocity} km/s
              </span>
              <span className="px-2 py-0.5 rounded bg-accent_green/10 text-accent_green border border-accent_green/30 font-code-md text-[9px] font-bold w-max">
                Stable
              </span>
            </div>

            {/* Orbital Period */}
            <div className="bg-surface-container-lowest/80 p-3 rounded-xl border border-white/10 flex flex-col gap-1">
              <span className="font-code-md text-[10px] text-on-surface-variant">Orbital Period</span>
              <span className="font-code-md text-body-lg font-bold text-white">
                {period} d
              </span>
              <span className="px-2 py-0.5 rounded bg-primary-container text-primary border border-primary/20 font-code-md text-[9px] font-bold w-max">
                Nominal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
