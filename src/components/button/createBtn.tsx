interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

function CreateBtn({ text, onClick, variant, className }: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`relative rounded-lg font-avenirMedium text-sm m-auto border-[1px] border-ObsidianDarkBlue py-[0.625rem] cursor-pointer
          ${variant === "primary" && "bg-[#000000] text-white"}
          ${
            variant === "secondary" &&
            "bg-[white] text-[#000000] border-[black]"
          }
          ${className}`}
      >
        {text}
      </button>
    </>
  );
}

export default CreateBtn;
