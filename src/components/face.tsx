import ImageUploaderNew from "./image-uploader-new";

const Face = () => (
  <div className="bg-white mt-3 rounded-t-[1rem] px-6 py-5">
    <div className="bg-[#FFF9EF] border border-[#D0880B] p-3 flex flex-row justify-between items-center rounded-[0.75rem]">
      <div className="flex items-center gap-[0.625rem]">
        <img src="/assets/warning-icon.svg" alt="" />
        <p className="font-avenirMedium text-xs">Consent Required</p>
      </div>
      <p className="text-[#D0880B] font-avenirMedium text-xs cursor-pointer">
        Submit Consent
      </p>
    </div>

    <ImageUploaderNew />
  </div>
);

export default Face;
