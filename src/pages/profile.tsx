import { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordian";
import { LoginContext } from "../App";
import { useQuery } from "react-query";
import { getUserData } from "../services/login";
import { UserAvater } from "../assets/utils/icons";

function Profile() {
  const { authContext, setAuthContext } = useContext(LoginContext);
  const { data: userData, error, isLoading:isUserDataLoading , refetch:refetchUser } = useQuery('userData', getUserData);
  const user = userData?.data.user;

  if(!isUserDataLoading){
    const newAuthContext = {
      ...authContext,
      userDetail: userData.data.user,
    };
    console.log(newAuthContext)
    // setAuthContext(newAuthContext); 
  }

  if(isUserDataLoading){
    return(
      <div className="w-full h-full flex items-center justify-center">
          <img src="../../public/assets/loader.svg" className="animate-spin m-auto invert m-auto float-center" height={44} width={44} alt="loader" />
    </div>
    )
    
  }

  return (
    <div className=" h-screen p-1">
      <div className="shadow-lg p-[16px] relative mt-4 md:mt-[10rem] max-w-[90vw] md:w-[82rem] h-fit m-auto rounded-[12px] border-[1px] p-[2rem]">
        <div className="hidden md:block absolute max-w-fit  top-0 -mt-[20%] md:-mt-[5%] ml-[3%] left-0 overflow-hidden ">
          {isUserDataLoading ? (
            <>
            <div className="min-h-[120px] min-w-[120px] max-h-[120px] max-w-[120px] rounded-full shadow-xl border-[1px] border-[#272727] p-2 overflow-hidden">
              <UserAvater fill="black" className="m-auto h-full w-full animate-pulse"/>
            </div>
            </>
          ) : (
            <>
              <img
              src={userData?.data.user.Faces[0] === undefined  ?  "../../public/assets/avatar.svg" : userData?.data?.user.Faces[0]?.SignedUrl}
              className="min-h-[120px] min-w-[120px] max-h-[120px] max-w-[120px] rounded-full shadow-xl border-[1px] border-[#272727] p-2"
              alt="profile image"
            />
            <h2 className="text-black font-bold text-lg mt-2">
              {user?.DisplayName}
            </h2>
            </>
          )}
         
        </div>
        <div className="md:hidden flex flex-row items-center gap-4">
          <div>
            <img
              src={userData?.data.user.Faces[0] === undefined  ?  "../../public/assets/avatar.svg" : userData?.data?.user.Faces[0]?.SignedUrl}
              className="h-[80px] max-w-[80px] min-w-[80px] rounded-full border-[2px] order-[#362ae9] p-2"
              alt=""
            />
          </div>
          <div className="font-bold text-lg ">{user?.DisplayName}</div>
        </div>
        <div className="flex flex-col md:flex-row items-start mt-3 md:mt-[3rem]">
   
          <div className="bg-[#e5ebf1] md:bg-white md:ml-[30%] p-3 grid grid-cols-2 gap-[3rem] rounded-[12px] w-fit">
            <div>
              <div className="flex flex-col gap-1 items-start">
                <h2 className="font-bold text-[16px] text-black">Full name</h2>
                <p className="text-[#9A9B9C] text-[14px]">{user?.FullName}</p>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <h2 className="font-bold text-md text-black">Badge ID</h2>
                <p className="text-[#9A9B9C] text-[14px]">
                  {user?.BadgeID ? user.BadgeID : "Not Available"}
                </p>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <h2 className="font-bold text-md text-black">Email ID</h2>
                <p className="text-[#9A9B9C] text-[14px]">{user?.Email}</p>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <h2 className="font-bold text-md text-black">Phone</h2>
                <p className="text-[#9A9B9C] text-[14px]">
                  {user?.UserMetadata?.person?.phone
                    ? user?.UserMetadata?.person?.phone
                    : "Not Available"}
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-1 items-start">
                <h2 className="font-bold text-[16px] text-black">
                  Display name
                </h2>
                <p className="text-[#9A9B9C] text-[14px]">
                  {user?.DisplayName}
                </p>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <h2 className="font-bold text-md text-black">Employee ID</h2>
                <p className="text-[#9A9B9C] text-[10px]  max-w-[100px] break-all">{user?.PrimaryID}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[12px] shadow-md flex md:w-[82rem] flex-col m-auto mt-[24px] p-[2rem] gap-2">
        <h2 className="font-bold">Verify your identity</h2>
        <span>Take a government ID & selfie photo to get verified</span>
        <button className="md:w-[80px] h-[40px] bg-[#272727] text-white float-right p-2 w-[6rem] ml-[70%] rounded md:ml-[90%]">
          Verify
        </button>
      </div>

      <div className="mt-[24px] max-w-[90vw] md:w-[82rem] m-auto shadow-md p-2">
        <Accordion type="single" disabled>
          <AccordionItem value="item-1">
            <AccordionTrigger>Settings</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-[24px] max-w-[90vw] md:w-[82rem] m-auto shadow-md p-2">
        <Accordion type="single" disabled>
          <AccordionItem value="item-1">
            <AccordionTrigger>Share the feedback</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

export default Profile;
