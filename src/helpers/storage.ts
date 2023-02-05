import { TypeMessage } from "../types/messages";

export const getDefaultValueFromStorage = async () => {
  const [buttonLoop, alwayLoop] = await Promise.all([
    chrome.storage.local.get(TypeMessage.BUTTON_LOOP_STATUS),
    chrome.storage.local.get(TypeMessage.ALWAYS_LOOP),
  ]);

  return {
    buttonLoop: Boolean(buttonLoop[TypeMessage.BUTTON_LOOP_STATUS] ?? true),
    alwayLoop: Boolean(alwayLoop[TypeMessage.ALWAYS_LOOP]),
  };
};
