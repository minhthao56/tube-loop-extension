import { useCallback, useEffect, useState } from "react";
import { SettingMessage } from "../types/messages";

export default function useDefaultMessageToggleFromStorage(
  typeMessage: SettingMessage["type"]
) {
  const [value, setValue] = useState<SettingMessage>({
    checked: true,
    type: typeMessage,
  });

  const handleSendMessage = useCallback(
    async (event: React.FormEvent<HTMLInputElement> | boolean) => {
      const checked =
        typeof event === "boolean" ? event : event.currentTarget.checked;

      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      if (tab.id) {
        await chrome.tabs.sendMessage<SettingMessage>(tab.id, {
          type: typeMessage,
          checked,
        });
        setValue({
          checked: checked,
          type: typeMessage,
        });
      }
    },
    [typeMessage]
  );

  const handleGetMessageFromStorage = useCallback(async () => {
    const storageValue = await chrome.storage.local.get(typeMessage);
    await handleSendMessage(storageValue[typeMessage]);
  }, [handleSendMessage, typeMessage]);

  useEffect(() => {
    handleGetMessageFromStorage();
  }, [handleGetMessageFromStorage]);

  return { value, setValue, handleSendMessage };
}
