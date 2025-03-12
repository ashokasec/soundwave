import type { Metadata } from "next";
import "./globals.css";
import { geistSans } from "@/lib/fonts";
import { APP_NAME } from "@/lib/constants";

const APP_TITLE = `${APP_NAME} - Multiple Blockchain Wallet`;

export const metadata: Metadata = {
  title: APP_TITLE,
  description: "Multiple Blockchain Wallet",
  authors: [
    {
      name: "ashokasec",
      url: "https://ashokasec.com",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>{children}</body>
    </html>
  );
}
