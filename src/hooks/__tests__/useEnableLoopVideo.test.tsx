/* eslint-disable testing-library/no-node-access */
import {
  renderHook,
  act,
  createEvent,
  fireEvent,
} from "@testing-library/react";
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

  it("should return data correctly", () => {
    const { result } = renderHook(() => useEnableLoopVideo(), {
      wrapper: TestComponent,
    });

    expect(result.current.isLooped).toBe(false);
    expect(typeof result.current.setIsLooped).toBe("function");
    expect(typeof result.current.handleToggleLoopAttributeVideo).toBe(
      "function"
    );
  });

  it("should change value of isLooped after calling function handleToggleLoopAttributeVideo", () => {
    const { result } = renderHook(() => useEnableLoopVideo(), {
      wrapper: TestComponent,
    });

    act(() => {
      result.current.handleToggleLoopAttributeVideo();
    });
    expect(result.current.isLooped).toBe(true);

    act(() => {
      result.current.handleToggleLoopAttributeVideo();
    });

    expect(result.current.isLooped).toBe(false);
  });

  it("should call setAttribute when calling handleToggleLoopAttributeVideo and isEnableAlwaysLoop is false", () => {
    const { result } = renderHook(() => useEnableLoopVideo(), {
      wrapper: TestComponent,
    });

    const removeAttribute = jest.fn();
    const setAttribute = jest.fn();
    const video = document.querySelector("video") as HTMLVideoElement;
    video.removeAttribute = removeAttribute;
    video.setAttribute = setAttribute;

    act(() => {
      result.current.handleToggleLoopAttributeVideo();
    });
    expect(setAttribute).toBeCalled();
  });

  it("should call removeAttribute when calling handleToggleLoopAttributeVideo and isEnableAlwaysLoop is false", () => {
    const { result } = renderHook(() => useEnableLoopVideo(), {
      wrapper: TestComponent,
    });

    const removeAttribute = jest.fn();
    const video = document.querySelector("video") as HTMLVideoElement;
    video.removeAttribute = removeAttribute;

    act(() => {
      result.current.handleToggleLoopAttributeVideo();
    });

    expect(result.current.isLooped).toBe(true);

    act(() => {
      result.current.handleToggleLoopAttributeVideo();
    });
    expect(removeAttribute).toBeCalled();
  });

  it("should not call removeAttribute and setAttribute when calling handleToggleLoopAttributeVideo and isEnableAlwaysLoop is true", () => {
    const { result } = renderHook(() => useEnableLoopVideo(true), {
      wrapper: TestComponent,
    });

    const removeAttribute = jest.fn();
    const setAttribute = jest.fn();
    const video = document.querySelector("video") as HTMLVideoElement;
    video.removeAttribute = removeAttribute;
    video.setAttribute = setAttribute;

    act(() => {
      result.current.handleToggleLoopAttributeVideo();
    });

    expect(removeAttribute).not.toBeCalled();
    expect(setAttribute).not.toBeCalled();
  });

  it("should  isLooped is false video after loaded meta data and isEnableAlwaysLoop is false", () => {
    const { result } = renderHook(() => useEnableLoopVideo(), {
      wrapper: TestComponent,
    });

    const elementVideo = document.querySelector("video") as HTMLVideoElement;
    const loadedMetadataEvent = createEvent.loadedMetadata(elementVideo);
    fireEvent(elementVideo, loadedMetadataEvent);

    expect(result.current.isLooped).toBe(false);
  });
  it("should  isLooped is true video after loaded meta data and isEnableAlwaysLoop is true", () => {
    const { result } = renderHook(() => useEnableLoopVideo(true), {
      wrapper: TestComponent,
    });

    const elementVideo = document.querySelector("video") as HTMLVideoElement;
    const loadedMetadataEvent = createEvent.loadedMetadata(elementVideo);
    fireEvent(elementVideo, loadedMetadataEvent);

    expect(result.current.isLooped).toBe(true);
  });
});
