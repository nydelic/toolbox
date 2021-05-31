import { useWindowSize } from "index";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

const HookContainer = () => {
  const [x, y] = useWindowSize();
  return (
    <>
      {x} {y}
    </>
  );
};

let container: HTMLDivElement | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (!container) {
    throw new Error("Shouldn't happen.");
  }
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders and gets window size correctly", () => {
  if (!container) {
    throw new Error("Shouldn't happen.");
  }
  act(() => {
    render(<HookContainer />, container);
  });
  expect(container.textContent).toBe("1024 768");
});
