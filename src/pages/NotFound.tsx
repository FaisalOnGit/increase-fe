import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { Breadcrumb } from '../components/layout/BreadCrumb';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div>
        <Breadcrumb
          currentPage="404 - Halaman Tidak Ditemukan"
          currentHref="#"
        />
      </div>

      {/* 404 Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          {/* 404 Icon */}
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={64} className="text-gray-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">!</span>
            </div>
          </div>

          {/* 404 Text */}
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Halaman Tidak Ditemukan</h2>
          <p className="text-gray-600 text-lg">
            Maaf, halaman yang Anda cari tidak dapat ditemukan.
            <br />
            Halaman mungkin telah dihapus, dipindahkan, atau URL yang Anda masukkan salah.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              variant="primary"
              onClick={() => navigate(-1)}
            >
              <Icon name="ChevronLeft" size={16} className="mr-2" />
              Kembali ke Halaman Sebelumnya
            </Button>
            <Link to="/dashboard">
              <Button variant="ghost">
                <Icon name="LayoutDashboard" size={16} className="mr-2" />
                Ke Dashboard
              </Button>
            </Link>
          </div>

          {/* Help Section */}
          <div className="bg-gray-50 rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Butuh Bantuan?</h3>
            <p className="text-gray-600 text-sm mb-4">
              Jika Anda yakin ini adalah kesalahan sistem, silakan hubungi administrator.
            </p>
            <div className="flex gap-4 justify-center text-sm text-gray-500">
              <span>Email: support@unsil.ac.id</span>
              <span>•</span>
              <span>Telepon: (022) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};