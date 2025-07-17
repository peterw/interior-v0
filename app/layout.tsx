import "./globals.css"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { fontSans, fontOutfit } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Providers } from "./root-providers"
import Head from "./root-head"
import { GlobalSearch } from "@/components/global-search"


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" }
    ],
    shortcut: "/favicon.svg",
    apple: [
      { url: "/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-256x256.png", sizes: "256x256", type: "image/png" }
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://app.localrank.so",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{
      url: siteConfig.images.default,
      width: 1200,
      height: 630,
      alt: "LocalRank - The AI-Powered Local SEO Software"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.images.default],
    creator: "@localrankso"
  },
  metadataBase: new URL("https://app.localrank.so")
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontOutfit.variable
        )}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://load.server.localrank.so/ns.html?id=GTM-KNX928FF"
            height="0" 
            width="0" 
            style={{display:"none",visibility:"hidden"}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <Providers>
          <GlobalSearch />
          <main>
            <div className="relative flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
