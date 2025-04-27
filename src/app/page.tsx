import { NavigationBar } from "../components/ui/navigation";
import { Footer } from "../components/ui/footer";
import HeroSection from "../components/landingpage/herosection";
import PacketSection from "../components/landingpage/packetsection";
import { GalerySection } from "../components/landingpage/galerysection";
import AboutSection from "../components/landingpage/aboutsection";
import { MapSection } from "@/components/landingpage/mapsectio";
import { CTASection } from "@/components/landingpage/ctasection";

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
        <section className="mt-5 md:px-10 px-5">
          <HeroSection />
        </section>
        <section className="mt-20 md:px-10 px-5">
          <AboutSection />
        </section>
        <section className="mt-20 md:p-10 p-5">
          <PacketSection />
        </section>
        <section className="pt-20 md:px-10 p-5">
          <GalerySection data={dataDummy} />
        </section>
        <section className="mt-20 md:px-10 p-5">
          <MapSection />
        </section>
        <section className="mt-20">
          <CTASection />
        </section>
      </section>
      <Footer />
    </>
  );
}
