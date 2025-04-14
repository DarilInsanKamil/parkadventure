import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-red-500">
      <div className="w-full flex-none md:w-64">
        <p>Sidenav</p>
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
}
