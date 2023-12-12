import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { CredData } from "../data/credential-data";

function Credential() {
  const navigate = useNavigate();
  const { authContext } = useContext(LoginContext);
  const user = authContext.userDetail;

  const navigateToUrl = (url: string) => {
    navigate(url);
  };

  return (
    <div className="flex flex-col pt-1 gap-6">
      {CredData(user).map((item, i) => (
        <div
          key={i}
          onClick={() => navigateToUrl(item.url)}
          className="flex items-center justify-between px-4 w-full h-[4.5rem] md:w-[62rem] rounded-[0.5rem] m-auto bg-GlassBluishGrey border-[1px] border-LightBluishGrey cursor-pointer"
        >
          <div className="flex flex-row items-center gap-2">
            <img src={item.icon} alt="icon" />
            <p className="font-avenirHeavy text-base">{item.name}</p>
            {item.hasCred ? (
              <img
                src="../../public/assets/checkMark.svg"
                width={14}
                height={14}
              />
            ) : (
              <img
                src="../../public/assets/warning-icon.svg"
                width={14}
                height={14}
              />
            )}
          </div>
          <img src="/assets/arrow-circle.svg" alt="arrow" />
        </div>
      ))}
    </div>
  );
}

export default Credential;
