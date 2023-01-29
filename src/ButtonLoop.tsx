import { BiRepeat } from "react-icons/bi";
import useDefaultMessageToggle from "./hooks/useDefaultMessageToggle";
import useEnableLoopVideo from "./hooks/useEnableLoopVideo";
import useMessageToggle from "./hooks/useMessageToggle";

function App() {
  const { handleSetLoopAttributeVideo, isLooped } = useEnableLoopVideo();
  const { value } = useDefaultMessageToggle("STATUS_SYSTEM");
  const { isChecked } = useMessageToggle({
    typeMessage: "STATUS_SYSTEM",
    defaultValue: value.checked,
  });

  return (
    <>
      {isChecked ? (
        <div className="ytp-button" onClick={handleSetLoopAttributeVideo}>
          <div className="flex justify-center items-center h-full">
            <BiRepeat
              size={26}
              style={{ color: isLooped ? "white" : "gray" }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
