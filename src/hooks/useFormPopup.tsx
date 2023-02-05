import { useCallback, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { URL_YOUTUBE_PLAY } from "../constants/app";
import { getDefaultValueFromStorage } from "../helpers/storage";
import { SettingMessage, TypeMessage } from "../types/messages";

interface PopupFromProps {
  [TypeMessage.BUTTON_LOOP_STATUS]: boolean;
  [TypeMessage.ALWAYS_LOOP]: boolean;
}

export default function useFormPopup() {
  const { register, getValues, setValue, control } = useForm<PopupFromProps>({
    defaultValues: {
      BUTTON_LOOP_STATUS: true,
      ALWAYS_LOOP: false,
    },
  });

  const [valueButtonLoop, valueAlwaysLoop] = useWatch<PopupFromProps>({
    control,
    name: ["BUTTON_LOOP_STATUS", "ALWAYS_LOOP"],
  });

  const handleSendMessage = useCallback(
    async (value: boolean, type: SettingMessage["type"]) => {
      const tabs = await chrome.tabs.query({
        url: `${URL_YOUTUBE_PLAY}*`,
      });
      for (const tab of tabs) {
        if (tab?.id) {
          await chrome.tabs.sendMessage<SettingMessage>(tab.id, {
            type,
            checked: value,
          });
          setValue(type, value as never);
        }
      }
    },
    [setValue]
  );

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: SettingMessage["type"]
  ) => {
    const checked = event.currentTarget.checked;

    if (type === "BUTTON_LOOP_STATUS" && !checked) {
      await handleSendMessage(false, "ALWAYS_LOOP");
    }
    await handleSendMessage(checked, type);
  };

  const handleSetValueAsync = useCallback(async () => {
    const { alwayLoop, buttonLoop } = await getDefaultValueFromStorage();
    await handleSendMessage(buttonLoop, "BUTTON_LOOP_STATUS");
    await handleSendMessage(alwayLoop, "ALWAYS_LOOP");
  }, [handleSendMessage]);

  useEffect(() => {
    handleSetValueAsync();
  }, [handleSetValueAsync]);

  return {
    handleSendMessage,
    handleChange,
    register,
    getValues,
    valueButtonLoop,
    valueAlwaysLoop,
  };
}
