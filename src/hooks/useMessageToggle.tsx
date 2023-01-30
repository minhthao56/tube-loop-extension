import { useCallback, useEffect, useState } from "react";
import { SettingMessage } from "../types/messages";

export interface UseMessageToggle {
  typeMessage: SettingMessage["type"];
}
export default function useMessageToggle({ typeMessage }: UseMessageToggle) {
  const [isChecked, setIsChecked] = useState(true);
  const handleMessage = useCallback(
    async (message: SettingMessage) => {
      if (message.type === typeMessage) {
        setIsChecked(message.checked);
        await chrome.storage.local.set({ [typeMessage]: message.checked });
      }
    },
    [typeMessage]
  );

  useEffect(() => {
    (async () => {
      const storageValue = await chrome.storage.local.get(typeMessage);
      setIsChecked(storageValue[typeMessage]);
    })();

    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [handleMessage, typeMessage]);

  return { isChecked };
}
