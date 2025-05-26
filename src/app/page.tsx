export const dynamic = 'force-dynamic';

import AboutSection from "@/components/landingpage/aboutsection";
import { CTASection } from "@/components/landingpage/ctasection";
import { GalerySection } from "@/components/landingpage/galerysection";
import HeroSection from "@/components/landingpage/herosection";
import { MapSection } from "@/components/landingpage/mapsectio";
import PacketSection from "@/components/landingpage/packetsection";
import { Footer } from "@/components/ui/footer";
import { NavigationBar } from "@/components/ui/navigation";


interface GalleryItem {
  id_gallery: number;
  title: string;
  image_url: string;
  is_featured: boolean;
}

// Redirect to admin login from homepage
export default async function Page() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/gallery`)
  const data = await res.json()
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
          <GalerySection data={data} />
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
