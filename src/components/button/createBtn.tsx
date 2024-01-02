interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "alert";
  className?: string;
}

function CreateBtn({ text, onClick, variant, className }: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`relative rounded-lg font-avenirMedium text-sm m-auto border-[1px] border-ObsidianDarkBlue px-5 py-[0.625rem] cursor-pointer w-full
          ${variant === "primary" && "bg-[#000000] text-white"}
          ${
            variant === "secondary" &&
            "bg-[white] text-[#000000] border-[black]"
          }
          ${variant === "alert" && "bg-BrightRed text-white border-none"}
          ${className}`}
      >
        {text}
      </button>
    </>
  );
}

export default CreateBtn;
