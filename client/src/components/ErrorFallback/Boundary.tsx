import { Component, ComponentType, ErrorInfo, PropsWithChildren } from 'react';

import DefaultFallback, { FallbackProps } from './Fallback';

export type BoundaryProps = {
  onError?: (error: Error, info: ErrorInfo) => void;
  Fallback?: ComponentType<FallbackProps>;
};

export type State = { error: Error | null; hasError: boolean };

export class ErrorBoundary extends Component<BoundaryProps, State> {
  static defaultProps = { Fallback: DefaultFallback };

  constructor(props: BoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  reset = () => this.setState({ hasError: false, error: null });

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error('Error Rendering Components:', error, errorInfo);
    }
  }

  override shouldComponentUpdate(nextProps: PropsWithChildren<BoundaryProps>, nextState: State) {
    if (this.state.hasError !== nextState.hasError) {
      return true;
    }

    if (this.state.error && !Object.is(this.props.Fallback, nextProps.Fallback)) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return !this.state.error && !Object.is(this.props.children, nextProps.children);
  }

  override render() {
    return (
      <>
        {this.state.hasError ? (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <this.props.Fallback reset={this.reset} error={this.state.error} />
        ) : (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.props.children
        )}
      </>
    );
  }
}
