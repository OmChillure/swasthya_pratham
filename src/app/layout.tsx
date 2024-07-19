import "@/styles/global.css"

import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    default: "Swasthya Pratham | Onestop health solution",
    template: "",
  },
  description: "A online art evaluator and marketplace for all art fanatics",
  icons: [{ rel: "icon", url: "./logo.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              >
              <Header />
              {children}
            </ThemeProvider> 
          </body>
      </html>
  );
}
