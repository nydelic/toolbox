import { checkIE, scrollTo } from "./go-light";

it("does not identify as IE user agent", () => {
  const isIe = checkIE();
  expect(isIe).toBe(false);
});

const scrollContainer = document.createElement("DIV");
document.body.appendChild(scrollContainer);
scrollContainer.style.height = "100px";
scrollContainer.style.overflow = "scroll";

const scrollChild = document.createElement("DIV");
scrollChild.style.height = "1000000px";
scrollContainer.appendChild(scrollChild);

it("scrolls element for duration an distance", async () => {
  jest.useFakeTimers("modern");
  const duration = 100;

  // Scroll Y
  expect(scrollContainer.scrollTop).toBe(0);
  scrollTo({
    element: scrollContainer,
    duration: { exact: duration },
    top: 999,
  });
  jest.advanceTimersByTime(duration + 15); // + 15 because it can take some additional time for requestAnimationFrame to be called
  expect(scrollContainer.scrollTop).toBe(999);

  // Scroll X
  expect(scrollContainer.scrollLeft).toBe(0);
  scrollTo({
    element: scrollContainer,
    duration: { exact: duration },
    left: 1111,
  });
  jest.advanceTimersByTime(duration + 15); // + 15 because it can take some additional time for requestAnimationFrame to be called
  expect(scrollContainer.scrollLeft).toBe(1111);
});
