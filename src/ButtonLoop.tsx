import { BiRepeat } from "react-icons/bi";
import useEnableLoopVideo from "./hooks/useEnableLoopVideo";
import useMessageToggle from "./hooks/useMessageToggle";

function App() {
  const { isEnableAlwaysLoop, isEnableButtonLoop } = useMessageToggle();

  const { handleToggleLoopAttributeVideo, isLooped } =
    useEnableLoopVideo(isEnableAlwaysLoop);

  return (
    <>
      {isEnableButtonLoop ? (
        <div className="ytp-button" onClick={handleToggleLoopAttributeVideo}>
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
