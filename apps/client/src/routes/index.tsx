import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, Zoom, toast } from 'react-toastify';

import { About } from '../pages/About';
import { NotFound } from '../pages/NotFound';
import { Home } from '../pages/Home';
// import {Login} from '../pages/Login';
// import {Logout} from '../pages/Logout';
// import {Dashboard} from '../pages/Dashboard';

export const AppRouter = () => {
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<false | string>(false);

  // const isLoading = useAppSelector((state) => state.loader.isLoading);
  // const errorMessage = useAppSelector((state) => state.error.message);
  useEffect(() => {
    if (isLoading) {
      ref.current.staticStart();
    } else {
      ref.current.complete();
    }

    setTimeout(() => {
      setErrorMessage('fdsfsdf');
    }, 100);
  }, [isLoading]);

  useEffect(() => {
    console.log({ errorMessage });
    console.log('errorMessage : =>', errorMessage);

    if (errorMessage) {
      toast.error(errorMessage.toString(), {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        style: { backgroundColor: 'red', color: 'white' },
      });
    }
  }, [errorMessage]);

  return (
    <>
      <LoadingBar color="#0086b3" height={3} ref={ref} />
      <ToastContainer limit={1} transition={Zoom} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Home />}>
          {/*<Route index element={<Dashboard/>}/>*/}
          {/*<Route path="about" element={<About/>}/>*/}
          {/*<Route path="*" element={<NotFound/>}/>*/}
        </Route>
        {/*<Route path="/login" element={<Login/>}/>*/}
        {/*<Route path="/logout" element={<Logout/>}/>*/}
        {/*<Route path="*" element={<NotFound/>}/>*/}
      </Routes>
    </>
  );
};
