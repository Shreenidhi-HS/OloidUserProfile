import ImageUploaderNew from "./image-uploader-new"

const Face = () => (
    <div className='flex flex-col'>
        <div className="bg-white p-3 flex flex-row justify-between items-center rounded-[0.75rem]">
            <span>Consent to use the image</span>
            <span className="text-[green] cursor-pointer">Submit Consent</span>
        </div>
        <div className="bg-white p-3 rounded-[0.75rem] mt-[12px] ">
            <ImageUploaderNew />
        </div>
    </div>
)

export default Face