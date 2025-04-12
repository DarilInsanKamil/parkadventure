import Image from "next/image";
import { NavigationBar } from "./components/navigation";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <>
      <nav>
        <NavigationBar />
      </nav>
      <section>
        <Footer />
      </section>
    </>
  );
}
