import React from "react";

interface Navbarprops {
  activePage: number;
  handleTabChange: () => {};
}
function Navigationbar({ activePage, handleTabChange }: Navbarprops) {
  return (
    <div className="fixed bottom-0 bg-[#101828] flex flex-col items-center py-[10px] w-full">
      {/* <div
        className={`absolute top-0 -translate-y-[25%] bg-[#101828] rounded-bl-[90%] rounded-br-[30%] rounded-tl-[30%] rounded-tr-[60%] -rotate-45 w-[100px] h-[100px]
    ${activePage === 1 && "-translate-x-[140%]"}
    ${activePage === 2 && "translate-x-0"}
    ${activePage === 3 && "translate-x-[140%]"}
    transition-all duration-300`}
      ></div> */}
      <div className="relative z-10 flex justify-around text-white  w-full transition-all  duration-300">
        <div onClick={() => handleTabChange(1)}>
          <div
            className={` transition-all  duration-300 flex flex-col items-center`}
          >
            <div
              className={`${
                activePage === 1
                  ? "bg-[#0E3D6F] font-bold -translate-y-[30%]"
                  : "bg-transparent"
              } rounded-full h-[50px] w-[50px] p-[5px] transition-all  duration-300`}
            >
              <div
                className={` ${
                  activePage === 1 ? "bg-[#0C5AA8]" : "bg-transparent"
                } w-full h-full rounded-full flex items-center justify-center`}
              >
                <img
                  src="../../public/assets/profile-svgrepo-com.svg"
                  alt="profile"
                  className="h-[20px] w-[20px]"
                />
              </div>
            </div>
            Profile
          </div>
        </div>
        <div onClick={() => handleTabChange(2)}>
          <div
            className={`transition-all  duration-300 flex flex-col items-center`}
          >
            <div
              className={`${
                activePage === 2
                  ? "bg-[#0E3D6F] -translate-y-[30%]"
                  : "bg-transparent"
              } rounded-full h-[50px] w-[50px] p-[5px] transition-all  duration-300`}
            >
              <div
                className={` ${
                  activePage === 2
                    ? "bg-[#0C5AA8] duration-800"
                    : "bg-transparent"
                } w-full h-full rounded-full  flex items-center justify-center`}
              >
                <img
                  src="../../public/assets/cred.svg"
                  alt="profile"
                  className="h-[24px] w-[24px]"
                />
              </div>
            </div>
            Credential
          </div>
        </div>
        <div onClick={() => handleTabChange(3)}>
          <div
            className={`transition-all  duration-300 flex flex-col items-center`}
          >
            <div
              className={`${
                activePage === 3
                  ? "bg-[#0E3D6F] -translate-y-[30%]"
                  : "bg-transparent"
              } rounded-full h-[50px] w-[50px] p-[5px] transition-all  duration-300`}
            >
              <div
                className={` ${
                  activePage === 3 ? "bg-[#0C5AA8]" : "bg-transparent"
                } w-full h-full rounded-full  flex items-center justify-center`}
              >
                <img
                  src="../../public/assets/phone.svg"
                  alt="profile"
                  className="h-[24px] w-[24px]"
                />
              </div>
            </div>
            Transactions
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigationbar;
