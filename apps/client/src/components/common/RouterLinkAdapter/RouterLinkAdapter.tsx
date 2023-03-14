import { forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export const RouterLinkAdapter = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref} {...props} />,
);
