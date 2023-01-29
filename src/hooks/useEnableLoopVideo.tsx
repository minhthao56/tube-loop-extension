import { useCallback, useEffect, useState } from "react";

function useEnableLoopVideo() {
  const [isLooped, setIsLooped] = useState<Boolean | undefined>(false);

  const handleSetLoopAttributeVideo = () => {
    const video = document.querySelector("video");
    if (video?.loop) {
      video.removeAttribute("loop");
    } else {
      video?.setAttribute("loop", "");
    }
    setIsLooped(video?.loop);
  };

  const handleChangeVideo = useCallback((ev: Event) => {
    const target = ev.target as HTMLVideoElement;
    setIsLooped(target?.loop);
  }, []);

  useEffect(() => {
    const video = document.querySelector("video");
    video?.addEventListener("loadedmetadata", handleChangeVideo);
    return () => {
      video?.removeEventListener("loadedmetadata", handleChangeVideo);
    };
  }, [handleChangeVideo]);

  return { isLooped, setIsLooped, handleSetLoopAttributeVideo };
}

export default useEnableLoopVideo;
