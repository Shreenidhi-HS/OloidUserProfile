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
  const userHasFaces = user && user?.Faces && user?.Faces.length > 0;
  return (
    <div className="absolute">
      <div className="w-full h-6 bg-[#101828]"></div>
      <img src="/assets/profile-header.svg" alt="" />
      <div className="absolute top-12 right-[1.4rem]">
        <img
          src={
            userHasFaces
              ? user?.Faces[0]?.SignedUrl
              : "../../public/assets/avatar.svg"
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
    </div>
  );
};

export default TopHeader;
