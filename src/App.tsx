import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { DashboardLayout } from "./layouts/DashboardLayout";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import { UserManagement } from "./pages/master/UserManagement";
import { RoleManagement } from "./pages/master/RoleManagement";
import { DosenManagement } from "./pages/master/DosenManagement";
import { MahasiswaManagement } from "./pages/master/MahasiswaManagement";
import { ProdiManagement } from "./pages/master/ProdiManagement";
import { FakultasManagement } from "./pages/master/FakultasManagement";
import { JenisPKMManagement } from "./pages/master/JenisPKMManagement";
import { KriteriaPKMManagement } from "./pages/master/KriteriaPKMManagement";
import { PeriodeManagement } from "./pages/master/PeriodeManagement";
import { PembimbingManagement } from "./pages/manajemen/PembimbingManagement";
import { ReviewerManagement } from "./pages/manajemen/ReviewerManagement";
import { ProposalManagement } from "./pages/pembimbing/ProposalManagement";
import { RekapProposal } from "./pages/laporan/RekapProposal";
import { ProposalSubmission } from "./pages/mahasiswa/ProposalSubmission";
import PrivateRoute from "./utils/PrivateRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="master/pengguna" element={<UserManagement />} />
              <Route path="master/role" element={<RoleManagement />} />
              <Route path="master/dosen" element={<DosenManagement />} />
              <Route
                path="master/mahasiswa"
                element={<MahasiswaManagement />}
              />
              <Route path="master/prodi" element={<ProdiManagement />} />
              <Route path="master/fakultas" element={<FakultasManagement />} />
              <Route path="master/jenis-pkm" element={<JenisPKMManagement />} />
              <Route
                path="master/kriteria-pkm"
                element={<KriteriaPKMManagement />}
              />
              <Route path="master/periode" element={<PeriodeManagement />} />
              <Route
                path="manajemen/pembimbing"
                element={<PembimbingManagement />}
              />
              <Route path="manajemen/review" element={<ReviewerManagement />} />
              <Route
                path="manajemen/proposal"
                element={<ProposalManagement />}
              />
              <Route
                path="mahasiswa/pengajuan-proposal"
                element={<ProposalSubmission />}
              />
              <Route path="rekap/proposal" element={<RekapProposal />} />
              <Route path="not-found" element={<NotFound />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
