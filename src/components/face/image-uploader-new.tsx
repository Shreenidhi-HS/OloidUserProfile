import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Button from "../ui/button";
import Webcam from "react-webcam";
import { useMutation, useQuery } from "react-query";
import { addFace, removeFace } from "../../services/credential";
import { useToast } from "../ui/use-toast";
import { cn } from "../../utils/utils";
import { getUserData } from "../../services/login";
import DeleteButton from "../button/deleteButton";
import { LoginContext } from "../../providers/login-provider";

function ImageUploaderNew() {
  const { authContext } = useContext(LoginContext);
  const { toast } = useToast();

  const [capturedImages, setCapturedImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [handleDeleteModal, setHandleDeleteModal] = useState(false);

  // required code
  const [openCamera, setOpenCamera] = useState(false);
  const [src, setSrc] = useState("");
  const [videoConstraints, setVideoConstraints] = useState({
    width: 360,
    height: 400,
    facingMode: "user",
  });
  const webcamRef = React.useRef(null);

  const {
    data: userData,
    error,
    isLoading: isUserDataLoading,
    refetch: refetchUser,
  } = useQuery("userData", getUserData);

  const addFaceMutate = useMutation(addFace, {
    onSuccess: (data) => {
      refetchUser();
      setOpenCamera(false);
      setSrc("");
    },
    onMutate: () => {
      console.log("loading");
    },
    onError: (error) => {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        variant: "destructive",
        title: "Face Capture Failed",
        description: error.response.data.message,
      });
    },
    onSettled: () => {
      console.log("loaded");
    },
  });

  const removeFaceMutate = useMutation(removeFace, {
    onSuccess: (data) => {
      refetchUser();
      setHandleDeleteModal(false);
    },
    onMutate: () => {
      console.log("loading");
    },
    onError: (error) => {
      setHandleDeleteModal(false);
      //   toast({
      //     className: cn(
      //         'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
      //     ),
      //     variant: "destructive",
      //     title: "Face Capture Failed",
      //     description: error.response.data.message,
      //   })
    },
    onSettled: () => {
      console.log("loaded");
    },
  });

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSrc(imageSrc);
  }, [webcamRef]);

  const handleCameraClose = () => {
    setOpenCamera(false);
    setSrc("");
    let stream = webcamRef.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => (track.enabled = false));
  };

  const retakePhoto = () => {
    setSrc("");
  };

  const saveCapture = (e) => {
    e.preventDefault();
    if (!(src && src.split(",").length > 0)) {
      alert("Face is requird.");
    }
    if (src) {
      addFaceMutate.mutate({ FaceImage: src.split(",")[1] });
    }
  };

  // required code ends

  const handleCaptureImage = async () => {
    if (!isUserDataLoading) {
      if (userData?.data.user.Faces.length < 5) {
        setOpenCamera(true);
      } else {
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
          variant: "destructive",
          title: "Only Five images can be set",
        });
      }
    }
  };

  const toggleImageSelection = (id: string) => {
    const isSelected = selectedImages.includes(id);
    if (isSelected) {
      setSelectedImages(selectedImages.filter((item) => item !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const toggledeleteModal = () => {
    setHandleDeleteModal(!handleDeleteModal);
  };

  const handleDeleteImages = () => {
    if (selectedImages.length > 0) {
      setHandleDeleteModal(true);
      const config = {
        DeleteAll: false,
        FaceIds: selectedImages,
      };
      removeFaceMutate.mutate(config);
    }
  };

  return (
    <div>
      {openCamera ? (
        <>
          {!src && (
            <>
              <div className="hidden md:block  backdrop-blur-sm absolute w-full h-full z-[998] top-0 left-0 "></div>
              <div className="absolute rounded-[0.75rem] md:fixed top-0 left-0 h-screen w-full z-[999] bg-[black] overflow-hidden md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-1/2 md:h-3/4">
                <div
                  className="bg-white z-[999] relative p-3 w-[2rem] h-[2rem] flex items-center justify-center float-right mr-3 mt-3 rounded-[0.45rem] cursor-pointer"
                  onClick={handleCameraClose}
                >
                  X
                </div>
                <Webcam
                  audio={false}
                  height={"50%"}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={320}
                  videoConstraints={videoConstraints}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-[100]"
                />
                {/* capture button */}
                <div
                  className="cursor-pointer z-[999] hover:scale-90 transition-all duration-300 bg-white p-2 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 mb-16 w-[4rem] h-[4rem]"
                  onClick={(e) => {
                    e.preventDefault();
                    capture();
                  }}
                >
                  <div className="bg=white w-[3rem] h-[3rem] border-[3px] border-[black] rounded-full"></div>
                </div>
              </div>
            </>
          )}
          {/* show when the capture button is clicked */}
          {src && (
            <>
              <div className="hidden md:block  backdrop-blur-sm absolute w-full h-full z-[998] top-0 left-0 "></div>
              <div className="absolute rounded-[0.75rem] md:fixed top-0 left-0 h-screen w-full z-[999] bg-[#272727] overflow-hidden md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-1/2 md:h-3/4">
                <div
                  className="bg-white p-2 w-[2rem] h-[2rem] flex items-center justify-center float-left ml-3 mt-3 rounded-[0.45rem] cursor-pointer"
                  onClick={handleCameraClose}
                >
                  <img
                    src="../../public/assets/credentials/back-btn.svg"
                    height={30}
                    width={30}
                  />
                </div>
                <h2 className="text-white text-2xl font-bold absolute top-0 left-1/2 -translate-x-1/2 mt-[15%] md:mt-[5%]">
                  Selfie
                </h2>
                <div className="bg-white rounded-t-[2.75rem] p-8 flex flex-col gap-4 items-center h-full mt-32">
                  <div className="w-[200px] h-[200px] rounded-[0.75rem] border-[1px] border-MediumBluishGrey overflow-hidden">
                    <img
                      src={src}
                      alt={`Captured image`}
                      className="h-full w-full"
                    />
                  </div>
                  <h2 className="text-xl font-medium">Add Credential</h2>
                  <span className="text-center">
                    Please make sure your face is not blurred or out of frame
                    before you continue
                  </span>
                  <button
                    onClick={(e) => saveCapture(e)}
                    className="py-4 min-w-[20rem] text-white text-lg bg-[#272727] rounded-[0.75rem] disabled:bg-gray-200"
                  >
                    {addFaceMutate.isLoading ? (
                      <img
                        src="../../public/assets/loader.svg"
                        className=" animate-spin m-auto"
                        height={24}
                        width={24}
                        alt="loader"
                      />
                    ) : (
                      "Looks Great! Continue"
                    )}
                  </button>
                  <button
                    onClick={retakePhoto}
                    className="py-4 min-w-[20rem] border-[1px] border-[#272727] text-[#272727] text-lg bg-white rounded-[0.75rem]"
                  >
                    Take a new photo
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="flex items-center justify-between my-[1.625rem]">
            <p className="font-avenirHeavy text-xl">Assigned Faces</p>
            <DeleteButton
              isActive={selectedImages.length > 0}
              onClick={toggledeleteModal}
            />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            <div className="flex items-center justify-center w-full bg-white">
              <label
                className="cursor-pointer flex flex-col w-full h-32 border-2 border-dashed border-[#82B4E5] hover:border-CharcolDarkBlue transition-all duration-300 rounded-[0.75rem]"
                onClick={handleCaptureImage}
              >
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 61 61"
                    fill="#475467"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.8555 30.2651H50.8555M30.8555 10.2651V50.2651"
                      stroke="#475467"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-Chaborder-CharcolDarkBlue group-hover:text-gray-600">
                    Add Face
                  </p>
                </div>
              </label>
            </div>
            {/* {capturedImages.map((imageDataURL, index) => (
                                <div className='h-32 relative rounded-[0.75rem] overflow-hidden w-fit bg-[red]' key={index}>
                                    <input
                                        type="checkbox"
                                        name="delete"
                                        id={`delete-${index}`}
                                        className='absolute top-0 left-0 ml-2 mt-2 rounded-full'
                                        onChange={() => toggleImageSelection(index)}
                                        checked={selectedImages.includes(index)}
                                    />
                                    <img src={imageDataURL} alt={`Captured ${index + 1}`} className='h-full rounded-[0.75rem]' />
                                </div>
                            ))} */}
            {!isUserDataLoading && (
              <>
                {userData?.data?.user?.Faces?.map((data, index) => (
                  <div
                    className="h-32 relative rounded-[0.75rem] overflow-hidden w-fit"
                    key={index}
                  >
                    <input
                      type="checkbox"
                      name="delete"
                      id={`delete-${index}`}
                      className="absolute top-0 left-0 ml-2 mt-2 rounded-full cursor-pointer"
                      onChange={() =>
                        toggleImageSelection(data.OnlineModelFaceID)
                      }
                      checked={selectedImages.includes(data.OnlineModelFaceID)}
                    />
                    <img
                      src={data.SignedUrl}
                      alt={`Captured ${index + 1}`}
                      className="h-full rounded-[0.75rem]"
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}

      <Dialog open={handleDeleteModal} onOpenChange={toggledeleteModal}>
        <DialogContent className="max-w-[90vw] md:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription className="p-3">
              <span>
                Are you sure want to delete the selected Face credentials!
              </span>
              <div className="flex justify-between gap-4 mt-4">
                <Button
                  className="bg-transparent flex-1 text-black border-[black] border-[1px]"
                  onClick={toggledeleteModal}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[red] flex-1"
                  onClick={handleDeleteImages}
                >
                  {removeFaceMutate.isLoading ? (
                    <img
                      src="../../public/assets/loader.svg"
                      className=" animate-spin m-auto"
                      height={24}
                      width={24}
                      alt="loader"
                    />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ImageUploaderNew;
