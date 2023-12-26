import { ChangeEvent, useState } from "react";
import CreateBtn from "../button/createBtn";
import CreateNfc from "./createNfc";
import DeactivateModal from "../modal/deactivateModal";
import _ from "lodash";
import { useMutation, useQuery } from "react-query";
import { userService } from "../../services";
import { getUserData } from "../../services/login";

const Nfc = () => {
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const [nfc, setNfc] = useState("");
  const [error, setError] = useState("");

  const isAlphanumeric = (str: string) => /^[a-zA-Z0-9-_]+$/.test(str);
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isAlphanumeric(value) || value === "") {
      setNfc(_.trim(value));
      setError("");
    }
  };

  const createNfcMutation = useMutation(userService.updateUser, {
    onSuccess: () => {
      console.log("nfc");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { data: userData, isLoading: isUserDataLoading } = useQuery(
    "userData",
    getUserData,
    { enabled: createNfcMutation.isSuccess }
  );

  const nfcId = userData?.data?.user?.IDSearch1;

  const handleSubmit = () => {
    setError("");
    if (!nfc) {
      return setError("Required");
    }

    const params = {
      IDSearch1: nfc,
    };
    createNfcMutation.mutate(params);
  };

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
      {nfcId ? (
        <>
          <div className="flex flex-col gap-5 max-w-[23.875rem]">
            <div className="flex flex-col gap-5 bg-ChawkWhite border border-LightGrey rounded-[0.5rem] py-5 pl-5">
              <div className="flex items-center gap-[0.625rem]">
                <p className="text-ObsidianDarkBlue font-avenirHeavy text-base">
                  Your NFC details{" "}
                </p>
                <div className="flex-1 border-b h-0 border-ObsidianDarkBlue"></div>
              </div>
              <div className="flex flex-col gap-[0.625rem]">
                <p className="font-avenirHeavy text-xs text-CharcolDarkBlue">
                  NFC ID - <span className="font-avenirMedium">{nfcId} </span>
                </p>
                <p className="font-avenirHeavy text-xs text-CharcolDarkBlue">
                  Binary Available -{" "}
                  <span className="font-avenirMedium">Assigned </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <CreateBtn
                text="Deactivate NFC"
                variant="secondary"
                onClick={openDeactivateModal}
              />
              <CreateBtn
                text="Replace NFC"
                variant="primary"
                onClick={openActivateModal}
              />
            </div>
          </div>
        </>
      ) : (
        <CreateNfc
          nfc={nfc}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
        />
      )}

      <DeactivateModal
        open={deactivateModal}
        toggle={toggleDeactivateModal}
        handleDeactivate={handleDeactivate}
        title="Are you sure you want to deactivate the NFC?"
        type="Deactivate"
        firstCheck="Report lost NFC Tag"
        secondCheck="Replace NFC Tag"
      />

      <DeactivateModal
        open={activateModal}
        toggle={toggleActivateModal}
        handleDeactivate={handleActivate}
        title="Confirm deactivating the current NFC and Assign New NFC."
        type="Activate"
        firstCheck="Report lost NFC Tag"
        secondCheck="Replace NFC Tag"
      />
    </>
  );
};

export default Nfc;
