import { Input } from "../ui/input";
import Button from "../ui/button";

const CreateNfc = ({ nfc, handleInput, handleSubmit }) => {
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
