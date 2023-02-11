/* eslint-disable testing-library/no-node-access */
import { render } from "@testing-library/react";
import ButtonLoop from "../ButtonLoop";
import useEnableLoopVideo from "../hooks/useEnableLoopVideo";
import useMessageToggle from "../hooks/useMessageToggle";
import userEvent from "@testing-library/user-event";

jest.mock("../hooks/useEnableLoopVideo", () => jest.fn());
jest.mock("../hooks/useMessageToggle", () => jest.fn());

describe("<ButtonLoop/>", () => {
  const handleToggleLoopAttributeVideo = jest.fn();
  const renderComponent = () => {
    return render(<ButtonLoop />);
  };

  beforeEach(() => {
    (useMessageToggle as jest.Mock).mockReturnValue({
      isEnableAlwaysLoop: false,
      isEnableButtonLoop: true,
    });

    (useEnableLoopVideo as jest.Mock).mockReturnValue({
      handleToggleLoopAttributeVideo,
      isLooped: true,
    });
  });

  it("should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
    expect(document.querySelector(".ytp-button")).toBeInTheDocument();
  });

  it("should be call handleToggleLoopAttributeVideo when clicking button loop", () => {
    renderComponent();
    const button = document.querySelector(".ytp-button") as HTMLElement;
    userEvent.click(button);
    expect(handleToggleLoopAttributeVideo).toBeCalledTimes(1);
  });

  it("should have style opacity is 0.6 when isLooped is false", () => {
    (useEnableLoopVideo as jest.Mock).mockReturnValue({
      handleToggleLoopAttributeVideo,
      isLooped: false,
    });
    renderComponent();
    const svg = document.querySelector(".ytp-button")?.querySelector("svg");
    expect(svg).toHaveStyle("opacity:0.6");
  });

  it("should hide the button loop when isEnableButtonLoop is false", () => {
    (useMessageToggle as jest.Mock).mockReturnValue({
      isEnableAlwaysLoop: false,
      isEnableButtonLoop: false,
    });
    renderComponent();
    expect(document.querySelector(".ytp-button")).not.toBeInTheDocument();
  });
});
