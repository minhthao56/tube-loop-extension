import { BiRepeat } from "react-icons/bi";
import useEnableLoopVideo from "./hooks/useEnableLoopVideo";

function App() {
  const { handleSetLoopAttributeVideo, isLooped } = useEnableLoopVideo();

  return (
    <div className="ytp-button" onClick={handleSetLoopAttributeVideo}>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BiRepeat size={26} style={{ color: isLooped ? "white" : "gray" }} />
      </div>
    </div>
  );
}

export default App;
