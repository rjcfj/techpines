import { Helmet, HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Música para Youtube</title>
      </Helmet>
      <div>
        <div className="p-4">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </div>

        <div className="container">{children}</div>
      </div>
    </HelmetProvider>
  );
};

export default Layout;
