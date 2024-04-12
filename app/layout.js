"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import AptosPovider from "@/Providers/AptosWalletProvider";
import Moralis from "moralis";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "My App",
  description: "My app is the best app.",
};

Moralis.start({
  apiKey: "OGCQpmMcK10EmtmRK51f9fK3qGSZzgrOP0HxnR0j3lddYd0iSeFPnMAtqsi99E4n"
})

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
          <AptosPovider>
            {children}
          </AptosPovider>
      </body>
    </html>
  );
}
