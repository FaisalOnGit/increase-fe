import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-6">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="w-40 h-40 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={80} className="text-primary" />
          </div>
          <div className="absolute -top-2 -right-8 w-16 h-16 bg-destructive rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">!</span>
          </div>
        </div>

        {/* 404 Text */}
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold text-foreground">Halaman Tidak Ditemukan</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman mungkin telah dihapus, dipindahkan, atau URL yang Anda masukkan salah.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            size="lg"
            className="gap-2"
          >
            <Icon name="ArrowLeft" size={18} />
            Kembali
          </Button>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="gap-2">
              <Icon name="LayoutDashboard" size={18} />
              Ke Dashboard
            </Button>
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-muted/50 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-2">Butuh Bantuan?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Jika Anda yakin ini adalah kesalahan sistem, silakan hubungi administrator.
          </p>
          <div className="flex gap-6 justify-center text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Icon name="Mail" size={16} />
              support@unsil.ac.id
            </span>
            <span className="flex items-center gap-2">
              <Icon name="Phone" size={16} />
              (022) 123-4567
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};