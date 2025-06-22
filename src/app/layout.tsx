import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import auth provider for session management
import { AuthProvider } from "@/components/auth/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Batok Rafting",
  icons: {
    icon: "/logo.png", // If your icon is not named favicon.ico or icon.png in the app root
    shortcut: "/logo.png", // Example for a specific shortcut icon
    apple: "/logo.png", // Example for Apple touch icon
  },
  description: `Didirikan pada tahun 2014, Batok Rafting hadir sebagai penyedia
            layanan wisata petualangan di kawasan Caringin, Bogor.Kami
            menawarkan pengalaman seru dan menantang melalui kegiatan arung
            jeram (rafting) dll serta kegiatan gathering, outing, raker atau
            acara besar lainnya. Beragam paket one day trip, two day trip &
            halfday trip yang dirancang untuk semua kalangan - mulai dari pemula
            hingga pecinta adrenalin sejati. Lokasi Strategis, Alam yang Asri
            Berlokasi di Jl. Muara Jaya, Kecamatan Caringin, Kabupaten Bogor,
            area kami dikelilingi oleh keindahan alam pegunungan yang masih
            asri, menjadikan setiap petualangan semakin berkesan.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
