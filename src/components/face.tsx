import ImageUploaderNew from "./image-uploader-new";

const Face = () => (
  <div className="bg-white mt-3 rounded-t-[1rem] px-6 py-5">
    <div className="bg-[#FFF9EF] border border-[#D0880B] h-14 flex flex-row justify-between items-center rounded-[0.5rem]">
      <div className="flex items-center gap-[0.625rem] ml-5">
        <img src="/assets/warning-icon.svg" alt="" />
        <p className="font-avenirMedium text-xs">Consent Required</p>
      </div>
      <div className="flex items-center">
        <p className="text-[#D0880B] font-avenirMedium text-xs cursor-pointer">
          Submit Consent
        </p>
        <img src="/assets/submit-arrow.svg" alt="" />
      </div>
    </div>

    <ImageUploaderNew />
  </div>
);

export default Face;
