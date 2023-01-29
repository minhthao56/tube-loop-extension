import Toggle from "../components/Toggle";
import useDefaultMessageToggle from "../hooks/useDefaultMessageToggle";
import { SettingMessage } from "../types/messages";
import Logo from "../assets/logo256.png";

export default function Popup() {
  const { value } = useDefaultMessageToggle("STATUS_SYSTEM");

  const handleChangeOnOff = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const checked = event.currentTarget.checked;
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    if (tab.id) {
      await chrome.tabs.sendMessage<SettingMessage>(tab.id, {
        type: "STATUS_SYSTEM",
        checked,
      });
    }
  };
  return (
    <div className="w-72 h-48 dark:bg-neutral-900 p-3 flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mb-6">
        <img src={Logo} alt="logo" className="w-7 pr-2" />
        <h1 className="dark:text-white text-base text-center font-bold">
          TubeLoop
        </h1>
      </div>
      <div className="px-3">
        <Toggle
          onChange={handleChangeOnOff}
          checked={value.checked}
          label={`The button loop is enable`}
        />
        <Toggle label="Always loop is disable" />
      </div>
    </div>
  );
}
