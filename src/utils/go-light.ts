export const checkIE = () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
    return true;
  }
  return false;
};

// const forEach = (array, callback, scope) => {
//   for (let i = 0; i < array.length; i++) {
//     callback.call(scope, i, array[i]);
//   }
// };

// const hasClass = (el, cls) => {
//   const str = " " + el.className + " ";
//   const testCls = " " + cls + " ";
//   return str.indexOf(testCls) !== -1 ? el : false;
// };

// const isDescendant = (target, descendant) => {
//   let node = target;
//   while (
//     node !== null &&
//     node !== document.body &&
//     node !== document.documentElement
//   ) {
//     if (typeof descendant === "string") {
//       if (node.matches(descendant)) return node;
//     } else if (node === target) return node;
//     node = node.parentNode;
//   }
//   return false;
// };

interface ScrollToArgs {
  top?: number;
  left?: number;
  duration:
    | {
        exact: number;
      }
    | {
        relative: number;
      };
  element?: HTMLElement | Element;
  easing?: "linear" | "easeInOutQuad";
  callback?: (arg: "top" | "left") => void;
  nonblocking?: true; // stop on user scroll
}

const easingMethod = (
  t: number, // t = current time
  b: number, // b = start value
  c: number, // c = change in value
  d: number, // d = duration;
  method: ScrollToArgs["easing"]
) => {
  if (method === "easeInOutQuad") {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
  // linear
  return (c / d) * t;
};

export const scrollTo = ({
  top,
  left,
  duration,
  element: elementArg,
  easing = "linear",
  callback,
  nonblocking,
}: ScrollToArgs) => {
  // default to document scrollingElement if no element was provided
  const element =
    elementArg || document.scrollingElement || document.documentElement;

  const genericScroll = (
    amount: number,
    direction: "scrollLeft" | "scrollTop"
  ) => {
    let trackPreviousScrollPos = element[direction];

    const scrollDuration =
      "exact" in duration ? duration.exact : duration.relative * amount;
    const start = element[direction];
    const change = amount - start;
    const startDate = +new Date();
    const animateScroll = () => {
      if (nonblocking && trackPreviousScrollPos !== element[direction]) {
        return;
      }

      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element[direction] = easingMethod(
        currentTime,
        start,
        change,
        scrollDuration,
        easing
      );
      if (currentTime < scrollDuration) {
        trackPreviousScrollPos = element[direction];
        requestAnimationFrame(animateScroll);
      } else {
        // animation finished
        element[direction] = amount;
        callback?.(direction === "scrollTop" ? "top" : "left");
      }
    };
    animateScroll();
  };
  // scroll Y
  if (top) {
    genericScroll(top, "scrollTop");
  }
  // scroll X
  if (left) {
    genericScroll(left, "scrollLeft");
  }
};
