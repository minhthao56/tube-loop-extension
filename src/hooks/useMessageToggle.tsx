import { useCallback, useEffect, useState } from "react";
import { SettingMessage } from "../types/messages";

export interface UseMessageToggle {
  typeMessage: SettingMessage["type"];
  defaultValue?: Boolean;
}
export default function useMessageToggle({
  typeMessage,
  defaultValue,
}: UseMessageToggle) {
  const [isChecked, setIsChecked] = useState(defaultValue || true);
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
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, [handleMessage]);

  return { isChecked };
}
