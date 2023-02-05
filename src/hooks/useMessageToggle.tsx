import { useCallback, useEffect, useState } from "react";
import { getDefaultValueFromStorage } from "../helpers/storage";
import { SettingMessage } from "../types/messages";

export default function useMessageToggle() {
  const [isEnableButtonLoop, setIsEnableButtonLoop] = useState(true);
  const [isEnableAlwaysLoop, setIsEnableAlwaysLoop] = useState(false);

  const handleMessage = useCallback(async (message: SettingMessage) => {
    if (message.type === "BUTTON_LOOP_STATUS") {
      setIsEnableButtonLoop(message.checked);
    }
    if (message.type === "ALWAYS_LOOP") {
      setIsEnableAlwaysLoop(message.checked);
    }
    await chrome.storage.local.set({ [message.type]: message.checked });
  }, []);

  useEffect(() => {
    (async () => {
      const { alwayLoop, buttonLoop } = await getDefaultValueFromStorage();
      setIsEnableButtonLoop(buttonLoop);
      setIsEnableAlwaysLoop(alwayLoop);
    })();

    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [handleMessage]);

  return { isEnableButtonLoop, isEnableAlwaysLoop };
}
