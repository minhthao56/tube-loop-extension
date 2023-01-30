import Toggle from "../components/Toggle";
import useHandlingToggleButtonLoop from "../hooks/useHandlingToggle";
import useHandlingToggleAlwayLoop from "../hooks/useHandlingToggle";

import Logo from "../assets/logo512.png";

export default function Popup() {
  const {
    value: valueStatusButtonLoop,
    handleSendMessage: handleSendMessageButtonLoop,
  } = useHandlingToggleButtonLoop("BUTTON_LOOP_STATUS");

  const {
    value: valueStatusAlwayLoop,
    handleSendMessage: handleSendMessageAlwayLoop,
  } = useHandlingToggleAlwayLoop("ALWAYS_LOOP");

  return (
    <div className="w-72 h-48 dark:bg-neutral-900 p-3 flex flex-col justify-center items-center">
      <div className="flex justify-end items-center mb-6">
        <img src={Logo} alt="logo" className="w-7 pr-2" />
        <h1 className="dark:text-white text-base text-center font-bold">
          TubeLoop
        </h1>
      </div>
      <div className="px-3">
        <Toggle
          onChange={handleSendMessageButtonLoop}
          checked={valueStatusButtonLoop.checked}
          label={`The button loop is enable`}
        />
        <Toggle
          checked={valueStatusAlwayLoop.checked}
          label="Always loop is disable"
          disabled={!valueStatusButtonLoop.checked}
          onChange={handleSendMessageAlwayLoop}
        />
      </div>
    </div>
  );
}
