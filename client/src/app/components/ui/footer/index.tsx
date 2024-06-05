import { Link } from "react-router-dom";

const { SITE_NAME } = process.env;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const copyrightName = SITE_NAME || "";
  const copyrightDate = `${currentYear - 1}-${currentYear}`;

  return (
    <footer className="text-sm text-neutral-500">
      <div className="footer-container">
        <div className="footer-content flex flex-col items-center gap-y-1 border-t border-neutral-200 py-6 text-sm">
          <Link
            to="/about"
            className="flex items-center justify-center w-auto mr-6 ml-6"
          >
            <div className="ml-2 flex-none text-lg font-medium text-neutral-500  hover:text-black underline-offset-4 hover:underline">
              Despre noi
            </div>
          </Link>
          <div className="flex items-center mt-7">
            <p className="mr-2">Made in Moldova</p>
            <hr className="h-4 w-[1px] border-l border-neutral-400" />
            <p className="ml-2">
              &copy; {copyrightDate} {copyrightName}
              {copyrightName && !copyrightName.endsWith(".") && "."}
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export { Footer };
