import { useQuery } from "react-query";
import { getUserData } from "../../services/login";

const Bluetooth = () => {
  const { data: userData, isLoading: isUserDataLoading } = useQuery(
    "userData",
    getUserData
    // { enabled: createNfcMutation.isSuccess }
  );

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);

    const optionsDate: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-US", optionsDate);
    const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

    return `${formattedDate} ${formattedTime}`;
  };

  const bluetoothId = userData?.data?.user?.Bluetooth?.CredentialID;
  const validityEnd = userData?.data?.user?.Bluetooth?.ValidityEnd;
  const formattedValidityEnd = formatTimestamp(validityEnd);

  return (
    <>
      {bluetoothId ? (
        <div className="flex flex-col gap-[0.938rem]">
          <div className="flex flex-col gap-[0.313rem]">
            <p className="font-avenirHeavy text-xs text-BluishGrey">
              Blutooh ID:
            </p>
            <p className="font-avenirMedium text-xs text-BluishGrey">
              {bluetoothId}
            </p>
          </div>

          <div className="flex flex-col gap-[0.313rem]">
            <p className="font-avenirHeavy text-xs text-BluishGrey">
              End Date:
            </p>
            <p className="font-avenirMedium text-xs text-BluishGrey">
              {formattedValidityEnd}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-[0.313rem]">
            <p className="font-avenirMedium text-xs text-BluishGrey">
              Bluetooth Credential is not assigned.
            </p>
            <p className="font-avenirMedium text-xs text-[#FF0000]">
              Please reach out to your local HR or Orientation team member for
              Help.
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Bluetooth;
