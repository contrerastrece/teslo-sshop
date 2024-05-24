import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Home",
  },
  description: "Una tienda virtual de Productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(process.env.NODE_ENV, "😀");
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
