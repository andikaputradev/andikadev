import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import AnalyticsWrapper from "@/components/providers/analytics-wrapper";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { productionUrl, siteConfig } from "@/lib/seo/config";
import { buildSiteGraph } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { cn } from "@/lib/utils";
import { hasPublishedBlogPosts } from "@/lib/blog";
import "@/lib/env";
import "./globals.css";

// Inter font - matching reference design
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

const verificationOther: Record<string, string> = {}
if (process.env.BING_VERIFICATION_CODE) verificationOther['msvalidate.01'] = process.env.BING_VERIFICATION_CODE
if (process.env.YANDEX_VERIFICATION_CODE) verificationOther['yandex-verification'] = process.env.YANDEX_VERIFICATION_CODE

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Pengembang Web dan Aplikasi`,
    template: `%s${siteConfig.titleSuffix}`
  },
  description: siteConfig.description,
  keywords: [
    'jasa pembuatan website',
    'jasa pembuatan aplikasi',
    'jasa upload play store',
    'jasa upload aplikasi tanpa closed testing',
    'keamanan siber defensif',
    'pengembang web3 blockchain',
    'Wahyu Andika Putra',
    'Andika Putra Dev',
    'jasa website wonosobo',
    'jasa website semarang',
    'developer website indonesia',
    'jasa landing page cepat',
    'aplikasi android profesional'
  ],
  authors: [{ name: siteConfig.author, url: `${productionUrl}/tentang` }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-icon.png',
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: productionUrl,
    title: `${siteConfig.name} | Pengembang Web dan Aplikasi`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.author} (Pengembang Web dan Aplikasi)`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Pengembang Web dan Aplikasi`,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
  metadataBase: new URL(productionUrl),
  robots:
    process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production'
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  verification: {
    ...(process.env.GOOGLE_VERIFICATION_CODE ? { google: process.env.GOOGLE_VERIFICATION_CODE } : {}),
    ...(Object.keys(verificationOther).length ? { other: verificationOther } : {}),
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasBlog = await hasPublishedBlogPosts();

  return (
    <html lang="id" suppressHydrationWarning>
      <body 
        suppressHydrationWarning
        className={cn(
          "min-h-screen antialiased selection:bg-slate-900 selection:text-white",
          inter.variable,
          "font-sans"
        )}
        style={{
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <JsonLd data={buildSiteGraph()} />

          {/* Background - matching reference design */}
          <div 
            className="fixed inset-0 -z-10 bg-zinc-400 dark:bg-zinc-950 transition-colors"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 10%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 55%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, rgba(161,161,170,1) 0%, rgba(212,212,216,1) 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="fixed inset-0 -z-10 hidden dark:block transition-colors"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 10%, rgba(249,115,22,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.03) 0%, transparent 60%), linear-gradient(180deg, #09090b 0%, #18181b 100%)',
            }}
            aria-hidden="true"
          />

          {/* Main Glass Panel Container */}
          <div className="flex justify-center items-start min-h-screen px-0 py-0 xl:p-8">
            <main className="glass-panel overflow-hidden flex flex-col xl:max-w-[1300px] z-10 xl:border-white/50 dark:xl:border-zinc-800 border-none xl:border xl:rounded-[2.5rem] min-h-screen xl:min-h-[700px] w-full rounded-none relative xl:shadow-2xl">
              
              {/* Vertical Grid Lines */}
              <div className="absolute inset-0 flex justify-between pointer-events-none z-0 px-6 md:px-10 xl:px-12 w-full h-full">
                <div className="h-full w-px bg-zinc-950/5 dark:bg-white/5"></div>
                <div className="h-full w-px bg-zinc-950/5 dark:bg-white/5 hidden md:block"></div>
                <div className="h-full w-px bg-zinc-950/5 dark:bg-white/5 hidden lg:block"></div>
                <div className="h-full w-px bg-zinc-950/5 dark:bg-white/5 hidden xl:block"></div>
                <div className="h-full w-px bg-zinc-950/5 dark:bg-white/5"></div>
              </div>

              <Header hasBlog={hasBlog} />
              <div className="flex-1 relative z-10 px-6 md:px-10 xl:px-12 pb-8">
                {children}
              </div>
              <Footer hasBlog={hasBlog} />
            </main>
          </div>

          <AnalyticsWrapper />
          <ServiceWorkerRegistration />
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-KPW9PV8X3X"
            strategy="afterInteractive"
          />
          <Script id="google-tag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KPW9PV8X3X');
            `}
          </Script>
        </ThemeProvider>
      </body>
    </html>
  );
}
