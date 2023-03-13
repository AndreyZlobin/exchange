const checkElementPartialVisibilityInContainer = (
  element: HTMLElement,
  container: HTMLElement,
  offset = 20,
) => {
  const { bottom: elBot, top: elTop } = element.getBoundingClientRect();
  const { top: rootTop, bottom: rootBottom } = container.getBoundingClientRect();

  return elTop >= rootBottom - offset || elBot <= rootTop + offset;
};

interface ICheckPositionAndScrollIfNeededOptions {
  scrollableRoot: HTMLElement;
  checkTarget: HTMLElement;
  scrollTarget?: HTMLElement;
  options?: ScrollIntoViewOptions;
}

export const checkPositionAndScrollIfNeeded = ({
  scrollableRoot,
  checkTarget,
  scrollTarget,
  options: { behavior = 'smooth', block = 'start', inline } = {},
}: ICheckPositionAndScrollIfNeededOptions) => {
  if (checkElementPartialVisibilityInContainer(checkTarget, scrollableRoot)) {
    const target = scrollTarget || checkTarget;

    target.scrollIntoView({ behavior, block, inline });
  }
};
