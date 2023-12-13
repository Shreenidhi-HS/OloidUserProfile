import { useNavigate } from "react-router-dom";
import CreateBtn from "./button/createBtn";

const Pin = () => {
  const navigate = useNavigate();

  const onClickEditPin = () => {
    navigate("/edit-pin");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between bg-GlassBluishGrey border border-LightBluishGrey px-5 py-3 rounded-[0.5rem]">
        <div className="flex items-center gap-[1.375rem]">
          <p className="font-avenirHeavy text-base text-ObsidianDarkBlue">
            Your PIN:
          </p>
          <p className="font-avenirHeavy text-base text-BluishGrey">******</p>
        </div>
        <img src="/assets/eye.svg" alt="" />
      </div>
      <div className="w-full text-end">
        <CreateBtn
          text="Edit Pin"
          variant="primary"
          className="w-[5.625rem]"
          onClick={onClickEditPin}
        />
      </div>
    </div>
  );
};

export default Pin;
