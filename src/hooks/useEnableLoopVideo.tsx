import { useCallback, useEffect, useState } from "react";

function useEnableLoopVideo(isEnableAlwaysLoop?: boolean) {
  const [isLooped, setIsLooped] = useState<boolean | undefined>(false);

  const handleToggleLoopAttributeVideo = useCallback(() => {
    const video = document.querySelector("video");
    if (video?.loop && !isEnableAlwaysLoop) {
      video.removeAttribute("loop");
    } else {
      video?.setAttribute("loop", "");
    }
    setIsLooped(video?.loop);
  }, [isEnableAlwaysLoop]);

  const handleChangeVideo = useCallback(
    (ev: Event) => {
      const target = ev.target as HTMLVideoElement;
      if (isEnableAlwaysLoop) target.setAttribute("loop", "");
      setIsLooped(target?.loop);
    },
    [isEnableAlwaysLoop]
  );

  useEffect(() => {
    const video = document.querySelector("video");
    handleToggleLoopAttributeVideo();
    video?.addEventListener("loadedmetadata", handleChangeVideo);
    return () => {
      video?.removeEventListener("loadedmetadata", handleChangeVideo);
    };
  }, [handleChangeVideo, handleToggleLoopAttributeVideo]);

  return { isLooped, setIsLooped, handleToggleLoopAttributeVideo };
}

export default useEnableLoopVideo;
