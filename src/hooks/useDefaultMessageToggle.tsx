import { useCallback, useEffect, useState } from "react";
import { SettingMessage } from "../types/messages";

export default function useDefaultMessageToggle(
  typeMessage: SettingMessage["type"]
) {
  const [value, setValue] = useState<SettingMessage>({
    checked: true,
    type: typeMessage,
  });

  const handleGetMessageByType = useCallback(async () => {
    const savedValue = await chrome.storage.local.get(typeMessage);
    setValue({
      checked: savedValue[typeMessage],
      type: typeMessage,
    });
  }, [typeMessage]);

  useEffect(() => {
    handleGetMessageByType();
  }, [handleGetMessageByType]);

  return { value };
}
