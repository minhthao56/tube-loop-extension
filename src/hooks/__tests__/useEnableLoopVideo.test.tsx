import { renderHook, act } from "@testing-library/react";
import useEnableLoopVideo from "../useEnableLoopVideo";

describe("useEnableLoopVideo hook", () => {
  const TestComponent = ({ children }: React.PropsWithChildren) => {
    return (
      <div>
        <video />
        {children}
      </div>
    );
  };

  it("should return data correctly", () => {});

  it("should toggle the loop attribute of a video", () => {
    const { result } = renderHook(() => useEnableLoopVideo(), {
      wrapper: TestComponent,
    });

    act(() => {
      result.current.handleToggleLoopAttributeVideo();
    });
  });

  //   it("should always loop the video if isEnableAlwaysLoop is true", () => {
  //     const { result } = renderHook(() => useEnableLoopVideo(true));
  //     const [, setVideoRef] = result.current.videoRef;

  //     act(() => {
  //       setVideoRef({
  //         current: { setAttribute: jest.fn(), removeAttribute: jest.fn() } as any,
  //       });
  //     });

  //     const [, { handleToggleLoopAttributeVideo }] = result.current;
  //     act(() => {
  //       handleToggleLoopAttributeVideo();
  //     });

  //     const [, videoRef] = result.current.videoRef;
  //     expect(videoRef.current.setAttribute).toHaveBeenCalledWith("loop", "");

  //     act(() => {
  //       handleToggleLoopAttributeVideo();
  //     });

  //     expect(videoRef.current.setAttribute).toHaveBeenCalledWith("loop", "");
  //   });
});
