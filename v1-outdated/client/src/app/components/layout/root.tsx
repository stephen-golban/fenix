import { Footer, Loader, Navbar } from "../ui";

interface IRootLayout extends React.PropsWithChildren<{ loading?: boolean }> {}

const RootLayout: React.FC<IRootLayout> = ({ children, loading }) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-neutral-50 text-black selection:bg-teal-300 size-full">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export { RootLayout };
