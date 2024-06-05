import { Suspense } from "react";
import { Footer, Loader, Navbar } from "../ui";

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-neutral-50 text-black selection:bg-teal-300 size-full">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <main className="py-5">{children}</main>
      </Suspense>
      <Footer />
    </div>
  );
};

export { RootLayout };
