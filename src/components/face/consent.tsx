import React, { useState } from "react";
import { renderData } from "../../data/consentData";
import Button from "../ui/button";
import { useNavigate } from "react-router-dom";

const ConsentForm = () => {
  const navigate = useNavigate();
  const [expandScanPolicy, setExpand] = useState(false);

  return (
    <div className="flex flex-col w-full bg-white rounded-t-lg">
      <h2 className="text-ObsidianDarkBlue text-xl font-avenirHeavy">
        Test Consent
      </h2>

      <div className="flex flex-col gap-[10px] text-[1rem] w-full mt-2h">
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-BluishGrey font-avenirHeavy">Company</p>
          <p className="text-BluishGrey font-avenirRegular">Lift</p>
        </div>
        <div className="w-full flex flex-row items-center justify-between">
          <p className="text-BluishGrey font-avenirHeavy">Subject</p>
          <p className="text-BluishGrey font-avenirRegular">Naina A</p>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-[1rem] mt-4">
        <div className="bg-LightBluishGrey h-[1px] w-full" />
        <div>
          <div>
            <h2 className="text-BluishGrey text-base  font-avenirMedium">
              {renderData.scanHead}
            </h2>
            <div
              className={`${
                expandScanPolicy
                  ? "h-full"
                  : "max-h-[10.625rem] overflow-hidden"
              }  text-xs text-DarkGrey font-avenirMedium`}
            >
              {renderData.scanPolicy}
            </div>
          </div>
          <p
            onClick={() => setExpand(!expandScanPolicy)}
            className="font-semibold text-sm text-[#0B6FD0] mt-1"
          >
            {expandScanPolicy ? "See Less" : "See More"}
          </p>
        </div>

        <div className="bg-LightBluishGrey h-[1px] w-full" />

        <div>
          <h2 className="text-BluishGrey text-base  font-avenirMedium">
            {renderData.oloidLegal}
          </h2>
          <div className="max-h-[10.625rem] overflow-y-auto text-xs text-[#7D7DDarktext-DarkGrey">
            {renderData.legalText}
          </div>
        </div>

        <div className="bg-LightBluishGrey h-[1px] w-full" />

        <div>
          <h2 className="text-BluishGrey text-base font-avenirMedium">
            {renderData.scopeHead}
          </h2>
          <div className="max-h-[10.625rem] overflow-y-auto text-xs text-[#7D7DDarktext-DarkGrey">
            {renderData.scopeText}
          </div>
        </div>

        <div className="bg-LightBluishGrey h-[1px] w-full" />

        <div>
          <h2 className="font-avenirMedium text-BluishGrey text-base">
            Oloid Legal Documents
          </h2>
          <p className="font-semibold text-sm text-[#0B6FD0] mt-1">
            Privacy Policy
          </p>
        </div>

        <div className="bg-LightBluishGrey h-[1px] w-full" />

        <Button
          text="Agree"
          variant="primary"
          onClick={() => navigate("/credentials/faces")}
        />
      </div>
    </div>
  );
};

export default ConsentForm;
