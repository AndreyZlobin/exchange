const DEFAULT_DELAY = 200;

export const debounce = <T = void, B = void>(cb: (params: T) => B, delay = DEFAULT_DELAY) => {
  let timerId = 0;

  return (params: T) => {
    if (!timerId) {
      cb(params);

      timerId = window.setTimeout(() => {
        clearTimeout(timerId);
        timerId = 0;
      }, delay);
    }
  };
};
