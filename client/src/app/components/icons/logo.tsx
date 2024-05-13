import clsx from "clsx";

const LogoIcon: React.FC<React.ComponentProps<"svg">> = (props) => {
  return (
    <img
      src={require("../../assets/logo.jpg")}
      alt="logo"
      className={clsx("h-8 w-8 fill-black mt-1", props.className)}
    />
  );
};

export { LogoIcon };
