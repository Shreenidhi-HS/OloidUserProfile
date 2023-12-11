import * as React from "react";

import { cn } from "../../utils/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="font-avenirHeavy text-base text-[#1A2F47]">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex flex-row w-full p-4 bg-[#FFFFFF] border-[1px] border-[#272727] rounded-lg mt-[0.688rem] font-avenirMedium text-base",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
