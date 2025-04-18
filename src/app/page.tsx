import Image from "next/image";
import { NavigationBar } from "../components/ui/navigation";
import { Footer } from "../components/ui/footer";
import HeroSection from "../components/landingpage/herosection";
import PacketSection from "../components/landingpage/packetsection";
import { GalerySection } from "../components/landingpage/galerysection";
import AboutSection from "../components/landingpage/aboutsection";
import { MapSection } from "@/components/landingpage/mapsectio";

export default function Home() {
  const dataDummy = [
    {
      id: 1,
      image: "whiterafting.png",
    },
    {
      id: 2,
      image: "whiterafting.png",
    },
    {
      id: 3,
      image: "whiterafting.png",
    },
    {
      id: 4,
      image: "whiterafting.png",
    },
    {
      id: 5,
      image: "whiterafting.png",
    },
    {
      id: 6,
      image: "whiterafting.png",
    },
  ];

  return (
    <>
      <NavigationBar />
      <section>
        <section className="mt-5 px-10">
          <HeroSection />
        </section>
        <section className="mt-20 px-10">
          <AboutSection />
        </section>
        <section className="mt-20  p-10">
          <PacketSection />
        </section>
      
        <section className="pt-20 px-10">
          <GalerySection data={dataDummy} />
        </section>
        <section className="mt-20  p-10">
          <MapSection />
        </section>
      </section>
      <Footer />
    </>
  );
}
