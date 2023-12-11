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
    if (location.pathname == "/credential") {
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
      navigate("/credential");
    }
    setActivePage(id);
  };

  return (
    <>
      <div className="md:hidden block overflow-hidden">
        <div>
          {path === "/credential" && (
            <div className="flex flex-col gap-[3px] items-center">
              <p className="mt-6 text-sm text-[#CECECE]">
                Hello, {user?.DisplayName}
              </p>
              <p className="text-2xl text-white font-bold">Your Credentials</p>
            </div>
          )}
          {path === "/profile" && <TopHeader user={user} />}
        </div>
        <div
          className={`bg-[white] ${
            path === "/credential" ? "rounded-t-[30px]" : ""
          }`}
        >
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

      <div className="hidden md:block">
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
      </div>
    </>
  );
};

export default DefaultLayout;
