import './index.css';

import { App } from './App';
import { AppProvider } from './AppProvider';
export function Main() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}
