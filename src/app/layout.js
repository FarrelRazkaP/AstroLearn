import 'katex/dist/katex.min.css';
import './globals.css';

export const metadata = {
  title: 'AstroLearn - Jelajahi Alam Semesta',
  description:
    'Platform pembelajaran astronomi terpadu untuk pemula, peserta OSN/IOAA, mahasiswa, dan guru.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0e27" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script
          id="tailwind-config"
          dangerouslySetInnerHTML={{
            __html: `
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                            "primary-fixed-dim": "#c1c4e6",
                            "surface-variant": "#353437",
                            "on-error": "#690005",
                            "outline-variant": "#46464d",
                            "outline": "#919098",
                            "on-secondary-container": "#bab1ee",
                            "on-primary-fixed": "#161a33",
                            "secondary-fixed": "#e5deff",
                            "primary": "#c1c4e6",
                            "surface-dim": "#131315",
                            "on-secondary": "#30295c",
                            "on-error-container": "#ffdad6",
                            "primary-container": "#0a0e27",
                            "on-tertiary-container": "#6e7ba3",
                            "tertiary": "#b9c5f2",
                            "surface-tint": "#c1c4e6",
                            "on-primary-fixed-variant": "#414561",
                            "on-tertiary-fixed": "#0b1a3d",
                            "error": "#ffb4ab",
                            "on-tertiary-fixed-variant": "#39456b",
                            "error-container": "#93000a",
                            "on-secondary-fixed-variant": "#474074",
                            "on-background": "#e5e1e4",
                            "tertiary-fixed": "#dbe1ff",
                            "primary-fixed": "#dee0ff",
                            "secondary-container": "#4a4277",
                            "surface-container-high": "#2a2a2c",
                            "secondary-fixed-dim": "#c9bffd",
                            "surface-container-low": "#1c1b1d",
                            "surface": "#131315",
                            "on-tertiary": "#222f53",
                            "on-secondary-fixed": "#1b1246",
                            "surface-bright": "#39393b",
                            "background": "#131315",
                            "on-primary-container": "#777a99",
                            "surface-container": "#201f21",
                            "inverse-on-surface": "#313032",
                            "tertiary-fixed-dim": "#b9c5f2",
                            "inverse-surface": "#e5e1e4",
                            "on-surface-variant": "#c7c5ce",
                            "surface-container-highest": "#353437",
                            "on-primary": "#2b2f49",
                            "secondary": "#c9bffd",
                            "surface-container-lowest": "#0e0e10",
                            "inverse-primary": "#595c79",
                            "on-surface": "#e5e1e4",
                            "tertiary-container": "#000d31",
                            "accent_gold": "#FFD700",
                            "accent_cyan": "#00FFFF",
                            "accent_green": "#00FF00",
                            "accent_red": "#FF0000"
                    },
                    "borderRadius": {
                            "DEFAULT": "0.25rem",
                            "lg": "0.5rem",
                            "xl": "0.75rem",
                            "full": "9999px"
                    },
                    "spacing": {
                            "sm": "12px",
                            "lg": "40px",
                            "margin": "32px",
                            "base": "8px",
                            "md": "24px",
                            "gutter": "24px",
                            "xs": "4px",
                            "xl": "64px"
                    },
                    "fontFamily": {
                            "code-md": ["JetBrains Mono"],
                            "label-sm": ["JetBrains Mono"],
                            "body-lg": ["Inter"],
                            "headline-md": ["Inter"],
                            "body-md": ["Inter"],
                            "headline-lg": ["Inter"],
                            "display-lg": ["Inter"]
                    },
                    "fontSize": {
                            "code-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                            "label-sm": ["12px", { "lineHeight": "16px", "fontWeight": "500" }],
                            "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                            "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                            "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                            "headline-lg": ["32px", { "lineHeight": "40px", "fontWeight": "700" }],
                            "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "800" }]
                    }
                }
            }
        }
            `,
          }}
        />
      </head>
      <body className="bg-background text-on-background font-body-md antialiased min-h-screen relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
