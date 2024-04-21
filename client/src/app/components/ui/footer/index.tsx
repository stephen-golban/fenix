const { SITE_NAME } = process.env;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const copyrightName = SITE_NAME || "";
  const copyrightDate = `${currentYear - 1}-${currentYear}`;

  return (
    <footer className="text-sm text-neutral-500">
      <div className="footer-container">
        <div className="footer-content flex flex-col items-center gap-y-1 border-t border-neutral-200 py-6 text-sm">
          <div className="flex items-center">
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
