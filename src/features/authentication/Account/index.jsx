import { Navigate, Outlet } from 'react-router-dom';
import { useAuthentication } from '../authenticationSlice';
import SideBar from './SideBar';

function Account() {
  const { token } = useAuthentication();

  return (
    <>
      {!token ? (
        <Navigate
          state={{ from: window?.location?.pathname }}
          to="/login"
          replace
        />
      ) : (
        <div className="grid grid-cols-4 gap-6 p-14">
          <div className="hidden lg:grid lg:col-span-1">
            <SideBar />
          </div>

          <div className="bg-white p-8 col-span-4 lg:col-span-3 shadow-custom rounded-md">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

export default Account;
