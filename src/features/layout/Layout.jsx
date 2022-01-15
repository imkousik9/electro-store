import { Outlet } from 'react-router-dom';
import Footer from '../footer/Footer';
import NavBar from '../nav/NavBar';
function Layout() {
  return (
    <>
      <NavBar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
