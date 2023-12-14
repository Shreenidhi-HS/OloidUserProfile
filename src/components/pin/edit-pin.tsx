import React, { useState, ChangeEvent, useContext } from "react";
import OTPInput from "react-otp-input";
import Button from "../ui/button";
import { LoginContext } from "../../providers/login-provider";

interface PinState {
  pin: string;
  confirmPin: string;
}

const EditPin: React.FC = () => {
  const { authContext } = useContext(LoginContext);
  const apiPin = authContext?.userDetail?.Pin;
  const initialPinState: PinState = {
    pin: "",
    confirmPin: "",
  };

  const [pin, setPin] = useState<PinState>(initialPinState);

  const handlePinChange = (
    e: string | ChangeEvent<HTMLInputElement>,
    mode: string
  ) => {
    const value =
      mode === "pin" || mode === "confirmPin"
        ? e
        : (e as ChangeEvent<HTMLInputElement>)?.target?.value;
    setPin({ ...pin, [mode]: value });
  };

  return (
    <div className="flex flex-col gap-[1.875rem]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.875rem]">
            <p className="text-ObsidianDarkBlue text-sm font-avenirHeavy">
              Enter new Pin:
            </p>
            <img src="/assets/eye.svg" alt="eye" />
          </div>
          <p className="text-WaterBlue text-sm font-avenirHeavy underline">
            Clear Pin
          </p>
        </div>
        <OTPInput
          value={pin.pin}
          onChange={(e) => handlePinChange(e, "pin")}
          containerStyle={{ display: "inline-flex" }}
          numInputs={6}
          inputStyle={{
            border: "1.5px solid #D0D5DD",
            borderRadius: "8px",
            width: "48px",
            height: "48px",
            outlineColor: "#0B6FD0",
          }}
          inputType="password"
          renderInput={(props, index) => (
            <React.Fragment key={index}>
              <input {...props} />
              {index < 5 && <span className="me-[0.688rem]"></span>}
            </React.Fragment>
          )}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-[0.875rem]">
          <p className="text-ObsidianDarkBlue text-sm font-avenirHeavy">
            Re-Enter new Pin:
          </p>
          <img src="/assets/eye.svg" alt="eye" />
        </div>

        <OTPInput
          value={pin.confirmPin}
          onChange={(e) => handlePinChange(e, "confirmPin")}
          containerStyle={{ display: "inline-flex" }}
          numInputs={6}
          inputStyle={{
            border: "1.5px solid #D0D5DD",
            borderRadius: "8px",
            width: "48px",
            height: "48px",
            outlineColor: "#0B6FD0",
          }}
          inputType="password"
          renderInput={(props, index) => (
            <React.Fragment key={index}>
              <input {...props} />
              {index < 5 && <span className="me-[0.688rem]"></span>}
            </React.Fragment>
          )}
        />
      </div>

      <Button text={apiPin ? "Reset" : "Create"} variant="primary" />
    </div>
  );
};

export default EditPin;
