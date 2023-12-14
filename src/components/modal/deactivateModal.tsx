import React, { FC } from "react";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import CreateBtn from "../button/createBtn";
import { Checkbox } from "../ui/checkbox";

interface DeactivateNfcModalProps {
  open: boolean;
  toggle: () => void;
  handleDeactivate: () => void;
  title: string;
  type: "Activate" | "Deactivate";
  firstCheck: string;
  secondCheck: string;
}

const DeactivateModal: FC<DeactivateNfcModalProps> = ({
  open,
  toggle,
  handleDeactivate,
  title,
  type,
  firstCheck,
  secondCheck,
}) => {
  const renderCheckbox = (id: string, label: string) => (
    <div className="flex items-center gap-2">
      <Checkbox id={id} />
      <label
        htmlFor={id}
        className="text-xs font-avenirMedium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent className="bg-white rounded-[0.5rem] shadow-none">
        <DialogHeader>
          <DialogDescription className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <p className="text-CharcolDarkBlue font-avenirHeavy text-base text-left">
                {title}
              </p>
              <div className="flex flex-col gap-4">
                {renderCheckbox("1", firstCheck)}
                {renderCheckbox("2", secondCheck)}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              {type === "Deactivate" ? (
                <CreateBtn
                  variant="alert"
                  text="Deactivate"
                  onClick={handleDeactivate}
                />
              ) : (
                <CreateBtn
                  variant="primary"
                  text="Activate"
                  onClick={handleDeactivate}
                />
              )}
              <div>
                <p
                  className="text-ObsidianDarkBlue font-avenirHeavy text-sm"
                  onClick={toggle}
                >
                  Cancel
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeactivateModal;
