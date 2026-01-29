import { ClerkProvider } from "@clerk/nextjs";
import "@/app/globals.css";
import Navbar from "./components/Navbar/Navbar";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}</body>
      </html>
    </ClerkProvider>
  );
}
