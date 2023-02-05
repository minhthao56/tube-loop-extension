import Toggle from "../components/Toggle";
import Logo from "../assets/logo512.png";
import useFormPopup from "../hooks/useFormPopup";
import { covertBooleanToTextAble } from "../helpers/app";

export default function Popup() {
  const { handleChange, register, valueAlwaysLoop, valueButtonLoop } =
    useFormPopup();

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
          {...register("BUTTON_LOOP_STATUS")}
          label={`The button loop is ${covertBooleanToTextAble(
            valueButtonLoop
          )}`}
          onChange={(e) => handleChange(e, "BUTTON_LOOP_STATUS")}
        />
        <Toggle
          {...register("ALWAYS_LOOP")}
          label={`Always loop is  ${covertBooleanToTextAble(valueAlwaysLoop)}`}
          disabled={!valueButtonLoop}
          onChange={(e) => handleChange(e, "ALWAYS_LOOP")}
        />
      </div>
    </div>
  );
}
