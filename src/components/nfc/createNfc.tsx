import { Input } from "../ui/input";
import Button from "../ui/button";
import { useMutation } from "react-query";
import { userService } from "../../services";
import _ from "lodash";
import { ChangeEvent, useState } from "react";

const CreateNfc = () => {
  const [nfc, setNfc] = useState("");
  const [error, setError] = useState("");

  const isAlphanumeric = (str: string) => /^[a-zA-Z0-9-_]+$/.test(str);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isAlphanumeric(value) || value === "") {
      setNfc(_.trim(value));
      setError("");
    }
  };

  const createNfcMutation = useMutation(userService.updateUser, {
    onSuccess: () => {
      console.log("nfc");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = () => {
    setError("");
    if (!nfc) {
      return setError("Required");
    }
    const params = {
      IDSearch1: nfc,
    };
    createNfcMutation.mutate(params);
  };

  return (
    <div className="h-screen max-h-[712px] flex flex-col justify-between">
      <div className="flex flex-col gap-10 items-center">
        <p className="font-avenirBlack text-ObsidianDarkBlue text-[1.75rem]">
          Scan your NFC Tag
        </p>
        <div className="bg-ChawkWhite border border-LightGrey rounded-[0.5rem] p-5 w-full">
          <Input
            label="Scan or Type Data"
            placeholder="Type here"
            value={nfc}
            onChange={(e) => handleInput(e)}
          />
        </div>
      </div>

      <div>
        <Button text="Submit" variant="primary" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateNfc;
