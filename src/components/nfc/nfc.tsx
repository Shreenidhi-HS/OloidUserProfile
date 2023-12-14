import { useContext } from "react";
import { LoginContext } from "../../App";
import CreateBtn from "../button/createBtn";
import CreateNfc from "./createNfc";

const Nfc = () => {
  const { authContext } = useContext(LoginContext) as {
    authContext: { userDetail: { IDSearch1?: string } };
  };
  const nfc = authContext?.userDetail?.IDSearch1;

  return (
    <>
      {nfc ? (
        <>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 bg-ChawkWhite border border-LightGrey rounded-[0.5rem] py-5 pl-5">
              <div className="flex items-center gap-[0.625rem]">
                <p className="text-ObsidianDarkBlue font-avenirHeavy text-base">
                  Your NFC details{" "}
                </p>
                <div className="flex-1 border-b h-0 border-ObsidianDarkBlue"></div>
              </div>
              <div className="flex flex-col gap-[0.625rem]">
                <p className="font-avenirHeavy text-xs text-CharcolDarkBlue">
                  NFC ID - <span className="font-avenirMedium">{nfc} </span>
                </p>
                <p className="font-avenirHeavy text-xs text-CharcolDarkBlue">
                  Binary Available -{" "}
                  <span className="font-avenirMedium">Assigned </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <CreateBtn text="Deactivate NFC" variant="secondary" />
              <CreateBtn text="Replace NFC" variant="primary" />
            </div>
          </div>
        </>
      ) : (
        <CreateNfc />
      )}
    </>
  );
};

export default Nfc;
