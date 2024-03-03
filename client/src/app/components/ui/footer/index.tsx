const { SITE_NAME } = process.env;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const copyrightName = SITE_NAME || "";
  const copyrightDate = `${currentYear - 1}-${currentYear}`;

  return (
    <footer className="text-sm text-neutral-500">
      <div className="flex-row justify-center border-t border-neutral-200 py-6 text-sm">
        <div className="flex flex-col items-center gap-y-1">
          <p>Made in Moldova</p>
          <hr className="mx-4 h-4 w-[1px] self-center border-l border-neutral-400" />
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export { Footer };
export { FooterMenu } from "./parts";
