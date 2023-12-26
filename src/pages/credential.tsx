import { useNavigate } from "react-router-dom";
import { CredData } from "../data/credential-data";
import { useQuery } from "react-query";
import { getUserData } from "../services/login";

const Credential = () => {
  const navigate = useNavigate();

  const navigateToUrl = (url: string) => {
    navigate(url);
  };

  const { data: userData, isLoading: isUserDataLoading } = useQuery(
    "userData",
    getUserData
    // { enabled: false }
  );

  if (isUserDataLoading) {
    return (
      <div className="w-full m-auto flex items-center justify-center bg-white">
        <div className="animate-spin w-[20px] h-[20px] rounded-full border-t-black border-[#ffffff] border-[2px] m-auto"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-1 gap-6">
      {CredData(userData?.data?.user).map((item, i) => (
        <div
          key={i}
          onClick={() => navigateToUrl(item.url)}
          className="flex items-center justify-between px-4 w-full h-[4.5rem] rounded-[0.5rem] m-auto bg-GlassBluishGrey border-[1px] border-LightBluishGrey cursor-pointer"
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
};

export default Credential;
