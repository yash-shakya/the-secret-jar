import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/authprovider";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/context/themeprovider";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Secret Jar - Anonymous Messages",
  description: "Send and receive anonymous messages securely",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>

        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${playfair.variable} ${poppins.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={false}>
              <SidebarInset className="flex flex-col">
                <Navbar />
                <main >
                  {children}
                </main>
              </SidebarInset>
              <AppSidebar />
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html >
  );
}
