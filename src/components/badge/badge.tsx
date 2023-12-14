import { useContext, useState } from "react";
import CreateBtn from "../button/createBtn";
import DeactivateModal from "../modal/deactivateModal";
import { LoginContext } from "../../providers/login-provider";

const Badge = () => {
  const { authContext } = useContext(LoginContext) as {
    authContext: { userDetail: { SecondaryID?: string } };
  };
  const badgeId = authContext?.userDetail?.SecondaryID;
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [activateModal, setActivateModal] = useState(false);

  const openDeactivateModal = () => {
    setDeactivateModal(true);
  };

  const openActivateModal = () => {
    setActivateModal(true);
  };

  const toggleDeactivateModal = () => {
    setDeactivateModal(false);
  };

  const toggleActivateModal = () => {
    setActivateModal(false);
  };

  const handleDeactivate = () => {
    console.log("Deactivate");
  };

  const handleActivate = () => {
    console.log("Activate");
  };

  return (
    <>
      {badgeId ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 bg-ChawkWhite border border-LightGrey rounded-[0.5rem] py-5 pl-5">
            <div className="flex items-center gap-[0.625rem]">
              <p className="text-ObsidianDarkBlue font-avenirHeavy text-base">
                Your badge details{" "}
              </p>
              <div className="flex-1 border-b h-0 border-ObsidianDarkBlue"></div>
            </div>
            <div className="flex flex-col gap-[0.625rem]">
              <p className="font-avenirHeavy text-xs text-CharcolDarkBlue">
                Badge ID - <span className="font-avenirMedium">{badgeId}</span>
              </p>
              <p className="font-avenirHeavy text-xs text-CharcolDarkBlue">
                Binary Available -{" "}
                <span className="font-avenirMedium">Assigned </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <CreateBtn
              text="Deactivate Badge"
              variant="secondary"
              onClick={openDeactivateModal}
            />
            <CreateBtn
              text="Replace Badge"
              variant="primary"
              onClick={openActivateModal}
            />
          </div>
        </div>
      ) : (
        <></>
      )}

      <DeactivateModal
        open={deactivateModal}
        toggle={toggleDeactivateModal}
        handleDeactivate={handleDeactivate}
        title="Are you sure you want to deactivate the badge?"
        type="Deactivate"
        firstCheck="Report lost badge"
        secondCheck="Replace badge"
      />

      <DeactivateModal
        open={activateModal}
        toggle={toggleActivateModal}
        handleDeactivate={handleActivate}
        title="Confirm deactivating the current badge and Assign New Badge."
        type="Activate"
        firstCheck="Report lost badge"
        secondCheck="Replace badge"
      />
    </>
  );
};

export default Badge;
