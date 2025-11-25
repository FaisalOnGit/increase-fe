import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { DashboardLayout } from "./layouts/DashboardLayout";
import LoginForm from "./pages/Login";
import Courses from "./pages/Courses";
import PrivateRoute from "./utils/PrivateRoutes";
import Students from "./pages/Students";
import Assignments from "./pages/Assignments";
import Grades from "./pages/Grades";
import Laporan from "./pages/Laporan";
import { UserManagement } from "./pages/master/UserManagement";
import { Breadcrumb } from "./components/layout/BreadCrumb";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router basename="edu-lms">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="students" element={<Students />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="grades" element={<Grades />} />
              <Route path="reports" element={<Laporan />} />
              <Route path="master/pengguna" element={<UserManagement />} />
              <Route
                path="settings"
                element={
                  <div className="p-6 space-y-6">
                    <Breadcrumb currentPage="PENGATURAN" currentHref="" />
                    <h1 className="text-2xl font-bold">Pengaturan</h1>
                    <p className="text-gray-600 mt-2">
                      Halaman pengaturan akan segera hadir.
                    </p>
                  </div>
                }
              />
              <Route path="not-found" element={<NotFound />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
