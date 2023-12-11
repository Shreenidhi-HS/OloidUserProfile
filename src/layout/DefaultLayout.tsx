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

  return (
    <>
      {path === "/profile" && <TopHeader user={user} />}
      <div className="block overflow-hidden bg-[#101828]">
        <div>
          {path.startsWith("/credentials") && (
            <div className="flex flex-col gap-[3px] items-center">
              {!path.endsWith("/credentials") && (
                <img
                  src="/assets/back-button.svg"
                  alt=""
                  className="absolute top-[1.688rem] left-[0.938rem]"
                  onClick={() => navigate("/credentials")}
                />
              )}
              <p className="mt-6 text-sm text-[#CECECE]">
                Hello, {user?.DisplayName}
              </p>
              <p className="text-2xl text-white font-bold">Your Credentials</p>
            </div>
          )}
        </div>
        <div>
          {children}

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
