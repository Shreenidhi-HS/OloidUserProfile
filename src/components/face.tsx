import ImageUploaderNew from "./image-uploader-new";

const Face = () => (
  <div className="bg-white mt-3 rounded-t-[1rem]">
    <div className="p-3 flex flex-row justify-between items-center rounded-[0.75rem]">
      <span>Consent to use the image</span>
      <span className="text-[green] cursor-pointer">Submit Consent</span>
    </div>
    <div className="p-3 rounded-[0.75rem] mt-[12px] ">
      <ImageUploaderNew />
    </div>
  </div>
);

export default Face;
