import { useCallback, useEffect, useState } from "react";
import { SettingMessage, TypeMessage } from "../types/messages";

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
      const [valueButtonLoop, valueAlwayLoop] = await Promise.all([
        chrome.storage.local.get(TypeMessage.BUTTON_LOOP_STATUS),
        chrome.storage.local.get(TypeMessage.ALWAYS_LOOP),
      ]);

      setIsEnableButtonLoop(
        valueButtonLoop[TypeMessage.BUTTON_LOOP_STATUS] || false
      );
      setIsEnableButtonLoop(valueAlwayLoop[TypeMessage.ALWAYS_LOOP] || false);
    })();

    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [handleMessage]);

  return { isEnableButtonLoop, isEnableAlwaysLoop };
}
