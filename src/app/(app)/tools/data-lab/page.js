'use client';

import { useState } from 'react';

export default function DataLabPage() {
  // Parameter State Controls
  const [timeBinning, setTimeBinning] = useState(0.5);
  const [noiseFilterWindow, setNoiseFilterWindow] = useState(15);
  const [detrendData, setDetrendData] = useState(true);
  const [showPhaseFold, setShowPhaseFold] = useState(false);

  // Red Night Mode
  const [redNightMode, setRedNightMode] = useState(false);

  // Findings Report
  const [findingsReport, setFindingsReport] = useState('');
  const [submittedReport, setSubmittedReport] = useState(false);

  // Assistant State
  const [showAssistant, setShowAssistant] = useState(true);

  // Calculated Metrics (dynamic based on sliders)
  const calculatedPeriod = (32.94 / (timeBinning * 0.15 + 0.925)).toFixed(2);
  const calculatedDepth = (0.012 * (detrendData ? 1 : 1.25)).toFixed(3);
  const calculatedDuration = (4.2 * (showPhaseFold ? 0.95 : 1)).toFixed(1);
  const calculatedRadius = (2.4 * (detrendData ? 1 : 1.1)).toFixed(1);

  const handleResetDefaults = () => {
    setTimeBinning(0.5);
    setNoiseFilterWindow(15);
    setDetrendData(true);
    setShowPhaseFold(false);
  };

  const handleApplyBinning = () => {
    setTimeBinning(1.2);
    setNoiseFilterWindow(25);
  };

  const handleSubmitReport = () => {
    if (!findingsReport.trim()) {
      alert('Enter your analysis before submitting.');
      return;
    }
    setSubmittedReport(true);
    setTimeout(() => setSubmittedReport(false), 4000);
  };

  // Generate Noisy Raw Data Path & Model Fit Path
  const getRawDataPath = () => {
    if (showPhaseFold) {
      return "M 40 150 Q 150 148, 250 152 T 350 240 T 450 242 T 550 150 T 780 148";
    }
    const noiseAmp = noiseFilterWindow > 30 ? 3 : noiseFilterWindow > 15 ? 7 : 14;
    return `M 40 150 Q 60 ${150 - noiseAmp}, 80 ${150 + noiseAmp} T 120 ${150 - noiseAmp} T 160 ${150 + noiseAmp} T 200 150 T 240 ${150 - noiseAmp} T 280 ${150 + noiseAmp} T 320 150 T 350 155 T 380 230 T 410 245 T 440 235 T 470 150 T 500 ${150 - noiseAmp} T 540 ${150 + noiseAmp} T 580 150 T 620 ${150 - noiseAmp} T 660 ${150 + noiseAmp} T 700 150 T 740 ${150 - noiseAmp} T 780 150`;
  };

  const getModelFitPath = () => {
    if (showPhaseFold) {
      return "M 40 150 L 300 150 C 320 150, 340 240, 400 240 C 460 240, 480 150, 500 150 L 780 150";
    }
    return "M 40 150 L 360 150 C 370 150, 380 240, 410 240 C 440 240, 450 150, 460 150 L 780 150";
  };

  return (
    <div className={`relative transition-all duration-300 ${redNightMode ? 'ring-4 ring-red-900 bg-red-950/30' : ''}`}>
      {/* Red Night Mode Overlay */}
      {redNightMode && (
        <div className="fixed inset-0 bg-red-950/20 pointer-events-none z-50 mix-blend-color-burn" />
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-label-sm text-label-sm px-2 py-1 bg-primary-container text-primary rounded-md border border-primary/20">
              Active Session
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Target: K2-18b</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-inverse-surface">
            Lab 04: Exoplanet Transit Detection
          </h1>
          <p className="text-on-surface-variant mt-2 max-w-2xl">
            Analyze stellar flux data to identify potential planetary transits. Adjust parameters to filter noise and isolate the dip in brightness indicative of an orbiting body.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRedNightMode(!redNightMode)}
            aria-label="Toggle Red Night Mode"
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              redNightMode
                ? 'bg-red-900/80 border-red-500 text-red-200'
                : 'bg-surface-container-high border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            <span className="material-symbols-outlined group-hover:text-error transition-colors">visibility</span>
          </button>
          <button
            onClick={() => alert('Workspace saved successfully!')}
            className="px-4 py-2 bg-surface-container-high border border-primary/30 text-primary rounded-lg font-semibold hover:bg-primary-container transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            Save Workspace
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-24">
        {/* Main Chart Area (Spans 8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="glass-panel rounded-xl p-1 glow-effect h-[400px] flex flex-col">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-surface/50 rounded-t-lg">
              <h3 className="font-headline-md text-lg text-primary-fixed-dim flex items-center gap-2">
                <span className="material-symbols-outlined">analytics</span>
                Interactive Light Curve
              </h3>
              <div className="flex gap-2">
                <span className="font-label-sm text-label-sm px-2 py-1 bg-surface-container text-on-surface-variant rounded flex items-center gap-1 border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span> Raw Data
                </span>
                <span className="font-label-sm text-label-sm px-2 py-1 bg-surface-container text-on-surface-variant rounded flex items-center gap-1 border border-white/5">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Model Fit
                </span>
              </div>
            </div>
            <div className="flex-1 relative p-4 chart-grid rounded-b-lg overflow-hidden">
              {/* Simulated Chart SVG */}
              <svg className="w-full h-full text-surface-variant" preserveAspectRatio="none" viewBox="0 0 800 300">
                {/* Axes */}
                <line stroke="currentColor" strokeWidth="2" x1="40" x2="780" y1="280" y2="280" />
                <line stroke="currentColor" strokeWidth="2" x1="40" x2="40" y1="20" y2="280" />
                {/* Y Axis Labels */}
                <text className="font-label-sm" fill="#919098" fontSize="12" textAnchor="end" x="30" y="30">1.01</text>
                <text className="font-label-sm" fill="#919098" fontSize="12" textAnchor="end" x="30" y="150">1.00</text>
                <text className="font-label-sm" fill="#919098" fontSize="12" textAnchor="end" x="30" y="270">0.99</text>
                {/* X Axis Labels */}
                <text className="font-label-sm" fill="#919098" fontSize="12" textAnchor="middle" x="40" y="295">
                  {showPhaseFold ? '-0.10' : '0'}
                </text>
                <text className="font-label-sm" fill="#919098" fontSize="12" textAnchor="middle" x="410" y="295">
                  {showPhaseFold ? 'Orbital Phase' : 'Time (Days)'}
                </text>
                <text className="font-label-sm" fill="#919098" fontSize="12" textAnchor="middle" x="780" y="295">
                  {showPhaseFold ? '+0.10' : '15'}
                </text>
                {/* Noisy Raw Data Path */}
                <path
                  d={getRawDataPath()}
                  fill="none"
                  opacity="0.6"
                  stroke="#c9bffd"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                {/* Smooth Model Fit Path */}
                <path
                  d={getModelFitPath()}
                  fill="none"
                  stroke="#c1c4e6"
                  strokeLinecap="round"
                  strokeWidth="3"
                />
                {/* Highlight area for transit */}
                <rect fill="#c1c4e6" height="260" opacity="0.05" width="100" x="360" y="20" />
                <line opacity="0.3" stroke="#c1c4e6" strokeDasharray="4,4" x1="360" x2="360" y1="20" y2="280" />
                <line opacity="0.3" stroke="#c1c4e6" strokeDasharray="4,4" x1="460" x2="460" y1="20" y2="280" />
              </svg>
            </div>
          </div>

          {/* Findings Report */}
          <div className="glass-panel rounded-xl p-6 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container rounded-full blur-3xl opacity-30 pointer-events-none"></div>
            <h3 className="font-headline-md text-lg text-inverse-surface mb-4">Findings Report</h3>
            <p className="text-on-surface-variant text-sm mb-4">
              Document your observations based on the adjusted light curve. Note the depth and duration to classify the potential candidate.
            </p>
            <textarea
              value={findingsReport}
              onChange={(e) => setFindingsReport(e.target.value)}
              className="w-full bg-surface-dim border border-outline-variant/40 rounded-lg p-4 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y min-h-[120px] font-body-md"
              placeholder="Enter your analysis here..."
            />
            <div className="mt-4 flex items-center justify-between">
              {submittedReport ? (
                <span className="font-code-md text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Report submitted successfully!
                </span>
              ) : (
                <span />
              )}
              <button
                onClick={handleSubmitReport}
                className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary-fixed transition-colors shadow-lg shadow-primary/20 cursor-pointer"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Panel (Spans 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Parameter Controls */}
          <div className="glass-panel rounded-xl p-6 border-t-2 border-t-primary/50">
            <h3 className="font-headline-md text-lg text-inverse-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">tune</span>
              Parameter Controls
            </h3>
            <div className="space-y-6">
              {/* Slider Control 1 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-label-sm text-on-surface-variant">Time Binning</label>
                  <span className="font-code-md text-primary">{timeBinning} hrs</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={timeBinning}
                  onChange={(e) => setTimeBinning(parseFloat(e.target.value))}
                  className="w-full h-1 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Slider Control 2 */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-label-sm text-on-surface-variant">Noise Filter (Savitzky-Golay)</label>
                  <span className="font-code-md text-primary">Window: {noiseFilterWindow}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="51"
                  step="2"
                  value={noiseFilterWindow}
                  onChange={(e) => setNoiseFilterWindow(parseInt(e.target.value, 10))}
                  className="w-full h-1 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <hr className="border-white/5" />

              {/* Toggle Switches */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">Detrend Data</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={detrendData}
                    onChange={(e) => setDetrendData(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">Show Phase Fold</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPhaseFold}
                    onChange={(e) => setShowPhaseFold(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <button
                onClick={handleResetDefaults}
                className="w-full py-2 border border-outline-variant/50 text-on-surface-variant rounded-lg hover:bg-surface-variant transition-colors text-sm font-semibold mt-2 cursor-pointer"
              >
                Reset to Default
              </button>
            </div>
          </div>

          {/* Calculated Data */}
          <div className="glass-panel rounded-xl p-6">
            <h3 className="font-headline-md text-lg text-inverse-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">table_chart</span>
              Calculated Data
            </h3>
            <div className="bg-surface-dim rounded-lg border border-white/5 overflow-hidden">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-white/5 font-code-md">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-on-surface-variant">Period (P)</td>
                    <td className="px-4 py-3 text-right text-primary">{calculatedPeriod} days</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-on-surface-variant">Depth (ΔF)</td>
                    <td className="px-4 py-3 text-right text-primary">{calculatedDepth}%</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-on-surface-variant">Duration (T)</td>
                    <td className="px-4 py-3 text-right text-primary">{calculatedDuration} hrs</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-on-surface-variant">Radius Est.</td>
                    <td className="px-4 py-3 text-right text-secondary">{calculatedRadius} R⊕</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-start gap-2 p-3 bg-secondary-container/20 border border-secondary/20 rounded-lg">
              <span className="material-symbols-outlined text-secondary text-sm mt-0.5">info</span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Radius estimation assumes standard stellar parameters for an M-dwarf host. Adjust mass models in settings for greater precision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Analysis Assistant */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
        {showAssistant && (
          <div className="glass-panel p-4 rounded-2xl rounded-br-none border border-primary/20 shadow-2xl w-72 pointer-events-auto transform transition-transform translate-y-0 opacity-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">smart_toy</span>
                <span className="font-label-sm text-primary">Astro Assist</span>
              </div>
              <button
                onClick={() => setShowAssistant(false)}
                className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-on-surface-variant mb-3">
              Notice the 'U' shape of the transit dip? That typically indicates limb darkening. Try increasing the binning slightly to smooth out that stellar noise spike around day 2.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleApplyBinning}
                className="text-xs px-2 py-1 bg-surface-variant rounded hover:bg-surface-bright text-on-surface transition-colors cursor-pointer"
              >
                Apply Binning
              </button>
              <button
                onClick={() => setShowAssistant(false)}
                className="text-xs px-2 py-1 text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* FAB */}
        <button
          onClick={() => setShowAssistant(!showAssistant)}
          className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all pointer-events-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">chat</span>
        </button>
      </div>
    </div>
  );
}
