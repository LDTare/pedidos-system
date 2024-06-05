import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import Provider from "./context/provider";

import { cn } from "@/lib/utils";

export const metadata = {
  title: "Pedidos",
  description: "Pedidos de la empresa",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <Provider>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <main>{children}</main>
        <Toaster richColors />
      </body>
      </Provider>
    </html>
  );
}
