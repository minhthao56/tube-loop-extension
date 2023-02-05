import { useForm, useWatch } from "react-hook-form";
import { getDefaultValueFromStorage } from "../helpers/storage";
import { SettingMessage, TypeMessage } from "../types/messages";

interface PopupFromProps {
  [TypeMessage.BUTTON_LOOP_STATUS]: boolean;
  [TypeMessage.ALWAYS_LOOP]: boolean;
}

export default function useFormPopup() {
  const { register, getValues, setValue, control } = useForm<PopupFromProps>({
    defaultValues: async () => {
      const { alwayLoop, buttonLoop } = await getDefaultValueFromStorage();
      return {
        ALWAYS_LOOP: alwayLoop,
        BUTTON_LOOP_STATUS: buttonLoop,
      };
    },
  });

  const [valueButtonLoop, valueAlwaysLoop] = useWatch<PopupFromProps>({
    control,
    name: ["BUTTON_LOOP_STATUS", "ALWAYS_LOOP"],
  });

  const handleSendMessage = async (
    value: boolean,
    type: SettingMessage["type"]
  ) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    if (tab.id) {
      await chrome.tabs.sendMessage<SettingMessage>(tab.id, {
        type,
        checked: value,
      });
      setValue(type, value as never);
    }
  };

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

  return {
    handleSendMessage,
    handleChange,
    register,
    getValues,
    valueButtonLoop,
    valueAlwaysLoop,
  };
}
