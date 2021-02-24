import { useEffect, useRef, useState } from "react";

type TakePhotoModalContentProps = {
  videoStream?: MediaStream;
  takePhoto: ( arg : any) => void
};

export const TakePhotoModalContent = ({
  videoStream,
  takePhoto
}: TakePhotoModalContentProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const [imgFromCanvas, setImg] = useState('')
  useEffect(() => {
    if(!videoRef.current || !videoStream) {
        return
    }
    videoRef.current.srcObject = videoStream
    videoRef.current.play()
  });
  return (
    <div>
      <video
        autoPlay
        className="bg-uanlYellow w-72 h-72  md:w-96 md:h-96"
        ref={videoRef}
      ></video>
      <div data-testid="takePhotoBtn" onClick={
       () => {
           if(!canvasRef.current || !videoRef.current) return
            const canvas = canvasRef.current
            const video = videoRef.current
            canvas.width = video.clientWidth
            canvas.height = video.clientHeight
            canvas.getContext('2d')?.drawImage(videoRef.current, 0,0, canvas.width, canvas.height)
            takePhoto(canvas.toDataURL())
       } 
      } className="py-2 flex justify-center">
        <div className="h-16 w-16 bg-gray-100 rounded-full flex justify-center items-center cursor-pointer">
          <i className="fas fa-camera-retro text-2xl text-uanlBlue"></i>
        </div>
      </div>
    </div>
  );
};
