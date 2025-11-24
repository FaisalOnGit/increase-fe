import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = sessionStorage.getItem("token"); // Adjust if you're storing token elsewhere

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; // If token exists, render the protected route (children)
};

export default PrivateRoute;
