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
import Button from "../components/ui/button";

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
        <div className="animate-spin w-[20px] h-[20px] rounded-full border-t-black border-[#ffffff] border-[2px] m-auto"></div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div className="flex flex-col md:flex-row items-start">
        <div className="bg-[#F5F6FA] border-[0.8px] border-[#EBECF1] py-3 px-6 mx-6 grid grid-cols-2 gap-[3rem] rounded-b-lg w-fit">
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-[5px] items-start">
              <h2 className="font-bold text-sm text-[#101828]">Full name</h2>
              <p className="text-[#667085] text-sm">{user?.FullName}</p>
            </div>
            <div className="flex flex-col gap-[5px] items-start">
              <h2 className="font-bold text-sm text-[#101828]">Employee ID</h2>
              <p className="text-[#667085] text-sm max-w-[100px] whitespace-nowrap overflow-hidden text-ellipsis">
                {user?.PrimaryID}
              </p>
            </div>
            <div className="flex flex-col gap-[5px] items-start">
              <h2 className="font-bold text-sm text-[#101828]">Email ID</h2>
              <p className="text-[#667085] text-sm">{user?.Email}</p>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <h2 className="font-bold text-sm text-[#101828]">Phone</h2>
              </div>
              <p className="text-[#667085] text-sm">
                {user?.UserMetadata?.person?.phone
                  ? user?.UserMetadata?.person?.phone
                  : "Not Available"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <h2 className="font-bold text-sm text-[#101828]">
                  Display name
                </h2>
              </div>
              <p className="text-[#667085] text-sm">{user?.DisplayName}</p>
            </div>

            <div className="flex flex-col gap-[5px] items-start">
              <h2 className="font-bold text-sm text-[#101828]">Badge ID</h2>
              <p className="text-[#667085] text-sm">
                {user?.BadgeID ? user.BadgeID : "Not Available"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 items-center bg-[#F5F6FA] mt-[21px] mx-6 p-5">
        <div className="flex items-center gap-[10.72px]">
          <img
            src="/illustration.png"
            className="w-[72.73px] h-[60px]"
            alt=""
          />
          <div>
            <p className="font-bold text-sm">Verify your identity</p>
            <span className="text-sm text-[#667085]">
              Take a government ID & selfie photo to get verified
            </span>
          </div>
        </div>
        <Button
          className="h-10 flex flex-row justify-center items-center text-sm"
          text="Verify"
          variant="primary"
        />
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
