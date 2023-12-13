import ImageUploaderNew from "./image-uploader-new";
import { useNavigate } from "react-router-dom";

const Face = () => {
  const navigate = useNavigate();

  const handleConsentSubmit = () => {
    navigate("/credentials/faces/consent");
  };

  return (
    <>
      <div className="bg-[#FFF9EF] border border-[#D0880B] h-14 flex flex-row justify-between items-center rounded-[0.5rem]">
        <div className="flex items-center gap-[0.625rem] ml-5">
          <img src="/assets/warning-icon.svg" alt="" />
          <p className="font-avenirMedium text-xs">Consent Required</p>
        </div>
        <div onClick={handleConsentSubmit} className="flex items-center">
          <p className="text-[#D0880B] font-avenirMedium text-xs cursor-pointer">
            Submit Consent
          </p>
          <img src="/assets/submit-arrow.svg" alt="" />
        </div>
      </div>

      <ImageUploaderNew />
    </>
  );
};

export default Face;