import React, { useContext } from "react";
import { LoginContext } from "../../providers/login-provider";

function Password() {
  const { authContext } = useContext(LoginContext);
  const user = authContext?.userDetail;

  return (
    <div>
      <h2 className="text-md font-bold text-[#E09487] border-b-[#E09487] border-[1px] pb-2">
        Individuals Password
      </h2>
      <div className="flex flex-col py-2 gap-2 w-fit text-md">
        <div>1. Display Name - {user?.DisplayName}</div>
        <div className="ml-auto text-left grid">
          2. Machine Names
          {user?.UserPasswords.map((machine, i) => (
            <div key={i}>{machine.MachineName}</div>
          ))}
        </div>
        ;
      </div>
    </div>
  );
}

export default Password;
