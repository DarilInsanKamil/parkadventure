import { Suspense } from "react";
import { Footer } from "../../components/ui/footer";
import { NavigationBar } from "../../components/ui/navigation";
import Loading from "./loading";

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
