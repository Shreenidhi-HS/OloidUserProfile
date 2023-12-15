import { useState } from "react";
import Button from "../ui/button";
import { Input } from "../ui/input";

const CreateBadge = () => {
  const [badge, setBadge] = useState("");

  const handleInput = () => {};

  const handleSubmit = () => {};

  return (
    <div className="h-screen max-h-[712px] flex flex-col justify-between">
      <div className="flex flex-col gap-10 items-center">
        <p className="font-avenirBlack text-ObsidianDarkBlue text-[1.75rem]">
          Scan your NFC Tag
        </p>
        <div className="flex flex-col gap-5 w-full">
          <div className="bg-ChawkWhite border border-LightGrey rounded-[0.5rem] p-5">
            <Input
              label="Scan or Type Data"
              placeholder="Type here"
              value={badge}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="flex flex-col gap-5 bg-ChawkWhite border border-LightGrey rounded-[0.5rem] p-5">
            <div className="flex flex-col gap-[0.313rem]">
              <Input
                label="Number of Bits (optional)"
                placeholder="Type here"
                value={badge}
                onChange={(e) => handleInput(e)}
              />
              <p className="font-avenirMedium text-DarkGrey text-sm">
                Accepted bit range is 25 to 256.
              </p>
            </div>
            <div className="flex items-start gap-[0.313rem]">
              <img src="/assets/warning-icon.svg" alt="icon" />
              <p className="font-avenirMedium text-CharcolDarkBlue text-xs">
                If the number of bits are missing or not correct then the
                resulting badge binary may not be accurate.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button text="Submit" variant="primary" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateBadge;
