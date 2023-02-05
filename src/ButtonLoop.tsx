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
            <BiRepeat size={26} style={{ opacity: isLooped ? 1 : 0.6 }} />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default App;
