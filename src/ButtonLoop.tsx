import { BiRepeat } from "react-icons/bi";
import useEnableLoopVideo from "./hooks/useEnableLoopVideo";
import useMessageToggle from "./hooks/useMessageToggle";

function App() {
  const { handleSetLoopAttributeVideo, isLooped } = useEnableLoopVideo();

  const { isChecked: isTurnedOnButtonLoop } = useMessageToggle({
    typeMessage: "BUTTON_LOOP_STATUS",
  });

  return (
    <>
      {isTurnedOnButtonLoop ? (
        <div className="ytp-button" onClick={handleSetLoopAttributeVideo}>
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
