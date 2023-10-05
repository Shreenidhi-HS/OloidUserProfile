import { ReactNode, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigationbar from "../components/ui/navigationbar";
import { navItem } from "../data/layout-data";
import { LoginContext } from "../App";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useQuery } from "react-query";
import { getUserData } from "../services/login";
import Navbar from "../components/Navbar";
import SideBar from "../components/sideBar";


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

  const isPathMatched = location.pathname.startsWith("/home");

  const token = sessionStorage.getItem('token');

  const { data: userData, error, isLoading: isUserDataLoading, refetch: refetchUser } = useQuery(
    'userData',
    getUserData,
    {
      enabled: !!token,
    }
  );

  // useEffect(()=>{
  //   const newAuthContext = {
  //     ...authContext,
  //     userDetail: userData?.data?.user,
  //   };
  //   setAuthContext(newAuthContext);
  // },[userData])

  useEffect(() => {
    setPath(location.pathname);
    if (location.pathname == "/home/credential") {
      setActivePage(2)
    }
    if (location.pathname == "/home/profile") {
      setActivePage(1)
    }
    if (location.pathname == "/home/transaction") {
      setActivePage(3)
    }
  }, [location.pathname]);

  const handleTabChange = (id: number) => {
    if (id === 1) {
      navigate("/home/profile");
    }
    if (id === 2) {
      navigate("/home/credential");
    }
    if (id === 3) {
      navigate("/home/transaction");
    }
    setActivePage(id);
  };

  return (
    <>
      <div className="md:hidden block overflow-hidden">
        <div
          className="absolute top-0 left-0 z-999 bg-[black] opacity-[0.5] min-h-screen min-w-full flex items-center justify-center"
          id="loader"
        >
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="max-w-[414px] bg-[#272727] h-screen flex flex-col items-center pt-3">
          <>
            {path === "/home/credential" && (
              <div className="flex flex-row justify-between w-full px-8 translate-y-[50%]">
                <div className="flex flex-col items-start text-white">
                  <p className="text-md">Hello,</p>
                  <h2 className="font-bold text-2xl text-white">
                    {user?.DisplayName}
                  </h2>
                </div>
                <div className="relative h-[80px]">
                  <div className="absolute bottom-0 right-0 mr-[1%] -mb-[65%] w-[100px]  h-[100px] rounded-full bg-[#272727] overflow-hidden flex items-center justify-center translate-y-[30%]">
                    <img
                      src={user?.Faces[0] === undefined ? "../../public/assets/avatar.svg" : user?.Faces[0]?.SignedUrl}
                      className="h-[80px] max-w-[80px] bordder-[2px] border-white rounded-full"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            )}
            {path === "/home/profile" && (
              <h2 className="text-2xl text-white font-bold mb-6 translate-y-[50%]">
                Profile
              </h2>
            )}
            {path === "/home/transaction" && (
              <h2 className="text-2xl text-white font-bold mb-6 translate-y-[50%]">
                Your Transaction
              </h2>
            )}
          </>
          <div
            className={`bg-[white] ${path === "/home/credential" ? "" : "rounded-t-[30px]"
              }  h-full w-full overflow-auto pb-[12rem] mt-10`}
          >
            {children}
          </div>
          {isPathMatched && (
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
            <SideBar activePage={activePage} handleTabChange={handleTabChange} navItem={navItem} />
            <main className="h-screen w-full flex-1 ">
              <div className="h-full m-auto overflow-y-auto custom-scroll pb-[30px]">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
