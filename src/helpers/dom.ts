import {
  CLASS_NAME_YOUTUBE_RIGHT_CONTROL,
  ROOT_ID_EXTENSION,
} from "../constants/app";

export const getRootExtensionDOM = () => {
  return document.getElementById(ROOT_ID_EXTENSION);
};
export const injectRootIntoYoutubePlayer = () => {
  const rootExtension = getRootExtensionDOM();

  if (!rootExtension) {
    const targetDom = document.getElementsByClassName(
      CLASS_NAME_YOUTUBE_RIGHT_CONTROL
    )[0];
    const firstChild = targetDom.firstChild;
    const rootContainer = document.createElement("span");
    rootContainer.style.display = "inline";
    rootContainer.id = ROOT_ID_EXTENSION;
    targetDom.insertBefore(rootContainer, firstChild);
  }

  return {
    existedRootDOM: Boolean(rootExtension),
  };
};
