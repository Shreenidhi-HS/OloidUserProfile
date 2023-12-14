import React from "react";
import { Input } from "../ui/input";

const CreateNfc = () => {
  return (
    <div className="flex flex-col gap-10 items-center">
      <p className="font-avenirBlack text-ObsidianDarkBlue text-[1.75rem]">
        Scan your NFC Tag
      </p>
      <div className="bg-ChawkWhite border border-LightGrey rounded-[0.5rem] p-5 w-full">
        <Input label="Scan or Type Data" placeholder="Type here" />
      </div>
    </div>
  );
};

export default CreateNfc;
