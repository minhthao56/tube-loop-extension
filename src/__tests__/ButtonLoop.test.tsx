import { render } from "@testing-library/react";
import ButtonLoop from "../ButtonLoop";
import useMessageToggle from "../hooks/useMessageToggle";

jest.mock("../hooks/useEnableLoopVideo", () => jest.fn());
jest.mock("../hooks/useMessageToggle", () => jest.fn());

describe("<ButtonLoop/>", () => {
  const renderComponent = () => {
    return render(<ButtonLoop />);
  };

  beforeEach(() => {
    (useMessageToggle as jest.Mock).mockReturnValue({
      isEnableAlwaysLoop: false,
      isEnableButtonLoop: true,
    });
  });

  it("should match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
