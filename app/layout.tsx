import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rohan K Rajoli | Portfolio",
  description:
    "Java Full Stack Developer building intelligent systems and modern web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
