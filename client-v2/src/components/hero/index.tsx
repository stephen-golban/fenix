import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";

const Hero = () => {
  return (
    <div className="h-[calc(100vh-80px)] flex flex-col">
      <section
        className="hero relative flex justify-center items-center flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="relative z-10 p-6 md:p-12 bg-white bg-opacity-60 rounded-lg shadow-lg max-w-xl md:max-w-2xl md:text-left md:absolute md:right-60 font-medium mx-3 md:mx-0">
          <p className="text-xs md:text-sm text-font uppercase">
            Noua Apariție
          </p>
          <h1 className="text-2xl md:text-4xl font-bold text-primary mt-5">
            Descoperiți Noua Noastră Colecție
          </h1>
          <p className="text-sm md:text-base text-font my-4">
            Descoperiți noua noastră colecție, inspirată de cele mai recente
            tendințe în design interior.
          </p>
          <Link href="/categories">
            <Button
              size="lg"
              className="mt-4 rounded-full text-lg font-semibold uppercase"
            >
              Vezi Acum
            </Button>
          </Link>
        </div>
      </section>
      <div className="flex flex-wrap justify-between bg-pale-light py-8 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 w-full">
        <div className="flex items-center gap-x-4 mb-6 sm:mb-4 md:mb-0 w-full sm:w-1/2 md:w-auto">
          <Image
            src="/car.svg"
            alt="Livrare Gratuită"
            width={48}
            height={48}
            className="w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          <div className="text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary">
              Livrare Rapidă
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Livrăm cât mai repede posibil.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-4 mb-6 sm:mb-4 md:mb-0 w-full sm:w-1/2 md:w-auto">
          <Image
            src="/trophy.png"
            alt="Calitate Înaltă"
            width={48}
            height={48}
            className="w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          <div className="text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary">
              Calitate Înaltă
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Materiale de top.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-4 w-full sm:w-1/2 md:w-auto">
          <Image
            src="/shield.png"
            alt="100% Autentic"
            width={48}
            height={48}
            className="w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          <div className="text-left">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary">
              100% Autentic
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Produse originale garantate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
