import { useCallback, useEffect, useRef, useState } from "react";

function useEnableLoopVideo(isEnableAlwaysLoop?: boolean) {
  const [isLooped, setIsLooped] = useState<boolean | undefined>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleToggleLoopAttributeVideo = useCallback(() => {
    const video = videoRef.current;
    if (isEnableAlwaysLoop) return;
    if (video?.loop) {
      video.removeAttribute("loop");
    } else {
      video?.setAttribute("loop", "");
    }
    setIsLooped(video?.loop);
  }, [isEnableAlwaysLoop]);

  const handleAlwaysLoop = useCallback(() => {
    const video = videoRef.current;
    if (isEnableAlwaysLoop && video) video.setAttribute("loop", "");
    if (!isEnableAlwaysLoop && video) video.removeAttribute("loop");
    setIsLooped(video?.loop);
  }, [isEnableAlwaysLoop]);

  // We change video without reload page
  const handleChangeVideo = useCallback(
    (ev: Event) => {
      const target = ev.target as HTMLVideoElement;
      if (isEnableAlwaysLoop) target.setAttribute("loop", "");
      setIsLooped(target?.loop);
    },
    [isEnableAlwaysLoop]
  );

  useEffect(() => {
    const video = (videoRef.current = document.querySelector("video"));
    handleAlwaysLoop();
    video?.addEventListener("loadedmetadata", handleChangeVideo);
    return () => {
      video?.removeEventListener("loadedmetadata", handleChangeVideo);
    };
  }, [handleChangeVideo, handleAlwaysLoop]);

  return { isLooped, setIsLooped, handleToggleLoopAttributeVideo };
}

export default useEnableLoopVideo;
