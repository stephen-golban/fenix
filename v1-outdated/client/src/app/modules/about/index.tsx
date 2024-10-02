import { RootLayout } from "../../components/layout";
import "./index.css";
import img from "../../assets/hero.jpg";

const About: React.FC = () => {
  return (
    <RootLayout>
      <div className="w-full p-10 flex flex-col lg:flex-row items-center  justify-center text-center space-y-5 lg:space-y-0 lg:space-x-5">
        <div className="w-full lg:w-1/2">
          <p className="text-font text-lg md:text-xl">
            Mobilerul potrivit redefinește un interior și vă oferă senzația de
            confort și comoditate. Este frumos, dar și practic. Este creat
            conform cerințelor și așteptărilor dvs., dar și pe gustul întregii
            familii. Mai mult, el nu devine plictisitor odată cu trecerea
            anilor.
          </p>

          <br />
          <p className="text-font text-lg md:text-xl">
            Astăzi, mii de oameni cunosc și preferă compania noastră! Canapelele
            noastre într-o diversitate uimitoare, precum și celelalte piese de
            mobilier, pot fi întâlnite în case și birouri de aici și de departe
            – în Soroca, Drochia, Bălți, Briceni, Tiraspol, Edineț, Cahul,
            București, Moscova… și lista poate continua.
          </p>
        </div>
        <img className="w-full lg:w-1/2" src={img} alt="Mobilier" />
      </div>
      <div className="showroom" />
    </RootLayout>
  );
};

export { About };
