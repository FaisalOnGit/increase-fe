import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-sm">E</span>
              </div>
              <div className="text-white">
                <h1 className="font-bold text-lg">EDU-LMS</h1>
                <p className="text-xs text-indigo-200">Learning Management System</p>
              </div>
            </div>
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Kelola Pembelajaran <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              Digital Education
            </span>{" "}
            <br />
            dengan Mudah
          </h1>
          <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
            Sistem manajemen pembelajaran terintegrasi untuk institusi pendidikan Anda.
            Kelola mata pelajaran, siswa, tugas, dan nilai dalam satu platform yang
            mudah digunakan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Mulai Sekarang
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-indigo-200 text-lg">
              Semua yang Anda butuhkan untuk mengelola bisnis dengan efisien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "BarChart3",
                title: "Dashboard Analytics",
                description:
                  "Pantau performa bisnis dengan dashboard yang informatif dan real-time",
              },
              {
                icon: "BookOpen",
                title: "Mata Pelajaran",
                description:
                  "Kelola mata pelajaran, kurikulum, dan jadwal pembelajaran dengan sistem terintegrasi",
              },
              {
                icon: "Users",
                title: "Data Siswa",
                description:
                  "Simpan dan kelola data siswa untuk monitoring pembelajaran yang lebih efektif",
              },
              {
                icon: "FileText",
                title: "Tugas & Quiz",
                description:
                  "Buat dan kelola tugas, quiz, serta ujian dengan sistem penilaian otomatis",
              },
              {
                icon: "ChartBar",
                title: "Analisis Nilai",
                description:
                  "Pantau perkembangan belajar siswa dengan grafik dan statistik yang komprehensif",
              },
              {
                icon: "Award",
                title: "Sertifikat Digital",
                description:
                  "Generate sertifikat kelulusan dan prestasi siswa secara digital",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    name={feature.icon as any}
                    size={24}
                    className="text-white"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-indigo-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Siap Meningkatkan Kualitas Pembelajaran?
          </h2>
          <p className="text-xl text-indigo-200 mb-8">
            Bergabunglah dengan ratusan institusi pendidikan yang telah
            mempercayai platform kami
          </p>
          <Link to="/dashboard">
            <Button size="lg">Coba Gratis Sekarang</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-sm border-t border-white/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-sm">E</span>
              </div>
              <div className="text-white">
                <h1 className="font-bold">EDU-LMS</h1>
                <p className="text-xs text-indigo-200">Learning Management System</p>
              </div>
            </div>
            <p className="text-indigo-200 text-sm">
              © 2025 EDU-LMS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
