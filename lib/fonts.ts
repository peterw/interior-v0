import { JetBrains_Mono as FontMono, Inter as FontSans, Outfit as FontOutfit } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const fontOutfit = FontOutfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
