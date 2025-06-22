import { Suspense } from "react";
import { Footer } from "../../components/ui/footer";
import { NavigationBar } from "../../components/ui/navigation";
import Loading from "./loading";
import { Metadata } from "next";

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

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavigationBar />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Footer />
    </div>
  );
}
