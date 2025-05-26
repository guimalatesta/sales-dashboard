// src/app/layout.tsx
import { Inter } from "next/font/google";
import { ApolloWrapper } from "@/lib/apolloClient";
import { ThemeProvider } from "@/providers/theme-provider";
import Navigation from "@/components/Navigation";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <ThemeProvider>
            <div className="min-h-screen bg-gray-50">
              <Navigation />
              <main className="p-4 max-w-7xl mx-auto">{children}</main>
            </div>
          </ThemeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
