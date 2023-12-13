import { useNavigate } from "react-router-dom";
import CreateBtn from "../button/createBtn";
import { useContext, useState } from "react";
import { LoginContext } from "../../App";

const Pin = () => {
  const navigate = useNavigate();
  const { authContext } = useContext(LoginContext) as {
    authContext: { userDetail: { Pin?: string } };
  };
  const pin = authContext.userDetail?.Pin;
  const openEye = "/assets/eye.svg";
  const closeEye = "/assets/closed-eye.svg";
  const [eye, setEye] = useState(openEye);

  const onClickEditPin = () => {
    navigate("/credentials/edit-pin");
  };

  const handleEye = () => {
    if (eye === openEye) {
      setEye(closeEye);
    } else {
      setEye(openEye);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between bg-GlassBluishGrey border border-LightBluishGrey px-5 py-3 rounded-[0.5rem]">
        <div className="flex items-center gap-[1.375rem]">
          <p className="font-avenirHeavy text-base text-ObsidianDarkBlue">
            Your PIN:
          </p>
          <p className="font-avenirHeavy text-base text-BluishGrey">
            {eye === openEye ? "******" : pin}
          </p>
        </div>
        <div onClick={handleEye}>
          <img src={eye} alt="" />
        </div>
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
