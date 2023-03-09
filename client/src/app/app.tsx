import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <button
              onClick={() => {
                console.log('werwer');
              }}
            >
              fdsfsdf
            </button>
            <div>home </div>
            <div>home </div>
          </div>
        }
      />
      <Route path="*" element={<p> nf</p>} />
    </Routes>
  );
}
