import React from "react";

interface UserProps {
  DisplayName: string;
  Faces?: {
    SignedUrl: string;
  }[];
}

interface UserProfileProps {
  user: UserProps | undefined;
}

const TopHeader: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="flex flex-row justify-between w-full px-8 translate-y-[50%]">
      <div className="flex flex-col items-start text-white">
        {user?.DisplayName && (
          <>
            <p className="text-md">Hello,</p>
            <h2 className="font-bold text-2xl text-white">
              {user?.DisplayName}
            </h2>
          </>
        )}
      </div>
      <div className="relative h-[80px]">
        <div className="absolute bottom-0 right-0 mr-[1%] -mb-[65%] w-[100px]  h-[100px] rounded-full bg-[#101828] overflow-hidden flex items-center justify-center translate-y-[30%]">
          <img
            src={
              user?.Faces[0] === undefined
                ? "../../public/assets/avatar.svg"
                : user?.Faces[0]?.SignedUrl
            }
            className="h-[80px] max-w-[80px] bordder-[2px] border-white rounded-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
