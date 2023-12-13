import { ReactNode, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigationbar from "../components/ui/navigationbar";
import { navItem } from "../data/layout-data";
import { LoginContext } from "../App";
import Navbar from "../components/Navbar";
import SideBar from "../components/sideBar";
import TopHeader from "../components/ui/topHeader";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const location = useLocation();
  const [activePage, setActivePage] = useState<number>(null);
  const [path, setPath] = useState("");
  const navigate = useNavigate();
  const { authContext, setAuthContext } = useContext(LoginContext);
  const user = authContext?.userDetail;

  const loginPath = location.pathname.startsWith("/login");

  // useEffect(()=>{
  //   const newAuthContext = {
  //     ...authContext,
  //     userDetail: userData?.data?.user,
  //   };
  //   setAuthContext(newAuthContext);
  // },[userData])

  useEffect(() => {
    setPath(location.pathname);
    if (location.pathname == "/credentials") {
      setActivePage(2);
    }
    if (location.pathname == "/profile") {
      setActivePage(1);
    }
  }, [location.pathname]);

  const handleTabChange = (id: number) => {
    if (id === 1) {
      navigate("/profile");
    }
    if (id === 2) {
      navigate("/credentials");
    }
    setActivePage(id);
  };

  const headerTitle = () => {
    if (path.endsWith("/pin")) {
      return "Pin Credential";
    } else if (path.endsWith("edit-pin")) {
      return "Reset Pin";
    } else if (path.endsWith("/badge")) {
      return "Badge Credential";
    } else if (path.endsWith("/faces")) {
      return "Face Credential";
    } else if (path.endsWith("/consent")) {
      return "Please provide consent";
    } else if (path.endsWith("/password")) {
      return "Password Credential";
    } else if (path.endsWith("/qrcode")) {
      return "Assigned QR code";
    } else if (path.endsWith("/bluetooth")) {
      return "Bluetooth Credential";
    } else if (path.endsWith("/nfc")) {
      return "NFC Credential";
    }
    return "Your Credentials";
  };

  return (
    <>
      {path === "/profile" && <TopHeader user={user} />}
      <div className={loginPath ? "" : "bg-ObsidianDarkBlue"}>
        <div>
          {path.startsWith("/credentials") && (
            <div className="flex flex-col gap-[3px] items-center">
              {!path.endsWith("/credentials") && (
                <img
                  src="/assets/back-button.svg"
                  alt=""
                  className="absolute top-[1.688rem] left-[0.938rem]"
                  onClick={() => navigate(-1)}
                />
              )}
              <p className="font-avenirHeavy mt-6 text-sm text-[#CECECE]">
                Hello, {user?.DisplayName}
              </p>
              <p className="font-avenirMedium text-2xl text-white">
                {headerTitle()}
              </p>
            </div>
          )}
        </div>
        <div>
          <div
            className={
              !loginPath && !path.endsWith("/profile")
                ? "bg-white mt-3 rounded-t-[1rem] px-6 py-5"
                : ""
            }
          >
            {children}
          </div>

          {!loginPath && (
            <Navigationbar
              activePage={activePage}
              handleTabChange={handleTabChange}
            />
          )}
        </div>
      </div>

      {/* for desktop */}

      {/* <div className="hidden md:block">
        <div className="h-screen overflow-hidden">
          <Navbar user={user} />
          <div className="flex flex-row items-start mt-[80px] w-full h-full overflow-hidden">
            <SideBar
              activePage={activePage}
              handleTabChange={handleTabChange}
              navItem={navItem}
            />

            <main className="h-screen w-full flex-1 ">
              <div className="h-full m-auto overflow-y-auto custom-scroll pb-[30px]">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default DefaultLayout;
