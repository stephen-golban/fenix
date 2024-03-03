import { Link } from "react-router-dom";

const NotFoundModule: React.FC = () => {
  return (
    <div className="flex h-[100svh] items-center justify-center bg-neutral-900">
      <div className="text-center">
        <h1 className="p-0 text-[15rem] leading-normal">404</h1>
        <p className="text-xl font-bold">Ups! Pagina nu a fost găsită</p>
        <p className="text-xl">
          ne pare rău, dar pagina pe care ați solicitat-o nu a fost găsită
        </p>
        <Link
          to="/"
          aria-label="Navigați către pagina de autentificare sau chat-uri, dacă sunteți autentificat"
          className="mt-4 inline-block rounded-md bg-gray-800 px-6 py-2 text-[1.5rem] text-white focus:outline-none focus:ring-[3px] focus:ring-sky-500"
        >
          Acasă
        </Link>
      </div>
    </div>
  );
};

export { NotFoundModule };
