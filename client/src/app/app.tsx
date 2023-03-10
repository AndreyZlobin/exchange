import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <div>
            <button
              onClick={() => {
                fetch('/api/v1/health-check')
                  .then((res) => res.json())
                  .then((res) => {
                    console.log(res);
                  });
              }}
            >
              get check
            </button>
            <div>home </div>
          </div>
        }
      />
      <Route path='*' element={<p> nf</p>} />
    </Routes>
  );
}
