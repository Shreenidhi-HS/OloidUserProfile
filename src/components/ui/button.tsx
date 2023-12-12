interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  showLoad?: boolean;
  icon?: string;
  type?: "button" | "submit" | "reset";
}

function Button({
  text,
  onClick,
  variant,
  className,
  showLoad = false,
  icon,
  type,
}: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`relative rounded-lg font-avenirMedium m-auto w-full border-[1px] border-ObsidianDarkBlue py-4 cursor-pointer
        ${variant === "primary" && "bg-[#000000] text-white"}
        ${variant === "secondary" && "bg-[white] text-[#000000] border-[black]"}
        ${className}`}
      >
        {showLoad ? (
          <div className="animate-spin w-[20px] h-[20px] rounded-full border-t-black border-[#ffffff] border-[2px] m-auto"></div>
        ) : (
          text
        )}
        {icon && (
          <img
            src={icon}
            alt="button_icons"
            className="absolute top-0 left-[1.875rem] w-6 h-6 top-1/2 -translate-y-1/2 max-w-6"
          />
        )}
      </button>
    </>
  );
}

export default Button;
