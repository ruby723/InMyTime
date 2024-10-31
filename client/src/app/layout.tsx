import type { Metadata } from "next";
import ReduxProvider from "../redux/provider";

export const metadata: Metadata = {
  title: "InMyTime",
  description: "What are you doing in your time?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
        {children}
        </ReduxProvider>
          
      </body>
    </html>
  );
}
