import { useContext } from "react";
import { LoginContext } from "../../providers/login-provider";

const QRcode = () => {
  const { authContext } = useContext(LoginContext);
  const QRCode = authContext?.userDetail?.QRCode;
  const expiryDate = QRCode?.DyanamicCode?.Expiry;

  function formatDate(date) {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    const formattedTime = new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const month = new Date(date).toLocaleString("en-US", { month: "short" });

    return {
      formattedDate,
      formattedTime,
      month,
    };
  }

  const { formattedDate, formattedTime, month } = formatDate(expiryDate);

  return (
    <div className="flex flex-col gap-4">
      {QRCode ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[0.313rem]">
              <p className="font-avenirHeavy text-xs text-BluishGrey">
                Expiry Date:
              </p>
              <p className="font-avenirRegular text-xs text-BluishGrey">
                {formattedDate} {month} {formattedTime}
              </p>
            </div>

            <div>
              <img src="/assets/download-button.svg" alt="" />
            </div>
          </div>

          <img
            src={QRCode?.DyanamicCode?.Image}
            alt="qr code credential"
            className="w-[342px] h-[342px] border border-MediumBluishGrey bg-GlassBluishGrey  rounded-[0.5rem] shadow-md"
          />
        </>
      ) : (
        <div className="flex flex-col gap-[0.313rem]">
          <p className="font-avenirHeavy text-xs text-BluishGrey">
            QR Code is not assigned.
          </p>
          <p className="text-[#FF0000] font-avenirMedium text-xs">
            Please reach out to your local HR or Orientation team member for QR
            Code enrollment.
          </p>
        </div>
      )}
    </div>
  );
};

export default QRcode;
