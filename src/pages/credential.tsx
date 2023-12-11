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
    <div className="p-2 bg-white mt-[1.313rem] rounded-t-[1rem]">
      <div className="flex flex-col">
        {CredData(user).map((item, i) => (
          <div
            key={i}
            onClick={() => navigateToUrl(item.url)}
            className="flex items-center justify-between px-4 mt-[24px] w-[90vw] h-[4.5rem] md:w-[62rem] rounded-[0.5rem] m-auto bg-[#F5F6FA] border-[1px] border-[#EBECF1] cursor-pointer"
          >
            <div className="flex flex-row items-center gap-2">
              <img src={item.icon} alt="icon" />
              <p className="font-avenirHeavy text-base">{item.name}</p>
              {item.hasCred ? (
                <img
                  src="../../public/assets/checkMark.svg"
                  width={20}
                  height={20}
                />
              ) : (
                <img
                  src="../../public/assets/warning-icon.svg"
                  width={20}
                  height={20}
                />
              )}
            </div>
            <img src="/assets/arrow-circle.svg" alt="arrow" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Credential;
