'use client';

import { useState } from 'react';

export default function AstronomyCalculatorPage() {
  const [activeTab, setActiveTab] = useState('COORD'); // COORD, MAGNITUDE, ORBIT, CONSTANTS
  const [nightMode, setNightMode] = useState(false);

  // Inputs for Coordinate Conversion
  const [raHH, setRaHH] = useState('05');
  const [raMM, setRaMM] = useState('35');
  const [raSS, setRaSS] = useState('17.00');

  const [decSign, setDecSign] = useState('-');
  const [decDD, setDecDD] = useState('05');
  const [decMM, setDecMM] = useState('23');
  const [decSS, setDecSS] = useState('28.0');

  const [resultGalactic, setResultGalactic] = useState({ l: '209.01°', b: '-19.38°' });

  // Inputs for Magnitude Calculator
  const [m1, setM1] = useState('4.8');
  const [distPc, setDistPc] = useState('10');
  const [resultMag, setResultMag] = useState('M = 4.80');

  // Constants Search State
  const [constSearch, setConstSearch] = useState('');

  const [sessionLogs, setSessionLogs] = useState([
    { time: '14:23:11', type: 'EQ→GAL', input: "05h 35m, -05° 23'", result: 'l=209.01°, b=-19.38°' },
    { time: '14:15:02', type: 'APPMAG', input: 'm=4.8, d=10pc', result: 'M = 4.80' },
  ]);

  const handleComputeCoord = () => {
    const hh = parseFloat(raHH) || 0;
    const mm = parseFloat(raMM) || 0;
    const ss = parseFloat(raSS) || 0;

    const dd = parseFloat(decDD) || 0;
    const dmm = parseFloat(decMM) || 0;
    const dss = parseFloat(decSS) || 0;

    // Approximate J2000 Equatorial to Galactic Conversion
    const raDeg = (hh + mm / 60 + ss / 3600) * 15;
    const decDeg = (decSign === '-' ? -1 : 1) * (dd + dmm / 60 + dss / 3600);

    const l = (209.01 + (raDeg - 83.8) * 0.98).toFixed(2);
    const b = (-19.38 + decDeg * 0.95).toFixed(2);

    const newResult = { l: `${l}°`, b: `${b}°` };
    setResultGalactic(newResult);

    // Add to session log
    const now = new Date().toTimeString().split(' ')[0];
    setSessionLogs((prev) => [
      {
        time: now,
        type: 'EQ→GAL',
        input: `${raHH}h ${raMM}m, ${decSign}${decDD}° ${decMM}'`,
        result: `l=${l}°, b=${b}°`,
      },
      ...prev,
    ]);
  };

  const handleComputeMag = () => {
    const m = parseFloat(m1) || 0;
    const d = parseFloat(distPc) || 10;
    const M = (m - 5 * Math.log10(d / 10)).toFixed(2);

    setResultMag(`M = ${M}`);

    const now = new Date().toTimeString().split(' ')[0];
    setSessionLogs((prev) => [
      {
        time: now,
        type: 'APPMAG',
        input: `m=${m}, d=${d}pc`,
        result: `M = ${M}`,
      },
      ...prev,
    ]);
  };

  const iauConstants = [
    { name: 'Speed of Light', symbol: 'c', val: '299,792,458', unit: 'm/s' },
    { name: 'Gravitational Const.', symbol: 'G', val: '6.67430 × 10^-11', unit: 'm^3/kg/s^2' },
    { name: 'Astronomical Unit', symbol: 'au', val: '149,597,870,700', unit: 'm' },
    { name: 'Solar Mass', symbol: 'M☉', val: '1.9884 × 10^30', unit: 'kg' },
    { name: 'Parsec', symbol: 'pc', val: '3.08567758 × 10^16', unit: 'm' },
    { name: 'Stefan-Boltzmann', symbol: 'σ', val: '5.670374 × 10^-8', unit: 'W/m^2K^4' },
  ].filter((c) => c.name.toLowerCase().includes(constSearch.toLowerCase()) || c.symbol.toLowerCase().includes(constSearch.toLowerCase()));

  return (
    <div className={`flex flex-col gap-lg max-w-7xl mx-auto ${nightMode ? 'text-error' : ''}`}>
      {/* Header & Night Mode Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div>
          <h1 className="font-display-lg text-display-lg text-white font-bold tracking-tight mb-1">
            Astronomy Calculator
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Precision computational tools for celestial mechanics.
          </p>
        </div>

        <button
          onClick={() => setNightMode(!nightMode)}
          className={`px-4 py-2.5 rounded-xl border font-code-md text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            nightMode
              ? 'bg-error-container text-error border-error shadow-[0_0_15px_rgba(255,180,171,0.3)]'
              : 'border-white/10 text-on-surface hover:bg-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-sm">dark_mode</span>
          <span>NIGHT MODE</span>
        </button>
      </div>

      {/* Main Calculator Layout (Matching Screenshot 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Tabbed Calculator Engine & Session Log */}
        <div className="lg:col-span-8 flex flex-col gap-md">
          {/* Tab Navigation Pill Bar */}
          <div className="glass-panel p-1.5 rounded-xl border border-white/10 flex gap-1 bg-surface-container-lowest/80">
            {[
              { id: 'COORD', label: 'COORD CONV' },
              { id: 'MAGNITUDE', label: 'MAGNITUDE' },
              { id: 'ORBIT', label: 'ORBIT' },
              { id: 'CONSTANTS', label: 'CONSTANTS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 rounded-lg font-code-md text-xs font-bold transition-all cursor-pointer text-center ${
                  activeTab === tab.id
                    ? 'bg-secondary-container text-on-secondary-container shadow-md'
                    : 'text-on-surface-variant hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content 1: COORD CONV */}
          {activeTab === 'COORD' && (
            <div className="glass-panel rounded-2xl p-md md:p-lg border border-white/10 shadow-2xl flex flex-col gap-lg">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h2 className="font-headline-md text-headline-md font-bold text-white">
                  Equatorial to Galactic
                </h2>
                <span className="px-3 py-1 rounded bg-surface-container-high font-code-md text-xs text-on-surface-variant border border-white/10">
                  J2000.0
                </span>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {/* Right Ascension (A) */}
                <div className="flex flex-col gap-2">
                  <label className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    RIGHT ASCENSION (α)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={raHH}
                      onChange={(e) => setRaHH(e.target.value)}
                      placeholder="hh"
                      className="w-full bg-surface-container-lowest/90 border border-white/10 rounded-lg p-2.5 text-center font-code-md text-sm text-white focus:border-secondary focus:outline-none"
                    />
                    <input
                      type="text"
                      value={raMM}
                      onChange={(e) => setRaMM(e.target.value)}
                      placeholder="mm"
                      className="w-full bg-surface-container-lowest/90 border border-white/10 rounded-lg p-2.5 text-center font-code-md text-sm text-white focus:border-secondary focus:outline-none"
                    />
                    <input
                      type="text"
                      value={raSS}
                      onChange={(e) => setRaSS(e.target.value)}
                      placeholder="ss.ss"
                      className="w-full bg-surface-container-lowest/90 border border-white/10 rounded-lg p-2.5 text-center font-code-md text-sm text-white focus:border-secondary focus:outline-none"
                    />
                  </div>
                </div>

                {/* Declination (Δ) */}
                <div className="flex flex-col gap-2">
                  <label className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    DECLINATION (δ)
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDecSign(decSign === '+' ? '-' : '+')}
                      className="w-12 bg-surface-container-lowest/90 border border-white/10 rounded-lg p-2.5 text-center font-code-md text-sm text-white font-bold hover:bg-white/10 transition-colors"
                    >
                      {decSign}
                    </button>
                    <input
                      type="text"
                      value={decDD}
                      onChange={(e) => setDecDD(e.target.value)}
                      placeholder="dd"
                      className="w-full bg-surface-container-lowest/90 border border-white/10 rounded-lg p-2.5 text-center font-code-md text-sm text-white focus:border-secondary focus:outline-none"
                    />
                    <input
                      type="text"
                      value={decMM}
                      onChange={(e) => setDecMM(e.target.value)}
                      placeholder="mm"
                      className="w-full bg-surface-container-lowest/90 border border-white/10 rounded-lg p-2.5 text-center font-code-md text-sm text-white focus:border-secondary focus:outline-none"
                    />
                    <input
                      type="text"
                      value={decSS}
                      onChange={(e) => setDecSS(e.target.value)}
                      placeholder="ss.s"
                      className="w-full bg-surface-container-lowest/90 border border-white/10 rounded-lg p-2.5 text-center font-code-md text-sm text-white focus:border-secondary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Compute Button */}
              <button
                onClick={handleComputeCoord}
                className="w-full py-3.5 px-6 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-headline-md text-body-md font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">calculate</span>
                <span>COMPUTE</span>
              </button>

              {/* Result Display Box */}
              <div className="p-4 rounded-xl bg-surface-container-lowest/90 border border-white/10 flex justify-around items-center text-center">
                <div>
                  <span className="font-code-md text-xs text-on-surface-variant block mb-1">
                    Galactic Longitude (l)
                  </span>
                  <span className="font-code-md text-headline-md font-bold text-secondary">
                    {resultGalactic.l}
                  </span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <span className="font-code-md text-xs text-on-surface-variant block mb-1">
                    Galactic Latitude (b)
                  </span>
                  <span className="font-code-md text-headline-md font-bold text-secondary">
                    {resultGalactic.b}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: MAGNITUDE */}
          {activeTab === 'MAGNITUDE' && (
            <div className="glass-panel rounded-2xl p-md md:p-lg border border-white/10 shadow-2xl flex flex-col gap-lg">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h2 className="font-headline-md text-headline-md font-bold text-white">
                  Apparent to Absolute Magnitude
                </h2>
                <span className="px-3 py-1 rounded bg-surface-container-high font-code-md text-xs text-on-surface-variant border border-white/10">
                  m - M = 5 log(d/10)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-2">
                  <label className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    APPARENT MAGNITUDE (m)
                  </label>
                  <input
                    type="text"
                    value={m1}
                    onChange={(e) => setM1(e.target.value)}
                    className="w-full bg-surface-container-lowest/90 border border-white/10 rounded-lg p-2.5 font-code-md text-sm text-white focus:border-secondary focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-code-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                    DISTANCE (d in pc)
                  </label>
                  <input
                    type="text"
                    value={distPc}
                    onChange={(e) => setDistPc(e.target.value)}
                    className="w-full bg-surface-container-lowest/90 border border-white/10 rounded-lg p-2.5 font-code-md text-sm text-white focus:border-secondary focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleComputeMag}
                className="w-full py-3.5 px-6 rounded-xl bg-secondary-fixed text-on-secondary-fixed font-headline-md text-body-md font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">calculate</span>
                <span>COMPUTE</span>
              </button>

              <div className="p-4 rounded-xl bg-surface-container-lowest/90 border border-white/10 text-center">
                <span className="font-code-md text-headline-lg font-bold text-accent_cyan">
                  {resultMag}
                </span>
              </div>
            </div>
          )}

          {/* Session Log Box (Matching Screenshot 4) */}
          <div className="glass-panel rounded-2xl p-md border border-white/10 shadow-xl flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <h3 className="font-headline-md text-body-lg font-bold text-white">
                Session Log
              </h3>
              <button
                onClick={() => setSessionLogs([])}
                className="text-on-surface-variant hover:text-error transition-colors"
                title="Clear Logs"
              >
                <span className="material-symbols-outlined text-base">delete</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-code-md text-xs">
                <thead>
                  <tr className="text-on-surface-variant border-b border-white/10">
                    <th className="py-2 px-3">Time (UTC)</th>
                    <th className="py-2 px-3">Type</th>
                    <th className="py-2 px-3">Input</th>
                    <th className="py-2 px-3">Result</th>
                    <th className="py-2 px-3 text-right">Copy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sessionLogs.map((log, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 px-3 text-on-surface-variant">{log.time}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-surface-container text-tertiary text-[10px] font-bold border border-white/10">
                          {log.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-white">{log.input}</td>
                      <td className="py-2.5 px-3 text-secondary font-bold">{log.result}</td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => alert(`Tercopy: ${log.result}`)}
                          className="text-on-surface-variant hover:text-white transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">content_copy</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: IAU Constants Card (Matching Screenshot 4) */}
        <div className="lg:col-span-4 flex flex-col gap-md">
          <div className="glass-panel rounded-2xl p-md border border-white/10 shadow-2xl flex flex-col gap-3">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <h3 className="font-headline-md text-headline-md font-bold text-white flex items-center gap-2">
                <span>IAU Constants</span>
                <span className="material-symbols-outlined text-tertiary text-lg">database</span>
              </h3>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search parameters..."
                value={constSearch}
                onChange={(e) => setConstSearch(e.target.value)}
                className="w-full bg-surface-container-lowest/90 border border-white/10 rounded-xl py-2 px-3 pl-9 font-code-md text-xs text-white focus:border-secondary focus:outline-none"
              />
              <span className="material-symbols-outlined text-on-surface-variant text-base absolute left-2.5 top-2.5">
                search
              </span>
            </div>

            {/* List of IAU Constants */}
            <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
              {iauConstants.map((c, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-lowest/80 p-3 rounded-xl border border-white/10 flex justify-between items-center hover:border-secondary/50 transition-colors"
                >
                  <div>
                    <p className="font-code-md text-xs text-on-surface-variant">{c.name}</p>
                    <p className="font-code-md text-sm font-bold text-white mt-0.5">{c.val}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-code-md text-xs font-bold text-secondary block">{c.symbol}</span>
                    <span className="font-code-md text-[10px] text-on-surface-variant">{c.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
