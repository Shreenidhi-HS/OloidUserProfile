interface Navbarprops {
  activePage: number;
  handleTabChange: () => {};
}
function Navigationbar({ activePage, handleTabChange }: Navbarprops) {
  return (
    <div className="fixed bottom-0 bg-[#101828] py-[10px] w-full">
      <div className="nav relative z-10 flex justify-around text-white  w-full transition-all  duration-300">
        <div onClick={() => handleTabChange(1)}>
          <div className="transition-all  duration-300 flex flex-col items-center h-[42px]">
            <div
              className={`${
                activePage === 1
                  ? "bg-[#101828] -translate-y-[35%]"
                  : "bg-transparent"
              } rounded-full transition-all  duration-300 border-[4.62px] border-[#101828]`}
            >
              <div
                className={` ${
                  activePage === 1 ? "bg-[#0C5AA8]" : "bg-transparent"
                } h-[48.35px] w-[48.35px] rounded-full flex items-center justify-center`}
              >
                <img
                  src="/assets/profile-svgrepo-com.svg"
                  alt="profile"
                  className="h-[20px] w-[20px]"
                />
              </div>
            </div>
            <p className="text-sm">Profile</p>
          </div>
        </div>
        <div onClick={() => handleTabChange(2)}>
          <div className="transition-all  duration-300 flex flex-col items-center">
            <div
              className={`${
                activePage === 2
                  ? "bg-[#101828] -translate-y-[35%]"
                  : "bg-transparent"
              } rounded-full transition-all  duration-300 border-[4.62px] border-[#101828]`}
            >
              <div
                className={` ${
                  activePage === 2
                    ? "bg-[#0C5AA8] duration-800"
                    : "bg-transparent"
                } h-[48.35px] w-[48.35px] rounded-full  flex items-center justify-center`}
              >
                <img
                  src="/assets/cred.svg"
                  alt="profile"
                  className="h-[20.63px] w-[20.63px]"
                />
              </div>
            </div>
            <p className="text-sm">Credential</p>
          </div>
        </div>
        <div onClick={() => handleTabChange(3)}>
          <div className="transition-all  duration-300 flex flex-col items-center">
            <div
              className={`${
                activePage === 3
                  ? "bg-[#101828] -translate-y-[35%]"
                  : "bg-transparent"
              }  transition-all rounded-full duration-300 border-[4.62px] border-[#101828]`}
            >
              <div
                className={` ${
                  activePage === 3 ? "bg-[#0C5AA8]" : "bg-transparent"
                } h-[48.35px] w-[48.35px] rounded-full  flex items-center justify-center`}
              >
                <img
                  src="/assets/phone.svg"
                  alt="profile"
                  className="h-[20px] w-[20px]"
                />
              </div>
            </div>
            <p className="text-sm">Transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navigationbar;
