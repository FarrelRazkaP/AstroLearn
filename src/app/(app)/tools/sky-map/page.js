'use client';

import { useState } from 'react';
import SkyMap3DCanvas from '@/components/effects/SkyMap3DCanvas';

export default function InteractiveSkyMapPage() {
  const celestialTargets = [
    {
      name: 'Orion Nebula',
      catalog: 'M42',
      type: 'Diffuse Nebula in Orion',
      magnitude: '4.0',
      distance: '1,344 ly',
      visibility: 'Visible',
      ra: '05h 35m 17s',
      dec: '-05° 23′ 28″',
      img: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Andromeda Galaxy',
      catalog: 'M31',
      type: 'Spiral Galaxy',
      magnitude: '3.44',
      distance: '2.537 Myr',
      visibility: 'Visible',
      ra: '00h 42m 44s',
      dec: '+41° 16′ 09″',
      img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Sirius A',
      catalog: 'Alpha CMa',
      type: 'Binary Star System',
      magnitude: '-1.46',
      distance: '8.6 ly',
      visibility: 'High Visibility',
      ra: '06h 45m 08s',
      dec: '-16° 42′ 58″',
      img: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600&auto=format&fit=crop&q=80',
    },
    {
      name: 'Pleiades Cluster',
      catalog: 'M45',
      type: 'Open Star Cluster',
      magnitude: '1.6',
      distance: '444 ly',
      visibility: 'Visible',
      ra: '03h 47m 24s',
      dec: '+24° 07′ 00″',
      img: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const [selectedTarget, setSelectedTarget] = useState(celestialTargets[0]);

  return (
    <div className="relative h-[680px] min-h-[550px] w-full overflow-hidden rounded-2xl border border-white/10 glass-panel shadow-2xl">
      {/* Fullscreen 3D Star Sphere WebGL Canvas */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <SkyMap3DCanvas target={selectedTarget} />
      </div>

      {/* Top Right Action Icons */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => alert(`Koordinat ${selectedTarget.name} (RA: ${selectedTarget.ra}, Dec: ${selectedTarget.dec}) disalin!`)}
          className="p-2.5 rounded-xl bg-surface-container/80 backdrop-blur border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10 transition-all cursor-pointer shadow-lg"
          title="Share"
        >
          <span className="material-symbols-outlined text-lg">share</span>
        </button>
        <button
          onClick={() => alert('Grid koordinat langit diaktifkan')}
          className="p-2.5 rounded-xl bg-surface-container/80 backdrop-blur border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10 transition-all cursor-pointer shadow-lg"
          title="Grid Toggle"
        >
          <span className="material-symbols-outlined text-lg">grid_4x4</span>
        </button>
        <button
          onClick={() => alert('Mode malam observatorium diaktifkan')}
          className="p-2.5 rounded-xl bg-surface-container/80 backdrop-blur border border-white/10 text-on-surface-variant hover:text-white hover:bg-white/10 transition-all cursor-pointer shadow-lg"
          title="Night Mode"
        >
          <span className="material-symbols-outlined text-lg">dark_mode</span>
        </button>
      </div>

      {/* Target Selector Dropdown Overlay */}
      <div className="absolute top-4 left-4 z-20">
        <div className="glass-panel p-2 rounded-xl border border-white/10 flex items-center gap-2 shadow-xl">
          <span className="material-symbols-outlined text-tertiary text-sm pl-2">radar</span>
          <select
            value={selectedTarget.name}
            onChange={(e) => {
              const found = celestialTargets.find((t) => t.name === e.target.value);
              if (found) setSelectedTarget(found);
            }}
            className="bg-transparent text-white font-code-md text-xs font-bold focus:outline-none cursor-pointer pr-2"
          >
            {celestialTargets.map((target) => (
              <option key={target.name} value={target.name} className="bg-surface-container text-white">
                {target.name} ({target.catalog})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bottom Floating Inspection Card (Matching Screenshot 2) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-xl px-4">
        <div className="glass-panel-2 rounded-2xl p-5 border border-white/20 shadow-2xl backdrop-blur-3xl flex flex-col gap-4 relative overflow-hidden">
          {/* Close Button */}
          <button
            onClick={() => alert('Objek ditutup')}
            className="absolute top-4 right-4 text-on-surface-variant hover:text-white transition-colors z-10"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>

          {/* Header Title & HD Astrophotography Preview */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/20 shadow-md flex-shrink-0 relative">
              <img
                src={selectedTarget.img}
                alt={selectedTarget.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display-lg text-headline-lg font-bold text-white tracking-tight">
                  {selectedTarget.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded bg-surface-variant text-on-surface-variant font-code-md text-xs font-bold border border-white/10">
                  {selectedTarget.catalog}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {selectedTarget.type}
              </p>
            </div>
          </div>

          {/* 3 Metric Box Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-surface-container-lowest/80 p-3 rounded-xl border border-white/10 flex flex-col gap-1">
              <span className="font-code-md text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                MAGNITUDE
              </span>
              <span className="font-code-md text-body-lg font-bold text-white">
                {selectedTarget.magnitude}
              </span>
            </div>

            <div className="bg-surface-container-lowest/80 p-3 rounded-xl border border-white/10 flex flex-col gap-1">
              <span className="font-code-md text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                DISTANCE
              </span>
              <span className="font-code-md text-body-lg font-bold text-white">
                {selectedTarget.distance}
              </span>
            </div>

            <div className="bg-surface-container-lowest/80 p-3 rounded-xl border border-white/10 flex flex-col gap-1">
              <span className="font-code-md text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                VISIBILITY
              </span>
              <span className="font-code-md text-body-lg font-bold text-accent_green flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-accent_green animate-pulse" />
                <span>{selectedTarget.visibility}</span>
              </span>
            </div>
          </div>

          {/* 2 Bottom Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => alert(`Kamera dipusatkan pada ${selectedTarget.name}`)}
              className="py-2.5 px-4 rounded-xl border border-white/20 text-white font-code-md text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">filter_center_focus</span>
              <span>Center</span>
            </button>

            <button
              onClick={() => alert(`Detail Katalog ${selectedTarget.name}:\nRA: ${selectedTarget.ra}\nDec: ${selectedTarget.dec}`)}
              className="py-2.5 px-4 rounded-xl border border-white/20 text-white font-code-md text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">info</span>
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
