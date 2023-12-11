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
    <>
      <div className="w-full h-6 bg-[#101828]"></div>
      <img src="/assets/profile-header.svg" alt="" />
      <div className="absolute top-12 right-6">
        <img
          src={
            user?.Faces[0] === undefined
              ? "../../public/assets/avatar.svg"
              : user?.Faces[0]?.SignedUrl
          }
          className="h-[6.688rem] rounded-full"
          alt=""
        />
      </div>

      <div className="absolute top-14 left-6">
        {user?.DisplayName && (
          <>
            <p className="text-md text-[#CECECE]">Hello,</p>
            <h2 className="font-bold text-2xl text-white">
              {user?.DisplayName}
            </h2>
          </>
        )}
      </div>
    </>
  );
};

export default TopHeader;
