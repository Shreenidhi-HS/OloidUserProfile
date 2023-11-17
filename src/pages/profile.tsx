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
  const { data: userData, isLoading: isUserDataLoading } = useQuery(
    "userData",
    getUserData
  );
  const user = userData?.data.user;

  if (!isUserDataLoading) {
    const newAuthContext = {
      ...authContext,
      userDetail: userData.data.user,
    };
    // setAuthContext(newAuthContext);
  }

  if (isUserDataLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img
          src="../../public/assets/loader.svg"
          className="animate-spin m-auto invert m-auto float-center"
          height={44}
          width={44}
          alt="loader"
        />
      </div>
    );
  }

  return (
    <div className=" h-screen">
      <div>
        <div className="hidden md:block absolute max-w-fit  top-0 -mt-[20%] md:-mt-[5%] ml-[3%] left-0 overflow-hidden ">
          {isUserDataLoading ? (
            <>
              <div className="min-h-[120px] min-w-[120px] max-h-[120px] max-w-[120px] rounded-full shadow-xl border-[1px] border-[#272727] p-2 overflow-hidden">
                <UserAvater
                  fill="black"
                  className="m-auto h-full w-full animate-pulse"
                />
              </div>
            </>
          ) : (
            <>
              <img
                src={
                  userData?.data.user.Faces[0] === undefined
                    ? "../../public/assets/avatar.svg"
                    : userData?.data?.user.Faces[0]?.SignedUrl
                }
                className="min-h-[120px] min-w-[120px] max-h-[120px] max-w-[120px] rounded-full shadow-xl border-[1px] border-[#272727] p-2"
                alt="profile image"
              />
              <h2 className="text-[#101828] font-bold text-lg mt-2">
                {user?.DisplayName}
              </h2>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-start">
          <div className="bg-[#F5F6FA] py-9 px-5 mx-6 grid grid-cols-2 gap-[3rem] rounded-b-lg w-fit">
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-1 items-start">
                <h2 className="font-bold text-[16px] text-[#101828]">
                  Full name
                </h2>
                <p className="text-[#667085] text-sm">{user?.FullName}</p>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <h2 className="font-bold text-sm text-[#101828]">
                  Employee ID
                </h2>
                <p className="text-[#667085] text-sm max-w-[100px] break-all">
                  {user?.PrimaryID}
                </p>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <h2 className="font-bold text-sm text-[#101828]">Email ID</h2>
                <p className="text-[#667085] text-sm">{user?.Email}</p>
              </div>
              <div className="flex flex-col gap-1 items-start">
                <h2 className="font-bold text-sm text-[#101828]">Phone</h2>
                <p className="text-[#667085] text-sm">
                  {user?.UserMetadata?.person?.phone
                    ? user?.UserMetadata?.person?.phone
                    : "Not Available"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-1 items-start">
                <h2 className="font-bold text-sm text-[#101828]">
                  Display name
                </h2>
                <p className="text-[#667085] text-sm">{user?.DisplayName}</p>
              </div>

              <div className="flex flex-col gap-1 items-start">
                <h2 className="font-bold text-sm text-[#101828]">Badge ID</h2>
                <p className="text-[#667085] text-sm">
                  {user?.BadgeID ? user.BadgeID : "Not Available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-[33.45px] bg-[#F5F6FA] mt-[21px] mx-6 p-5">
        <div className="max-w-[153px]">
          <h2 className="font-bold text-sm">Verify your identity</h2>
          <span className="text-sm text-[#667085]">
            Take a government ID & selfie photo to get verified
          </span>
        </div>
        <button className="h-[35px] bg-[#101828] text-white text-sm p-2 w-[72px] rounded-lg">
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
